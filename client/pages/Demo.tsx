import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import {
  Camera,
  Mic,
  MicOff,
  Play,
  Square,
  Settings,
  Volume2,
  Download,
  Copy,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DemoPage() {
  useIntersectionObserver();

  const [isRecording, setIsRecording] = useState(false);
  const [detectedText, setDetectedText] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [volume, setVolume] = useState(75);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulated real-time text detection
  const sampleTexts = [
    "Hello, how are you today?",
    "I need some help with this.",
    "Thank you very much.",
    "Could you please repeat that?",
    "I understand what you mean.",
    "Let's work together on this.",
    "Have a wonderful day!",
    "Nice to meet you.",
    "See you later.",
    "Good morning everyone.",
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRecording) {
      let textIndex = 0;
      interval = setInterval(() => {
        const text = sampleTexts[textIndex % sampleTexts.length];
        setDetectedText(text);
        setConfidence(Math.random() * 15 + 85); // Random confidence between 85-100%
        textIndex++;
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      setIsRecording(true);
      setDetectedText("Starting lip reading detection...");
    } catch (error) {
      console.error("Error accessing camera:", error);
      setDetectedText(
        "Camera access denied. Please enable camera permissions.",
      );
    }
  };

  const stopRecording = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    setIsRecording(false);
    setDetectedText("");
    setConfidence(0);
  };

  const copyText = () => {
    navigator.clipboard.writeText(detectedText);
  };

  const clearText = () => {
    setDetectedText("");
    setConfidence(0);
  };

  const languages = [
    { code: "en-US", name: "English (US)" },
    { code: "es-ES", name: "Spanish (Spain)" },
    { code: "fr-FR", name: "French (France)" },
    { code: "de-DE", name: "German (Germany)" },
  ];

  return (
    <div className="min-h-screen pt-8 pb-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 fade-in-section">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-foreground transition-all duration-300 hover:scale-110">
              <Mic className="h-6 w-6 text-background" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Live Demo</h1>
              <p className="text-muted-foreground">
                Experience real-time lip reading and speech synthesis
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Camera Feed */}
          <Card className="scale-in-section transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-5 w-5" />
                <span>Camera Feed</span>
                {isRecording && (
                  <Badge
                    variant="secondary"
                    className="bg-red-100 text-red-800 border-red-200"
                  >
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                    Recording
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Position yourself in good lighting with your face clearly
                visible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                />
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full"
                  style={{ display: "none" }}
                />
                {!isRecording && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <Camera className="h-12 w-12 text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">
                        Click start to begin
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-center space-x-4 mt-6">
                {!isRecording ? (
                  <Button onClick={startRecording} size="lg">
                    <Play className="mr-2 h-4 w-4" />
                    Start Recording
                  </Button>
                ) : (
                  <Button
                    onClick={stopRecording}
                    size="lg"
                    variant="destructive"
                    className="transition-all duration-300 hover:scale-105"
                  >
                    <Square className="mr-2 h-4 w-4" />
                    Stop Recording
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Real-time Text Output */}
          <Card className="scale-in-section transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <span>Detected Text</span>
                    {confidence > 0 && (
                      <Badge
                        variant="outline"
                        className={cn(
                          "ml-2",
                          confidence > 90
                            ? "border-green-500 text-green-700"
                            : confidence > 75
                              ? "border-yellow-500 text-yellow-700"
                              : "border-red-500 text-red-700",
                        )}
                      >
                        {confidence.toFixed(1)}% confidence
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    Real-time lip reading results will appear here
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyText}
                    disabled={!detectedText}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={clearText}
                    disabled={!detectedText}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="min-h-[200px] p-4 bg-muted/50 rounded-lg border-2 border-dashed border-border">
                {detectedText ? (
                  <div className="space-y-4">
                    <p className="text-lg leading-relaxed">{detectedText}</p>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Volume2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Audio synthesis ready
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="transition-all duration-300 hover:scale-105"
                      >
                        <Volume2 className="mr-2 h-4 w-4" />
                        Play Audio
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground text-center">
                      {isRecording
                        ? "Analyzing lip movements..."
                        : "Start recording to see detected text here"}
                    </p>
                  </div>
                )}
              </div>

              {/* Language and Settings */}
              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Language
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Audio Volume: {volume}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Stats */}
        <Card className="mt-8 fade-in-section transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Real-time processing statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {isRecording ? "156ms" : "0ms"}
                </div>
                <div className="text-sm text-muted-foreground">
                  Processing Latency
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {isRecording ? "30fps" : "0fps"}
                </div>
                <div className="text-sm text-muted-foreground">
                  Video Frame Rate
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {isRecording ? "94%" : "0%"}
                </div>
                <div className="text-sm text-muted-foreground">
                  Average Accuracy
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {isRecording ? "12%" : "0%"}
                </div>
                <div className="text-sm text-muted-foreground">CPU Usage</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="mt-8 bg-muted/50 border-border fade-in-section transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-foreground">
              Tips for Best Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-foreground rounded-full"></div>
                <span>Ensure good lighting on your face</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-foreground rounded-full"></div>
                <span>Keep your face centered in the camera view</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-foreground rounded-full"></div>
                <span>Speak clearly and at a normal pace</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-foreground rounded-full"></div>
                <span>Avoid covering your mouth or chin</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
