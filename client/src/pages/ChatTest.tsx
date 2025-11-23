import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatWidget } from "@/components/ChatWidget";
import { useUser } from "@/hooks/use-user";
import { useCometChat } from "@/hooks/use-cometchat";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

export default function ChatTest() {
  const { data: user } = useUser();
  const { isInitialized, isLoggedIn, error } = useCometChat();

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Test CometChat"
        description="Page de test pour l'intégration CometChat"
      />
      
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Test CometChat</h1>
          <p className="text-muted-foreground">
            Vérification de l'intégration CometChat en temps réel
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>État de la connexion</CardTitle>
              <CardDescription>
                Statut de l'initialisation et de la connexion CometChat
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Utilisateur authentifié</span>
                {user ? (
                  <Badge variant="default" className="gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    {user.fullName}
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="gap-1">
                    <XCircle className="h-3 w-3" />
                    Non connecté
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">CometChat initialisé</span>
                {isInitialized ? (
                  <Badge variant="default" className="gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Initialisé
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    En cours...
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Connecté à CometChat</span>
                {isLoggedIn ? (
                  <Badge variant="default" className="gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Connecté
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    En cours...
                  </Badge>
                )}
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 rounded-md">
                  <p className="text-sm text-destructive font-medium">Erreur:</p>
                  <p className="text-sm text-destructive mt-1">{error}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuration CometChat</CardTitle>
              <CardDescription>
                Paramètres de configuration actuels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">APP ID</span>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {import.meta.env.VITE_COMETCHAT_APP_ID}
                </code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Région</span>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {import.meta.env.VITE_COMETCHAT_REGION || 'eu'}
                </code>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Instructions de test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <p className="font-medium">Pour tester le chat:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2 text-muted-foreground">
                  <li>Assurez-vous d'être connecté avec un compte utilisateur</li>
                  <li>Cliquez sur le bouton de chat en bas à droite</li>
                  <li>Le widget de chat devrait s'ouvrir</li>
                  <li>Vous pouvez envoyer des messages et voir les conversations</li>
                  <li>Pour tester la messagerie entre utilisateurs, connectez-vous avec un autre compte dans un autre navigateur</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ChatWidget />
    </div>
  );
}
