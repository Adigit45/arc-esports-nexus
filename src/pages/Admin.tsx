import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { 
  Users, 
  Trophy, 
  UserCheck, 
  UserX, 
  Shield, 
  Activity,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

const Admin = () => {
  const { userType, isLoggedIn } = useAuth();

  // Only admins can access Admin Panel
  if (!isLoggedIn || userType !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const stats = [
    { title: "Total Users", value: "2,847", icon: Users, change: "+12%" },
    { title: "Active Teams", value: "184", icon: Shield, change: "+8%" },
    { title: "Tournaments", value: "23", icon: Trophy, change: "+3%" },
    { title: "Reports", value: "7", icon: AlertTriangle, change: "-15%" }
  ];

  const recentUsers = [
    { id: 1, name: "ProGamer_99", type: "player", status: "active", joinDate: "2024-01-15" },
    { id: 2, name: "TeamAlpha", type: "team", status: "active", joinDate: "2024-01-14" },
    { id: 3, name: "SkillSniper", type: "player", status: "banned", joinDate: "2024-01-13" },
    { id: 4, name: "EliteEsports", type: "team", status: "pending", joinDate: "2024-01-12" }
  ];

  const recentReports = [
    { id: 1, reporter: "User123", reported: "BadPlayer", reason: "Inappropriate behavior", status: "pending" },
    { id: 2, reporter: "CleanGamer", reported: "ToxicUser", reason: "Harassment", status: "resolved" },
    { id: 3, reporter: "FairPlay", reported: "Cheater99", reason: "Cheating", status: "investigating" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, teams, and platform activities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <stat.icon className="h-8 w-8 text-primary" />
                    <span className={`text-xs ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Recent Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.joinDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={user.type === 'team' ? 'secondary' : 'outline'}>
                        {user.type}
                      </Badge>
                      <Badge 
                        variant={
                          user.status === 'active' ? 'default' : 
                          user.status === 'banned' ? 'destructive' : 'secondary'
                        }
                      >
                        {user.status}
                      </Badge>
                      {user.status === 'active' && (
                        <Button variant="outline" size="sm">
                          <UserX className="h-4 w-4" />
                        </Button>
                      )}
                      {user.status === 'pending' && (
                        <Button variant="default" size="sm">
                          <UserCheck className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Reports */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Recent Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{report.reporter} → {report.reported}</p>
                      <Badge 
                        variant={
                          report.status === 'resolved' ? 'default' : 
                          report.status === 'investigating' ? 'secondary' : 'destructive'
                        }
                      >
                        {report.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{report.reason}</p>
                    {report.status === 'pending' && (
                      <div className="flex gap-2 mt-2">
                        <Button variant="default" size="sm">Investigate</Button>
                        <Button variant="outline" size="sm">Dismiss</Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Chart */}
        <Card className="bg-card border-border mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Platform Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Activity Chart Placeholder</p>
                <p className="text-sm text-muted-foreground">Integrate with analytics service</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;