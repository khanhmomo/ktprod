import { Camera, Brain, Cloud, Settings, Zap, Cpu, Shield, Database, Code, Package, Network, Server } from "lucide-react";
import { getPageContent } from "@/lib/database";
import { loadPageContentServer } from "@/lib/server-db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function TechPage() {
  const pageContent = await loadPageContentServer('tech');
  const content = pageContent || {
    pageTitle: "Technology Innovation",
    pageDescription: "Our research and development spans every bright idea, creating comprehensive technology platforms that transform concepts into reality.",
    softwareSolutions: [
      {
        id: "1",
        title: "Sport Photography Automation",
        description: "Advanced capture systems that automatically track and photograph athletes in real-time",
        features: ["Real-time tracking", "Automatic capture", "Cloud processing", "Instant delivery"],
      },
      {
        id: "2",
        title: "Face Recognition Albums",
        description: "AI-powered systems that automatically identify and sort photos by individuals",
        features: ["Face detection", "Auto-tagging", "Smart albums", "Privacy protection"],
      }
    ],
    hardwareSystems: [
      {
        id: "1",
        title: "High-Speed Camera Array",
        description: "Custom-built camera systems designed for professional event photography",
        specifications: ["4K resolution", "60fps capture", "Weather sealed", "Remote control"],
      },
      {
        id: "2",
        title: "Processing Server",
        description: "Dedicated hardware for real-time image processing and delivery",
        specifications: ["GPU acceleration", "SSD storage", "Network optimized", "Redundant power"],
      }
    ]
  };

  const infrastructure = [
    {
      icon: Database,
      title: "Photo Data Management",
      description: "Efficient systems for organizing and retrieving thousands of sport event photographs.",
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Secure handling of facial recognition data and client photographs with privacy protection.",
    },
    {
      icon: Server,
      title: "Real-time Processing",
      description: "High-performance infrastructure for instant photo processing and delivery.",
    },
    {
      icon: Code,
      title: "API Integration",
      description: "Flexible APIs for connecting with existing event management and timing systems.",
    },
  ];

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-poppins">
              <span className="text-primary">{content.pageTitle}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {content.pageDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Software Solutions */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold">Software Solutions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced software systems that leverage AI, cloud computing, and automation 
              to transform event photography workflows.
            </p>
          </div>
          <div className="space-y-8">
            {content.softwareSolutions.map((solution: any, index: number) => (
              <Card key={solution.id} className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="p-8 lg:p-12">
                    <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      <Camera className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{solution.title}</h3>
                    <p className="text-muted-foreground">{solution.description}</p>
                  </div>
                  <div className="lg:col-span-2 p-8 lg:p-12 bg-muted/30">
                    <h4 className="font-semibold mb-4">Key Features</h4>
                    <ul className="space-y-3">
                      {solution.features.map((feature: any, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <div className="h-2 w-2 bg-primary rounded-full"></div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware Systems */}
      <section className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold">Hardware Systems</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Custom-designed hardware solutions engineered specifically for the demanding 
              requirements of event and sport photography.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.hardwareSystems.map((system: any, index: number) => (
              <Card key={system.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <Settings className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{system.title}</CardTitle>
                  <CardDescription>{system.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3">Technical Specifications</h4>
                  <ul className="space-y-2">
                    {system.specifications.map((feature: any, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <div className="h-2 w-2 bg-primary rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold">Infrastructure & Architecture</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Robust, scalable infrastructure that powers our technology solutions and 
              ensures reliable performance under demanding conditions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {infrastructure.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Focus Areas */}
      <section className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold">Current R&D Focus</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Areas where we're actively pushing the boundaries of photography technology.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Computer Vision & AI</h3>
              <div className="space-y-4">
                <div className="bg-card rounded-2xl p-6 shadow-sm">
                  <h4 className="font-semibold mb-2">Runner Tracking Algorithms</h4>
                  <p className="text-sm text-muted-foreground">
                    Advanced object detection and tracking for automated sport photography.
                  </p>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-sm">
                  <h4 className="font-semibold mb-2">Facial Recognition Systems</h4>
                  <p className="text-sm text-muted-foreground">
                    Privacy-first face detection for automatic photo organization and tagging.
                  </p>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-sm">
                  <h4 className="font-semibold mb-2">Predictive Capture</h4>
                  <p className="text-sm text-muted-foreground">
                    Machine learning models that anticipate optimal photo moments in real-time.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Hardware Innovation</h3>
              <div className="space-y-4">
                <div className="bg-card rounded-2xl p-6 shadow-sm">
                  <h4 className="font-semibold mb-2">IoT Sensor Networks</h4>
                  <p className="text-sm text-muted-foreground">
                    Custom IoT devices for real-time event tracking and automated triggers.
                  </p>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-sm">
                  <h4 className="font-semibold mb-2">3D Printed Equipment</h4>
                  <p className="text-sm text-muted-foreground">
                    Rapid prototyping of custom camera mounts and specialized photography gear.
                  </p>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-sm">
                  <h4 className="font-semibold mb-2">Smart Camera Systems</h4>
                  <p className="text-sm text-muted-foreground">
                    Intelligent cameras with built-in processing for automated sport coverage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Integration */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold">Technology Integration</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              How our software and hardware solutions work together to create comprehensive photography systems.
            </p>
          </div>
          <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Capture</h3>
                <p className="text-sm text-muted-foreground">
                  Smart camera systems capture high-quality images with intelligent automation.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Process</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered software analyzes, selects, and enhances images in real-time.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                  <Cloud className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Deliver</h3>
                <p className="text-sm text-muted-foreground">
                  Cloud infrastructure ensures rapid delivery to clients and stakeholders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
