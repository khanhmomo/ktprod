import { Target, Lightbulb, Users, Award, ArrowRight } from "lucide-react";
import { getPageContent } from "@/lib/database-appwrite";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AboutPage() {
  const pageContent = await getPageContent('about');
  const content = pageContent || {
    pageTitle: "About KTProd Technology",
    pageDescription: "Pioneering research and development for every bright idea. We combine software innovation with hardware engineering to create comprehensive solutions for any concept that pushes technological boundaries.",
    companyStory: "Founded with a vision to transform creative ideas into technological reality, KTProd Technology has been at the forefront of innovation in event and sport photography automation. Our team of expert engineers and developers work tirelessly to push the boundaries of what's possible.",
    missionStatement: "To empower businesses and individuals with cutting-edge technology solutions that transform their creative visions into reality.",
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
      description: "To become the global leader in photography technology, enabling seamless capture and delivery of high-quality event imagery.",
    },
    {
      icon: Users,
      title: "Focus",
      description: "Specializing in event and sport photography with expertise in both software development and hardware engineering.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to technological innovation, quality engineering, and solving real-world photography challenges.",
    },
  ];

  const timeline = [
    {
      year: "Foundation",
      title: "KTProd Technology Established",
      description: "Founded with a clear mission to revolutionize event photography through technology.",
    },
    {
      year: "R&D Phase",
      title: "Research & Development Begins",
      description: "Initial development of smart camera systems and cloud-based workflow solutions.",
    },
    {
      year: "Innovation",
      title: "AI Integration",
      description: "Integration of machine learning algorithms for automated event coverage and shot selection.",
    },
    {
      year: "Expansion",
      title: "Hardware Solutions",
      description: "Development of custom hardware systems for specialized sport photography requirements.",
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
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                    <div className="bg-card rounded-2xl p-6 shadow-lg">
                      <div className="text-sm font-semibold text-primary mb-2">{item.year}</div>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold">Areas of Expertise</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our specialized knowledge and capabilities in event and sport photography technology.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Event Photography</h3>
              <p className="text-muted-foreground">
                Comprehensive solutions for conferences, concerts, and large-scale events 
                requiring high-volume image capture and rapid delivery.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Sport Photography</h3>
              <p className="text-muted-foreground">
                Specialized systems for capturing fast-action sports with precision timing 
                and automated shot selection.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">R&D Innovation</h3>
              <p className="text-muted-foreground">
                Continuous research into emerging technologies and their applications 
                in professional photography workflows.
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
