import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/protected-route";
import NotFound from "@/pages/not-found";
import Auth from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import Profile from "@/pages/profile";
import MobileFeed from "@/pages/mobile-feed";
import MobileAI from "@/pages/mobile-ai";
import MobileTournament from "@/pages/mobile-tournament";
import MobileMarketplace from "@/pages/mobile-marketplace";
import MobileProfile from "@/pages/mobile-profile";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Auth} />
      <Route path="/dashboard">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/profile">
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      </Route>
      <Route path="/mobile/feed">
        <ProtectedRoute>
          <MobileFeed />
        </ProtectedRoute>
      </Route>
      <Route path="/mobile/ai">
        <ProtectedRoute>
          <MobileAI />
        </ProtectedRoute>
      </Route>
      <Route path="/mobile/tournament">
        <ProtectedRoute>
          <MobileTournament />
        </ProtectedRoute>
      </Route>
      <Route path="/mobile/marketplace">
        <ProtectedRoute>
          <MobileMarketplace />
        </ProtectedRoute>
      </Route>
      <Route path="/mobile/profile">
        <ProtectedRoute>
          <MobileProfile />
        </ProtectedRoute>
      </Route>
      <Route path="/mobile/search">
        <ProtectedRoute>
          <MobileFeed />
        </ProtectedRoute>
      </Route>
      <Route path="/mobile/messages">
        <ProtectedRoute>
          <MobileAI />
        </ProtectedRoute>
      </Route>
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
