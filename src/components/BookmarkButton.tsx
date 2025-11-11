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
  const getBookmarkId = (content: string) => {
    // Use a safer encoding method that works with all characters
    try {
      return btoa(unescape(encodeURIComponent(content.slice(0, 50)))).replace(/[^a-zA-Z0-9]/g, '').slice(0, 20);
    } catch (error) {
      // Fallback to simple string hashing if encoding fails
      let hash = 0;
      const str = content.slice(0, 50);
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return Math.abs(hash).toString(36).slice(0, 20);
    }
  };

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

      // TODO: Also check Supabase when user authentication is implemented
      // const { data: { user } } = await supabase.auth.getUser();
      // if (user) {
      //   // Check Supabase bookmarks
      // }
    } catch (error) {
      // 🔧 FIX BUG #2: Bookmark status check failed - silent fail, default to not bookmarked
    }
  }, [content]);

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
        } catch (storageError: any) {
          if (storageError.name === 'QuotaExceededError' || storageError.code === 22) {
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

      // TODO: Sync with Supabase when user authentication is implemented
      // const { data: { user } } = await supabase.auth.getUser();
      // if (user) {
      //   if (isBookmarked) {
      //     await supabase.from('bookmarks').delete().eq('id', bookmarkId).eq('user_id', user.id);
      //   } else {
      //     await supabase.from('bookmarks').insert({ ...bookmarkItem, user_id: user.id });
      //   }
      // }

    } catch (error: any) {
      // 🔧 FIX BUG #2 & #3: Comprehensive error handling
      // Error cases: JSON parse error, storage access denied, or other localStorage errors
      toast({
        title: "Bookmark Error",
        description: error.message || "Failed to save bookmark. Please try again.",
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