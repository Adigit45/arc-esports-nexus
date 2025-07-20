import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { 
  MapPin, 
  Users, 
  Trophy, 
  Calendar,
  Settings,
  UserPlus,
  Instagram,
  Twitter,
  Twitch,
  Youtube,
  Heart,
  MessageCircle,
  Share2,
  Target,
  Zap,
  Star
} from "lucide-react";

const PlayerProfile = () => {
  const { userType, isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const playerData = {
    name: user?.name || "ProGamer_99",
    avatar: "",
    verified: true,
    currentTeam: {
      name: "Team Alpha",
      role: "Entry Fragger",
      since: "Jan 2024"
    },
    stats: {
      rank: "Immortal 3",
      kd: "1.85",
      winRate: "78%",
      hoursPlayed: "2,450"
    },
    socialStats: {
      friends: 245,
      followers: 1820,
      following: 89
    },
    linkedAccounts: [
      { platform: "Instagram", username: "@progamer_99", verified: true },
      { platform: "Twitch", username: "ProGamer99Live", verified: true },
      { platform: "YouTube", username: "ProGamer99", verified: false },
      { platform: "Twitter", username: "@ProGamer_99", verified: true }
    ],
    games: [
      { name: "Valorant", rank: "Immortal 3", hours: 1200 },
      { name: "BGMI", rank: "Conqueror", hours: 800 },
      { name: "Free Fire", rank: "Grandmaster", hours: 450 }
    ]
  };

  const recentPosts = [
    {
      id: 1,
      content: "Just hit Immortal 3! The grind never stops 🔥",
      type: "achievement",
      game: "Valorant",
      likes: 142,
      comments: 23,
      timeAgo: "2h ago"
    },
    {
      id: 2,
      content: "New montage dropping tomorrow! Some insane clips from this week's matches 🎯",
      type: "content",
      game: "BGMI",
      likes: 89,
      comments: 15,
      timeAgo: "1d ago"
    }
  ];

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "Instagram": return Instagram;
      case "Twitter": return Twitter;
      case "Twitch": return Twitch;
      case "YouTube": return Youtube;
      default: return Users;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <Card className="bg-card border-border mb-6">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex flex-col items-center md:items-start">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src={playerData.avatar} />
                    <AvatarFallback className="text-2xl">{playerData.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h1 className="text-3xl font-bold">{playerData.name}</h1>
                    {playerData.verified && (
                      <Badge variant="default" className="bg-blue-500">
                        <Star className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  {/* Current Team */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Current Team</h3>
                    <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>TA</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{playerData.currentTeam.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {playerData.currentTeam.role} • Since {playerData.currentTeam.since}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Social Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{playerData.socialStats.friends}</p>
                      <p className="text-sm text-muted-foreground">Friends</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{playerData.socialStats.followers}</p>
                      <p className="text-sm text-muted-foreground">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{playerData.socialStats.following}</p>
                      <p className="text-sm text-muted-foreground">Following</p>
                    </div>
                  </div>
                  
                  <Button variant="gaming" className="mr-2">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Friend
                  </Button>
                  <Button variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Gaming Stats */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Gaming Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Rank</p>
                      <p className="font-semibold">{playerData.stats.rank}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">K/D Ratio</p>
                      <p className="font-semibold">{playerData.stats.kd}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Win Rate</p>
                      <p className="font-semibold">{playerData.stats.winRate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Hours Played</p>
                      <p className="font-semibold">{playerData.stats.hoursPlayed}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Game Accounts */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Game Accounts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {playerData.games.map((game, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{game.name}</p>
                        <p className="text-sm text-muted-foreground">{game.rank}</p>
                      </div>
                      <Badge variant="outline">{game.hours}h</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Linked Accounts */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Linked Accounts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {playerData.linkedAccounts.map((account, index) => {
                    const IconComponent = getSocialIcon(account.platform);
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{account.platform}</p>
                            <p className="text-sm text-muted-foreground">{account.username}</p>
                          </div>
                        </div>
                        {account.verified && (
                          <Badge variant="default" className="bg-green-500">Verified</Badge>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Posts */}
            <div className="lg:col-span-2">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Recent Posts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{playerData.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{playerData.name}</p>
                            <p className="text-sm text-muted-foreground">{post.timeAgo}</p>
                          </div>
                        </div>
                        <Badge variant="outline">{post.game}</Badge>
                      </div>
                      
                      <p className="mb-3">{post.content}</p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <Button variant="ghost" size="sm">
                          <Heart className="w-4 h-4 mr-1" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;