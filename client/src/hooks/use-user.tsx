import { useQuery } from '@tanstack/react-query';
import type { User } from '@shared/schema';
import { queryClient, getApiUrl } from '@/lib/queryClient';

export function useUser() {
  return useQuery<User>({
    queryKey: ['/api/user'],
    staleTime: 5 * 60 * 1000,
  });
}

export function useUserProfilePhotoUrl(): string | null {
  const { data: user } = useUser();
  
  if (!user?.profilePhoto) {
    return null;
  }

  const queryState = queryClient.getQueryState(['/api/user']);
  const timestamp = queryState?.dataUpdatedAt || Date.now();
  
  return `${getApiUrl(user.profilePhoto)}?t=${timestamp}`;
}

export function getUserInitials(fullName: string): string {
  return fullName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getAccountTypeLabel(accountType: string): string {
  const labels: Record<string, string> = {
    individual: 'Particulier',
    business: 'Entreprise',
  };
  return labels[accountType] || accountType;
}
