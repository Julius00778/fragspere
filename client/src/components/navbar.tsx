import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Gamepad2, 
  User, 
  Settings, 
  LogOut,
  Home,
  Users,
  MessageCircle 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Navbar() {
  const [location] = useLocation();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'Signed out',
      description: 'You have been successfully signed out.',
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const navItems = [
    { path: '/dashboard', label: 'Feed', icon: Home },
    { path: '/communities', label: 'Communities', icon: Users },
    { path: '/chat', label: 'Chat', icon: MessageCircle },
  ];

  return (
    <nav className="bg-card-bg backdrop-blur-md border-b border-secondary/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/dashboard">
            <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center">
                <Gamepad2 className="text-white w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-text-primary">GamerHub</span>
            </div>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant="ghost"
                    className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                      isActive 
                        ? 'text-accent bg-accent/10' 
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    data-testid={`nav-${item.path.slice(1)}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 p-2 hover:bg-primary/50"
                  data-testid="button-user-menu"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-accent text-sm">
                      {getInitials(
                        user?.user_metadata?.first_name + ' ' + user?.user_metadata?.last_name || 
                        user?.email || 'U'
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-text-primary">
                      {user?.user_metadata?.username || user?.email}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {user?.user_metadata?.favorite_game || 'Gamer'}
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent 
                align="end" 
                className="w-56 bg-primary border-secondary/30"
              >
                <div className="px-2 py-1.5">
                  <div className="text-sm font-medium text-text-primary">
                    {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {user?.email}
                  </div>
                </div>
                
                <DropdownMenuSeparator className="bg-secondary/30" />
                
                <Link href="/profile">
                  <DropdownMenuItem className="cursor-pointer hover:bg-accent/10 focus:bg-accent/10">
                    <User className="w-4 h-4 mr-2" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                
                <DropdownMenuItem className="cursor-pointer hover:bg-accent/10 focus:bg-accent/10">
                  <Settings className="w-4 h-4 mr-2" />
                  <span>Settings</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="bg-secondary/30" />
                
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-error/10 focus:bg-error/10 text-error focus:text-error"
                  onClick={handleSignOut}
                  data-testid="button-signout-dropdown"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
