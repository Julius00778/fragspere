import { Link, useLocation } from 'wouter';
import { Home, Search, Bot, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/mobile/feed', label: 'Feed', icon: Home },
  { path: '/mobile/search', label: 'Search', icon: Search },
  { path: '/mobile/ai', label: 'AI', icon: Bot },
  { path: '/mobile/messages', label: 'Messages', icon: MessageCircle },
  { path: '/mobile/profile', label: 'Profile', icon: User },
];

export function MobileBottomNav() {
  const [location] = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card-bg backdrop-blur-md border-t border-secondary/20">
      <div className="flex items-center justify-around h-20 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link key={item.path} href={item.path}>
              <button
                className={cn(
                  "flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-200 active:scale-95",
                  isActive 
                    ? "bg-neon-purple/20 shadow-neon-purple" 
                    : "hover:bg-secondary/30"
                )}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                <Icon 
                  className={cn(
                    "w-6 h-6 mb-1 transition-colors",
                    isActive ? "text-neon-purple" : "text-text-secondary"
                  )} 
                />
                <span 
                  className={cn(
                    "text-xs font-medium transition-colors",
                    isActive ? "text-neon-purple" : "text-text-secondary"
                  )}
                >
                  {item.label}
                </span>
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}