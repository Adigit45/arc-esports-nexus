import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { 
  Users, 
  GamepadIcon,
  Star, 
  Crown,
  Shield,
  Trophy,
  Target,
  Medal
} from "lucide-react";

const Teams = () => {
  const { userType, isLoggedIn } = useAuth();

  // Only teams can access Team Management
  if (!isLoggedIn || userType !== 'team') {
    return <Navigate to="/" replace />;
  }

  const gameRosters = [
    {
      game: "Valorant",
      icon: GamepadIcon,
      players: [
        { name: "AceShooter", role: "Duelist", rank: "Immortal 3", avatar: "/api/placeholder/40/40" },
        { name: "SmokeKing", role: "Controller", rank: "Radiant", avatar: "/api/placeholder/40/40" },
        { name: "FlashMaster", role: "Initiator", rank: "Immortal 2", avatar: "/api/placeholder/40/40" },
        { name: "WallGod", role: "Sentinel", rank: "Immortal 1", avatar: "/api/placeholder/40/40" },
        { name: "IGLPro", role: "IGL", rank: "Immortal 3", avatar: "/api/placeholder/40/40" }
      ],
      teamRating: 4.8,
      wins: 24,
      tournaments: 8
    },
    {
      game: "BGMI",
      icon: Target,
      players: [
        { name: "HeadHunter", role: "Assault", rank: "Conqueror", avatar: "/api/placeholder/40/40" },
        { name: "SniperElite", role: "Sniper", rank: "Ace", avatar: "/api/placeholder/40/40" },
        { name: "SupportKing", role: "Support", rank: "Crown", avatar: "/api/placeholder/40/40" },
        { name: "StrategyMind", role: "IGL", rank: "Conqueror", avatar: "/api/placeholder/40/40" }
      ],
      teamRating: 4.6,
      wins: 18,
      tournaments: 5
    },
    {
      game: "Free Fire",
      icon: Shield,
      players: [
        { name: "FireStorm", role: "Rusher", rank: "Grandmaster", avatar: "/api/placeholder/40/40" },
        { name: "DefendPro", role: "Defender", rank: "Heroic", avatar: "/api/placeholder/40/40" },
        { name: "ClutchMaster", role: "Clutcher", rank: "Grandmaster", avatar: "/api/placeholder/40/40" }
      ],
      teamRating: 4.4,
      wins: 12,
      tournaments: 3
    }
  ];

  const getRoleColor = (role: string) => {
    const roleColors: { [key: string]: string } = {
      'Duelist': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Controller': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Initiator': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Sentinel': 'bg-green-500/20 text-green-400 border-green-500/30',
      'IGL': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Assault': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Sniper': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'Support': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      'Rusher': 'bg-red-600/20 text-red-300 border-red-600/30',
      'Defender': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      'Clutcher': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
    };
    return roleColors[role] || 'bg-muted/20 text-muted-foreground border-muted/30';
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Team Management
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage your esports rosters across all games and track team performance.
          </p>
        </div>

        {/* Game Rosters */}
        <div className="space-y-8">
          {gameRosters.map((roster) => (
            <Card key={roster.game} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <roster.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{roster.game} Team</CardTitle>
                      <CardDescription>
                        {roster.players.length} active players
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-semibold">{roster.teamRating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4 text-primary" />
                      <span>{roster.wins} wins</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Medal className="h-4 w-4 text-secondary" />
                      <span>{roster.tournaments} tournaments</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {roster.players.map((player, index) => (
                    <Card key={index} className="bg-muted/20 border-muted/30 hover:border-secondary/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={player.avatar} alt={player.name} />
                            <AvatarFallback className="text-sm font-semibold">
                              {player.name.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold truncate">{player.name}</h4>
                            <p className="text-sm text-muted-foreground">{player.rank}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge className={getRoleColor(player.role)}>
                            {player.role}
                          </Badge>
                          {player.role === 'IGL' && (
                            <Crown className="h-4 w-4 text-yellow-500" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {/* Add Player Card */}
                  <Card className="bg-muted/10 border-dashed border-muted/50 hover:border-primary/50 transition-colors cursor-pointer">
                    <CardContent className="p-4 flex items-center justify-center min-h-[120px]">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">Add Player</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-6 flex space-x-4">
                  <Button variant="gaming">
                    Manage Roster
                  </Button>
                  <Button variant="outline">
                    View Statistics
                  </Button>
                  <Button variant="secondary">
                    Schedule Practice
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;