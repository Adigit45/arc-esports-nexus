import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isLoggedIn } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-bg">
      {isLoggedIn && <Navigation />}
      <HeroSection />
    </div>
  );
};

export default Index;
