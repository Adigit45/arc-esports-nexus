import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { 
  Users, 
  MapPin, 
  Clock, 
  Trophy, 
  Target,
  Plus,
  Search,
  Filter,
  GamepadIcon,
  Shield,
  Briefcase
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Recruitment = () => {
  const { userType, isLoggedIn } = useAuth();
  const [selectedGame, setSelectedGame] = useState<string>("all");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  // Redirect if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const mockRecruitments = [
    {
      id: 1,
      team: "Velocity Esports",
      game: "Valorant",
      role: "Duelist",
      requirements: "Immortal+ rank, 18+ age, good communication",
      location: "India",
      type: "Team",
      postedBy: "team",
      postedAgo: "2h ago",
      applicants: 24,
      salary: "₹50,000/month"
    },
    {
      id: 2,
      team: "Phoenix Gaming",
      game: "BGMI",
      role: "IGL",
      requirements: "Conqueror tier, tournament experience, leadership skills",
      location: "Delhi",
      type: "Team",
      postedBy: "team",
      postedAgo: "5h ago",
      applicants: 18,
      salary: "₹75,000/month"
    },
    {
      id: 3,
      team: "Thunder Squad",
      game: "Free Fire",
      role: "Sniper",
      requirements: "Grandmaster+, consistent aim, team player",
      location: "Mumbai",
      type: "Team",
      postedBy: "team",
      postedAgo: "1d ago",
      applicants: 31,
      salary: "₹40,000/month"
    },
    {
      id: 4,
      team: "Looking for Team",
      game: "Valorant",
      role: "Controller",
      requirements: "Radiant player, flexible timings, competitive mindset",
      location: "Bangalore",
      type: "Player",
      postedBy: "player",
      postedAgo: "3h ago",
      applicants: 8,
      playerName: "SmokeWizard"
    },
    {
      id: 5,
      team: "Seeking Opportunities",
      game: "BGMI",
      role: "Assault",
      requirements: "Ace tier, tournament experience, team player",
      location: "Pune",
      type: "Player",
      postedBy: "player",
      postedAgo: "6h ago",
      applicants: 12,
      playerName: "HeadHunter99"
    }
  ];

  const games = ["Valorant", "BGMI", "Free Fire", "CS2", "Apex Legends"];
  const roles = {
    "Valorant": ["Duelist", "Controller", "Initiator", "Sentinel", "IGL"],
    "BGMI": ["Assault", "Sniper", "Support", "IGL", "Entry Fragger"],
    "Free Fire": ["Rusher", "Defender", "Sniper", "IGL", "Support"],
    "CS2": ["AWPer", "Entry Fragger", "Support", "IGL", "Lurker"],
    "Apex Legends": ["Assault", "Support", "Recon", "IGL"]
  };

  const getRoleColor = (role: string) => {
    const roleColors: { [key: string]: string } = {
      'Duelist': 'bg-red-500/20 text-red-400',
      'Controller': 'bg-blue-500/20 text-blue-400',
      'Initiator': 'bg-yellow-500/20 text-yellow-400',
      'Sentinel': 'bg-green-500/20 text-green-400',
      'IGL': 'bg-purple-500/20 text-purple-400',
      'Assault': 'bg-orange-500/20 text-orange-400',
      'Sniper': 'bg-pink-500/20 text-pink-400',
      'Support': 'bg-cyan-500/20 text-cyan-400',
      'Entry Fragger': 'bg-red-600/20 text-red-300',
      'Rusher': 'bg-red-700/20 text-red-200',
      'Defender': 'bg-emerald-500/20 text-emerald-400',
      'AWPer': 'bg-indigo-500/20 text-indigo-400',
      'Lurker': 'bg-gray-500/20 text-gray-400',
      'Recon': 'bg-teal-500/20 text-teal-400'
    };
    return roleColors[role] || 'bg-muted/20 text-muted-foreground';
  };

  const filteredRecruitments = mockRecruitments.filter(recruitment => {
    const gameMatch = selectedGame === "all" || recruitment.game === selectedGame;
    const roleMatch = selectedRole === "all" || recruitment.role === selectedRole;
    const typeMatch = selectedType === "all" || recruitment.type === selectedType;
    return gameMatch && roleMatch && typeMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
                {userType === 'team' ? 'Team Recruitment Hub' : 'Player Opportunities'}
              </h1>
              <p className="text-muted-foreground mt-2">
                {userType === 'team' 
                  ? 'Find skilled players and manage recruitment posts'
                  : 'Discover teams and showcase your talent'
                }
              </p>
            </div>
            <Button variant="gaming" className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>
                {userType === 'team' ? 'Post Recruitment' : 'Create Player Profile'}
              </span>
            </Button>
          </div>

          {/* Search and Advanced Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by team, player, or skills..." 
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedGame} onValueChange={setSelectedGame}>
                  <SelectTrigger>
                    <div className="flex items-center space-x-2">
                      <GamepadIcon className="h-4 w-4" />
                      <SelectValue placeholder="Game" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Games</SelectItem>
                    {games.map((game) => (
                      <SelectItem key={game} value={game}>{game}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4" />
                      <SelectValue placeholder="Role" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {selectedGame !== "all" && roles[selectedGame as keyof typeof roles] 
                      ? roles[selectedGame as keyof typeof roles].map((role) => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))
                      : Object.values(roles).flat().filter((role, index, arr) => arr.indexOf(role) === index).map((role) => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))
                    }
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <div className="flex items-center space-x-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Team">Team Posts</SelectItem>
                    <SelectItem value="Player">Player Posts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Recruitment Posts */}
          <div className="space-y-6">
            {filteredRecruitments.map((recruitment) => (
              <Card key={recruitment.id} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="flex items-center space-x-2">
                          {recruitment.type === 'Team' ? (
                            <Shield className="h-5 w-5 text-primary" />
                          ) : (
                            <Users className="h-5 w-5 text-secondary" />
                          )}
                          <h3 className="text-xl font-semibold">
                            {recruitment.type === 'Team' ? recruitment.team : recruitment.playerName}
                          </h3>
                        </div>
                        
                        <Badge className={recruitment.type === 'Team' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'}>
                          {recruitment.type === 'Team' ? 'Team Recruiting' : 'Player Available'}
                        </Badge>
                        <Badge variant="outline">{recruitment.game}</Badge>
                        <Badge className={getRoleColor(recruitment.role)}>
                          {recruitment.role}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{recruitment.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{recruitment.postedAgo}</span>
                        </div>
                        {recruitment.salary && (
                          <div className="flex items-center space-x-1">
                            <Briefcase className="w-4 h-4" />
                            <span className="font-medium text-green-400">{recruitment.salary}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{recruitment.applicants} {recruitment.type === 'Team' ? 'applicants' : 'team offers'}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                          {recruitment.type === 'Team' ? 'Requirements:' : 'Skills & Experience:'}
                        </h4>
                        <p className="text-foreground">{recruitment.requirements}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      <Button variant="gaming" size="sm">
                        {recruitment.type === 'Team' ? 'Apply Now' : 'Contact Player'}
                      </Button>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      {userType === 'team' && recruitment.type === 'Player' && (
                        <Button variant="secondary" size="sm">
                          Send Offer
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRecruitments.length === 0 && (
            <Card className="mt-8 bg-muted/20 border-dashed">
              <CardContent className="p-12 text-center">
                <Target className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button variant="outline" onClick={() => {
                  setSelectedGame("all");
                  setSelectedRole("all");
                  setSelectedType("all");
                }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Your Posts Section */}
          <Card className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {userType === 'team' ? 'Manage Your Recruitment Posts' : 'Showcase Your Skills'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {userType === 'team' 
                  ? 'Create and manage recruitment posts to find the perfect players for your team'
                  : 'Create a player profile to get noticed by top esports teams'
                }
              </p>
              <Button variant="gaming">
                <Plus className="w-4 h-4 mr-2" />
                {userType === 'team' ? 'Create Recruitment Post' : 'Create Player Profile'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Recruitment;