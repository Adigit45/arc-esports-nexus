import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Users, Mail, Phone, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TeamAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    login({
      id: '1',
      name: 'Elite Squad',
      email: 'team@example.com',
      type: 'team'
    });
    navigate('/feed');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration
    login({
      id: '1',
      name: 'New Team',
      email: 'newteam@example.com',
      type: 'team'
    });
    navigate('/feed');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-secondary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
            Team Portal
          </CardTitle>
          <CardDescription>
            Join ARC Esports as a Team/Organizer
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={isLogin ? 'login' : 'register'} onValueChange={(value) => setIsLogin(value === 'login')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email or Phone</Label>
                  <Input id="email" type="text" placeholder="Enter email or phone" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="otp">OTP</Label>
                  <Input id="otp" type="text" placeholder="Enter OTP" required />
                </div>
                <Button type="submit" className="w-full" variant="secondary">
                  Login as Team
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="teamname">Team/Organization Name</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="teamname" placeholder="Enter team name" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="reg-email" type="email" placeholder="Enter email" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" type="tel" placeholder="Enter phone" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-otp">OTP</Label>
                  <Input id="reg-otp" type="text" placeholder="Enter OTP" required />
                </div>
                <Button type="submit" className="w-full" variant="secondary">
                  Register as Team
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamAuth;