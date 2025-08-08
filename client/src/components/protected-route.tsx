import { ReactNode } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Redirect } from 'wouter';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center" data-testid="loading-auth">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/" />;
  }

  return <>{children}</>;
}
