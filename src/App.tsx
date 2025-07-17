import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Tournaments from "./pages/Tournaments";
import Teams from "./pages/Teams";
import Connect from "./pages/Connect";
import Feed from "./pages/Feed";
import Recruitment from "./pages/Recruitment";
import PlayerAuth from "./pages/PlayerAuth";
import TeamAuth from "./pages/TeamAuth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/player-auth" element={<PlayerAuth />} />
            <Route path="/team-auth" element={<TeamAuth />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
