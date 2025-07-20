import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Video, VideoOff, Mic, MicOff, PhoneOff, 
  Send, UserPlus, Flag, MoreVertical, SkipForward 
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  message: string;
  sender: 'me' | 'other';
  timestamp: Date;
}

const VideoChat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isFriend, setIsFriend] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Get user data from navigation state
  const otherUser = location.state?.user || {
    name: 'GameMaster123',
    gender: 'Male',
    game: 'BGMI'
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      message: newMessage,
      sender: 'me',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate other user response
    setTimeout(() => {
      const responses = [
        "Hey! Nice to meet you!",
        "What's your rank in this game?",
        "Want to team up for a match?",
        "Cool! Let's play together",
        "Which server do you usually play on?"
      ];
      
      const responseMessage: ChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        message: responses[Math.floor(Math.random() * responses.length)],
        sender: 'other',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 1000 + Math.random() * 2000);
  };

  const handleAddFriend = () => {
    setIsFriend(true);
    toast({
      title: "Friend Request Sent!",
      description: `Friend request sent to ${otherUser.name}.`
    });
  };

  const handleSkip = () => {
    toast({
      title: "Skipped User",
      description: "Finding you a new connection..."
    });
    navigate('/connect');
  };

  const handleEndCall = () => {
    toast({
      title: "Call Ended",
      description: "You have disconnected from the video chat."
    });
    navigate('/connect');
  };

  const handleReport = () => {
    toast({
      title: "User Reported",
      description: "Thank you for keeping our community safe. The user has been reported.",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-bg flex flex-col">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold">
                {otherUser.name[0]}
              </span>
            </div>
            <div>
              <h3 className="font-semibold">{otherUser.name}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {otherUser.game}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {otherUser.gender}
                </Badge>
                {isFriend && (
                  <Badge variant="default" className="text-xs bg-green-500">
                    Friend
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant={isFriend ? "default" : "outline"} 
              size="sm" 
              onClick={handleAddFriend}
              disabled={isFriend}
            >
              <UserPlus className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleSkip}>
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleReport}>
              <Flag className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="flex-1 flex">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col">
          {/* Videos */}
          <div className="flex-1 relative bg-black/20 backdrop-blur-sm">
            {/* Other User's Video (Main) */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              {isVideoOn ? (
                <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl text-primary-foreground">
                        {otherUser.name[0]}
                      </span>
                    </div>
                    <p className="text-white">{otherUser.name}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-white">
                  <VideoOff className="w-16 h-16 mx-auto mb-4" />
                  <p>Camera is off</p>
                </div>
              )}
            </div>

            {/* My Video (Picture-in-Picture) */}
            <div className="absolute top-4 right-4 w-48 h-36 bg-gray-900 rounded-lg border-2 border-white/20 overflow-hidden">
              {isVideoOn ? (
                <div className="w-full h-full bg-gradient-to-br from-accent/30 to-primary/30 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-xl text-secondary-foreground">
                        You
                      </span>
                    </div>
                    <p className="text-xs text-white">You</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <VideoOff className="w-8 h-8 text-white" />
                </div>
              )}
            </div>

          </div>

          {/* Controls */}
          <div className="bg-card/80 backdrop-blur-sm border-t border-border/50 p-4">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant={isAudioOn ? "default" : "destructive"}
                size="lg"
                className="rounded-full w-12 h-12"
                onClick={() => setIsAudioOn(!isAudioOn)}
              >
                {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </Button>
              
              <Button
                variant={isVideoOn ? "default" : "destructive"}
                size="lg"
                className="rounded-full w-12 h-12"
                onClick={() => setIsVideoOn(!isVideoOn)}
              >
                {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>
              
              <Button
                variant="destructive"
                size="lg"
                className="rounded-full w-12 h-12"
                onClick={handleEndCall}
              >
                <PhoneOff className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        <div className="w-80 bg-card/90 backdrop-blur-sm border-l border-border/50 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border/50">
            <h3 className="font-semibold">Chat</h3>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg ${
                    msg.sender === 'me'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border/50">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button size="sm" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoChat;
