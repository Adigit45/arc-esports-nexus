import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Star,
  Crown,
  Medal,
  Award
} from "lucide-react";

const TeamProfile = () => {
  const { userType, isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const teamData = {
    name: user?.name || "Team Elite",
    avatar: "",
    verified: true,
    location: "Mumbai, India",
    founded: "March 2023",
    description: "Professional esports team competing in multiple tournaments across India and SEA region.",
    stats: {
      tournaments: 15,
      wins: 12,
      winRate: "80%",
      totalPrize: "₹2,50,000"
    },
    achievements: [
      { title: "BGMI Pro League Winner", year: "2024", prize: "₹1,00,000" },
      { title: "Valorant Champions", year: "2024", prize: "₹75,000" },
      { title: "Free Fire National Cup", year: "2023", prize: "₹50,000" },
      { title: "BGMI Regional Champions", year: "2023", prize: "₹25,000" }
    ],
    roster: {
      bgmi: [
        { name: "PlayerOne", role: "IGL", avatar: "", verified: true },
        { name: "FragMaster", role: "Fragger", avatar: "", verified: false },
        { name: "SniperKing", role: "Sniper", avatar: "", verified: true },
        { name: "SupportGod", role: "Support", avatar: "", verified: false }
      ],
      valorant: [
        { name: "AimBot", role: "Duelist", avatar: "", verified: true },
        { name: "SmokeKing", role: "Controller", avatar: "", verified: false },
        { name: "FlashMaster", role: "Initiator", avatar: "", verified: true },
        { name: "WallHack", role: "Sentinel", avatar: "", verified: false }
      ]
    },
    socialAccounts: [
      { platform: "Instagram", followers: "12.5K", verified: true },
      { platform: "Twitter", followers: "8.2K", verified: true },
      { platform: "YouTube", followers: "25.1K", verified: true },
      { platform: "Twitch", followers: "5.8K", verified: false }
    ]
  };

  const recentPosts = [
    {
      id: 1,
      content: "🏆 Championship Win! Our BGMI team dominated the finals with a perfect 3-0 score! Proud of the squad! #Champions",
      type: "achievement",
      game: "BGMI",
      likes: 342,
      comments: 67,
      timeAgo: "1h ago"
    },
    {
      id: 2,
      content: "Team practice highlights from today's Valorant scrimmage. Working hard for the upcoming tournament! 💪",
      type: "content",
      game: "Valorant",
      likes: 156,
      comments: 23,
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
          {/* Team Header */}
          <Card className="bg-card border-border mb-6">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex flex-col items-center md:items-start">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src={teamData.avatar} />
                    <AvatarFallback className="text-2xl">{teamData.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Team Profile
                  </Button>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h1 className="text-3xl font-bold">{teamData.name}</h1>
                    {teamData.verified && (
                      <Badge variant="default" className="bg-blue-500">
                        <Star className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{teamData.description}</p>
                  
                  {/* Team Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{teamData.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Founded {teamData.founded}</span>
                    </div>
                  </div>
                  
                  {/* Team Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold">{teamData.stats.tournaments}</p>
                      <p className="text-sm text-muted-foreground">Tournaments</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold">{teamData.stats.wins}</p>
                      <p className="text-sm text-muted-foreground">Wins</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold">{teamData.stats.winRate}</p>
                      <p className="text-sm text-muted-foreground">Win Rate</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold">{teamData.stats.totalPrize}</p>
                      <p className="text-sm text-muted-foreground">Prize Won</p>
                    </div>
                  </div>
                  
                  <Button variant="gaming" className="mr-2">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Follow Team
                  </Button>
                  <Button variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Achievements */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {teamData.achievements.slice(0, 3).map((achievement, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {index === 0 ? (
                            <Crown className="h-5 w-5 text-yellow-500" />
                          ) : index === 1 ? (
                            <Medal className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Award className="h-5 w-5 text-orange-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{achievement.title}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-muted-foreground">{achievement.year}</span>
                            <Badge variant="outline" className="text-xs">{achievement.prize}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Social Media
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {teamData.socialAccounts.map((account, index) => {
                    const IconComponent = getSocialIcon(account.platform);
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{account.platform}</p>
                            <p className="text-sm text-muted-foreground">{account.followers} followers</p>
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

            {/* Middle Column - Roster */}
            <div className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    BGMI Roster
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {teamData.roster.bgmi.map((player, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={player.avatar} />
                        <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{player.name}</p>
                          {player.verified && (
                            <Star className="h-3 w-3 text-blue-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{player.role}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Valorant Roster
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {teamData.roster.valorant.map((player, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={player.avatar} />
                        <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{player.name}</p>
                          {player.verified && (
                            <Star className="h-3 w-3 text-blue-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{player.role}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Posts */}
            <div>
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Team Posts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{teamData.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{teamData.name}</p>
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

export default TeamProfile;