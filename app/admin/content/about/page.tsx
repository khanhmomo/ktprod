"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getPageContent, storePageContent } from "@/lib/database-appwrite";
import type { AboutPageContent } from "@/types/content";

export default function AboutPageContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState<AboutPageContent>({
    pageTitle: "About KTProd Technology",
    pageDescription: "Pioneering research and development for every bright idea. We combine software innovation with hardware engineering to create comprehensive solutions for any concept that pushes technological boundaries.",
    companyStory: "Founded with a vision to transform creative ideas into technological reality, KTProd Technology has been at the forefront of innovation in event and sport photography automation. Our team of expert engineers and developers work tirelessly to push the boundaries of what's possible.",
    missionStatement: "To empower businesses and individuals with cutting-edge technology solutions that transform their creative visions into reality.",
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const pageContent = await getPageContent('about');
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
      await storePageContent('about', content);
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
          <h1 className="text-3xl font-bold font-poppins">About Page Content</h1>
          <p className="text-muted-foreground">Update company information and story</p>
        </div>
      </div>

      {/* Page Header */}
      <Card>
        <CardHeader>
          <CardTitle>Page Header</CardTitle>
          <CardDescription>
            Update the main heading and description for the about page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="page-title">Page Title</Label>
            <Input
              id="page-title"
              value={content.pageTitle}
              onChange={(e) => setContent({...content, pageTitle: e.target.value})}
              placeholder="Enter page title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="page-description">Page Description</Label>
            <Textarea
              id="page-description"
              value={content.pageDescription}
              onChange={(e) => setContent({...content, pageDescription: e.target.value})}
              placeholder="Enter page description"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Company Story */}
      <Card>
        <CardHeader>
          <CardTitle>Company Story</CardTitle>
          <CardDescription>
            Tell your company's story and background
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="company-story">Company Story</Label>
            <Textarea
              id="company-story"
              value={content.companyStory}
              onChange={(e) => setContent({...content, companyStory: e.target.value})}
              placeholder="Enter company story"
              rows={6}
            />
            <p className="text-sm text-muted-foreground">
              Share your company's history, founding story, and journey
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Mission Statement */}
      <Card>
        <CardHeader>
          <CardTitle>Mission Statement</CardTitle>
          <CardDescription>
            Define your company's mission and vision
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="mission-statement">Mission Statement</Label>
            <Textarea
              id="mission-statement"
              value={content.missionStatement}
              onChange={(e) => setContent({...content, missionStatement: e.target.value})}
              placeholder="Enter mission statement"
              rows={3}
            />
            <p className="text-sm text-muted-foreground">
              A concise statement about your company's purpose and goals
            </p>
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
