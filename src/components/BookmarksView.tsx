import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Bookmark, MessageSquare, BookOpen, Lightbulb, Trash2, Calendar, Reply, Search, X, Download, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookmarkItem } from './BookmarkButton';
import { toast } from 'sonner';
import { useBadgeSystem } from '@/hooks/useBadgeSystem';

interface BookmarksViewProps {
  onBack: () => void;
  onContinueFromMessage?: (content: string) => void;
}

// PHASE 4 FIX: Extract magic numbers to constants for maintainability
const INITIAL_DISPLAY_LIMIT = 20; // Initial number of bookmarks to show
const PAGINATION_INCREMENT = 20; // Number of bookmarks to add when showing more
const UNDO_TIMEOUT_MS = 5000; // Time window for undo operation (milliseconds)

// PHASE 4 FIX: Standardized error messages for consistency
const ERROR_MESSAGES = {
  LOAD_FAILED: "Failed to load bookmarks. Please try again.",
  DELETE_FAILED: "Failed to delete bookmark. Please try again.",
  RESTORE_FAILED: "Failed to restore bookmark",
  EXPORT_FAILED: "Failed to export bookmarks. Please try again.",
  BOOKMARK_DELETED: "Bookmark deleted",
  BOOKMARK_RESTORED: "Bookmark restored"
} as const;

const SUCCESS_MESSAGES = {
  EXPORT_SUCCESS: (count: number) => `Exported ${count} bookmarks successfully`
} as const;

// PHASE 4 FIX: Sort options for bookmarks
type SortOption = 'newest' | 'oldest' | 'type' | 'title';

export default function BookmarksView({ onBack, onContinueFromMessage }: BookmarksViewProps) {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [selectedTab, setSelectedTab] = useState<'all' | 'message' | 'lesson' | 'tip'>('all');
  // Phase 3.1: Add loading state
  const [isLoading, setIsLoading] = useState(true);
  // Phase 3.3: Add pagination to prevent performance issues with large lists
  const [displayLimit, setDisplayLimit] = useState(INITIAL_DISPLAY_LIMIT);
  // BUG #19 FIX: Add search functionality
  const [searchQuery, setSearchQuery] = useState('');
  // PHASE 4 FIX: Add sort functionality
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  // Phase 1.1: Track mounted state to prevent state updates after unmount
  const isMountedRef = useRef(true);
  // Phase 2.2: Track ongoing delete operations to prevent race conditions
  const deletingIdsRef = useRef<Set<string>>(new Set());
  // BUG #3 FIX: Import badge system to decrement counter on delete
  // BUG #18 FIX: Import sync and progress for counter validation
  const { decrementBookmarks, syncBookmarks, badgeProgress } = useBadgeSystem();
  // BUG #15 FIX: Store deleted bookmark for undo functionality
  const deletedBookmarkRef = useRef<BookmarkItem | null>(null);
  const undoTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadBookmarks();

    // Cleanup: Mark component as unmounted
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // BUG #13 FIX: Reset pagination when tab changes
  useEffect(() => {
    setDisplayLimit(INITIAL_DISPLAY_LIMIT); // Reset to initial limit when switching tabs
  }, [selectedTab]);

  const loadBookmarks = async () => {
    try {
      // Phase 3.1: Set loading state
      setIsLoading(true);

      // Load from localStorage
      const rawBookmarks = localStorage.getItem('bookmarks') || '[]';
      const localBookmarks = JSON.parse(rawBookmarks);

      // Phase 2.1: Validate bookmark structure before using
      if (!Array.isArray(localBookmarks)) {
        throw new Error('Invalid bookmarks data structure');
      }

      // Phase 2.1: Filter out invalid bookmarks (null, undefined, or missing required fields)
      const validBookmarks = localBookmarks.filter((b: BookmarkItem) => {
        return b &&
               typeof b === 'object' &&
               typeof b.id === 'string' &&
               typeof b.content === 'string' &&
               typeof b.type === 'string' &&
               typeof b.timestamp === 'string';
      });

      // Phase 1.2: Validate dates before sorting to prevent NaN crashes
      const sortedBookmarks = validBookmarks.sort((a: BookmarkItem, b: BookmarkItem) => {
        const dateA = new Date(a.timestamp);
        const dateB = new Date(b.timestamp);

        // Handle invalid dates
        const timeA = isNaN(dateA.getTime()) ? 0 : dateA.getTime();
        const timeB = isNaN(dateB.getTime()) ? 0 : dateB.getTime();

        return timeB - timeA;
      });

      // Phase 1.1: Guard against unmounted component
      if (!isMountedRef.current) return;

      setBookmarks(sortedBookmarks);

      // BUG #18 FIX: Validate and sync badge counter with actual bookmark count
      const actualCount = sortedBookmarks.length;
      if (badgeProgress.bookmarksSaved !== actualCount) {
        syncBookmarks(actualCount);
      }

      // TODO: Merge with Supabase bookmarks when user authentication is implemented
    } catch (error) {
      // Phase 1.3: Show user-friendly error message instead of silent fail
      if (isMountedRef.current) {
        toast.error(ERROR_MESSAGES.LOAD_FAILED);
      }
    } finally {
      // Phase 3.1: Always clear loading state
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  };

  // BUG #15 FIX: Undo delete functionality
  const undoDelete = () => {
    if (!deletedBookmarkRef.current) return;

    try {
      const bookmarkToRestore = deletedBookmarkRef.current;

      // Add back to localStorage
      const rawBookmarks = localStorage.getItem('bookmarks') || '[]';
      const localBookmarks = JSON.parse(rawBookmarks);

      if (Array.isArray(localBookmarks)) {
        const updatedBookmarks = [...localBookmarks, bookmarkToRestore];
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));

        // Update state
        if (isMountedRef.current) {
          setBookmarks(prev => {
            const newBookmarks = [...prev, bookmarkToRestore];
            // BUG #18 FIX: Sync badge counter when restoring bookmark
            syncBookmarks(newBookmarks.length);
            return newBookmarks;
          });
          toast.success(ERROR_MESSAGES.BOOKMARK_RESTORED);
        }
      }

      // Clear undo data
      deletedBookmarkRef.current = null;
      if (undoTimeoutRef.current) {
        clearTimeout(undoTimeoutRef.current);
        undoTimeoutRef.current = null;
      }
    } catch (error) {
      if (isMountedRef.current) {
        toast.error(ERROR_MESSAGES.RESTORE_FAILED);
      }
    }
  };

  const deleteBookmark = async (id: string) => {
    try {
      // Phase 2.1: Validate id parameter
      if (!id || typeof id !== 'string') {
        throw new Error('Invalid bookmark ID');
      }

      // Phase 2.2: Prevent concurrent delete operations
      if (deletingIdsRef.current.has(id)) {
        return; // Delete already in progress for this ID
      }

      // Mark this ID as being deleted
      deletingIdsRef.current.add(id);

      // BUG #15 FIX: Store bookmark before deleting for undo
      const bookmarkToDelete = bookmarks.find(b => b.id === id);
      if (bookmarkToDelete) {
        deletedBookmarkRef.current = bookmarkToDelete;
      }

      // Remove from localStorage
      const rawBookmarks = localStorage.getItem('bookmarks') || '[]';
      const localBookmarks = JSON.parse(rawBookmarks);

      // Phase 2.1: Validate structure
      if (!Array.isArray(localBookmarks)) {
        throw new Error('Invalid bookmarks data structure');
      }

      // Phase 2.1: Filter with null safety check
      const updatedBookmarks = localBookmarks.filter((b: BookmarkItem) => {
        return b && typeof b === 'object' && b.id !== id;
      });

      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));

      // Phase 1.1: Guard against unmounted component
      if (!isMountedRef.current) return;

      // Update state
      setBookmarks(prev => prev.filter(b => b.id !== id));

      // BUG #3 FIX: Decrement badge counter to keep it in sync
      decrementBookmarks();

      // BUG #15 FIX: Show success with undo button
      toast.success(ERROR_MESSAGES.BOOKMARK_DELETED, {
        action: {
          label: 'Undo',
          onClick: undoDelete,
        },
        duration: UNDO_TIMEOUT_MS,
      });

      // Clear undo data after timeout
      if (undoTimeoutRef.current) {
        clearTimeout(undoTimeoutRef.current);
      }
      undoTimeoutRef.current = setTimeout(() => {
        deletedBookmarkRef.current = null;
      }, UNDO_TIMEOUT_MS);

      // TODO: Remove from Supabase when user authentication is implemented
    } catch (error) {
      // Phase 1.3: Show user-friendly error message instead of silent fail
      if (isMountedRef.current) {
        toast.error(ERROR_MESSAGES.DELETE_FAILED);
      }
    } finally {
      // Phase 2.2: Always remove the ID from the set when done
      deletingIdsRef.current.delete(id);
    }
  };

  // BUG #21 FIX: Export bookmarks as JSON file
  const exportBookmarks = () => {
    try {
      // Create JSON file with all bookmarks
      const dataStr = JSON.stringify(bookmarks, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });

      // Create download link
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bookmarks-${new Date().toISOString().split('T')[0]}.json`;

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup
      URL.revokeObjectURL(url);

      toast.success(SUCCESS_MESSAGES.EXPORT_SUCCESS(bookmarks.length));
    } catch (error) {
      toast.error(ERROR_MESSAGES.EXPORT_FAILED);
    }
  };

  const getFilteredBookmarks = () => {
    // Phase 2.1: Add null safety check before filtering
    const safeBookmarks = bookmarks.filter(bookmark => {
      return bookmark &&
             typeof bookmark === 'object' &&
             bookmark.id &&
             bookmark.content &&
             bookmark.type;
    });

    // Filter by tab
    let filtered = selectedTab === 'all'
      ? safeBookmarks
      : safeBookmarks.filter(bookmark => bookmark.type === selectedTab);

    // BUG #19 FIX: Filter by search query (case-insensitive)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(bookmark => {
        const contentMatch = bookmark.content?.toLowerCase().includes(query);
        const titleMatch = bookmark.title?.toLowerCase().includes(query);
        return contentMatch || titleMatch;
      });
    }

    // PHASE 4 FIX: Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case 'oldest':
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        case 'type':
          return a.type.localeCompare(b.type);
        case 'title':
          return (a.title || a.content.slice(0, 50)).localeCompare(b.title || b.content.slice(0, 50));
        default:
          return 0;
      }
    });

    // Phase 3.3: Apply pagination limit
    return {
      items: sorted.slice(0, displayLimit),
      total: sorted.length,
      hasMore: sorted.length > displayLimit
    };
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageSquare className="h-4 w-4" />;
      case 'lesson': return <BookOpen className="h-4 w-4" />;
      case 'tip': return <Lightbulb className="h-4 w-4" />;
      default: return <Bookmark className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'message': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'lesson': return 'text-green-600 bg-green-50 border-green-200';
      case 'tip': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (timestamp: string) => {
    // Phase 1.2: Validate date before using it
    const date = new Date(timestamp);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Unknown date';
    }

    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const { items: filteredBookmarks, total: totalBookmarks, hasMore } = getFilteredBookmarks();

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--app-bg))' }}>
      <div className="relative z-10 p-2 sm:p-4 max-w-sm sm:max-w-md lg:max-w-2xl mx-auto">
        {/* Header */}
        <div 
          className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 mt-safe-area-inset-top"
          style={{ boxShadow: 'var(--shadow-medium), inset 0 1px 0 rgba(255,255,255,0.1)' }}
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 rounded-full h-8 w-8 sm:h-10 sm:w-10"
              aria-label="Go back to previous page"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <h1 className="text-white font-bold text-lg sm:text-xl" role="heading" aria-level={1}>My Bookmarks</h1>
            {/* BUG #21 FIX: Export button */}
            <Button
              onClick={exportBookmarks}
              disabled={bookmarks.length === 0}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 rounded-full h-8 w-8 sm:h-10 sm:w-10 disabled:opacity-40"
              aria-label="Export bookmarks to JSON file"
              title="Export bookmarks"
            >
              <Download className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
          
          <div className="text-center">
            <p className="text-white/80 text-xs sm:text-sm">
              Saved messages, lessons & tips
            </p>
            <div className="mt-1 sm:mt-2 text-white/60 text-xs">
              {bookmarks.length} bookmark{bookmarks.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as 'all' | 'message' | 'lesson' | 'tip')} className="mb-4 sm:mb-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm border border-white/20 h-8 sm:h-10" role="tablist" aria-label="Filter bookmarks by type">
            <TabsTrigger value="all" className="text-white data-[state=active]:bg-white data-[state=active]:text-gray-900 text-xs sm:text-sm px-1 sm:px-3" aria-label="Show all bookmarks">
              All
            </TabsTrigger>
            <TabsTrigger value="message" className="text-white data-[state=active]:bg-white data-[state=active]:text-gray-900 text-xs sm:text-sm px-1 sm:px-3" aria-label="Show chat messages">
              Chat
            </TabsTrigger>
            <TabsTrigger value="lesson" className="text-white data-[state=active]:bg-white data-[state=active]:text-gray-900 text-xs sm:text-sm px-1 sm:px-3" aria-label="Show lessons">
              Lessons
            </TabsTrigger>
            <TabsTrigger value="tip" className="text-white data-[state=active]:bg-white data-[state=active]:text-gray-900 text-xs sm:text-sm px-1 sm:px-3" aria-label="Show tips">
              Tips
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* BUG #19 FIX: Search Bar & PHASE 4 FIX: Sort Options */}
        <div className="mb-4 sm:mb-6 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" aria-hidden="true" />
            <Input
              type="text"
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 pl-10 pr-10 h-9 sm:h-10 text-sm"
              aria-label="Search bookmarks by content or title"
            />
            {searchQuery && (
              <Button
                onClick={() => setSearchQuery('')}
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-full"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}
          </div>

          {/* PHASE 4 FIX: Sort dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-white/60 flex-shrink-0" aria-hidden="true" />
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-full sm:w-[180px] bg-white/10 backdrop-blur-sm border-white/20 text-white text-sm h-9">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="type">By type</SelectItem>
                <SelectItem value="title">By title (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {searchQuery && (
            <p className="text-xs text-white/60">
              {filteredBookmarks.length} result{filteredBookmarks.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        {/* Bookmarks List */}
        <div className="space-y-3 sm:space-y-4 pb-6 sm:pb-8">
          {/* Phase 3.1: Show loading spinner while fetching bookmarks */}
          {isLoading ? (
            <Card className="bg-white/20 backdrop-blur-sm border border-white/30">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-white/60 mx-auto mb-3 sm:mb-4"></div>
                <p className="text-white/70 text-xs sm:text-sm">
                  Loading bookmarks...
                </p>
              </CardContent>
            </Card>
          ) : filteredBookmarks.length === 0 ? (
            <Card className="bg-white/20 backdrop-blur-sm border border-white/30">
              <CardContent className="p-4 sm:p-6 text-center">
                <Bookmark className="h-8 w-8 sm:h-12 sm:w-12 text-white/40 mx-auto mb-3 sm:mb-4" />
                <p className="text-white/70 text-xs sm:text-sm">
                  {selectedTab === 'all'
                    ? "No bookmarks yet! Start saving useful messages and lessons."
                    : `No ${selectedTab}s bookmarked yet.`
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredBookmarks.map((bookmark) => (
              <Card 
                key={bookmark.id}
                className="bg-white backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-200"
              >
                <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                      <div className={`p-1 sm:p-1.5 rounded-lg border flex-shrink-0 ${getTypeColor(bookmark.type)}`}>
                        <div className="h-3 w-3 sm:h-4 sm:w-4">
                          {getTypeIcon(bookmark.type)}
                        </div>
                      </div>
                      {bookmark.title && (
                        <CardTitle className="text-gray-800 text-xs sm:text-sm font-semibold truncate">
                          {bookmark.title}
                        </CardTitle>
                      )}
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-2 flex-shrink-0">
                      <div className="flex items-center text-gray-400 text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(bookmark.timestamp)}
                      </div>
                      <Button
                        onClick={() => deleteBookmark(bookmark.id)}
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 sm:h-7 sm:w-7 p-0 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full"
                        aria-label={`Delete bookmark: ${bookmark.title || bookmark.content.slice(0, 50)}`}
                      >
                        <Trash2 className="h-3 w-3" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 p-3 sm:px-6 sm:pb-6">
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-4 mb-3">
                    {bookmark.content}
                  </p>
                  
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full self-start ${getTypeColor(bookmark.type)}`}>
                      {bookmark.type.charAt(0).toUpperCase() + bookmark.type.slice(1)}
                    </span>
                    
                    {onContinueFromMessage && (
                      <Button
                        onClick={() => {
                          onContinueFromMessage(bookmark.content);
                          onBack(); // Go back to main app after continuing
                        }}
                        variant="ghost"
                        size="sm"
                        className="h-7 sm:h-8 px-2 sm:px-3 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-200 rounded-full"
                        title="Bring this content back to continue the conversation"
                        aria-label="Continue conversation from this bookmark"
                      >
                        <Reply className="h-3 w-3 mr-1" aria-hidden="true" />
                        <span className="hidden sm:inline">Continue Here</span>
                        <span className="sm:hidden">Continue</span>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}

          {/* Phase 3.3: Show More button for pagination */}
          {!isLoading && hasMore && (
            <div className="flex justify-center mt-4">
              <Button
                onClick={() => setDisplayLimit(prev => prev + PAGINATION_INCREMENT)}
                variant="ghost"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white rounded-full px-6 py-2"
                aria-label={`Show more bookmarks. Currently showing ${filteredBookmarks.length} of ${totalBookmarks}`}
              >
                Show More ({totalBookmarks - filteredBookmarks.length} more)
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}