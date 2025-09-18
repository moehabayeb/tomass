import { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useBadgeSystem } from '@/hooks/useBadgeSystem';

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

  // Generate a unique ID for the bookmark based on content
  const getBookmarkId = (content: string) => {
    // Use consistent hashing without encoding issues
    let hash = 0;
    const str = content.slice(0, 100); // Increased for better uniqueness
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    // Create a stable, safe ID
    return `bookmark_${Math.abs(hash).toString(36)}_${type}`;
  };

  // Check if item is bookmarked on mount
  useEffect(() => {
    let isMounted = true;

    const checkStatus = async () => {
      if (isMounted) {
        await checkBookmarkStatus();
      }
    };

    checkStatus();

    return () => {
      isMounted = false;
    };
  }, [content, type]);

  const checkBookmarkStatus = async () => {
    try {
      // Check localStorage first
      const localBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      const bookmarkId = getBookmarkId(content);
      const isLocallyBookmarked = localBookmarks.some((b: BookmarkItem) => b.id === bookmarkId);

      setIsBookmarked(isLocallyBookmarked);

      // TODO: Also check Supabase when user authentication is implemented
      // const { data: { user } } = await supabase.auth.getUser();
      // if (user) {
      //   // Check Supabase bookmarks
      // }
    } catch (error) {
      // Reduce console noise
      if (process.env.NODE_ENV === 'development') {
        console.error('Error checking bookmark status:', error);
      }
    }
  };

  const toggleBookmark = async () => {
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
      const localBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      
      if (isBookmarked) {
        // Remove bookmark
        const updatedBookmarks = localBookmarks.filter((b: BookmarkItem) => b.id !== bookmarkId);
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
        setIsBookmarked(false);
        onBookmark?.(false);
      } else {
        // Add bookmark
        const updatedBookmarks = [...localBookmarks, bookmarkItem];
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
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

    } catch (error) {
      // Reduce console noise
      if (process.env.NODE_ENV === 'development') {
        console.error('Error toggling bookmark:', error);
      }
    } finally {
      setIsLoading(false);
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