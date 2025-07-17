import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { 
  Users, 
  MapPin, 
  Clock, 
  Trophy, 
  Target,
  Plus,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

const Recruitment = () => {
  const { userType, isLoggedIn } = useAuth();

  // Only teams can access Recruitment
  if (!isLoggedIn || userType !== 'team') {
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
      type: "Competitive",
      postedAgo: "2h ago",
      applicants: 24
    },
    {
      id: 2,
      team: "Phoenix Gaming",
      game: "BGMI",
      role: "IGL (In-Game Leader)",
      requirements: "Conqueror tier, tournament experience, leadership skills",
      location: "Delhi",
      type: "Professional",
      postedAgo: "5h ago",
      applicants: 18
    },
    {
      id: 3,
      team: "Thunder Squad",
      game: "Free Fire",
      role: "Sniper",
      requirements: "Grandmaster+, consistent aim, team player",
      location: "Mumbai",
      type: "Semi-Pro",
      postedAgo: "1d ago",
      applicants: 31
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
                Team Recruitment
              </h1>
              <p className="text-muted-foreground mt-2">
                Find the perfect players for your team
              </p>
            </div>
            <Button variant="secondary" className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Post Recruitment</span>
            </Button>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by game, role, or team..." 
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">Filter</Button>
              </div>
            </CardContent>
          </Card>

          {/* Recruitment Posts */}
          <div className="space-y-4">
            {mockRecruitments.map((recruitment) => (
              <Card key={recruitment.id} className="bg-card border-border hover:border-secondary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold">{recruitment.team}</h3>
                        <Badge variant="secondary">{recruitment.type}</Badge>
                        <Badge variant="outline">{recruitment.game}</Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center space-x-1">
                          <Target className="w-4 h-4" />
                          <span>Looking for: {recruitment.role}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{recruitment.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{recruitment.postedAgo}</span>
                        </div>
                      </div>
                      
                      <p className="text-foreground mb-4">{recruitment.requirements}</p>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{recruitment.applicants} applicants</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Button variant="secondary" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Contact Team
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State for Your Posts */}
          <Card className="mt-8 bg-muted/20">
            <CardContent className="p-8 text-center">
              <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Active Recruitments</h3>
              <p className="text-muted-foreground mb-4">
                Start building your dream team by posting your first recruitment
              </p>
              <Button variant="secondary">
                <Plus className="w-4 h-4 mr-2" />
                Create Recruitment Post
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Recruitment;