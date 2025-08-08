import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, User, Gamepad2 } from 'lucide-react';
import { Link } from 'wouter';

const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  bio: z.string().max(300, 'Bio must be less than 300 characters').optional(),
  favoriteGame: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const games = [
  'Valorant',
  'League of Legends',
  'CS:GO',
  'Apex Legends',
  'Fortnite',
  'Minecraft',
  'Overwatch',
  'Call of Duty',
  'Rocket League',
  'Among Us',
  'Other'
];

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.user_metadata?.first_name || '',
      lastName: user?.user_metadata?.last_name || '',
      username: user?.user_metadata?.username || '',
      bio: user?.user_metadata?.bio || '',
      favoriteGame: user?.user_metadata?.favorite_game || '',
    },
  });

  const handleSave = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      // Mock profile update - would integrate with Supabase
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: 'Profile updated!',
        description: 'Your profile has been successfully updated.',
      });
    } catch (error) {
      toast({
        title: 'Update failed',
        description: 'There was an error updating your profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
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
      <header className="bg-card-bg backdrop-blur-md border-b border-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-text-secondary hover:text-text-primary"
                  data-testid="button-back"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center">
                <Gamepad2 className="text-white w-3 h-3" />
              </div>
              <span className="text-lg font-bold">GamerHub</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          
          {/* Page Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <p className="text-text-secondary">
              Manage your account settings and gaming preferences
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Profile Preview */}
            <div className="md:col-span-1">
              <Card className="bg-card-bg border-secondary/30 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <User className="w-5 h-5 text-accent" />
                    <span>Profile Preview</span>
                  </CardTitle>
                  <CardDescription>
                    This is how other gamers will see you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center space-y-4">
                    <Avatar className="w-20 h-20 mx-auto">
                      <AvatarFallback className="bg-primary text-accent text-2xl">
                        {getInitials(
                          (form.watch('firstName') || '') + ' ' + (form.watch('lastName') || '') || 
                          user?.email || 'U'
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-lg" data-testid="text-preview-name">
                        {form.watch('firstName') || 'First'} {form.watch('lastName') || 'Last'}
                      </h3>
                      <p className="text-text-secondary text-sm" data-testid="text-preview-username">
                        @{form.watch('username') || 'username'}
                      </p>
                    </div>
                  </div>

                  {form.watch('bio') && (
                    <div>
                      <h4 className="font-medium text-sm mb-2">Bio</h4>
                      <p className="text-text-secondary text-sm leading-relaxed" data-testid="text-preview-bio">
                        {form.watch('bio')}
                      </p>
                    </div>
                  )}

                  {form.watch('favoriteGame') && (
                    <div>
                      <h4 className="font-medium text-sm mb-2">Favorite Game</h4>
                      <div className="flex items-center space-x-2">
                        <Gamepad2 className="w-4 h-4 text-accent" />
                        <span className="text-sm" data-testid="text-preview-game">
                          {form.watch('favoriteGame')}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-secondary/30">
                    <div className="text-center">
                      <div className="text-lg font-bold text-accent">24</div>
                      <div className="text-xs text-text-secondary">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-success">156</div>
                      <div className="text-xs text-text-secondary">Following</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Form */}
            <div className="md:col-span-2">
              <Card className="bg-card-bg border-secondary/30">
                <CardHeader>
                  <CardTitle className="text-xl">Edit Profile</CardTitle>
                  <CardDescription>
                    Update your personal information and gaming preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
                    
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b border-secondary/30 pb-2">
                        Basic Information
                      </h3>
                      
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-text-secondary">
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            {...form.register('firstName')}
                            className="bg-primary border-secondary/30 focus:border-accent focus:ring-2 focus:ring-accent/20"
                            placeholder="Enter your first name"
                            data-testid="input-edit-firstname"
                          />
                          {form.formState.errors.firstName && (
                            <p className="text-xs text-error">
                              {form.formState.errors.firstName.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-text-secondary">
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            {...form.register('lastName')}
                            className="bg-primary border-secondary/30 focus:border-accent focus:ring-2 focus:ring-accent/20"
                            placeholder="Enter your last name"
                            data-testid="input-edit-lastname"
                          />
                          {form.formState.errors.lastName && (
                            <p className="text-xs text-error">
                              {form.formState.errors.lastName.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="username" className="text-text-secondary">
                          Username
                        </Label>
                        <Input
                          id="username"
                          {...form.register('username')}
                          className="bg-primary border-secondary/30 focus:border-accent focus:ring-2 focus:ring-accent/20"
                          placeholder="Choose a unique username"
                          data-testid="input-edit-username"
                        />
                        {form.formState.errors.username && (
                          <p className="text-xs text-error">
                            {form.formState.errors.username.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-text-secondary">
                          Bio
                        </Label>
                        <Textarea
                          id="bio"
                          {...form.register('bio')}
                          className="bg-primary border-secondary/30 focus:border-accent focus:ring-2 focus:ring-accent/20 min-h-[100px] resize-none"
                          placeholder="Tell other gamers about yourself..."
                          data-testid="textarea-edit-bio"
                        />
                        <div className="flex justify-between">
                          {form.formState.errors.bio && (
                            <p className="text-xs text-error">
                              {form.formState.errors.bio.message}
                            </p>
                          )}
                          <p className="text-xs text-text-secondary ml-auto">
                            {form.watch('bio')?.length || 0}/300
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Gaming Preferences */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b border-secondary/30 pb-2">
                        Gaming Preferences
                      </h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="favoriteGame" className="text-text-secondary">
                          Favorite Game
                        </Label>
                        <Select 
                          onValueChange={(value) => form.setValue('favoriteGame', value)}
                          defaultValue={form.getValues('favoriteGame')}
                        >
                          <SelectTrigger 
                            className="bg-primary border-secondary/30 focus:border-accent"
                            data-testid="select-edit-game"
                          >
                            <SelectValue placeholder="Select your favorite game" />
                          </SelectTrigger>
                          <SelectContent className="bg-primary border-secondary/30">
                            {games.map((game) => (
                              <SelectItem key={game} value={game.toLowerCase()}>
                                {game}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Account Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b border-secondary/30 pb-2">
                        Account Information
                      </h3>
                      
                      <div className="space-y-2">
                        <Label className="text-text-secondary">Email Address</Label>
                        <Input
                          value={user?.email || ''}
                          disabled
                          className="bg-primary/50 border-secondary/30 text-text-secondary cursor-not-allowed"
                          data-testid="input-email-readonly"
                        />
                        <p className="text-xs text-text-secondary">
                          Contact support to change your email address
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-secondary/30">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-secondary/30 hover:border-text-secondary"
                        onClick={() => form.reset()}
                        data-testid="button-reset-form"
                      >
                        Reset Changes
                      </Button>
                      
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-gradient-to-r from-accent to-success hover:shadow-glow min-w-[120px]"
                        data-testid="button-save-profile"
                      >
                        {isLoading ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
