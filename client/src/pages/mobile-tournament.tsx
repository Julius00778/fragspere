import { useState } from 'react';
import { MobileBottomNav } from '@/components/mobile-bottom-nav';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Crown, 
  Zap,
  Clock,
  Users,
  Target,
  Star,
  Flame
} from 'lucide-react';

const tournamentData = {
  name: 'Valorant Championship Series',
  status: 'Semi-Finals',
  prize: '₹2,50,000',
  participants: 256,
  remaining: 4
};

const brackets = [
  {
    round: 'Semi-Final 1',
    team1: { name: 'Shadow Reapers', score: 13, avatar: '🔥' },
    team2: { name: 'Cyber Wolves', score: 11, avatar: '🐺' },
    status: 'live',
    viewers: '12.3K'
  },
  {
    round: 'Semi-Final 2', 
    team1: { name: 'Neon Knights', score: 8, avatar: '⚡' },
    team2: { name: 'Digital Demons', score: 6, avatar: '😈' },
    status: 'upcoming',
    startTime: '2h 30m'
  }
];

const leaderboard = [
  { rank: 1, name: 'Shadow_Reaper_X', kills: 247, kd: 2.1, points: 8940, trending: true },
  { rank: 2, name: 'CyberWolf_Alpha', kills: 231, kd: 1.9, points: 8720, trending: false },
  { rank: 3, name: 'Neon_Lightning', kills: 198, kd: 1.8, points: 8100, trending: true },
  { rank: 4, name: 'Digital_Phantom', kills: 187, kd: 1.7, points: 7890, trending: false }
];

export default function MobileTournament() {
  const [activeTab, setActiveTab] = useState<'brackets' | 'leaderboard'>('brackets');

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card-bg backdrop-blur-md border-b border-secondary/20 p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-red to-neon-purple rounded-xl flex items-center justify-center shadow-neon">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">{tournamentData.name}</h1>
                <Badge className="bg-neon-red/20 text-neon-red border-neon-red/30 text-xs">
                  <Flame className="w-3 h-3 mr-1" />
                  {tournamentData.status}
                </Badge>
              </div>
            </div>
            <Button 
              size="sm" 
              className="bg-neon-purple/20 hover:bg-neon-purple/30 text-neon-purple border border-neon-purple/30"
            >
              Watch Live
            </Button>
          </div>
          
          {/* Tournament Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="mobile-card p-3 text-center">
              <div className="text-lg font-bold neon-cyan">{tournamentData.prize}</div>
              <div className="text-xs text-text-secondary">Prize Pool</div>
            </div>
            <div className="mobile-card p-3 text-center">
              <div className="text-lg font-bold neon-purple">{tournamentData.participants}</div>
              <div className="text-xs text-text-secondary">Started</div>
            </div>
            <div className="mobile-card p-3 text-center">
              <div className="text-lg font-bold neon-red">{tournamentData.remaining}</div>
              <div className="text-xs text-text-secondary">Remaining</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="p-4">
        <div className="flex bg-primary-gaming rounded-xl p-1">
          <button
            onClick={() => setActiveTab('brackets')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === 'brackets' 
                ? 'bg-neon-purple text-white shadow-neon-purple' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
            data-testid="tab-brackets"
          >
            Brackets
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === 'leaderboard' 
                ? 'bg-neon-cyan text-white shadow-neon-cyan' 
                : 'text-text-secondary hover:text-text-primary'
            }`}
            data-testid="tab-leaderboard"
          >
            Leaderboard
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 space-y-4">
        {activeTab === 'brackets' ? (
          // Tournament Brackets
          <>
            {brackets.map((match, index) => (
              <div key={index} className="mobile-card p-4 animate-slide-up">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm">{match.round}</h3>
                  {match.status === 'live' ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-neon-red rounded-full animate-pulse"></div>
                      <span className="text-xs neon-red font-medium">LIVE</span>
                      <Badge variant="outline" className="border-neon-red/30 text-neon-red text-xs">
                        <Users className="w-3 h-3 mr-1" />
                        {match.viewers}
                      </Badge>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-text-secondary">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">{match.startTime}</span>
                    </div>
                  )}
                </div>

                {/* Teams */}
                <div className="space-y-3">
                  {/* Team 1 */}
                  <div className={`flex items-center justify-between p-3 rounded-xl border ${
                    match.team1.score > match.team2.score 
                      ? 'bg-neon-green/10 border-neon-green/30' 
                      : 'bg-secondary/20 border-secondary/30'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-gaming rounded-lg flex items-center justify-center text-lg">
                        {match.team1.avatar}
                      </div>
                      <span className="font-medium text-sm">{match.team1.name}</span>
                      {match.team1.score > match.team2.score && (
                        <Crown className="w-4 h-4 text-neon-green" />
                      )}
                    </div>
                    <div className={`text-xl font-bold ${
                      match.team1.score > match.team2.score ? 'neon-green' : 'text-text-secondary'
                    }`}>
                      {match.team1.score}
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="text-xs text-text-secondary bg-primary-gaming px-3 py-1 rounded-full">VS</span>
                  </div>

                  {/* Team 2 */}
                  <div className={`flex items-center justify-between p-3 rounded-xl border ${
                    match.team2.score > match.team1.score 
                      ? 'bg-neon-green/10 border-neon-green/30' 
                      : 'bg-secondary/20 border-secondary/30'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-gaming rounded-lg flex items-center justify-center text-lg">
                        {match.team2.avatar}
                      </div>
                      <span className="font-medium text-sm">{match.team2.name}</span>
                      {match.team2.score > match.team1.score && (
                        <Crown className="w-4 h-4 text-neon-green" />
                      )}
                    </div>
                    <div className={`text-xl font-bold ${
                      match.team2.score > match.team1.score ? 'neon-green' : 'text-text-secondary'
                    }`}>
                      {match.team2.score}
                    </div>
                  </div>
                </div>

                {match.status === 'live' && (
                  <div className="mt-4 pt-3 border-t border-secondary/20">
                    <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
                      <span>Round Progress</span>
                      <span>11/13</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          // Leaderboard
          <>
            {leaderboard.map((player, index) => (
              <div key={index} className="mobile-card p-4 animate-slide-up">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                    player.rank === 1 ? 'bg-neon-red text-white shadow-neon-red' :
                    player.rank === 2 ? 'bg-neon-cyan text-white shadow-neon-cyan' :
                    player.rank === 3 ? 'bg-neon-purple text-white shadow-neon-purple' :
                    'bg-primary-gaming text-text-secondary'
                  }`}>
                    {player.rank === 1 ? <Crown className="w-4 h-4" /> : player.rank}
                  </div>
                  
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary-gaming text-neon-purple font-bold text-sm">
                      {player.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-sm">{player.name}</span>
                      {player.trending && (
                        <Zap className="w-3 h-3 text-neon-red" />
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-text-secondary">
                      <span>{player.kills} kills</span>
                      <span>K/D {player.kd}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-bold neon-purple">{player.points}</div>
                    <div className="text-xs text-text-secondary">points</div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <MobileBottomNav />
    </div>
  );
}