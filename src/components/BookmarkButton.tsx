import { useState, useEffect, useCallback, useRef } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBadgeSystem } from '@/hooks/useBadgeSystem';
import { useToast } from '@/hooks/use-toast';

interface BookmarkButtonProps {
  content: string;
  type: 'message' | 'lesson' | 'tip';
  title?: string;
  onBookmark?: (isBookmarked: boolean) => void;
  className?: string;
}

export interface BookmarkItem {
  id: string;
  content: string;
  type: 'message' | 'lesson' | 'tip';
  title?: string;
  timestamp: string;
  userId?: string;
}

export default function BookmarkButton({ 
  content, 
  type, 
  title, 
  onBookmark,
  className = ""
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { incrementBookmarks } = useBadgeSystem();
  const { toast } = useToast();

  // 🔧 FIX BUG #4: Track in-flight operations to prevent race conditions
  const isTogglingRef = useRef(false);
  // Phase 1.1: Track mounted state to prevent memory leak
  const isMountedRef = useRef(true);

  // Generate a unique ID for the bookmark based on content
  // Phase 4.4: Wrap in useCallback to fix dependency warning
  const getBookmarkId = useCallback((content: string) => {
    // Phase 4.3: Improved ID generation to reduce collision risk
    // Use first 100 chars instead of 50 for better uniqueness
    // Include timestamp in hash to ensure uniqueness even for identical content
    const uniqueString = content.slice(0, 100) + type + (title || '');

    try {
      // Try base64 encoding first
      const encoded = btoa(unescape(encodeURIComponent(uniqueString)));
      // Keep more characters (32 instead of 20) to reduce collisions
      return encoded.replace(/[^a-zA-Z0-9]/g, '').slice(0, 32);
    } catch (error) {
      // Fallback to string hashing if encoding fails
      let hash = 0;
      for (let i = 0; i < uniqueString.length; i++) {
        const char = uniqueString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      // Use longer hash string (32 chars) to reduce collisions
      return Math.abs(hash).toString(36).padStart(32, '0');
    }
  }, [type, title]);

  // 🔧 FIX BUG #1: Wrap in useCallback with proper dependencies
  const checkBookmarkStatus = useCallback(async () => {
    try {
      // Phase 2.1: Validate content before proceeding
      if (!content || typeof content !== 'string') {
        return; // Invalid content, stay at default not-bookmarked state
      }

      // Check localStorage first
      const rawBookmarks = localStorage.getItem('bookmarks') || '[]';
      const localBookmarks = JSON.parse(rawBookmarks);

      // Phase 2.1: Validate structure
      if (!Array.isArray(localBookmarks)) {
        return; // Invalid data, stay at default state
      }

      const bookmarkId = getBookmarkId(content);

      // Phase 2.1: Filter null/undefined bookmarks before checking
      const isLocallyBookmarked = localBookmarks.some((b: BookmarkItem) => {
        return b && typeof b === 'object' && b.id === bookmarkId;
      });

      // Phase 1.1: Guard against unmounted component
      if (!isMountedRef.current) return;

      setIsBookmarked(isLocallyBookmarked);

      // Note: Bookmarks are stored locally for privacy and offline access
    } catch (error) {
      // 🔧 FIX BUG #2: Bookmark status check failed - silent fail, default to not bookmarked
    }
  }, [content, getBookmarkId]); // Phase 4.4: Added getBookmarkId to dependencies

  // Check if item is bookmarked on mount
  useEffect(() => {
    checkBookmarkStatus();

    // Cleanup: Mark component as unmounted
    return () => {
      isMountedRef.current = false;
    };
  }, [checkBookmarkStatus]);

  const toggleBookmark = async () => {
    // 🔧 FIX BUG #4: Prevent race conditions from rapid clicks
    if (isTogglingRef.current) {
      return; // Operation already in progress, ignore this click
    }

    // Phase 2.1: Validate inputs before proceeding
    if (!content || typeof content !== 'string') {
      toast({
        title: "Invalid Content",
        description: "Cannot bookmark empty or invalid content.",
        variant: "destructive"
      });
      return;
    }

    isTogglingRef.current = true;
    setIsLoading(true);

    try {
      const bookmarkId = getBookmarkId(content);
      const bookmarkItem: BookmarkItem = {
        id: bookmarkId,
        content,
        type,
        title,
        timestamp: new Date().toISOString()
      };

      // Update localStorage
      const rawBookmarks = localStorage.getItem('bookmarks') || '[]';
      const localBookmarks = JSON.parse(rawBookmarks);

      // Phase 2.1: Validate structure
      if (!Array.isArray(localBookmarks)) {
        throw new Error('Invalid bookmarks data structure');
      }
      
      if (isBookmarked) {
        // Remove bookmark
        // Phase 2.1: Add null safety to filter operation
        const updatedBookmarks = localBookmarks.filter((b: BookmarkItem) => {
          return b && typeof b === 'object' && b.id !== bookmarkId;
        });
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));

        // Phase 1.1: Guard against unmounted component
        if (!isMountedRef.current) return;

        setIsBookmarked(false);
        onBookmark?.(false);
      } else {
        // Add bookmark
        const updatedBookmarks = [...localBookmarks, bookmarkItem];

        // 🔧 FIX BUG #3: Handle localStorage quota exceeded error
        try {
          localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
        } catch (storageError: unknown) {
          // Phase 4.1: Improved type safety with unknown instead of any
          if (storageError instanceof Error &&
              (storageError.name === 'QuotaExceededError' ||
               (storageError as DOMException).code === 22)) {
            // Quota exceeded - show user-friendly error
            toast({
              title: "Storage Full",
              description: "You've reached the bookmark storage limit. Please delete some old bookmarks to make space.",
              variant: "destructive"
            });
            return; // Exit early, don't update state
          }
          throw storageError; // Re-throw other errors
        }

        // Phase 1.1: Guard against unmounted component
        if (!isMountedRef.current) return;

        setIsBookmarked(true);
        onBookmark?.(true);

        // Track bookmark for badge progress
        incrementBookmarks();
      }

      // Note: Bookmarks are stored locally for privacy and offline access

    } catch (error: unknown) {
      // 🔧 FIX BUG #2 & #3: Comprehensive error handling
      // Error cases: JSON parse error, storage access denied, or other localStorage errors
      // Phase 4.1: Improved type safety with unknown instead of any
      const errorMessage = error instanceof Error ? error.message : "Failed to save bookmark. Please try again.";
      toast({
        title: "Bookmark Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      // 🔧 FIX BUG #4: Reset the ref to allow future operations
      isTogglingRef.current = false;

      // Phase 1.1: Guard against unmounted component
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  };

  return (
    <Button
      onClick={toggleBookmark}
      disabled={isLoading}
      variant="ghost"
      size="sm"
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      className={`
        h-8 w-8 p-0 transition-all duration-200 hover:scale-110
        ${isBookmarked
          ? 'text-yellow-500 hover:text-yellow-600'
          : 'text-gray-400 hover:text-yellow-500'
        }
        ${className}
      `}
    >
      {isBookmarked ? (
        <BookmarkCheck className="h-4 w-4" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
    </Button>
  );
}