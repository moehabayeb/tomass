import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Bookmark, MessageSquare, BookOpen, Lightbulb, Trash2, Calendar, Reply } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookmarkItem } from './BookmarkButton';
import { toast } from 'sonner';

interface BookmarksViewProps {
  onBack: () => void;
  onContinueFromMessage?: (content: string) => void;
}

export default function BookmarksView({ onBack, onContinueFromMessage }: BookmarksViewProps) {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [selectedTab, setSelectedTab] = useState<'all' | 'message' | 'lesson' | 'tip'>('all');
  // Phase 1.1: Track mounted state to prevent state updates after unmount
  const isMountedRef = useRef(true);

  useEffect(() => {
    loadBookmarks();

    // Cleanup: Mark component as unmounted
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadBookmarks = async () => {
    try {
      // Load from localStorage
      const localBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');

      // Phase 1.2: Validate dates before sorting to prevent NaN crashes
      const sortedBookmarks = localBookmarks.sort((a: BookmarkItem, b: BookmarkItem) => {
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

      // TODO: Merge with Supabase bookmarks when user authentication is implemented
    } catch (error) {
      // Phase 1.3: Show user-friendly error message instead of silent fail
      if (isMountedRef.current) {
        toast.error('Failed to load bookmarks. Please try again.');
      }
    }
  };

  const deleteBookmark = async (id: string) => {
    try {
      // Remove from localStorage
      const localBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      const updatedBookmarks = localBookmarks.filter((b: BookmarkItem) => b.id !== id);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));

      // Phase 1.1: Guard against unmounted component
      if (!isMountedRef.current) return;

      // Update state
      setBookmarks(prev => prev.filter(b => b.id !== id));

      // Phase 1.3: Show success feedback
      toast.success('Bookmark deleted');

      // TODO: Remove from Supabase when user authentication is implemented
    } catch (error) {
      // Phase 1.3: Show user-friendly error message instead of silent fail
      if (isMountedRef.current) {
        toast.error('Failed to delete bookmark. Please try again.');
      }
    }
  };

  const getFilteredBookmarks = () => {
    if (selectedTab === 'all') return bookmarks;
    return bookmarks.filter(bookmark => bookmark.type === selectedTab);
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

  const filteredBookmarks = getFilteredBookmarks();

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
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <h1 className="text-white font-bold text-lg sm:text-xl">My Bookmarks</h1>
            <div className="w-8 sm:w-10" /> {/* Spacer */}
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
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm border border-white/20 h-8 sm:h-10">
            <TabsTrigger value="all" className="text-white data-[state=active]:bg-white data-[state=active]:text-gray-900 text-xs sm:text-sm px-1 sm:px-3">
              All
            </TabsTrigger>
            <TabsTrigger value="message" className="text-white data-[state=active]:bg-white data-[state=active]:text-gray-900 text-xs sm:text-sm px-1 sm:px-3">
              Chat
            </TabsTrigger>
            <TabsTrigger value="lesson" className="text-white data-[state=active]:bg-white data-[state=active]:text-gray-900 text-xs sm:text-sm px-1 sm:px-3">
              Lessons
            </TabsTrigger>
            <TabsTrigger value="tip" className="text-white data-[state=active]:bg-white data-[state=active]:text-gray-900 text-xs sm:text-sm px-1 sm:px-3">
              Tips
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Bookmarks List */}
        <div className="space-y-3 sm:space-y-4 pb-6 sm:pb-8">
          {filteredBookmarks.length === 0 ? (
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
                      >
                        <Trash2 className="h-3 w-3" />
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
                      >
                        <Reply className="h-3 w-3 mr-1" />
                        <span className="hidden sm:inline">Continue Here</span>
                        <span className="sm:hidden">Continue</span>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}