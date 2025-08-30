import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import {
  Mic,
  Globe,
  Zap,
  Shield,
  Camera,
  Cpu,
  Heart,
  ArrowRight,
  CheckCircle,
  Play,
} from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  useIntersectionObserver();

  const features = [
    {
      icon: Mic,
      title: "Real-time Lip Reading",
      description:
        "Advanced AI algorithms capture and analyze lip movements with high accuracy in real-time.",
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description:
        "Support for multiple languages with downloadable language packs that can be updated.",
    },
    {
      icon: Zap,
      title: "Offline Processing",
      description:
        "Works completely offline - no internet connection required for core functionality.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "All processing happens locally on your device. Your conversations stay private.",
    },
    {
      icon: Camera,
      title: "High-Resolution Camera",
      description:
        "Uses advanced camera technology optimized for lip movement detection.",
    },
    {
      icon: Cpu,
      title: "Edge Optimized",
      description:
        "Designed for Raspberry Pi and other edge devices for portable communication.",
    },
  ];

  const benefits = [
    "Affordable alternative to expensive hearing aids",
    "Portable and wearable design",
    "Works in various lighting conditions",
    "Supports multiple face orientations",
    "Real-time text and speech synthesis",
    "Customizable voice output",
    "Future-ready with expandable features",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background to-muted/20">
        <div className="absolute inset-0 bg-gradient-to-r from-muted/10 to-muted/5"></div>
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-6">
              Affordable • Real-time • Multilingual
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl animate-fade-in">
              <span className="text-foreground">Liphera</span>
              <br />
              <span className="text-foreground">Communication Freedom</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-foreground md:text-xl animate-slide-up opacity-90">
              An affordable, real-time, multilingual lip-reading and speech
              synthesis device designed to help hearing-impaired individuals
              communicate without barriers.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-slide-up">
              <Button
                onClick={() => navigate("/demo")}
                size="lg"
                className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Play className="mr-2 h-4 w-4" />
                Try Live Demo
              </Button>
              <Button
                onClick={() => navigate("/languages")}
                variant="outline"
                size="lg"
                className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Globe className="mr-2 h-4 w-4" />
                Explore Languages
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Revolutionary Features
            </h2>
            <p className="text-lg text-muted-foreground">
              Cutting-edge technology designed for accessibility and
              independence
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-muted hover:border-border transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in group"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground transition-all duration-300 group-hover:scale-110">
                        <Icon className="h-5 w-5 text-background" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                Empowering Communication
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Liphera stands out with its focus on affordability, offline
                processing, and user-centered design. Our mission is to provide
                hearing-impaired individuals with independence and better
                communication tools.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 transition-all duration-300 hover:translate-x-2 hover:text-foreground group"
                  >
                    <CheckCircle className="h-5 w-5 text-foreground flex-shrink-0 transition-all duration-300 group-hover:scale-110" />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative scale-in-section">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-muted/20 to-muted/5 flex items-center justify-center transition-all duration-500 hover:scale-105 hover:shadow-xl group">
                <div className="text-center space-y-4">
                  <Heart className="h-16 w-16 text-foreground mx-auto animate-float transition-all duration-300 group-hover:scale-110" />
                  <h3 className="text-xl font-semibold">Built with Care</h3>
                  <p className="text-muted-foreground px-8">
                    Every feature is designed with accessibility and user needs
                    in mind
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Specs Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Technical Excellence
              </h2>
              <p className="text-lg text-muted-foreground">
                Optimized for edge devices with advanced AI capabilities
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Cpu className="h-5 w-5 text-foreground" />
                    <span>Hardware Requirements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Platform:</span>
                    <span>Raspberry Pi 4+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Camera:</span>
                    <span>High-resolution USB/CSI</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Storage:</span>
                    <span>32GB+ SD Card</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Power:</span>
                    <span>5V/3A USB-C</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-foreground" />
                    <span>Software Features</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Languages:</span>
                    <span>50+ supported</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Accuracy:</span>
                    <span>95%+ in optimal conditions</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Latency:</span>
                    <span>&lt;200ms processing</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Updates:</span>
                    <span>OTA language packs</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-foreground">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center text-background">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Ready to Experience Liphera?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Start communicating without barriers. Try our live demo or explore
              the language management features.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                onClick={() => navigate("/demo")}
                size="lg"
                variant="secondary"
                className="transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              >
                Start Demo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
