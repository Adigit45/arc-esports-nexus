import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  MapPin, 
  Star, 
  Plus,
  Search,
  Trophy,
  Target
} from "lucide-react";

const Teams = () => {
  const teams = [
    {
      id: 1,
      name: "Thunder Wolves",
      game: "BGMI",
      region: "North India",
      members: 4,
      rating: 4.8,
      achievements: 12,
      isRecruiting: true,
      logo: "/api/placeholder/80/80",
      description: "Professional BGMI team looking for skilled assault players to complete our championship roster."
    },
    {
      id: 2,
      name: "Cyber Knights",
      game: "Valorant",
      region: "South India",
      members: 5,
      rating: 4.9,
      achievements: 8,
      isRecruiting: false,
      logo: "/api/placeholder/80/80",
      description: "Elite Valorant squad with multiple tournament wins. Currently not recruiting."
    },
    {
      id: 3,
      name: "Phoenix Squad",
      game: "Free Fire",
      region: "West India",
      members: 3,
      rating: 4.6,
      achievements: 6,
      isRecruiting: true,
      logo: "/api/placeholder/80/80",
      description: "Rising Free Fire team seeking dedicated players for upcoming tournaments."
    },
  ];

  const recruitmentPosts = [
    {
      id: 1,
      team: "Thunder Wolves",
      position: "Assault Player",
      game: "BGMI",
      requirements: ["KD > 2.5", "Available evenings", "Good communication"],
      posted: "2 hours ago"
    },
    {
      id: 2,
      team: "Phoenix Squad",
      position: "IGL (In-Game Leader)",
      game: "Free Fire",
      requirements: ["Leadership experience", "Strategic mindset", "Tournament experience"],
      posted: "5 hours ago"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Esports Teams
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join legendary teams, form new squads, or recruit the best players for your championship run.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
          <Button variant="gaming" size="lg">
            <Plus className="h-4 w-4 mr-2" />
            Create Team
          </Button>
          <Button variant="secondary" size="lg">
            <Search className="h-4 w-4 mr-2" />
            Find Teams
          </Button>
        </div>

        {/* Teams Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Featured Teams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <Card key={team.id} className="group hover:shadow-glow transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 relative">
                    <Avatar className="h-20 w-20 border-2 border-primary/30">
                      <AvatarImage src={team.logo} alt={team.name} />
                      <AvatarFallback className="text-xl font-bold bg-gradient-primary text-primary-foreground">
                        {team.name.split(' ').map(word => word[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {team.isRecruiting && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Plus className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {team.name}
                  </CardTitle>
                  
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant="secondary">{team.game}</Badge>
                    {team.isRecruiting && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        Recruiting
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="mb-4 text-center">
                    {team.description}
                  </CardDescription>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {team.region}
                      </span>
                      <span className="text-muted-foreground flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {team.members} members
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        {team.rating} rating
                      </span>
                      <span className="text-muted-foreground flex items-center">
                        <Trophy className="h-4 w-4 mr-1 text-primary" />
                        {team.achievements} wins
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" variant="gaming">
                      View Team
                    </Button>
                    {team.isRecruiting && (
                      <Button variant="outline">
                        Apply
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recruitment Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-foreground">Looking for Players</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recruitmentPosts.map((post) => (
              <Card key={post.id} className="bg-card/30 backdrop-blur-sm border-border/30 hover:border-secondary/30 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{post.team}</CardTitle>
                    <Badge variant="outline">{post.game}</Badge>
                  </div>
                  <CardDescription>
                    Looking for: <span className="font-semibold text-foreground">{post.position}</span>
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm text-muted-foreground">Requirements:</h4>
                    <ul className="space-y-1">
                      {post.requirements.map((req, index) => (
                        <li key={index} className="text-sm flex items-center">
                          <Target className="h-3 w-3 mr-2 text-primary" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{post.posted}</span>
                    <Button size="sm" variant="secondary">
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;