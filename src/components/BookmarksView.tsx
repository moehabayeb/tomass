import { useState, useEffect } from 'react';
import { ArrowLeft, Bookmark, MessageSquare, BookOpen, Lightbulb, Trash2, Calendar, Reply } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookmarkItem } from './BookmarkButton';

interface BookmarksViewProps {
  onBack: () => void;
  onContinueFromMessage?: (content: string) => void;
}

export default function BookmarksView({ onBack, onContinueFromMessage }: BookmarksViewProps) {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [selectedTab, setSelectedTab] = useState<'all' | 'message' | 'lesson' | 'tip'>('all');

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      // Load from localStorage
      const localBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      
      // Sort by timestamp (newest first)
      const sortedBookmarks = localBookmarks.sort((a: BookmarkItem, b: BookmarkItem) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      
      setBookmarks(sortedBookmarks);

      // TODO: Merge with Supabase bookmarks when user authentication is implemented
      // const { data: { user } } = await supabase.auth.getUser();
      // if (user) {
      //   const { data: supabaseBookmarks } = await supabase
      //     .from('bookmarks')
      //     .select('*')
      //     .eq('user_id', user.id);
      //   
      //   // Merge and deduplicate bookmarks
      // }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    }
  };

  const deleteBookmark = async (id: string) => {
    try {
      // Remove from localStorage
      const localBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      const updatedBookmarks = localBookmarks.filter((b: BookmarkItem) => b.id !== id);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      
      // Update state
      setBookmarks(prev => prev.filter(b => b.id !== id));

      // TODO: Remove from Supabase when user authentication is implemented
    } catch (error) {
      console.error('Error deleting bookmark:', error);
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
    const date = new Date(timestamp);
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
      <div className="relative z-10 p-4 max-w-sm mx-auto">
        {/* Header */}
        <div 
          className="bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-6 mb-6 mt-safe-area-inset-top"
          style={{ boxShadow: 'var(--shadow-medium), inset 0 1px 0 rgba(255,255,255,0.1)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-white font-bold text-xl">My Bookmarks</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
          
          <div className="text-center">
            <p className="text-white/80 text-sm">
              Saved messages, lessons & tips
            </p>
            <div className="mt-2 text-white/60 text-xs">
              {bookmarks.length} bookmark{bookmarks.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as any)} className="mb-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm border border-white/20">
            <TabsTrigger value="all" className="text-white data-[state=active]:bg-white data-[state=active]:text-gray-900">
              All
            </TabsTrigger>
            <TabsTrigger value="message" className="text-white data-[state=active]:bg-white data-[state=active]:text-gray-900">
              Chat
            </TabsTrigger>
            <TabsTrigger value="lesson" className="text-white data-[state=active]:bg-white data-[state=active]:text-gray-900">
              Lessons
            </TabsTrigger>
            <TabsTrigger value="tip" className="text-white data-[state=active]:bg-white data-[state=active]:text-gray-900">
              Tips
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Bookmarks List */}
        <div className="space-y-4 pb-8">
          {filteredBookmarks.length === 0 ? (
            <Card className="bg-white/20 backdrop-blur-sm border border-white/30">
              <CardContent className="p-6 text-center">
                <Bookmark className="h-12 w-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/70 text-sm">
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
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`p-1.5 rounded-lg border ${getTypeColor(bookmark.type)}`}>
                        {getTypeIcon(bookmark.type)}
                      </div>
                      {bookmark.title && (
                        <CardTitle className="text-gray-800 text-sm font-semibold">
                          {bookmark.title}
                        </CardTitle>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center text-gray-400 text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(bookmark.timestamp)}
                      </div>
                      <Button
                        onClick={() => deleteBookmark(bookmark.id)}
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-red-400 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                    {bookmark.content}
                  </p>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getTypeColor(bookmark.type)}`}>
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
                        className="h-7 px-2 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-200"
                        title="Bring this content back to continue the conversation"
                      >
                        <Reply className="h-3 w-3 mr-1" />
                        Continue Here
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