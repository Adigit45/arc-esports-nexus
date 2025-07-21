import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Trophy, 
  Calendar, 
  Users, 
  MapPin, 
  Search, 
  Filter,
  Plus,
  Clock,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Tournaments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("all");
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleTournamentClick = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please login or signup to join tournaments",
        variant: "destructive",
      });
      navigate("/player-auth");
      return;
    }
    // Tournament join logic would go here
  };

  const allTournaments = [
    {
      id: 1,
      name: "BGMI Championship 2024",
      game: "BGMI",
      type: "Squad",
      prize: "₹50,000",
      prizeValue: 50000,
      participants: "64/128",
      startDate: "2024-01-15",
      status: "Open",
      category: "prize",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      name: "Valorant Masters Cup",
      game: "Valorant",
      type: "Team",
      prize: "₹1,00,000",
      prizeValue: 100000,
      participants: "16/32",
      startDate: "2024-01-20",
      status: "Open",
      category: "prize",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "Free Fire Friday",
      game: "Free Fire",
      type: "Solo",
      prize: "₹10,000",
      prizeValue: 10000,
      participants: "45/100",
      startDate: "2024-01-12",
      status: "Ongoing",
      category: "prize",
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      name: "BGMI Fun Match",
      game: "BGMI",
      type: "Duo",
      prize: "Fun",
      prizeValue: 0,
      participants: "32/64",
      startDate: "2024-01-18",
      status: "Open",
      category: "fun",
      image: "/api/placeholder/300/200"
    },
    {
      id: 5,
      name: "Valorant Weekly",
      game: "Valorant",
      type: "Solo",
      prize: "Fun",
      prizeValue: 0,
      participants: "24/50",
      startDate: "2024-01-16",
      status: "Open",
      category: "fun",
      image: "/api/placeholder/300/200"
    },
  ];

  const filteredTournaments = allTournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.game.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (sortBy === "all") return matchesSearch;
    if (sortBy === "bgmi") return matchesSearch && tournament.game === "BGMI";
    if (sortBy === "valorant") return matchesSearch && tournament.game === "Valorant";
    if (sortBy === "freefire") return matchesSearch && tournament.game === "Free Fire";
    if (sortBy === "squad") return matchesSearch && tournament.type === "Squad";
    if (sortBy === "duo") return matchesSearch && tournament.type === "Duo";
    if (sortBy === "solo") return matchesSearch && tournament.type === "Solo";
    if (sortBy === "team") return matchesSearch && tournament.type === "Team";
    if (sortBy === "fun") return matchesSearch && tournament.category === "fun";
    if (sortBy === "prize") return matchesSearch && tournament.category === "prize";
    
    return matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "prize-high") return b.prizeValue - a.prizeValue;
    if (sortBy === "prize-low") return a.prizeValue - b.prizeValue;
    return 0;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Ongoing": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Closed": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Esports Tournaments
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Compete in epic tournaments, win amazing prizes, and prove your skills against the best players.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tournaments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Sort
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setSortBy("all")}>
                  All Tournaments
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("bgmi")}>
                  BGMI
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("valorant")}>
                  Valorant
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("freefire")}>
                  Free Fire
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("squad")}>
                  Squad
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("duo")}>
                  Duo
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("solo")}>
                  Solo
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("team")}>
                  Team
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("fun")}>
                  Fun Tournaments
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("prize")}>
                  Prize Tournaments
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("prize-high")}>
                  Prize: High to Low
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("prize-low")}>
                  Prize: Low to High
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="gaming">
              <Plus className="h-4 w-4 mr-2" />
              Create Tournament
            </Button>
          </div>
        </div>

        {/* Tournaments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament) => (
            <Card key={tournament.id} className="group hover:shadow-glow transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30">
              <CardHeader className="p-0">
                <div className="aspect-video bg-gradient-primary/10 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
                  <Trophy className="h-12 w-12 text-primary z-10" />
                  <Badge 
                    className={`absolute top-3 right-3 ${getStatusColor(tournament.status)}`}
                  >
                    {tournament.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {tournament.game}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {tournament.type}
                  </Badge>
                </div>
                
                <CardTitle className="mb-2 group-hover:text-primary transition-colors">
                  {tournament.name}
                </CardTitle>
                
                <CardDescription className="mb-4">
                  Experience the ultimate competitive gaming tournament with skilled players from across India.
                </CardDescription>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Trophy className="h-4 w-4 mr-2 text-primary" />
                    Prize Pool: <span className="font-semibold text-foreground ml-1">{tournament.prize}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2 text-secondary" />
                    Participants: <span className="font-semibold text-foreground ml-1">{tournament.participants}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2 text-accent" />
                    Starts: <span className="font-semibold text-foreground ml-1">{tournament.startDate}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" variant="gaming" onClick={handleTournamentClick}>
                    Join Tournament
                  </Button>
                  <Button variant="outline" size="icon">
                    <Clock className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Tournaments
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Tournaments;