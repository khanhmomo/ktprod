import Link from "next/link";
import { ArrowRight, Cpu, Camera, Zap, Cloud, Brain, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const techFocus = [
    {
      icon: Camera,
      title: "Sport Photography Automation",
      description: "Intelligent capture system that automatically tracks and photographs runners on track with precision timing.",
    },
    {
      icon: Brain,
      title: "Face Recognition Albums",
      description: "AI-powered facial recognition technology that automatically organizes photos by person for smart photo albums.",
    },
    {
      icon: Settings,
      title: "IoT Device Integration",
      description: "Custom IoT devices and sensors that enable real-time data collection and automated photography triggers.",
    },
    {
      icon: Cpu,
      title: "3D Design & Printing",
      description: "Advanced 3D modeling and printing solutions for custom camera mounts and specialized equipment.",
    },
    {
      icon: Cloud,
      title: "Web Development",
      description: "Full-stack web applications for photo management, event coverage, and client delivery systems.",
    },
    {
      icon: Zap,
      title: "Automation Systems",
      description: "End-to-end automation solutions that connect capture, processing, and delivery workflows.",
    },
  ];

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-16 pt-16">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-black">
            {/* Desktop Video */}
            <iframe
              src="https://player.vimeo.com/video/273843198?background=1&autoplay=1&loop=1&muted=1&byline=0&title=0&portrait=0"
              className="hidden md:block absolute inset-0 w-full h-full"
              style={{ 
                width: '150vw', 
                height: '150vh', 
                left: '-25vw', 
                top: '-25vh',
                minWidth: '100vw',
                minHeight: '100vh',
                objectFit: 'cover'
              }}
              allow="autoplay; fullscreen; picture-in-picture"
              title="Desktop Background Video"
            />
            
            {/* Mobile Video */}
            <iframe
              src="https://player.vimeo.com/video/273843198?background=1&autoplay=1&loop=1&muted=1&byline=0&title=0&portrait=0"
              className="block md:hidden absolute inset-0 w-full h-full"
              style={{
                width: '300vw',
                height: '300vh',
                left: '-100vw',
                top: '-100vh',
                minWidth: '100vw',
                minHeight: '100vh',
                transform: 'scale(1.5)'
              }}
              allow="autoplay; fullscreen; picture-in-picture"
              title="Mobile Background Video"
            />
          </div>
          {/* Black and White Filter + Blur Overlay */}
          <div className="absolute inset-0">
            <div className="w-full h-full bg-black/20 backdrop-blur-sm dark:filter dark:grayscale dark:contrast-110"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30"></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight font-poppins text-white drop-shadow-lg">
                <span className="text-white">
                  R&D for Every
                </span>
                <br />
                <span className="text-accent-red">Bright Idea</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
                KTProd Technology pioneers innovative hardware and software solutions for 
                any concept that pushes boundaries. From automation to IoT, 
                we transform creative ideas into technological reality.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tech">
                <Button size="lg" className="text-lg px-6 py-4 sm:px-8 sm:py-6 bg-accent-red hover:bg-accent-red/90 text-white dark:text-white shadow-lg">
                  Explore Technology
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary" size="lg" className="text-lg px-6 py-4 sm:px-8 sm:py-6 bg-white/90 hover:bg-white text-accent-red dark:bg-background dark:text-white dark:hover:bg-muted backdrop-blur-sm shadow-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About KTProd */}
      <section className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">About KTProd Technology</h2>
              <p className="text-lg text-muted-foreground">
                We are a research and development company dedicated to advancing the 
                field of event and sport photography through technological innovation.
              </p>
              <p className="text-muted-foreground">
                Our team combines expertise in software engineering, hardware design, 
                and photography to create solutions that address the unique challenges 
                of capturing and processing high-volume event imagery.
              </p>
              <Link href="/about">
                <Button variant="outline">
                  Discover Our Mission
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">R&D</div>
                  <div className="text-sm text-muted-foreground">Focused Innovation</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">2</div>
                  <div className="text-sm text-muted-foreground">Technology Pillars</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">∞</div>
                  <div className="text-sm text-muted-foreground">Scalability</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Event Coverage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Focus */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold">Technology Focus Areas</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our R&D spans both software and hardware solutions to create comprehensive 
              photography systems for events and sports.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techFocus.map((tech, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-2xl bg-accent-red/10 flex items-center justify-center mb-4">
                    <tech.icon className="h-6 w-6 text-accent-red" />
                  </div>
                  <CardTitle className="text-lg">{tech.title}</CardTitle>
                  <CardDescription>{tech.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Highlights */}
      <section className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold">Innovation Highlights</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Breaking new ground in event photography technology through continuous research.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-2xl bg-accent-red/10 flex items-center justify-center mx-auto">
                <Zap className="h-8 w-8 text-accent-red" />
              </div>
              <h3 className="text-xl font-semibold">Real-time Processing</h3>
              <p className="text-muted-foreground">
                Instant image processing and delivery for immediate event coverage.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Intelligent Automation</h3>
              <p className="text-muted-foreground">
                AI-powered systems that anticipate and capture key moments automatically.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Cloud className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Cloud Integration</h3>
              <p className="text-muted-foreground">
                Scalable cloud infrastructure for handling high-volume event photography.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-bold">Latest from Our Blog</h2>
              <p className="text-muted-foreground mt-2">
                Insights, updates, and breakthroughs from our R&D team.
              </p>
            </div>
            <Link href="/blog">
              <Button variant="outline">
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-video bg-muted rounded-2xl mb-4"></div>
                <CardTitle className="text-lg">Advancing AI in Sport Photography</CardTitle>
                <CardDescription>
                  Exploring the latest developments in machine learning for automated sports coverage.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Coming soon...</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-video bg-muted rounded-2xl mb-4"></div>
                <CardTitle className="text-lg">Hardware Innovations for Events</CardTitle>
                <CardDescription>
                  Our latest custom camera systems designed for high-volume event photography.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Coming soon...</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="aspect-video bg-muted rounded-2xl mb-4"></div>
                <CardTitle className="text-lg">Cloud Architecture at Scale</CardTitle>
                <CardDescription>
                  Building infrastructure to handle millions of photos from major sporting events.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Coming soon...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold">
              Ready to Transform Your Event Photography?
            </h2>
            <p className="text-lg max-w-2xl mx-auto opacity-90">
              Join us in revolutionizing event and sport photography through cutting-edge 
              technology and innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6 bg-accent-red hover:bg-accent-red/90 text-white">
                  Get in Touch
                </Button>
              </Link>
              <Link href="/tech">
                <Button variant="secondary" size="lg" className="text-lg px-8 py-6 bg-white hover:bg-gray-100 text-accent-red dark:bg-background dark:text-white dark:hover:bg-muted">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
