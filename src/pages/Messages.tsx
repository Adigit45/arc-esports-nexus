import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { 
  MessageCircle, 
  Users, 
  Radio, 
  Send, 
  Plus, 
  Pin,
  Mic,
  Video,
  Settings,
  Crown,
  UserPlus,
  Hash,
  Volume2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Messages = () => {
  const { userType, isLoggedIn } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  // Redirect if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const directMessages = [
    {
      id: "1",
      name: "AceShooter",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Ready for the tournament?",
      time: "2m ago",
      unread: 3,
      online: true
    },
    {
      id: "2", 
      name: "SmokeKing",
      avatar: "/api/placeholder/40/40",
      lastMessage: "GG on that match",
      time: "15m ago",
      unread: 0,
      online: false
    },
    {
      id: "3",
      name: "FlashMaster",
      avatar: "/api/placeholder/40/40", 
      lastMessage: "Let's practice tomorrow",
      time: "1h ago",
      unread: 1,
      online: true
    }
  ];

  const lobbyGroups = [
    {
      id: "team-main",
      name: "Team Main",
      avatar: "/api/placeholder/40/40",
      members: 5,
      lastMessage: "Practice at 8 PM",
      time: "5m ago",
      unread: 2,
      isPinned: true,
      isTeam: true
    },
    {
      id: "valorant-squad",
      name: "Valorant Squad",
      avatar: "/api/placeholder/40/40",
      members: 8,
      lastMessage: "New strategy for Haven",
      time: "20m ago", 
      unread: 5,
      isPinned: false,
      isTeam: false
    },
    {
      id: "bgmi-grind",
      name: "BGMI Grind",
      avatar: "/api/placeholder/40/40",
      members: 12,
      lastMessage: "Scrims tonight?",
      time: "1h ago",
      unread: 0,
      isPinned: false,
      isTeam: false
    }
  ];

  const broadcasts = [
    {
      id: "arc-official",
      name: "ARC Official",
      avatar: "/api/placeholder/40/40",
      lastMessage: "New tournament announcement!",
      time: "30m ago",
      unread: 1,
      verified: true,
      listeners: 1250
    },
    {
      id: "valorant-championship",
      name: "Valorant Championship",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Finals starting in 1 hour",
      time: "45m ago",
      unread: 0,
      verified: true,
      listeners: 850
    },
    {
      id: "bgmi-masters",
      name: "BGMI Masters",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Registration open now",
      time: "2h ago",
      unread: 2,
      verified: true,
      listeners: 620
    }
  ];

  const sampleMessages = [
    {
      id: "1",
      sender: "AceShooter",
      message: "Hey! Ready for tonight's practice session?",
      time: "2:30 PM",
      isOwn: false
    },
    {
      id: "2", 
      sender: "You",
      message: "Absolutely! What maps are we focusing on?",
      time: "2:32 PM",
      isOwn: true
    },
    {
      id: "3",
      sender: "AceShooter", 
      message: "Let's work on Haven and Bind. Our site takes need improvement",
      time: "2:33 PM",
      isOwn: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Messages
            </h1>
            <p className="text-xl text-muted-foreground">
              Stay connected with your team and the esports community
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span>Conversations</span>
                    <Button size="sm" variant="ghost">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-0">
                  <Tabs defaultValue="dm" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mx-4 mb-4">
                      <TabsTrigger value="dm" className="text-xs">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        DM
                      </TabsTrigger>
                      <TabsTrigger value="lobby" className="text-xs">
                        <Users className="h-3 w-3 mr-1" />
                        Lobby
                      </TabsTrigger>
                      <TabsTrigger value="broadcast" className="text-xs">
                        <Radio className="h-3 w-3 mr-1" />
                        Broadcast
                      </TabsTrigger>
                    </TabsList>

                    <div className="px-4 mb-4">
                      <Input placeholder="Search conversations..." className="h-8" />
                    </div>

                    <TabsContent value="dm" className="mt-0">
                      <div className="space-y-1 px-2">
                        {directMessages.map((dm) => (
                          <div
                            key={dm.id}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              selectedChat === dm.id ? 'bg-primary/20' : 'hover:bg-muted/50'
                            }`}
                            onClick={() => setSelectedChat(dm.id)}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="relative">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={dm.avatar} alt={dm.name} />
                                  <AvatarFallback>{dm.name.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                {dm.online && (
                                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium truncate">{dm.name}</h4>
                                  <span className="text-xs text-muted-foreground">{dm.time}</span>
                                </div>
                                <p className="text-sm text-muted-foreground truncate">{dm.lastMessage}</p>
                              </div>
                              {dm.unread > 0 && (
                                <Badge className="bg-primary text-primary-foreground px-2 py-1 text-xs">
                                  {dm.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="lobby" className="mt-0">
                      <div className="space-y-1 px-2">
                        {/* Pinned Team Group */}
                        {lobbyGroups.filter(group => group.isPinned).map((group) => (
                          <div key={group.id} className="mb-2">
                            <div className="flex items-center space-x-2 px-3 py-2 text-xs text-muted-foreground">
                              <Pin className="h-3 w-3" />
                              <span>PINNED</span>
                            </div>
                            <div
                              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                selectedChat === group.id ? 'bg-primary/20' : 'hover:bg-muted/50'
                              }`}
                              onClick={() => setSelectedChat(group.id)}
                            >
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={group.avatar} alt={group.name} />
                                  <AvatarFallback>{group.name.slice(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2">
                                    <h4 className="font-medium truncate">{group.name}</h4>
                                    {group.isTeam && <Crown className="h-3 w-3 text-yellow-500" />}
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground truncate">{group.lastMessage}</p>
                                    <span className="text-xs text-muted-foreground">{group.time}</span>
                                  </div>
                                  <p className="text-xs text-muted-foreground">{group.members} members</p>
                                </div>
                                {group.unread > 0 && (
                                  <Badge className="bg-primary text-primary-foreground px-2 py-1 text-xs">
                                    {group.unread}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <div className="flex items-center space-x-2 px-3 py-2 text-xs text-muted-foreground">
                          <Hash className="h-3 w-3" />
                          <span>GROUPS</span>
                          <Button size="sm" variant="ghost" className="h-4 w-4 p-0 ml-auto">
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        {lobbyGroups.filter(group => !group.isPinned).map((group) => (
                          <div
                            key={group.id}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              selectedChat === group.id ? 'bg-primary/20' : 'hover:bg-muted/50'
                            }`}
                            onClick={() => setSelectedChat(group.id)}
                          >
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={group.avatar} alt={group.name} />
                                <AvatarFallback>{group.name.slice(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium truncate">{group.name}</h4>
                                <div className="flex items-center justify-between">
                                  <p className="text-sm text-muted-foreground truncate">{group.lastMessage}</p>
                                  <span className="text-xs text-muted-foreground">{group.time}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{group.members} members</p>
                              </div>
                              {group.unread > 0 && (
                                <Badge className="bg-primary text-primary-foreground px-2 py-1 text-xs">
                                  {group.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="broadcast" className="mt-0">
                      <div className="space-y-1 px-2">
                        {broadcasts.map((broadcast) => (
                          <div
                            key={broadcast.id}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              selectedChat === broadcast.id ? 'bg-primary/20' : 'hover:bg-muted/50'
                            }`}
                            onClick={() => setSelectedChat(broadcast.id)}
                          >
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={broadcast.avatar} alt={broadcast.name} />
                                <AvatarFallback>{broadcast.name.slice(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-medium truncate">{broadcast.name}</h4>
                                  {broadcast.verified && (
                                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                      <span className="text-white text-xs">✓</span>
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center justify-between">
                                  <p className="text-sm text-muted-foreground truncate">{broadcast.lastMessage}</p>
                                  <span className="text-xs text-muted-foreground">{broadcast.time}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                    <Volume2 className="h-3 w-3" />
                                    <span>{broadcast.listeners} listening</span>
                                  </div>
                                  {broadcast.unread > 0 && (
                                    <Badge className="bg-primary text-primary-foreground px-2 py-1 text-xs">
                                      {broadcast.unread}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2">
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 flex flex-col">
                {selectedChat ? (
                  <>
                    {/* Chat Header */}
                    <CardHeader className="border-b border-border/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/api/placeholder/40/40" alt="Chat" />
                            <AvatarFallback>AC</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">AceShooter</h3>
                            <p className="text-sm text-green-400">Online</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost">
                            <Video className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Mic className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    {/* Messages */}
                    <CardContent className="flex-1 p-4 overflow-y-auto">
                      <div className="space-y-4">
                        {sampleMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[70%] p-3 rounded-lg ${
                                msg.isOwn
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted'
                              }`}
                            >
                              <p className="text-sm">{msg.message}</p>
                              <p className={`text-xs mt-1 ${
                                msg.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                              }`}>
                                {msg.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>

                    {/* Message Input */}
                    <div className="p-4 border-t border-border/50">
                      <div className="flex items-center space-x-2">
                        <Input
                          placeholder="Type your message..."
                          className="flex-1"
                        />
                        <Button size="sm" variant="gaming">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <CardContent className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
                      <p className="text-muted-foreground">
                        Choose from your direct messages, lobby groups, or broadcasts to start chatting
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;