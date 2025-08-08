import { useState } from 'react';
import { MobileBottomNav } from '@/components/mobile-bottom-nav';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  MoreHorizontal,
  Flame,
  Trophy,
  Zap
} from 'lucide-react';

const mockPosts = [
  {
    id: '1',
    user: { username: 'ProGamer_Raj', avatar: null, verified: true },
    content: 'Just clutched a 1v4 in Valorant! The crowd went wild! 🔥',
    game: 'Valorant',
    media: { type: 'video', thumbnail: '🎮' },
    reactions: { likes: 1247, comments: 89, shares: 23 },
    trending: true,
    timestamp: '2h ago'
  },
  {
    id: '2', 
    user: { username: 'MemeQueen_Priya', avatar: null, verified: false },
    content: 'When your teammate picks Sage and doesn\'t heal anyone 😭',
    game: 'Valorant',
    media: { type: 'meme', thumbnail: '😭' },
    reactions: { likes: 2341, comments: 156, shares: 67 },
    trending: false,
    timestamp: '4h ago'
  },
  {
    id: '3',
    user: { username: 'BGMI_Beast', avatar: null, verified: true },
    content: 'New tournament mode is INSANE! Who\'s joining the squad? 🏆',
    game: 'BGMI',
    media: { type: 'screenshot', thumbnail: '🏆' },
    reactions: { likes: 892, comments: 43, shares: 12 },
    trending: true,
    timestamp: '6h ago'
  }
];

export default function MobileFeed() {
  const [reactions, setReactions] = useState<{[key: string]: boolean}>({});

  const handleReaction = (postId: string) => {
    setReactions(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card-bg backdrop-blur-md border-b border-secondary/20 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-xl flex items-center justify-center">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold neon-purple">GameHub</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
              <Flame className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          </div>
        </div>
      </div>

      {/* Feed Content */}
      <div className="space-y-4 p-4">
        {mockPosts.map((post) => (
          <div 
            key={post.id} 
            className="mobile-card p-4 animate-slide-up"
            data-testid={`post-${post.id}`}
          >
            {/* Post Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10 ring-2 ring-neon-purple/30">
                  <AvatarFallback className="bg-primary-gaming text-neon-purple text-sm font-bold">
                    {post.user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-sm">{post.user.username}</span>
                    {post.user.verified && (
                      <div className="w-4 h-4 bg-neon-cyan rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-text-secondary">
                    <span>{post.timestamp}</span>
                    <span>•</span>
                    <Badge variant="outline" className="text-xs border-neon-cyan/30 text-neon-cyan">
                      {post.game}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-text-secondary hover:text-neon-purple">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <p className="text-sm leading-relaxed mb-3">{post.content}</p>
              
              {/* Media Thumbnail */}
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 h-48 flex items-center justify-center border border-secondary/20">
                <div className="text-6xl">{post.media.thumbnail}</div>
                {post.trending && (
                  <Badge className="absolute top-3 right-3 bg-neon-red/20 text-neon-red border-neon-red/30">
                    <Zap className="w-3 h-3 mr-1" />
                    Trending
                  </Badge>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <span className="text-xs text-white/80 capitalize">{post.media.type}</span>
                </div>
              </div>
            </div>

            {/* Reaction Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => handleReaction(post.id)}
                  className={`flex items-center space-x-2 transition-all duration-200 active:scale-95 ${
                    reactions[post.id] ? 'text-neon-red' : 'text-text-secondary hover:text-neon-red'
                  }`}
                  data-testid={`like-${post.id}`}
                >
                  <Heart className={`w-5 h-5 ${reactions[post.id] ? 'fill-current' : ''}`} />
                  <span className="text-sm font-medium">
                    {reactions[post.id] ? post.reactions.likes + 1 : post.reactions.likes}
                  </span>
                </button>
                
                <button className="flex items-center space-x-2 text-text-secondary hover:text-neon-cyan transition-colors active:scale-95">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{post.reactions.comments}</span>
                </button>
                
                <button className="flex items-center space-x-2 text-text-secondary hover:text-neon-purple transition-colors active:scale-95">
                  <Share className="w-5 h-5" />
                  <span className="text-sm font-medium">{post.reactions.shares}</span>
                </button>
              </div>
              
              <Button 
                size="sm" 
                className="bg-neon-purple/20 hover:bg-neon-purple/30 text-neon-purple border border-neon-purple/30 mobile-button"
              >
                Join Game
              </Button>
            </div>
          </div>
        ))}
      </div>

      <MobileBottomNav />
    </div>
  );
}