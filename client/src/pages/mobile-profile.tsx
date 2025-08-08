import { MobileBottomNav } from '@/components/mobile-bottom-nav';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Settings, 
  Trophy, 
  Target,
  TrendingUp,
  Crown,
  Star,
  Gamepad2,
  Users,
  Flame,
  Zap
} from 'lucide-react';

const userStats = {
  level: 42,
  xp: 8750,
  nextLevelXp: 10000,
  rank: 'Diamond II',
  winRate: 67,
  kd: 1.8,
  hoursPlayed: 247,
  achievements: 89
};

const gameStats = [
  {
    game: 'Valorant',
    rank: 'Diamond II',
    icon: '💎',
    matches: 156,
    winRate: 67,
    kd: 1.8,
    mainAgent: 'Jett',
    color: 'neon-red'
  },
  {
    game: 'CS:GO',
    rank: 'Global Elite',
    icon: '🌟',
    matches: 89,
    winRate: 72,
    kd: 2.1,
    mainAgent: 'AWPer',
    color: 'neon-cyan'
  },
  {
    game: 'BGMI',
    rank: 'Conqueror',
    icon: '👑',
    matches: 203,
    winRate: 58,
    kd: 2.3,
    mainAgent: 'Assault',
    color: 'neon-purple'
  }
];

const achievements = [
  { title: 'First Blood King', description: '100 First Bloods', icon: '⚡', rarity: 'epic' },
  { title: 'Clutch Master', description: '50 Clutch Wins', icon: '🔥', rarity: 'legendary' },
  { title: 'Headshot Machine', description: '1000 Headshots', icon: '🎯', rarity: 'rare' },
  { title: 'Team Player', description: '500 Assists', icon: '🤝', rarity: 'common' }
];

export default function MobileProfile() {
  const { user, signOut } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card-bg backdrop-blur-md border-b border-secondary/20 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Profile</h1>
          <Button 
            size="sm" 
            variant="outline"
            className="border-neon-purple/30 text-neon-purple hover:bg-neon-purple/20"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-4">
        <div className="mobile-card p-6 text-center space-y-4">
          <div className="relative">
            <Avatar className="w-24 h-24 mx-auto ring-4 ring-neon-purple/30">
              <AvatarFallback className="bg-gradient-to-br from-neon-purple to-neon-cyan text-white text-2xl font-bold">
                {getInitials(
                  (user?.user_metadata?.first_name + ' ' + user?.user_metadata?.last_name) || 
                  user?.email || 'GU'
                )}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
              <Badge className="bg-neon-purple text-white shadow-neon-purple">
                <Crown className="w-3 h-3 mr-1" />
                Level {userStats.level}
              </Badge>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold">
              {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
            </h2>
            <p className="text-text-secondary">@{user?.user_metadata?.username || 'gamer'}</p>
            <Badge className="mt-2 bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30">
              <Star className="w-3 h-3 mr-1" />
              {userStats.rank}
            </Badge>
          </div>

          {/* XP Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>XP Progress</span>
              <span>{userStats.xp}/{userStats.nextLevelXp}</span>
            </div>
            <Progress 
              value={(userStats.xp / userStats.nextLevelXp) * 100} 
              className="h-3 bg-primary-gaming"
            />
            <p className="text-xs text-text-secondary">
              {userStats.nextLevelXp - userStats.xp} XP to next level
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4">
        <div className="grid grid-cols-4 gap-3">
          <div className="mobile-card p-3 text-center">
            <Trophy className="w-5 h-5 mx-auto mb-1 neon-red" />
            <div className="text-sm font-bold">{userStats.winRate}%</div>
            <div className="text-xs text-text-secondary">Win Rate</div>
          </div>
          <div className="mobile-card p-3 text-center">
            <Target className="w-5 h-5 mx-auto mb-1 neon-cyan" />
            <div className="text-sm font-bold">{userStats.kd}</div>
            <div className="text-xs text-text-secondary">K/D</div>
          </div>
          <div className="mobile-card p-3 text-center">
            <Gamepad2 className="w-5 h-5 mx-auto mb-1 neon-purple" />
            <div className="text-sm font-bold">{userStats.hoursPlayed}h</div>
            <div className="text-xs text-text-secondary">Played</div>
          </div>
          <div className="mobile-card p-3 text-center">
            <Star className="w-5 h-5 mx-auto mb-1 neon-green" />
            <div className="text-sm font-bold">{userStats.achievements}</div>
            <div className="text-xs text-text-secondary">Achievements</div>
          </div>
        </div>
      </div>

      {/* Game Stats */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-3 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 neon-cyan" />
          Game Statistics
        </h3>
        <div className="space-y-3">
          {gameStats.map((game, index) => (
            <div key={index} className="mobile-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-gaming rounded-xl flex items-center justify-center text-lg">
                    {game.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{game.game}</h4>
                    <Badge className={`text-xs bg-${game.color}/20 text-${game.color} border-${game.color}/30`}>
                      {game.rank}
                    </Badge>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-secondary/30 text-text-secondary hover:text-neon-purple text-xs"
                >
                  View Details
                </Button>
              </div>
              
              <div className="grid grid-cols-4 gap-3 text-center">
                <div>
                  <div className="text-sm font-bold">{game.matches}</div>
                  <div className="text-xs text-text-secondary">Matches</div>
                </div>
                <div>
                  <div className="text-sm font-bold neon-green">{game.winRate}%</div>
                  <div className="text-xs text-text-secondary">Win Rate</div>
                </div>
                <div>
                  <div className="text-sm font-bold neon-cyan">{game.kd}</div>
                  <div className="text-xs text-text-secondary">K/D</div>
                </div>
                <div>
                  <div className="text-sm font-bold">{game.mainAgent}</div>
                  <div className="text-xs text-text-secondary">Main</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-3 flex items-center">
          <Trophy className="w-5 h-5 mr-2 neon-red" />
          Recent Achievements
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className={`mobile-card p-3 text-center space-y-2 ${
                achievement.rarity === 'legendary' ? 'ring-1 ring-neon-red/30 bg-neon-red/5' :
                achievement.rarity === 'epic' ? 'ring-1 ring-neon-purple/30 bg-neon-purple/5' :
                ''
              }`}
            >
              <div className="text-2xl">{achievement.icon}</div>
              <div>
                <div className="text-sm font-semibold">{achievement.title}</div>
                <div className="text-xs text-text-secondary">{achievement.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-4 space-y-3">
        <Button 
          className="w-full bg-neon-purple hover:bg-neon-purple/80 text-white mobile-button"
        >
          <Users className="w-4 h-4 mr-2" />
          Find Teammates
        </Button>
        <Button 
          variant="outline"
          className="w-full border-secondary/30 text-text-secondary hover:text-neon-red hover:border-neon-red/50"
          onClick={signOut}
        >
          Sign Out
        </Button>
      </div>

      <MobileBottomNav />
    </div>
  );
}