import { Switch, Route } from 'wouter';
import { queryClient } from './lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import NotFound from '@/pages/not-found';
import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import AppSidebar from '@/components/AppSidebar';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeToggle from '@/components/ThemeToggle';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/loans" component={Dashboard} />
      <Route path="/transfers" component={Dashboard} />
      <Route path="/history" component={Dashboard} />
      <Route path="/settings" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const style = {
    '--sidebar-width': '16rem',
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route>
            <SidebarProvider style={style as React.CSSProperties}>
              <div className="flex h-screen w-full">
                <AppSidebar />
                <div className="flex flex-col flex-1">
                  <header className="flex items-center justify-between p-4 border-b">
                    <SidebarTrigger data-testid="button-sidebar-toggle" />
                    <div className="flex gap-2">
                      <LanguageSwitcher />
                      <ThemeToggle />
                    </div>
                  </header>
                  <main className="flex-1 overflow-auto">
                    <Router />
                  </main>
                </div>
              </div>
            </SidebarProvider>
          </Route>
        </Switch>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
