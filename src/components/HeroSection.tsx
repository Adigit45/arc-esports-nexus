import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Trophy, Zap, Target } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { isLoggedIn } = useAuth();
  const stats = [
    { label: "Active Players", value: "50K+", icon: Users },
    { label: "Tournaments", value: "500+", icon: Trophy },
    { label: "Teams", value: "2K+", icon: Target },
    { label: "Matches Daily", value: "1K+", icon: Zap },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-bg overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      </div>
      
      {/* Floating Gaming Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-secondary/30 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-40 left-20 w-5 h-5 bg-accent/30 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-primary/30 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Badge */}
        <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
          🎮 India's Premier Esports Platform
        </Badge>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
          Dominate the
          <br />
          <span className="text-foreground">Esports Arena</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Join thousands of gamers, form legendary teams, and compete in epic tournaments. 
          Your esports journey starts here.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link to={isLoggedIn ? "/feed" : "/player-auth"}>
            <Button size="lg" variant="hero" className="px-8 py-6 text-lg">
              Start Gaming
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to={isLoggedIn ? "/tournaments" : "/player-auth"}>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
              Browse Tournaments
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="group p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="p-3 rounded-lg bg-gradient-primary/10 group-hover:bg-gradient-primary/20 transition-colors">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Link 
            to={isLoggedIn ? "/teams" : "/team-auth"} 
            className="block p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all duration-300 cursor-pointer hover:scale-105"
          >
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Form Teams</h3>
            <p className="text-muted-foreground">Connect with players, create legendary teams, and dominate the competition together.</p>
          </Link>
          
          <Link 
            to={isLoggedIn ? "/tournaments" : "/player-auth"} 
            className="block p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/30 hover:border-secondary/30 transition-all duration-300 cursor-pointer hover:scale-105"
          >
            <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Trophy className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Epic Tournaments</h3>
            <p className="text-muted-foreground">Compete in professional tournaments with real prizes and recognition.</p>
          </Link>
          
          <Link 
            to={isLoggedIn ? "/connect" : "/player-auth"} 
            className="block p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/30 hover:border-accent/30 transition-all duration-300 cursor-pointer hover:scale-105"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Zap className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Random Connect</h3>
            <p className="text-muted-foreground">Meet new players instantly and discover your next gaming partner.</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;