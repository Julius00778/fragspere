import { useState } from 'react';
import { MobileBottomNav } from '@/components/mobile-bottom-nav';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Send, 
  Mic, 
  Sparkles,
  Gamepad2,
  Trophy,
  Zap
} from 'lucide-react';

const aiMessages = [
  {
    id: '1',
    type: 'ai',
    content: 'Yo gamer! 🎮 Ready to dominate today? I saw your last Valorant match - that clutch was absolutely FIRE! 🔥',
    timestamp: '2 min ago',
    reactions: ['🔥', '💯']
  },
  {
    id: '2', 
    type: 'user',
    content: 'Thanks! Any tips for ranking up faster?',
    timestamp: '1 min ago'
  },
  {
    id: '3',
    type: 'ai',
    content: 'Bet! Here\'s the real tea ☕:\n\n• Focus on crosshair placement (ez headshots)\n• Play with your squad (solo queue = pain)\n• Practice aim daily (15 mins minimum)\n• Watch your minimap (game sense > aim)\n\nTrust the process, you\'ll hit Diamond soon! 💎',
    timestamp: 'just now',
    reactions: ['🎯', '💎', '🚀']
  }
];

const quickActions = [
  { label: 'Find Teammates', icon: '👥', color: 'neon-cyan' },
  { label: 'Game Tips', icon: '🎯', color: 'neon-purple' },
  { label: 'Tournament Info', icon: '🏆', color: 'neon-red' },
  { label: 'Meta Updates', icon: '⚡', color: 'neon-green' }
];

export default function MobileAI() {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card-bg backdrop-blur-md border-b border-secondary/20 p-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="w-12 h-12 ring-2 ring-neon-purple/50">
              <AvatarFallback className="bg-gradient-to-br from-neon-purple to-neon-cyan text-white font-bold">
                <Bot className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-neon-green rounded-full border-2 border-bg-dark animate-neon-flicker"></div>
          </div>
          <div>
            <h1 className="text-lg font-bold">GameBot AI</h1>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
              <span className="text-xs text-neon-green">Online & Ready to slay!</span>
            </div>
          </div>
          <div className="flex-1"></div>
          <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Pro
          </Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-secondary/20">
        <p className="text-sm text-text-secondary mb-3">Quick Actions</p>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="mobile-card p-3 flex items-center space-x-3 hover:bg-secondary/20 transition-all active:scale-95"
              data-testid={`quick-action-${index}`}
            >
              <span className="text-xl">{action.icon}</span>
              <span className={`text-sm font-medium ${action.color}`}>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-4">
        {aiMessages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
          >
            <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
              {msg.type === 'ai' && (
                <div className="flex items-center space-x-2 mb-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-neon-purple text-white text-xs">
                      <Bot className="w-3 h-3" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-text-secondary">GameBot</span>
                </div>
              )}
              
              <div 
                className={`p-3 rounded-2xl ${
                  msg.type === 'user' 
                    ? 'bg-neon-purple text-white ml-8' 
                    : 'bg-card-bg border border-secondary/20'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs opacity-60">{msg.timestamp}</span>
                  {msg.reactions && (
                    <div className="flex space-x-1">
                      {msg.reactions.map((reaction, i) => (
                        <span key={i} className="text-sm">{reaction}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="sticky bottom-20 p-4 bg-card-bg backdrop-blur-md border-t border-secondary/20">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask anything about gaming..."
              className="mobile-input pr-12 focus:ring-2 focus:ring-neon-purple/50 focus:border-neon-purple"
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              data-testid="ai-chat-input"
            />
            <Button
              size="sm"
              variant="ghost"
              className={`absolute right-2 top-1/2 -translate-y-1/2 ${
                isRecording ? 'text-neon-red animate-pulse' : 'text-text-secondary hover:text-neon-cyan'
              }`}
              onClick={() => setIsRecording(!isRecording)}
              data-testid="voice-input-button"
            >
              <Mic className="w-4 h-4" />
            </Button>
          </div>
          
          <Button 
            onClick={handleSend}
            disabled={!message.trim()}
            className="w-12 h-12 rounded-full bg-neon-purple hover:bg-neon-purple/80 disabled:opacity-50 shadow-neon-purple"
            data-testid="send-message-button"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center justify-center mt-3 space-x-4">
          <button className="flex items-center space-x-2 text-xs text-text-secondary hover:text-neon-cyan transition-colors">
            <Gamepad2 className="w-4 h-4" />
            <span>Game Stats</span>
          </button>
          <button className="flex items-center space-x-2 text-xs text-text-secondary hover:text-neon-purple transition-colors">
            <Trophy className="w-4 h-4" />
            <span>Tournaments</span>
          </button>
          <button className="flex items-center space-x-2 text-xs text-text-secondary hover:text-neon-red transition-colors">
            <Zap className="w-4 h-4" />
            <span>Tips</span>
          </button>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}