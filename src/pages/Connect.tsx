import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Users, MessageCircle, SkipForward, Heart, Flag, UserX, Gamepad2, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface RandomUser {
  id: string;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  game: string;
  status: 'online' | 'in-game' | 'away';
}

const Connect = () => {
  const { userType, isLoggedIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentUser, setCurrentUser] = useState<RandomUser | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');

  // Only players can access Connect feature
  if (!isLoggedIn || userType !== 'player') {
    return <Navigate to="/" replace />;
  }

  const generateRandomUser = (): RandomUser => {
    const names = ['GameMaster', 'ProGamer', 'SkillSniper', 'ElitePlayer', 'TacticalAce', 'CyberWarrior', 'NightHawk', 'StormRider'];
    const genders: ('Male' | 'Female' | 'Other')[] = ['Male', 'Female', 'Other'];
    const statuses: ('online' | 'in-game' | 'away')[] = ['online', 'in-game'];
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      name: names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 999),
      gender: genders[Math.floor(Math.random() * genders.length)],
      game: selectedGame || 'BGMI',
      status: statuses[Math.floor(Math.random() * statuses.length)]
    };
  };

  const handleStartConnecting = () => {
    if (!selectedGame) {
      toast({
        title: "Select a Game",
        description: "Please select a game before connecting",
        variant: "destructive"
      });
      return;
    }
    
    setIsConnecting(true);
    setIsSearching(true);
    
    // Simulate finding a user
    setTimeout(() => {
      setCurrentUser(generateRandomUser());
      setIsSearching(false);
    }, 2000);
  };

  const handleSkip = () => {
    setIsSearching(true);
    setTimeout(() => {
      setCurrentUser(generateRandomUser());
      setIsSearching(false);
    }, 1500);
  };

  const handleReport = () => {
    toast({
      title: "User Reported",
      description: "Thank you for keeping our community safe. The user has been reported.",
    });
    handleSkip();
  };

  const handleConnect = () => {
    toast({
      title: "Connection Established!",
      description: `You are now connected with ${currentUser?.name}. Start chatting!`,
    });
    // Navigate to video chat page
    navigate('/video-chat', { state: { user: currentUser } });
  };
  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Random Connect
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet new gamers instantly. Find your next teammate, practice partner, or gaming buddy.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-8">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                Quick Match
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              {!isConnecting ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Badge 
                      variant={selectedGame === 'BGMI' ? 'default' : 'secondary'} 
                      className="p-3 cursor-pointer hover:bg-secondary/80"
                      onClick={() => setSelectedGame('BGMI')}
                    >
                      🎮 BGMI
                    </Badge>
                    <Badge 
                      variant={selectedGame === 'Valorant' ? 'default' : 'secondary'} 
                      className="p-3 cursor-pointer hover:bg-secondary/80"
                      onClick={() => setSelectedGame('Valorant')}
                    >
                      🔫 Valorant
                    </Badge>
                    <Badge 
                      variant={selectedGame === 'Free Fire' ? 'default' : 'secondary'} 
                      className="p-3 cursor-pointer hover:bg-secondary/80"
                      onClick={() => setSelectedGame('Free Fire')}
                    >
                      🔥 Free Fire
                    </Badge>
                  </div>
                  
                  <Button size="lg" variant="hero" className="px-12 py-6" onClick={handleStartConnecting}>
                    <Users className="mr-2 h-5 w-5" />
                    Start Connecting
                  </Button>
                </>
              ) : (
                <div className="space-y-8">
                  {/* Connection Status */}
                  <div className="text-center">
                    {isSearching ? (
                      <div className="space-y-4">
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <h3 className="text-xl font-semibold">Finding Perfect Match...</h3>
                        <p className="text-muted-foreground">Searching for {selectedGame} players</p>
                      </div>
                    ) : currentUser && (
                      <div className="space-y-6">
                        {/* User Card */}
                        <Card className="bg-gradient-primary/10 backdrop-blur-sm border-primary/30 max-w-md mx-auto">
                          <CardContent className="p-8 text-center">
                            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                              <Gamepad2 className="w-10 h-10 text-primary-foreground" />
                            </div>
                            
                            <h3 className="text-2xl font-bold mb-2">{currentUser.name}</h3>
                            
                            <div className="flex items-center justify-center gap-4 mb-4">
                              <Badge variant="outline" className="border-primary/50">
                                {currentUser.gender}
                              </Badge>
                              <Badge variant="secondary">
                                {currentUser.game}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <div className={`w-2 h-2 rounded-full ${
                                  currentUser.status === 'online' ? 'bg-green-500' : 
                                  currentUser.status === 'in-game' ? 'bg-orange-500' : 'bg-gray-500'
                                }`}></div>
                                <span className="text-sm text-muted-foreground capitalize">{currentUser.status}</span>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-6">
                              Ready to team up and dominate the game together!
                            </p>

                            {/* Action Buttons */}
                            <div className="flex justify-center gap-3">
                              <Button variant="hero" size="lg" onClick={handleConnect} className="flex-1">
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Connect
                              </Button>
                              
                              <Button variant="outline" size="lg" onClick={handleSkip}>
                                <SkipForward className="h-4 w-4" />
                              </Button>
                              
                              <Button variant="destructive" size="lg" onClick={handleReport}>
                                <Flag className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Control Tips */}
                        <div className="flex justify-center gap-8 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <SkipForward className="h-4 w-4" />
                            <span>Skip User</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Flag className="h-4 w-4" />
                            <span>Report</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <p className="text-sm text-muted-foreground">
                Anonymous by default • Reveal identity when ready • Skip anytime
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card/30 backdrop-blur-sm border-border/30">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Chat Instantly</h3>
                <p className="text-sm text-muted-foreground">Start conversations with gamers worldwide</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/30 backdrop-blur-sm border-border/30">
              <CardContent className="p-6 text-center">
                <SkipForward className="h-8 w-8 text-secondary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Skip Anytime</h3>
                <p className="text-sm text-muted-foreground">Not a match? Skip to the next player</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/30 backdrop-blur-sm border-border/30">
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Make Friends</h3>
                <p className="text-sm text-muted-foreground">Build lasting gaming relationships</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;