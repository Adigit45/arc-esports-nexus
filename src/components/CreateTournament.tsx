import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  Trophy, 
  Users, 
  MapPin, 
  Calendar, 
  Clock,
  Target,
  DollarSign,
  Image as ImageIcon,
  FileText,
  Gamepad2,
  CheckCircle
} from "lucide-react";

interface TournamentData {
  game: string;
  format: string;
  hasPrizepool: boolean;
  prizepool: string;
  name: string;
  description: string;
  maxParticipants: string;
  registrationStart: string;
  registrationEnd: string;
  tournamentStart: string;
  tournamentEnd: string;
  location: string;
  banner: File | null;
  rules: string;
  roadmap: Array<{
    stage: string;
    description: string;
    date: string;
    time: string;
  }>;
}

const CreateTournament = () => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();

  const [tournamentData, setTournamentData] = useState<TournamentData>({
    game: "",
    format: "",
    hasPrizepool: false,
    prizepool: "",
    name: "",
    description: "",
    maxParticipants: "",
    registrationStart: "",
    registrationEnd: "",
    tournamentStart: "",
    tournamentEnd: "",
    location: "",
    banner: null,
    rules: "",
    roadmap: []
  });

  const games = [
    {
      id: "bgmi",
      name: "BGMI",
      formats: [
        { id: "squad", name: "Squad (4 Players)", icon: "👥" },
        { id: "duo", name: "Duo (2 Players)", icon: "👫" },
        { id: "solo", name: "Solo (1 Player)", icon: "👤" }
      ]
    },
    {
      id: "valorant",
      name: "Valorant",
      formats: [
        { id: "team", name: "Team (5 Players)", icon: "👥" },
        { id: "3v3", name: "3v3 (3 Players)", icon: "👫" },
        { id: "1v1", name: "1v1 (1 Player)", icon: "👤" }
      ]
    },
    {
      id: "freefire",
      name: "Free Fire",
      formats: [
        { id: "squad", name: "Squad (4 Players)", icon: "👥" },
        { id: "duo", name: "Duo (2 Players)", icon: "👫" },
        { id: "solo", name: "Solo (1 Player)", icon: "👤" }
      ]
    },
    {
      id: "cod",
      name: "Call of Duty Mobile",
      formats: [
        { id: "5v5", name: "5v5 Team", icon: "👥" },
        { id: "2v2", name: "2v2 Duo", icon: "👫" },
        { id: "1v1", name: "1v1 Solo", icon: "👤" }
      ]
    }
  ];

  const addRoadmapStage = () => {
    setTournamentData(prev => ({
      ...prev,
      roadmap: [...prev.roadmap, { stage: "", description: "", date: "", time: "" }]
    }));
  };

  const updateRoadmapStage = (index: number, field: string, value: string) => {
    setTournamentData(prev => ({
      ...prev,
      roadmap: prev.roadmap.map((stage, i) => 
        i === index ? { ...stage, [field]: value } : stage
      )
    }));
  };

  const removeRoadmapStage = (index: number) => {
    setTournamentData(prev => ({
      ...prev,
      roadmap: prev.roadmap.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTournamentData(prev => ({ ...prev, banner: file }));
    }
  };

  const selectedGame = games.find(g => g.id === tournamentData.game);

  const handleNext = () => {
    if (currentStep === 1 && (!tournamentData.game || !tournamentData.format)) {
      toast({
        title: "Missing Information",
        description: "Please select a game and format to continue.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!tournamentData.name || !tournamentData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Tournament Created!",
      description: "Your tournament has been created successfully and is pending approval.",
    });
    
    setOpen(false);
    setCurrentStep(1);
    setTournamentData({
      game: "",
      format: "",
      hasPrizepool: false,
      prizepool: "",
      name: "",
      description: "",
      maxParticipants: "",
      registrationStart: "",
      registrationEnd: "",
      tournamentStart: "",
      tournamentEnd: "",
      location: "",
      banner: null,
      rules: "",
      roadmap: []
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Gamepad2 className="h-5 w-5" />
                Select Game
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {games.map((game) => (
                  <Card 
                    key={game.id}
                    className={`cursor-pointer transition-all ${
                      tournamentData.game === game.id 
                        ? 'border-primary bg-primary/5' 
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setTournamentData(prev => ({ ...prev, game: game.id, format: "" }))}
                  >
                    <CardContent className="p-4 text-center">
                      <h4 className="font-medium">{game.name}</h4>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {selectedGame && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Select Format
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {selectedGame.formats.map((format) => (
                    <Card 
                      key={format.id}
                      className={`cursor-pointer transition-all ${
                        tournamentData.format === format.id 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => setTournamentData(prev => ({ ...prev, format: format.id }))}
                    >
                      <CardContent className="p-4 flex items-center gap-3">
                        <span className="text-2xl">{format.icon}</span>
                        <div>
                          <h4 className="font-medium">{format.name}</h4>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Prize Pool Settings
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="no-prize"
                  name="prizepool"
                  checked={!tournamentData.hasPrizepool}
                  onChange={() => setTournamentData(prev => ({ ...prev, hasPrizepool: false, prizepool: "" }))}
                />
                <Label htmlFor="no-prize">Fun Tournament (No Prize Pool)</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="with-prize"
                  name="prizepool"
                  checked={tournamentData.hasPrizepool}
                  onChange={() => setTournamentData(prev => ({ ...prev, hasPrizepool: true }))}
                />
                <Label htmlFor="with-prize">Prize Pool Tournament</Label>
              </div>

              {tournamentData.hasPrizepool && (
                <div className="mt-4">
                  <Label htmlFor="prizepool-amount">Prize Pool Amount</Label>
                  <Input
                    id="prizepool-amount"
                    placeholder="Enter prize pool amount (e.g., ₹50,000)"
                    value={tournamentData.prizepool}
                    onChange={(e) => setTournamentData(prev => ({ ...prev, prizepool: e.target.value }))}
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Tournament Banner & Basic Info
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="banner">Tournament Banner</Label>
                <div className="mt-2">
                  <label htmlFor="banner-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      {tournamentData.banner ? (
                        <div className="space-y-2">
                          <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                          <p className="text-sm text-muted-foreground">Banner uploaded: {tournamentData.banner.name}</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                          <p className="text-sm text-muted-foreground">Click to upload banner image</p>
                        </div>
                      )}
                    </div>
                  </label>
                  <input
                    id="banner-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tournament-name">Tournament Name *</Label>
                <Input
                  id="tournament-name"
                  placeholder="Enter tournament name"
                  value={tournamentData.name}
                  onChange={(e) => setTournamentData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your tournament..."
                  value={tournamentData.description}
                  onChange={(e) => setTournamentData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="max-participants">Max Participants</Label>
                  <Input
                    id="max-participants"
                    placeholder="e.g., 64"
                    value={tournamentData.maxParticipants}
                    onChange={(e) => setTournamentData(prev => ({ ...prev, maxParticipants: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Online, Mumbai"
                    value={tournamentData.location}
                    onChange={(e) => setTournamentData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Tournament Schedule
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reg-start">Registration Start</Label>
                <Input
                  id="reg-start"
                  type="datetime-local"
                  value={tournamentData.registrationStart}
                  onChange={(e) => setTournamentData(prev => ({ ...prev, registrationStart: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="reg-end">Registration End</Label>
                <Input
                  id="reg-end"
                  type="datetime-local"
                  value={tournamentData.registrationEnd}
                  onChange={(e) => setTournamentData(prev => ({ ...prev, registrationEnd: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="tournament-start">Tournament Start</Label>
                <Input
                  id="tournament-start"
                  type="datetime-local"
                  value={tournamentData.tournamentStart}
                  onChange={(e) => setTournamentData(prev => ({ ...prev, tournamentStart: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="tournament-end">Tournament End</Label>
                <Input
                  id="tournament-end"
                  type="datetime-local"
                  value={tournamentData.tournamentEnd}
                  onChange={(e) => setTournamentData(prev => ({ ...prev, tournamentEnd: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="rules">Tournament Rules</Label>
              <Textarea
                id="rules"
                placeholder="Enter tournament rules and regulations..."
                value={tournamentData.rules}
                onChange={(e) => setTournamentData(prev => ({ ...prev, rules: e.target.value }))}
                rows={6}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Target className="h-5 w-5" />
                Tournament Roadmap
              </h3>
              <Button onClick={addRoadmapStage} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Stage
              </Button>
            </div>
            
            <div className="space-y-4">
              {tournamentData.roadmap.map((stage, index) => (
                <Card key={index} className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor={`stage-name-${index}`}>Stage Name</Label>
                      <Input
                        id={`stage-name-${index}`}
                        placeholder="e.g., Qualifiers, Semi-Finals"
                        value={stage.stage}
                        onChange={(e) => updateRoadmapStage(index, 'stage', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`stage-date-${index}`}>Date</Label>
                      <Input
                        id={`stage-date-${index}`}
                        type="date"
                        value={stage.date}
                        onChange={(e) => updateRoadmapStage(index, 'date', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor={`stage-time-${index}`}>Time</Label>
                      <Input
                        id={`stage-time-${index}`}
                        type="time"
                        value={stage.time}
                        onChange={(e) => updateRoadmapStage(index, 'time', e.target.value)}
                      />
                    </div>
                    <div className="flex items-end">
                      <Button 
                        onClick={() => removeRoadmapStage(index)} 
                        variant="destructive" 
                        size="sm"
                        className="w-full"
                      >
                        Remove Stage
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`stage-desc-${index}`}>Description</Label>
                    <Textarea
                      id={`stage-desc-${index}`}
                      placeholder="Describe this stage..."
                      value={stage.description}
                      onChange={(e) => updateRoadmapStage(index, 'description', e.target.value)}
                      rows={2}
                    />
                  </div>
                </Card>
              ))}
              
              {tournamentData.roadmap.length === 0 && (
                <div className="text-center p-8 border-2 border-dashed border-border rounded-lg">
                  <Target className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No stages added yet</p>
                  <Button onClick={addRoadmapStage} variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Stage
                  </Button>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="gaming">
          <Plus className="h-4 w-4 mr-2" />
          Create Tournament
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Create New Tournament
          </DialogTitle>
          <DialogDescription>
            Step {currentStep} of 5: Create an amazing tournament for the esports community
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-6">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          ></div>
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t">
          <Button 
            onClick={handlePrevious} 
            variant="outline" 
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < 5 ? (
            <Button onClick={handleNext} variant="gaming">
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} variant="gaming">
              <Trophy className="h-4 w-4 mr-2" />
              Create Tournament
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTournament;