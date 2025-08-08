import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useToast } from '@/hooks/use-toast';
import { 
  Gamepad2, 
  Users, 
  MessageCircle, 
  TrendingUp, 
  Plus,
  Heart,
  Share,
  Bookmark
} from 'lucide-react';

// Mock data for development
const mockGames = [
  { id: '1', name: 'Valorant', icon: '🎮', players: '15.2M' },
  { id: '2', name: 'League of Legends', icon: '⚔️', players: '12.8M' },
  { id: '3', name: 'CS:GO', icon: '🔫', players: '8.9M' },
  { id: '4', name: 'Apex Legends', icon: '🏆', players: '6.7M' },
];

const mockPosts = [
  {
    id: '1',
    user: { username: 'ProGamer123', avatar: null },
    game: 'Valorant',
    content: 'Just hit Radiant for the first time! The grind was worth it. Tips for anyone trying to rank up: focus on your crosshair placement and communication.',
    timestamp: '2 hours ago',
    likes: 45,
    comments: 12
  },
  {
    id: '2',
    user: { username: 'StrategyMaster', avatar: null },
    game: 'League of Legends',
    content: 'New patch is looking interesting. The jungle changes are going to shake up the meta significantly. What are your thoughts on the dragon buffs?',
    timestamp: '4 hours ago',
    likes: 23,
    comments: 8
  },
  {
    id: '3',
    user: { username: 'CasualGamer', avatar: null },
    game: 'Minecraft',
    content: 'Built my first redstone computer today! It can do basic calculations. Took me 3 weeks but totally worth the learning experience.',
    timestamp: '6 hours ago',
    likes: 67,
    comments: 15
  }
];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('feed');
  const [newPost, setNewPost] = useState('');
  const [selectedGame, setSelectedGame] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'Signed out',
      description: 'You have been successfully signed out.',
    });
  };

  const handlePost = async () => {
    if (!newPost.trim()) return;
    
    setIsPosting(true);
    try {
      // Mock post creation - would integrate with backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Post created!',
        description: 'Your post has been shared with the community.',
      });
      
      setNewPost('');
      setSelectedGame('');
    } finally {
      setIsPosting(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary">
      {/* Header */}
      <header className="bg-card-bg backdrop-blur-md border-b border-secondary/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center">
                  <Gamepad2 className="text-white w-4 h-4" />
                </div>
                <span className="text-xl font-bold">GamerHub</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-accent">
                    {getInitials(user?.user_metadata?.first_name + ' ' + user?.user_metadata?.last_name || user?.email || 'U')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium" data-testid="text-username">
                  {user?.user_metadata?.username || user?.email}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="border-secondary/30 hover:border-error/50 text-text-secondary hover:text-error"
                data-testid="button-signout"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* User Profile Card */}
            <Card className="bg-card-bg border-secondary/30">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary text-accent text-lg">
                      {getInitials(user?.user_metadata?.first_name + ' ' + user?.user_metadata?.last_name || user?.email || 'U')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg" data-testid="text-profile-name">
                      {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
                    </CardTitle>
                    <CardDescription className="text-text-secondary">
                      @{user?.user_metadata?.username || 'gamer'}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {user?.user_metadata?.favorite_game && (
                    <div className="flex items-center space-x-2">
                      <Gamepad2 className="w-4 h-4 text-accent" />
                      <span className="text-sm" data-testid="text-favorite-game">
                        {user.user_metadata.favorite_game}
                      </span>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="text-center">
                      <div className="text-lg font-bold text-accent" data-testid="text-posts-count">24</div>
                      <div className="text-xs text-text-secondary">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-success" data-testid="text-following-count">156</div>
                      <div className="text-xs text-text-secondary">Following</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Popular Games */}
            <Card className="bg-card-bg border-secondary/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <span>Popular Games</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockGames.map((game) => (
                    <div key={game.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/50 transition-colors cursor-pointer" data-testid={`game-${game.id}`}>
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{game.icon}</span>
                        <div>
                          <div className="font-medium text-sm">{game.name}</div>
                          <div className="text-xs text-text-secondary">{game.players} players</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-3 bg-primary border border-secondary/30">
                <TabsTrigger value="feed" className="data-[state=active]:bg-accent" data-testid="tab-feed">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Feed
                </TabsTrigger>
                <TabsTrigger value="communities" className="data-[state=active]:bg-accent" data-testid="tab-communities">
                  <Users className="w-4 h-4 mr-2" />
                  Communities
                </TabsTrigger>
                <TabsTrigger value="profile" className="data-[state=active]:bg-accent" data-testid="tab-profile">
                  <Gamepad2 className="w-4 h-4 mr-2" />
                  Profile
                </TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="space-y-6">
                {/* Create Post */}
                <Card className="bg-card-bg border-secondary/30">
                  <CardHeader>
                    <CardTitle className="text-lg">Share with the community</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="What's happening in your gaming world?"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="bg-primary border-secondary/30 focus:border-accent min-h-[100px] resize-none"
                      data-testid="textarea-new-post"
                    />
                    <div className="flex items-center justify-between">
                      <select
                        value={selectedGame}
                        onChange={(e) => setSelectedGame(e.target.value)}
                        className="bg-primary border border-secondary/30 rounded-lg px-3 py-2 text-sm focus:border-accent outline-none"
                        data-testid="select-post-game"
                      >
                        <option value="">Select a game (optional)</option>
                        {mockGames.map((game) => (
                          <option key={game.id} value={game.name}>{game.name}</option>
                        ))}
                      </select>
                      <Button
                        onClick={handlePost}
                        disabled={!newPost.trim() || isPosting}
                        className="bg-gradient-to-r from-accent to-success hover:shadow-glow"
                        data-testid="button-create-post"
                      >
                        {isPosting ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          <>
                            <Plus className="w-4 h-4 mr-2" />
                            Post
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Posts Feed */}
                <div className="space-y-4">
                  {mockPosts.map((post) => (
                    <Card key={post.id} className="bg-card-bg border-secondary/30 hover:border-accent/30 transition-colors" data-testid={`post-${post.id}`}>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {/* Post Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-primary text-accent text-sm">
                                  {getInitials(post.user.username)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-sm" data-testid={`post-${post.id}-username`}>
                                  {post.user.username}
                                </div>
                                <div className="text-xs text-text-secondary">
                                  {post.timestamp} • {post.game}
                                </div>
                              </div>
                            </div>
                            <Badge variant="outline" className="border-accent/30 text-accent">
                              {post.game}
                            </Badge>
                          </div>

                          {/* Post Content */}
                          <div className="text-sm text-text-primary leading-relaxed" data-testid={`post-${post.id}-content`}>
                            {post.content}
                          </div>

                          {/* Post Actions */}
                          <div className="flex items-center space-x-6 pt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-text-secondary hover:text-error p-0 h-auto"
                              data-testid={`button-like-${post.id}`}
                            >
                              <Heart className="w-4 h-4 mr-2" />
                              <span className="text-xs">{post.likes}</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-text-secondary hover:text-accent p-0 h-auto"
                              data-testid={`button-comment-${post.id}`}
                            >
                              <MessageCircle className="w-4 h-4 mr-2" />
                              <span className="text-xs">{post.comments}</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-text-secondary hover:text-success p-0 h-auto"
                              data-testid={`button-share-${post.id}`}
                            >
                              <Share className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-text-secondary hover:text-warning p-0 h-auto"
                              data-testid={`button-bookmark-${post.id}`}
                            >
                              <Bookmark className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="communities" className="space-y-6">
                <Card className="bg-card-bg border-secondary/30">
                  <CardContent className="p-8 text-center">
                    <Users className="w-12 h-12 text-accent mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Game Communities</h3>
                    <p className="text-text-secondary mb-6">
                      Join game-specific communities to connect with players who share your interests.
                    </p>
                    <Button className="bg-gradient-to-r from-accent to-success hover:shadow-glow" data-testid="button-explore-communities">
                      Explore Communities
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="profile" className="space-y-6">
                <Card className="bg-card-bg border-secondary/30">
                  <CardContent className="p-8 text-center">
                    <Gamepad2 className="w-12 h-12 text-accent mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Profile Settings</h3>
                    <p className="text-text-secondary mb-6">
                      Customize your profile, manage your game preferences, and update your bio.
                    </p>
                    <Button className="bg-gradient-to-r from-accent to-success hover:shadow-glow" data-testid="button-edit-profile">
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
