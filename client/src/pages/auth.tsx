import { useState } from 'react';
import { useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Gamepad2, Users, Bot } from 'lucide-react';

const signUpSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  favoriteGame: z.string().optional(),
  terms: z.boolean().refine(val => val, 'You must accept the terms'),
});

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional(),
});

type SignUpFormData = z.infer<typeof signUpSchema>;
type SignInFormData = z.infer<typeof signInSchema>;

export default function Auth() {
  const [, setLocation] = useLocation();
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, signIn, signInWithProvider } = useAuth();
  const { toast } = useToast();

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      favoriteGame: '',
      terms: false,
    },
  });

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const handleSignUp = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      const { error } = await signUp(data.email, data.password, {
        first_name: data.firstName,
        last_name: data.lastName,
        username: data.username,
        favorite_game: data.favoriteGame,
      });

      if (error) {
        toast({
          title: 'Sign up failed',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Account created!',
          description: 'Please check your email to verify your account.',
        });
        setLocation('/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (data: SignInFormData) => {
    setIsLoading(true);
    try {
      const { error } = await signIn(data.email, data.password);

      if (error) {
        toast({
          title: 'Sign in failed',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Welcome back!',
          description: 'You have successfully signed in.',
        });
        setLocation('/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'discord') => {
    const { error } = await signInWithProvider(provider);
    if (error) {
      toast({
        title: 'Social login failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary font-gaming overflow-x-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-20 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-bg-dark"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-success rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-warning rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-card-bg backdrop-blur-md border-b border-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center">
                  <Gamepad2 className="text-white w-4 h-4" />
                </div>
                <span className="text-xl font-bold text-text-primary">GamerHub</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-text-secondary hover:text-text-primary"
                onClick={() => setIsSignUp(false)}
                data-testid="button-signin-nav"
              >
                Sign In
              </Button>
              <Button
                className="bg-gradient-to-r from-accent to-success hover:shadow-glow"
                onClick={() => setIsSignUp(true)}
                data-testid="button-signup-nav"
              >
                Join Now
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Section - Welcome Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Join the Ultimate
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-success">
                  {' '}Gaming Community
                </span>
              </h1>
              <p className="text-lg text-text-secondary max-w-lg mx-auto lg:mx-0">
                Connect with fellow gamers, share your achievements, discover new games, and level up your gaming experience with AI-powered recommendations.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
              <Card className="bg-card-bg backdrop-blur-md border border-secondary/30 hover:border-accent/50 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                      <Users className="text-accent w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Game Communities</h3>
                      <p className="text-xs text-text-secondary">Join game-specific discussions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card-bg backdrop-blur-md border border-secondary/30 hover:border-success/50 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                      <Bot className="text-success w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">AI Assistant</h3>
                      <p className="text-xs text-text-secondary">Personalized game recommendations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Community Stats */}
            <div className="flex items-center justify-center lg:justify-start space-x-8 text-center">
              <div>
                <div className="text-2xl font-bold text-accent" data-testid="stats-gamers">50K+</div>
                <div className="text-sm text-text-secondary">Active Gamers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success" data-testid="stats-games">500+</div>
                <div className="text-sm text-text-secondary">Games Supported</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning" data-testid="stats-posts">10K+</div>
                <div className="text-sm text-text-secondary">Daily Posts</div>
              </div>
            </div>
          </div>

          {/* Right Section - Auth Forms */}
          <div className="w-full max-w-md mx-auto">
            <Card className="bg-card-bg backdrop-blur-md border border-secondary/30 shadow-2xl">
              <CardContent className="p-8">
                
                {/* Form Toggle Buttons */}
                <div className="flex bg-primary rounded-xl p-1 mb-6" role="tablist">
                  <Button
                    variant="ghost"
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isSignUp 
                        ? 'bg-accent text-white shadow-sm' 
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    onClick={() => setIsSignUp(true)}
                    data-testid="tab-signup"
                  >
                    Sign Up
                  </Button>
                  <Button
                    variant="ghost"
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
                      !isSignUp 
                        ? 'bg-accent text-white shadow-sm' 
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                    onClick={() => setIsSignUp(false)}
                    data-testid="tab-signin"
                  >
                    Sign In
                  </Button>
                </div>

                {isSignUp ? (
                  // Sign Up Form
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl font-bold">Create Your Account</h2>
                      <p className="text-text-secondary text-sm">Join thousands of gamers worldwide</p>
                    </div>

                    <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label htmlFor="firstName" className="text-text-secondary">First Name</Label>
                          <Input
                            id="firstName"
                            {...signUpForm.register('firstName')}
                            className="bg-primary border-secondary/30 focus:border-accent focus:ring-2 focus:ring-accent/20 text-text-primary placeholder-text-secondary/50"
                            placeholder="John"
                            data-testid="input-firstname"
                          />
                          {signUpForm.formState.errors.firstName && (
                            <p className="text-xs text-error">{signUpForm.formState.errors.firstName.message}</p>
                          )}
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="lastName" className="text-text-secondary">Last Name</Label>
                          <Input
                            id="lastName"
                            {...signUpForm.register('lastName')}
                            className="bg-primary border-secondary/30 focus:border-accent focus:ring-2 focus:ring-accent/20 text-text-primary placeholder-text-secondary/50"
                            placeholder="Doe"
                            data-testid="input-lastname"
                          />
                          {signUpForm.formState.errors.lastName && (
                            <p className="text-xs text-error">{signUpForm.formState.errors.lastName.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="username" className="text-text-secondary">Gamer Tag</Label>
                        <Input
                          id="username"
                          {...signUpForm.register('username')}
                          className="bg-primary border-secondary/30 focus:border-accent focus:ring-2 focus:ring-accent/20 text-text-primary placeholder-text-secondary/50"
                          placeholder="ProGamer123"
                          data-testid="input-username"
                        />
                        {signUpForm.formState.errors.username && (
                          <p className="text-xs text-error">{signUpForm.formState.errors.username.message}</p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="email" className="text-text-secondary">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          {...signUpForm.register('email')}
                          className="bg-primary border-secondary/30 focus:border-accent focus:ring-2 focus:ring-accent/20 text-text-primary placeholder-text-secondary/50"
                          placeholder="john@example.com"
                          data-testid="input-email"
                        />
                        {signUpForm.formState.errors.email && (
                          <p className="text-xs text-error">{signUpForm.formState.errors.email.message}</p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="password" className="text-text-secondary">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            {...signUpForm.register('password')}
                            className="bg-primary border-secondary/30 focus:border-accent focus:ring-2 focus:ring-accent/20 text-text-primary placeholder-text-secondary/50 pr-12"
                            placeholder="••••••••"
                            data-testid="input-password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary"
                            onClick={() => setShowPassword(!showPassword)}
                            data-testid="button-toggle-password"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        {signUpForm.formState.errors.password && (
                          <p className="text-xs text-error">{signUpForm.formState.errors.password.message}</p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="favoriteGame" className="text-text-secondary">Favorite Game (Optional)</Label>
                        <Select onValueChange={(value) => signUpForm.setValue('favoriteGame', value)}>
                          <SelectTrigger className="bg-primary border-secondary/30 focus:border-accent text-text-primary" data-testid="select-game">
                            <SelectValue placeholder="Select a game..." />
                          </SelectTrigger>
                          <SelectContent className="bg-primary border-secondary/30">
                            <SelectItem value="valorant">Valorant</SelectItem>
                            <SelectItem value="lol">League of Legends</SelectItem>
                            <SelectItem value="csgo">CS:GO</SelectItem>
                            <SelectItem value="apex">Apex Legends</SelectItem>
                            <SelectItem value="fortnite">Fortnite</SelectItem>
                            <SelectItem value="minecraft">Minecraft</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          {...signUpForm.register('terms')}
                          className="border-secondary/30 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                          data-testid="checkbox-terms"
                        />
                        <Label htmlFor="terms" className="text-sm text-text-secondary cursor-pointer">
                          I agree to the <span className="text-accent hover:text-accent/80">Terms of Service</span> and{' '}
                          <span className="text-accent hover:text-accent/80">Privacy Policy</span>
                        </Label>
                      </div>
                      {signUpForm.formState.errors.terms && (
                        <p className="text-xs text-error">{signUpForm.formState.errors.terms.message}</p>
                      )}

                      <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-accent to-success text-white font-semibold hover:shadow-glow transform hover:scale-105 transition-all duration-300"
                        data-testid="button-signup-submit"
                      >
                        {isLoading ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          <span className="flex items-center justify-center space-x-2">
                            <Gamepad2 className="w-4 h-4" />
                            <span>Start Gaming</span>
                          </span>
                        )}
                      </Button>
                    </form>

                    {/* Social Login */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-secondary/30"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-card-bg text-text-secondary">Or continue with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        variant="outline"
                        className="border-secondary/30 hover:border-accent/50 bg-transparent"
                        onClick={() => handleSocialLogin('google')}
                        data-testid="button-google-signup"
                      >
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                          <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#4285F4" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span className="text-sm font-medium">Google</span>
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-secondary/30 hover:border-accent/50 bg-transparent"
                        onClick={() => handleSocialLogin('discord')}
                        data-testid="button-discord-signup"
                      >
                        <svg className="w-4 h-4 mr-2 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0188 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z"/>
                        </svg>
                        <span className="text-sm font-medium">Discord</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  // Sign In Form
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl font-bold">Welcome Back</h2>
                      <p className="text-text-secondary text-sm">Sign in to continue your gaming journey</p>
                    </div>

                    <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
                      <div className="space-y-1">
                        <Label htmlFor="loginEmail" className="text-text-secondary">Email</Label>
                        <Input
                          id="loginEmail"
                          type="email"
                          {...signInForm.register('email')}
                          className="bg-primary border-secondary/30 focus:border-accent focus:ring-2 focus:ring-accent/20 text-text-primary placeholder-text-secondary/50"
                          placeholder="john@example.com"
                          data-testid="input-signin-email"
                        />
                        {signInForm.formState.errors.email && (
                          <p className="text-xs text-error">{signInForm.formState.errors.email.message}</p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="loginPassword" className="text-text-secondary">Password</Label>
                        <div className="relative">
                          <Input
                            id="loginPassword"
                            type={showPassword ? 'text' : 'password'}
                            {...signInForm.register('password')}
                            className="bg-primary border-secondary/30 focus:border-accent focus:ring-2 focus:ring-accent/20 text-text-primary placeholder-text-secondary/50 pr-12"
                            placeholder="••••••••"
                            data-testid="input-signin-password"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary"
                            onClick={() => setShowPassword(!showPassword)}
                            data-testid="button-toggle-signin-password"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        {signInForm.formState.errors.password && (
                          <p className="text-xs text-error">{signInForm.formState.errors.password.message}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="remember"
                            {...signInForm.register('remember')}
                            className="border-secondary/30 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                            data-testid="checkbox-remember"
                          />
                          <Label htmlFor="remember" className="text-sm text-text-secondary cursor-pointer">
                            Remember me
                          </Label>
                        </div>
                        <div className="text-sm">
                          <a href="#" className="text-accent hover:text-accent/80" data-testid="link-forgot-password">
                            Forgot password?
                          </a>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-accent to-success text-white font-semibold hover:shadow-glow transform hover:scale-105 transition-all duration-300"
                        data-testid="button-signin-submit"
                      >
                        {isLoading ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          <span className="flex items-center justify-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            <span>Sign In</span>
                          </span>
                        )}
                      </Button>
                    </form>

                    {/* Social Login */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-secondary/30"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-card-bg text-text-secondary">Or continue with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        variant="outline"
                        className="border-secondary/30 hover:border-accent/50 bg-transparent"
                        onClick={() => handleSocialLogin('google')}
                        data-testid="button-google-signin"
                      >
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                          <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#4285F4" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span className="text-sm font-medium">Google</span>
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-secondary/30 hover:border-accent/50 bg-transparent"
                        onClick={() => handleSocialLogin('discord')}
                        data-testid="button-discord-signin"
                      >
                        <svg className="w-4 h-4 mr-2 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0188 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z"/>
                        </svg>
                        <span className="text-sm font-medium">Discord</span>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-card-bg backdrop-blur-md border-t border-secondary/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center">
                <Gamepad2 className="text-white w-3 h-3" />
              </div>
              <span className="text-lg font-bold text-text-primary">GamerHub</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-text-secondary">
              <a href="#" className="hover:text-text-primary transition-colors" data-testid="link-privacy">Privacy</a>
              <a href="#" className="hover:text-text-primary transition-colors" data-testid="link-terms">Terms</a>
              <a href="#" className="hover:text-text-primary transition-colors" data-testid="link-support">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
