import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings as SettingsIcon,
  Volume2,
  Mic,
  Monitor,
  Palette,
  Shield,
  Download,
  RefreshCw,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [volume, setVolume] = useState([75]);
  const [speechRate, setSpeechRate] = useState([1.0]);
  const [pitch, setPitch] = useState([1.0]);
  const [voiceGender, setVoiceGender] = useState("female");
  const [autoSpeech, setAutoSpeech] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [confidence, setConfidence] = useState([80]);
  const [processingMode, setProcessingMode] = useState("balanced");

  const voiceOptions = [
    { id: "female1", name: "Emma (Female)", gender: "female", accent: "US" },
    { id: "male1", name: "James (Male)", gender: "male", accent: "US" },
    { id: "female2", name: "Sofia (Female)", gender: "female", accent: "UK" },
    { id: "male2", name: "Oliver (Male)", gender: "male", accent: "UK" },
  ];

  const processingModes = [
    {
      id: "performance",
      name: "Performance",
      description: "Faster processing, lower accuracy",
      icon: "⚡",
    },
    {
      id: "balanced",
      name: "Balanced",
      description: "Good balance of speed and accuracy",
      icon: "⚖️",
    },
    {
      id: "accuracy",
      name: "Accuracy",
      description: "Higher accuracy, slower processing",
      icon: "🎯",
    },
  ];

  return (
    <div className="min-h-screen pt-8 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-foreground">
              <SettingsIcon className="h-6 w-6 text-background" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">
                Customize your Liphera experience
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="audio" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="audio" className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4" />
              <span>Audio</span>
            </TabsTrigger>
            <TabsTrigger
              value="processing"
              className="flex items-center space-x-2"
            >
              <Mic className="h-4 w-4" />
              <span>Processing</span>
            </TabsTrigger>
            <TabsTrigger
              value="display"
              className="flex items-center space-x-2"
            >
              <Monitor className="h-4 w-4" />
              <span>Display</span>
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              className="flex items-center space-x-2"
            >
              <Shield className="h-4 w-4" />
              <span>Privacy</span>
            </TabsTrigger>
          </TabsList>

          {/* Audio Settings */}
          <TabsContent value="audio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Speech Synthesis</CardTitle>
                <CardDescription>
                  Configure audio output and voice parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="audio-enabled">Enable Audio Output</Label>
                    <p className="text-sm text-muted-foreground">
                      Generate speech from detected text
                    </p>
                  </div>
                  <Switch
                    id="audio-enabled"
                    checked={audioEnabled}
                    onCheckedChange={setAudioEnabled}
                  />
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Volume: {volume[0]}%</Label>
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="w-full"
                    disabled={!audioEnabled}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Speech Rate: {speechRate[0].toFixed(1)}x</Label>
                  <Slider
                    value={speechRate}
                    onValueChange={setSpeechRate}
                    min={0.5}
                    max={2.0}
                    step={0.1}
                    className="w-full"
                    disabled={!audioEnabled}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Pitch: {pitch[0].toFixed(1)}</Label>
                  <Slider
                    value={pitch}
                    onValueChange={setPitch}
                    min={0.5}
                    max={2.0}
                    step={0.1}
                    className="w-full"
                    disabled={!audioEnabled}
                  />
                </div>

                <Separator />

                <div>
                  <Label className="text-base">Voice Selection</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Choose your preferred voice for speech synthesis
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {voiceOptions.map((voice) => (
                      <Card
                        key={voice.id}
                        className="cursor-pointer hover:border-liphera-blue/50 transition-colors"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{voice.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {voice.accent} Accent
                              </p>
                            </div>
                            <Button size="sm" variant="outline">
                              <Volume2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-speech">Automatic Speech</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically speak detected text
                    </p>
                  </div>
                  <Switch
                    id="auto-speech"
                    checked={autoSpeech}
                    onCheckedChange={setAutoSpeech}
                    disabled={!audioEnabled}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Processing Settings */}
          <TabsContent value="processing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Processing</CardTitle>
                <CardDescription>
                  Configure lip reading detection and accuracy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base">Processing Mode</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Balance between speed and accuracy
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {processingModes.map((mode) => (
                      <Card
                        key={mode.id}
                        className={`cursor-pointer transition-colors ${
                          processingMode === mode.id
                            ? "border-foreground bg-muted/50"
                            : "hover:border-border"
                        }`}
                        onClick={() => setProcessingMode(mode.id)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl mb-2">{mode.icon}</div>
                          <p className="font-medium">{mode.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {mode.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Confidence Threshold: {confidence[0]}%</Label>
                  <p className="text-sm text-muted-foreground">
                    Minimum confidence level to display detected text
                  </p>
                  <Slider
                    value={confidence}
                    onValueChange={setConfidence}
                    min={50}
                    max={95}
                    step={5}
                    className="w-full"
                  />
                </div>

                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Model Performance</h4>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Current Model:
                        </span>
                        <span className="ml-2 font-medium">LipNet v2.1.0</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Last Updated:
                        </span>
                        <span className="ml-2 font-medium">2 days ago</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Check for Updates
                    </Button>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Display Settings */}
          <TabsContent value="display" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Display Preferences</CardTitle>
                <CardDescription>
                  Customize the appearance and interface
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Switch to dark theme for better low-light usage
                    </p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>

                <Separator />

                <div>
                  <Label className="text-base">Text Display Options</Label>
                  <div className="mt-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-confidence">
                        Show Confidence Scores
                      </Label>
                      <Switch id="show-confidence" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="large-text">Large Text Mode</Label>
                      <Switch id="large-text" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="highlight-uncertain">
                        Highlight Uncertain Words
                      </Label>
                      <Switch id="highlight-uncertain" defaultChecked />
                    </div>
                  </div>
                </div>

                <Card className="bg-muted/50 border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Palette className="h-4 w-4 text-foreground" />
                      <h4 className="font-medium">Color Themes</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Additional color themes coming soon
                    </p>
                    <Badge variant="outline">Coming Soon</Badge>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>
                  Control data usage and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="save-logs">Save Processing Logs</Label>
                    <p className="text-sm text-muted-foreground">
                      Keep logs for debugging and improvement
                    </p>
                  </div>
                  <Switch id="save-logs" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="analytics">Anonymous Analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Help improve Liphera by sharing usage statistics
                    </p>
                  </div>
                  <Switch id="analytics" defaultChecked />
                </div>

                <Separator />

                <div>
                  <Label className="text-base">Data Management</Label>
                  <div className="mt-3 space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Export Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Clear Cache
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full justify-start"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Reset All Settings
                    </Button>
                  </div>
                </div>

                <Card className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <h4 className="font-medium text-green-800 dark:text-green-200">
                        Privacy First
                      </h4>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      All processing happens locally on your device. Your
                      conversations and data never leave your device.
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Settings */}
        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
