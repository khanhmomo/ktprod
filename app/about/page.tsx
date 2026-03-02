import { Target, Lightbulb, Users, Award, ArrowRight } from "lucide-react";
import { getPageContent } from "@/lib/database-appwrite";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AboutPage() {
  const pageContent = await getPageContent('about');
  const content = pageContent || {
    pageTitle: "About KTProd Technology",
    pageDescription: "Two college students with a passion for innovation, transforming photography challenges into technological solutions that benefit everyone.",
    companyStory: "We began as two college students who loved to change the world around us. Starting as sports photographers, we discovered that technology could bring tremendous benefits to everyone—not just photographers and racers, but to all people. With passion and a love for innovation, we dedicate ourselves to bringing every bright idea to life, transforming creative concepts into practical technological solutions that make a real difference.",
    missionStatement: "To empower people with innovative technology that transforms creative challenges into opportunities, making advanced solutions accessible to everyone.",
  };

  const values = [
    {
      icon: Target,
      title: "Mission",
      description: content.missionStatement,
    },
    {
      icon: Lightbulb,
      title: "Vision",
      description: "To create technology that bridges the gap between creative passion and practical innovation, making advanced tools accessible to everyone.",
    },
    {
      icon: Users,
      title: "Focus",
      description: "Starting from sports photography, we focus on solving real-world challenges through technology that benefits all people.",
    },
    {
      icon: Award,
      title: "Passion",
      description: "Driven by our love for innovation and the desire to bring every bright idea to life, no matter how ambitious.",
    },
  ];

  const timeline = [
    {
      year: "College Days",
      title: "Two Sports Photographers",
      description: "We began as college students with cameras, capturing sports events and discovering the challenges photographers face daily.",
    },
    {
      year: "The Spark",
      title: "Technology Meets Photography",
      description: "Realized that technology could solve many photography challenges, not just for photographers but for everyone involved in events.",
    },
    {
      year: "Innovation Journey",
      title: "Building Solutions",
      description: "Started developing practical technology solutions, transforming our photography experience into innovative tools for broader applications.",
    },
    {
      year: "KTProd Today",
      title: "Bringing Ideas to Life",
      description: "Dedicated to transforming every bright idea into reality, with passion for innovation that benefits all people.",
    },
    {
      year: "What's Next?",
      title: "Innovation Continues",
      description: "Our journey continues as we push boundaries, explore new possibilities, and keep bringing creative ideas to life with technology that makes a difference.",
    },
  ];

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-poppins">
              {content.pageTitle}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {content.pageDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our research, development, and company culture.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Story</h2>
              <p className="text-lg text-muted-foreground whitespace-pre-line">
                {content.companyStory}
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">Innovation</div>
                  <div className="text-sm text-muted-foreground">At the core of everything we do</div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">Software</div>
                    <div className="text-sm text-muted-foreground">Advanced algorithms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">Hardware</div>
                    <div className="text-sm text-muted-foreground">Custom solutions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold">Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Key milestones in our development as a technology leader in event photography.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => {
                const isLastItem = index === timeline.length - 1;
                return (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      isLastItem ? "justify-center" : (index % 2 === 0 ? "justify-start" : "justify-end")
                    }`}
                  >
                    <div className={`${isLastItem ? "w-full max-w-2xl text-center" : "w-5/12"} ${isLastItem ? "" : (index % 2 === 0 ? "text-right pr-8" : "text-left pl-8")}`}>
                      <div className="bg-card rounded-2xl p-6 shadow-lg">
                        <div className="text-sm font-semibold text-primary mb-2">{item.year}</div>
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    {!isLastItem && (
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Founders */}
      <section className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold">Meet the Founders</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The two college students who turned their passion for photography into a technology innovation journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center space-y-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">KT</span>
              </div>
              <h3 className="text-2xl font-semibold">Khanh Tran</h3>
              <p className="text-muted-foreground">
                Co-Founder & Technology Lead
              </p>
              <p className="text-sm leading-relaxed">
                Started as a sports photographer with a passion for technology. 
                Combines technical expertise with creative vision to build innovative solutions 
                that solve real-world challenges. Always looking for the next bright idea to transform into reality.
              </p>
            </div>
            <div className="text-center space-y-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary">Nép</span>
              </div>
              <h3 className="text-2xl font-semibold">Phuc Neptune</h3>
              <p className="text-muted-foreground">
                Co-Founder & Innovation Lead
              </p>
              <p className="text-sm leading-relaxed">
                Fellow sports photographer who saw the potential of technology to transform events. 
                Brings creative problem-solving and innovation mindset to every project. 
                Passionate about making technology accessible and beneficial for everyone.
              </p>
            </div>
          </div>
          <div className="mt-16 text-center">
            <div className="bg-card rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <h4 className="text-xl font-semibold mb-4">Our Partnership</h4>
              <p className="text-muted-foreground leading-relaxed">
                From college sports photographers to technology innovators, we've combined our 
                passion for photography with our love for innovation. Together, we're dedicated 
                to bringing every bright idea to life and creating technology that makes a real 
                difference in people's lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold">
              Join Our Innovation Journey
            </h2>
            <p className="text-lg max-w-2xl mx-auto opacity-90">
              Whether you're a photographer, event organizer, or technology enthusiast, 
              we invite you to explore how our solutions can transform your photography workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Learn About Our Tech
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
