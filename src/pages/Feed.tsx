import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Play, 
  Trophy, 
  Camera,
  Video,
  Image as ImageIcon,
  Send
} from "lucide-react";

const Feed = () => {
  const { userType, isLoggedIn } = useAuth();
  const [postContent, setPostContent] = useState("");

  // Only players can access Feed
  if (!isLoggedIn || userType !== 'player') {
    return <Navigate to="/" replace />;
  }

  const mockPosts = [
    {
      id: 1,
      user: { name: "ProGamer_99", avatar: "", verified: true },
      content: "Just clutched a 1v4 in Valorant! 🔥",
      type: "achievement",
      game: "Valorant",
      likes: 142,
      comments: 23,
      timeAgo: "2h ago"
    },
    {
      id: 2,
      user: { name: "StreamQueen", avatar: "", verified: false },
      content: "New BGMI montage is live! Check out this insane headshot compilation 🎯",
      type: "content",
      game: "BGMI",
      likes: 89,
      comments: 15,
      timeAgo: "4h ago"
    },
    {
      id: 3,
      user: { name: "EsportsKing", avatar: "", verified: true },
      content: "Won our first tournament! Team chemistry was incredible 🏆",
      type: "achievement", 
      game: "Free Fire",
      likes: 256,
      comments: 41,
      timeAgo: "1d ago"
    }
  ];

  const handlePost = () => {
    if (postContent.trim()) {
      // Mock post creation
      setPostContent("");
      // In real app, would make API call
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-20 pb-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Create Post Section */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Share Your Gaming Moments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="What's happening in your gaming world?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="min-h-24 resize-none"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Photo
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="w-4 h-4 mr-2" />
                    Video
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trophy className="w-4 h-4 mr-2" />
                    Achievement
                  </Button>
                </div>
                
                <Button 
                  onClick={handlePost}
                  disabled={!postContent.trim()}
                  variant="gaming"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Feed Posts */}
          <div className="space-y-4">
            {mockPosts.map((post) => (
              <Card key={post.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  {/* User Info */}
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.user.avatar} />
                      <AvatarFallback>{post.user.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{post.user.name}</h3>
                        {post.user.verified && (
                          <Badge variant="secondary" className="text-xs">Verified</Badge>
                        )}
                        <Badge variant="outline" className="text-xs">{post.game}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{post.timeAgo}</p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <p className="text-foreground">{post.content}</p>
                    
                    {post.type === "content" && (
                      <div className="mt-3 aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <Play className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center space-x-6 pt-2 border-t border-border">
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
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

export default Feed;