import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser, getUserInitials, useUserProfilePhotoUrl } from '@/hooks/use-user';
import { useTranslations } from '@/lib/i18n';
import { Bell, Settings, LogOut, User, ChevronDown } from 'lucide-react';
import { useLocation } from 'wouter';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
}

export default function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const t = useTranslations();
  const [, setLocation] = useLocation();
  const { data: user } = useUser();
  const profilePhotoUrl = useUserProfilePhotoUrl();

  const handleLogout = () => {
    setLocation('/');
  };

  return (
    <div className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-[#E2E8F0] shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger data-testid="button-sidebar-toggle" />
          <div>
            {title && (
              <h1 className="text-lg md:text-xl font-semibold text-[#1E293B] dark:text-white" data-testid="text-dashboard-title">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-sm text-[#64748B] dark:text-slate-400">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full hover-elevate"
            data-testid="button-notifications"
          >
            <Bell className="h-5 w-5 text-[#64748B]" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
            >
              3
            </Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 hover-elevate rounded-full px-2"
                data-testid="button-user-menu"
              >
                <Avatar className="h-9 w-9 border-2 border-[#2563EB]">
                  {profilePhotoUrl ? (
                    <AvatarImage src={profilePhotoUrl} alt={user?.fullName || 'User'} />
                  ) : null}
                  <AvatarFallback className="bg-[#2563EB] text-white font-semibold">
                    {user ? getUserInitials(user.fullName) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-[#1E293B] dark:text-white">
                    {user?.fullName || 'User'}
                  </p>
                  <p className="text-xs text-[#64748B] dark:text-slate-400">
                    {user?.accountType === 'business' ? 'Business' : 'Personal'}
                  </p>
                </div>
                <ChevronDown className="h-4 w-4 text-[#64748B]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>
                  <p className="font-medium">{user?.fullName}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setLocation('/profile')}
                data-testid="button-profile"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLocation('/settings')}
                data-testid="button-settings"
              >
                <Settings className="mr-2 h-4 w-4" />
                {t.nav.settings}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive focus:text-destructive"
                data-testid="button-logout-dropdown"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {t.nav.logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
