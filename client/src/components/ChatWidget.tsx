import { useEffect, useState } from 'react';
import { CometChatUIKit, UIKitSettingsBuilder, CometChatConversations } from '@cometchat/chat-uikit-react';
import { useCometChat } from '@/hooks/use-cometchat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Minimize2, Maximize2 } from 'lucide-react';
import { useUser } from '@/hooks/use-user';

export function ChatWidget() {
  const { data: user } = useUser();
  const { isInitialized, isLoggedIn, error } = useCometChat();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [uikitInitialized, setUikitInitialized] = useState(false);

  useEffect(() => {
    const initUIKit = async () => {
      if (!isInitialized || !isLoggedIn || uikitInitialized) return;

      try {
        const appID = import.meta.env.VITE_COMETCHAT_APP_ID;
        const region = import.meta.env.VITE_COMETCHAT_REGION || 'eu';

        const UIKitSettings = new UIKitSettingsBuilder()
          .setAppId(appID)
          .setRegion(region)
          .subscribePresenceForAllUsers()
          .build();

        await CometChatUIKit.init(UIKitSettings);
        setUikitInitialized(true);
        console.log('CometChat UIKit initialized');
      } catch (err) {
        console.error('UIKit initialization error:', err);
      }
    };

    initUIKit();
  }, [isInitialized, isLoggedIn, uikitInitialized]);

  if (!user) return null;

  if (error) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="w-80 bg-destructive/10">
          <CardContent className="p-4">
            <p className="text-sm text-destructive">
              Erreur CometChat: {error}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      {!isOpen && (
        <Button
          size="icon"
          className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
          data-testid="button-open-chat"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card 
          className={`fixed bottom-4 right-4 z-50 shadow-2xl transition-all ${
            isMinimized ? 'w-80 h-16' : 'w-[400px] h-[600px]'
          }`}
        >
          <CardHeader className="flex flex-row items-center justify-between gap-2 p-3 border-b">
            <CardTitle className="text-base">Messages</CardTitle>
            <div className="flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsMinimized(!isMinimized)}
                data-testid="button-minimize-chat"
              >
                {isMinimized ? (
                  <Maximize2 className="h-4 w-4" />
                ) : (
                  <Minimize2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                data-testid="button-close-chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <CardContent className="p-0 h-[calc(100%-4rem)]">
              {!uikitInitialized ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                    <p className="text-sm text-muted-foreground">
                      Initialisation du chat...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full">
                  <CometChatConversations />
                </div>
              )}
            </CardContent>
          )}
        </Card>
      )}
    </>
  );
}
