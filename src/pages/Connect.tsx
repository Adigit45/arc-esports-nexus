import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Users, MessageCircle, SkipForward, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Connect = () => {
  const { userType, isLoggedIn } = useAuth();

  // Only players can access Connect feature
  if (!isLoggedIn || userType !== 'player') {
    return <Navigate to="/" replace />;
  }
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Badge variant="secondary" className="p-3 cursor-pointer hover:bg-secondary/80">
                  🎮 BGMI
                </Badge>
                <Badge variant="secondary" className="p-3 cursor-pointer hover:bg-secondary/80">
                  🔫 Valorant
                </Badge>
                <Badge variant="secondary" className="p-3 cursor-pointer hover:bg-secondary/80">
                  🔥 Free Fire
                </Badge>
              </div>
              
              <Button size="lg" variant="hero" className="px-12 py-6">
                <Users className="mr-2 h-5 w-5" />
                Start Connecting
              </Button>
              
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