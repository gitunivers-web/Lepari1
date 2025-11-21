import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChatBox } from '@/components/ChatBox';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { MessageSquare, Users, Search } from 'lucide-react';
import { AdminLayout } from '@/components/admin';

interface User {
  id: string;
  fullName: string;
  email: string;
  status: string;
}

interface Conversation {
  userId: string;
  fullName: string;
  unreadCount: number;
  lastMessage: {
    content: string;
    createdAt: string;
  } | null;
}

export default function AdminChatPage() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: conversations, isLoading: conversationsLoading } = useQuery<Conversation[]>({
    queryKey: ['/api/chat/conversations'],
  });

  const { data: allUsersResponse, isLoading: usersLoading } = useQuery({
    queryKey: ['/api/admin/users'],
  });

  const allUsers = Array.isArray(allUsersResponse) ? allUsersResponse : [];

  const isLoading = conversationsLoading || usersLoading;

  const conversationUserIds = new Set(conversations?.map(c => c.userId) || []);
  
  const usersWithoutConversations = allUsers.filter(
    (user: User) => !conversationUserIds.has(user.id) && user.status !== 'blocked'
  );

  const filteredConversations = conversations?.filter(conv =>
    conv.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const filteredUsers = usersWithoutConversations.filter((user: User) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedUser = conversations?.find(c => c.userId === selectedUserId) || 
    allUsers.find((u: User) => u.id === selectedUserId);

  const adminUserId = 'admin';

  return (
    <AdminLayout
      title="Chat Support"
      description="Communiquez en temps réel avec les utilisateurs"
    >
      <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-200px)]">
        {/* Liste des utilisateurs et conversations */}
        <Card className="md:w-80 flex-shrink-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Utilisateurs
            </CardTitle>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                data-testid="input-search-users"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y max-h-[calc(100vh-400px)] overflow-y-auto">
              {isLoading ? (
                <>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 space-y-2">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-32 mb-2" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {/* Conversations actives */}
                  {filteredConversations.length > 0 && (
                    <div>
                      <div className="px-4 py-2 bg-muted/50 text-xs font-semibold text-muted-foreground">
                        CONVERSATIONS ACTIVES
                      </div>
                      {filteredConversations.map((conv) => (
                        <button
                          key={conv.userId}
                          onClick={() => setSelectedUserId(conv.userId)}
                          className={`w-full p-4 text-left transition-colors hover-elevate ${
                            selectedUserId === conv.userId
                              ? 'bg-primary/10'
                              : ''
                          }`}
                          data-testid={`conversation-${conv.userId}`}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-primary/20 text-primary">
                                {conv.fullName?.charAt(0).toUpperCase() || 'U'}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <p className="font-semibold text-sm truncate">
                                  {conv.fullName}
                                </p>
                                {conv.unreadCount > 0 && (
                                  <Badge variant="default" className="text-xs">
                                    {conv.unreadCount}
                                  </Badge>
                                )}
                              </div>
                              {conv.lastMessage && (
                                <p className="text-xs text-muted-foreground truncate">
                                  {conv.lastMessage.content}
                                </p>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Autres utilisateurs */}
                  {filteredUsers.length > 0 && (
                    <div>
                      <div className="px-4 py-2 bg-muted/50 text-xs font-semibold text-muted-foreground">
                        TOUS LES UTILISATEURS
                      </div>
                      {filteredUsers.map((user: User) => (
                        <button
                          key={user.id}
                          onClick={() => setSelectedUserId(user.id)}
                          className={`w-full p-4 text-left transition-colors hover-elevate ${
                            selectedUserId === user.id
                              ? 'bg-primary/10'
                              : ''
                          }`}
                          data-testid={`user-${user.id}`}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-muted text-muted-foreground">
                                {user.fullName?.charAt(0).toUpperCase() || 'U'}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm truncate">
                                {user.fullName}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredConversations.length === 0 && filteredUsers.length === 0 && (
                    <div className="p-8 text-center">
                      <MessageSquare className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Aucun utilisateur trouvé
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Zone de chat */}
        <Card className="flex-1 flex flex-col">
          {selectedUserId && selectedUser ? (
            <ChatBox
              userId={adminUserId}
              partnerId={selectedUserId}
              partnerName={selectedUser.fullName}
            />
          ) : (
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  Sélectionnez un utilisateur
                </h3>
                <p className="text-sm text-muted-foreground">
                  Choisissez un utilisateur pour commencer à discuter
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
}
