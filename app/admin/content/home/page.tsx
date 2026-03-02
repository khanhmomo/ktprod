"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getPageContent, storePageContent } from "@/lib/database-appwrite";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function HomePageContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState({
    heroTitle: "R&D for Every Bright Idea",
    heroDescription: "KTProd Technology pioneers innovative hardware and software solutions for any concept that pushes boundaries. From automation to IoT, we transform creative ideas into technological reality.",
    ctaButtonText: "Explore Technology",
    secondaryButtonText: "Learn More",
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const pageContent = await getPageContent('home');
      if (pageContent) {
        setContent(pageContent);
      }
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await storePageContent('home', content);
      alert('Content saved successfully!');
    } catch (error) {
      console.error('Failed to save content:', error);
      alert('Failed to save content. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">Loading...</div>
    </div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/admin">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold font-poppins">Homepage Content</h1>
          <p className="text-muted-foreground">Update hero section and call-to-action buttons</p>
        </div>
      </div>

      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>
            Update the main heading and description for the homepage hero
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="hero-title">Hero Title</Label>
            <Input
              id="hero-title"
              value={content.heroTitle}
              onChange={(e) => setContent({...content, heroTitle: e.target.value})}
              placeholder="Enter hero title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hero-description">Hero Description</Label>
            <Textarea
              id="hero-description"
              value={content.heroDescription}
              onChange={(e) => setContent({...content, heroDescription: e.target.value})}
              placeholder="Enter hero description"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Call-to-Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Call-to-Action Buttons</CardTitle>
          <CardDescription>
            Update the text for the main CTA buttons
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cta-button">Primary CTA Button</Label>
            <Input
              id="cta-button"
              value={content.ctaButtonText}
              onChange={(e) => setContent({...content, ctaButtonText: e.target.value})}
              placeholder="Enter primary CTA text"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondary-button">Secondary Button</Label>
            <Input
              id="secondary-button"
              value={content.secondaryButtonText}
              onChange={(e) => setContent({...content, secondaryButtonText: e.target.value})}
              placeholder="Enter secondary button text"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Actions */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
