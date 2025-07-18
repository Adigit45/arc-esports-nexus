import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  GamepadIcon, 
  Users, 
  Trophy, 
  Settings, 
  User, 
  LogOut,
  Menu,
  X,
  Shield,
  Zap
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userType, isLoggedIn, logout } = useAuth();

  // Navigation items based on user type
  const getNavItems = () => {
    if (userType === 'player') {
      return [
        { name: "Tournaments", href: "/tournaments", icon: Trophy },
        { name: "Recruitment", href: "/recruitment", icon: Users },
        { name: "Connect", href: "/connect", icon: Zap },
      ];
    } else if (userType === 'team') {
      return [
        { name: "Tournaments", href: "/tournaments", icon: Trophy },
        { name: "Team Management", href: "/teams", icon: Users },
        { name: "Recruitment", href: "/recruitment", icon: Users },
      ];
    }
    return [
      { name: "Tournaments", href: "/tournaments", icon: Trophy },
      { name: "Teams", href: "/teams", icon: Users },
    ];
  };

  const navItems = getNavItems();

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <GamepadIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <Link 
              to={isLoggedIn && userType === 'player' ? '/feed' : '/'} 
              className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent"
            >
              ARC Esports
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                      <AvatarFallback>AR</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Admin Panel</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/player-auth">
                  <Button variant="gaming">Player Login</Button>
                </Link>
                <Link to="/team-auth">
                  <Button variant="secondary">Team Login</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors p-2"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-border">
                {isLoggedIn ? (
                  <div className="flex flex-col space-y-2">
                    <Button variant="ghost" className="justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                    <Button variant="ghost" className="justify-start" onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link to="/player-auth">
                      <Button variant="gaming" className="w-full">Player Login</Button>
                    </Link>
                    <Link to="/team-auth">
                      <Button variant="secondary" className="w-full">Team Login</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;