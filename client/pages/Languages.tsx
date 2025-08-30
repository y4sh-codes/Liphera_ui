import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Download, Languages, CheckCircle, Clock, Globe } from "lucide-react";

export default function LanguagesPage() {
  useIntersectionObserver();

  const installedLanguages = [
    {
      name: "English (US)",
      code: "en-US",
      size: "245 MB",
      accuracy: "98%",
      status: "installed",
      version: "v2.1.0",
    },
    {
      name: "Spanish (Spain)",
      code: "es-ES",
      size: "189 MB",
      accuracy: "96%",
      status: "installed",
      version: "v2.0.3",
    },
    {
      name: "French (France)",
      code: "fr-FR",
      size: "201 MB",
      accuracy: "95%",
      status: "downloading",
      progress: 67,
      version: "v2.1.1",
    },
  ];

  const availableLanguages = [
    {
      name: "German (Germany)",
      code: "de-DE",
      size: "198 MB",
      accuracy: "97%",
      status: "available",
      version: "v2.1.0",
    },
    {
      name: "Italian (Italy)",
      code: "it-IT",
      size: "176 MB",
      accuracy: "94%",
      status: "available",
      version: "v2.0.8",
    },
    {
      name: "Portuguese (Brazil)",
      code: "pt-BR",
      size: "187 MB",
      accuracy: "93%",
      status: "available",
      version: "v2.0.5",
    },
    {
      name: "Japanese",
      code: "ja-JP",
      size: "234 MB",
      accuracy: "91%",
      status: "available",
      version: "v1.9.2",
    },
    {
      name: "Chinese (Mandarin)",
      code: "zh-CN",
      size: "267 MB",
      accuracy: "89%",
      status: "available",
      version: "v1.8.7",
    },
    {
      name: "Arabic",
      code: "ar-SA",
      size: "223 MB",
      accuracy: "87%",
      status: "available",
      version: "v1.7.3",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "installed":
        return (
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 border-green-200"
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            Installed
          </Badge>
        );
      case "downloading":
        return (
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-800 border-blue-200"
          >
            <Clock className="w-3 h-3 mr-1" />
            Downloading
          </Badge>
        );
      default:
        return <Badge variant="outline">Available</Badge>;
    }
  };

  return (
    <div className="min-h-screen pt-8 pb-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 fade-in-section">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-foreground transition-all duration-300 hover:scale-110">
              <Languages className="h-6 w-6 text-background" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Language Management
              </h1>
              <p className="text-muted-foreground">
                Download and manage language packs for your ML model
              </p>
            </div>
          </div>
        </div>

        {/* Installed Languages */}
        <section className="mb-12 fade-in-section">
          <h2 className="text-2xl font-semibold mb-6">Installed Languages</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {installedLanguages.map((language) => (
              <Card
                key={language.code}
                className="border-muted hover:border-border transition-all duration-300 hover:scale-105 hover:shadow-lg scale-in-section group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{language.name}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {language.code} • {language.size}
                      </CardDescription>
                    </div>
                    {getStatusBadge(language.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  {language.status === "downloading" && (
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Downloading...</span>
                        <span>{language.progress}%</span>
                      </div>
                      <Progress value={language.progress} className="h-2" />
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Accuracy:</span>
                    <span className="font-medium">{language.accuracy}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Version:</span>
                    <span className="font-medium">{language.version}</span>
                  </div>
                  {language.status === "installed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-3 group-hover:scale-105"
                    >
                      Configure
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Available Languages */}
        <section className="fade-in-section">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Available Languages</h2>
            <Button
              variant="outline"
              className="transition-all duration-300 hover:scale-105"
            >
              <Globe className="w-4 h-4 mr-2" />
              Browse All Languages
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableLanguages.map((language) => (
              <Card
                key={language.code}
                className="border-muted hover:border-border transition-all duration-300 hover:scale-105 hover:shadow-lg scale-in-section group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{language.name}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {language.code} • {language.size}
                      </CardDescription>
                    </div>
                    {getStatusBadge(language.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-muted-foreground">Accuracy:</span>
                    <span className="font-medium">{language.accuracy}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-muted-foreground">Version:</span>
                    <span className="font-medium">{language.version}</span>
                  </div>
                  <Button className="w-full group-hover:scale-105">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Storage Info */}
        <Card className="mt-12 bg-muted/50 fade-in-section transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Storage Usage</span>
            </CardTitle>
            <CardDescription>
              Manage your device storage and language pack usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Used Storage</span>
                  <span>2.1 GB of 32 GB</span>
                </div>
                <Progress value={6.5} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Language Packs:</span>
                  <span className="ml-2 font-medium">1.8 GB</span>
                </div>
                <div>
                  <span className="text-muted-foreground">System:</span>
                  <span className="ml-2 font-medium">0.3 GB</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
