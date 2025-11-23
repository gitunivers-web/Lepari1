import { useEffect, useState } from 'react';
import { CometChat } from '@cometchat/chat-sdk-javascript';
import { useQuery } from '@tanstack/react-query';
import { useUser } from './use-user';

export function useCometChat() {
  const { data: user } = useUser();
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: authData } = useQuery({
    queryKey: ['/api/cometchat/auth-token'],
    enabled: !!user && isInitialized,
    retry: 2,
  });

  useEffect(() => {
    const initializeCometChat = async () => {
      try {
        const appID = import.meta.env.VITE_COMETCHAT_APP_ID;
        const region = import.meta.env.VITE_COMETCHAT_REGION || 'eu';

        if (!appID || appID === 'PLACEHOLDER_APP_ID') {
          throw new Error('CometChat APP_ID not configured');
        }

        const appSetting = new CometChat.AppSettingsBuilder()
          .subscribePresenceForAllUsers()
          .setRegion(region)
          .autoEstablishSocketConnection(true)
          .build();

        await CometChat.init(appID, appSetting);
        setIsInitialized(true);
        console.log('CometChat initialized successfully');
      } catch (err: any) {
        console.error('CometChat initialization error:', err);
        setError(err.message);
      }
    };

    initializeCometChat();
  }, []);

  useEffect(() => {
    const loginToCometChat = async () => {
      if (!isInitialized || !authData || !user) return;

      try {
        const loggedInUser = await CometChat.getLoggedinUser();
        if (loggedInUser) {
          console.log('Already logged in to CometChat');
          return;
        }

        if (authData && typeof authData === 'object' && 'authToken' in authData) {
          const loggedUser = await CometChat.login((authData as any).authToken);
          console.log('Logged in to CometChat:', loggedUser);
        }
      } catch (err: any) {
        console.error('CometChat login error:', err);
        setError(err.message);
      }
    };

    loginToCometChat();
  }, [isInitialized, authData, user]);

  return {
    isInitialized,
    isLoggedIn: !!authData,
    error,
  };
}
