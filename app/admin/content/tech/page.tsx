"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getPageContent, storePageContent } from "@/lib/database-appwrite";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

interface TechSolution {
  id: string;
  title: string;
  description: string;
  features: string[];
}

export default function TechPageContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState({
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
        description: "AI-powered photo organization that automatically sorts and tags images by person",
        features: ["Face detection", "Auto-tagging", "Smart albums", "Privacy protection"],
      },
    ],
    hardwareSystems: [
      {
        id: "1",
        title: "IoT Camera Systems",
        description: "Network-connected cameras with advanced sensing and processing capabilities",
        features: ["Wireless connectivity", "Edge processing", "Remote monitoring", "Power efficient"],
      },
      {
        id: "2",
        title: "3D Printing Solutions",
        description: "Custom 3D printing services for prototyping and manufacturing",
        features: ["Custom designs", "Rapid prototyping", "Multiple materials", "Precision printing"],
      },
    ],
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const pageContent = await getPageContent('tech');
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
      await storePageContent('tech', content);
      alert('Content saved successfully!');
    } catch (error) {
      console.error('Failed to save content:', error);
      alert('Failed to save content. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const addSoftwareSolution = () => {
    const newSolution: TechSolution = {
      id: Date.now().toString(),
      title: "New Software Solution",
      description: "Description of the new software solution",
      features: ["Feature 1", "Feature 2"],
    };
    setContent({
      ...content,
      softwareSolutions: [...content.softwareSolutions, newSolution],
    });
  };

  const updateSoftwareSolution = (id: string, field: keyof TechSolution, value: string | string[]) => {
    setContent({
      ...content,
      softwareSolutions: content.softwareSolutions.map(solution =>
        solution.id === id ? { ...solution, [field]: value } : solution
      ),
    });
  };

  const deleteSoftwareSolution = (id: string) => {
    setContent({
      ...content,
      softwareSolutions: content.softwareSolutions.filter(solution => solution.id !== id),
    });
  };

  const addHardwareSystem = () => {
    const newSystem: TechSolution = {
      id: Date.now().toString(),
      title: "New Hardware System",
      description: "Description of the new hardware system",
      features: ["Feature 1", "Feature 2"],
    };
    setContent({
      ...content,
      hardwareSystems: [...content.hardwareSystems, newSystem],
    });
  };

  const updateHardwareSystem = (id: string, field: keyof TechSolution, value: string | string[]) => {
    setContent({
      ...content,
      hardwareSystems: content.hardwareSystems.map(system =>
        system.id === id ? { ...system, [field]: value } : system
      ),
    });
  };

  const deleteHardwareSystem = (id: string) => {
    setContent({
      ...content,
      hardwareSystems: content.hardwareSystems.filter(system => system.id !== id),
    });
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
          <h1 className="text-3xl font-bold font-poppins">Technology Page Content</h1>
          <p className="text-muted-foreground">Update technology solutions and systems</p>
        </div>
      </div>

      {/* Page Header */}
      <Card>
        <CardHeader>
          <CardTitle>Page Header</CardTitle>
          <CardDescription>
            Update the main heading and description for the technology page
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

      {/* Software Solutions */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Software Solutions</CardTitle>
              <CardDescription>
                Manage software solutions and their features
              </CardDescription>
            </div>
            <Button onClick={addSoftwareSolution}>
              <Plus className="h-4 w-4 mr-2" />
              Add Solution
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {content.softwareSolutions.map((solution) => (
            <div key={solution.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label>Solution Title</Label>
                    <Input
                      value={solution.title}
                      onChange={(e) => updateSoftwareSolution(solution.id, 'title', e.target.value)}
                      placeholder="Solution title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={solution.description}
                      onChange={(e) => updateSoftwareSolution(solution.id, 'description', e.target.value)}
                      placeholder="Solution description"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Features (comma-separated)</Label>
                    <Input
                      value={solution.features.join(', ')}
                      onChange={(e) => updateSoftwareSolution(solution.id, 'features', e.target.value.split(',').map(f => f.trim()))}
                      placeholder="Feature 1, Feature 2, Feature 3"
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteSoftwareSolution(solution.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Hardware Systems */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Hardware Systems</CardTitle>
              <CardDescription>
                Manage hardware systems and their specifications
              </CardDescription>
            </div>
            <Button onClick={addHardwareSystem}>
              <Plus className="h-4 w-4 mr-2" />
              Add System
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {content.hardwareSystems.map((system) => (
            <div key={system.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label>System Title</Label>
                    <Input
                      value={system.title}
                      onChange={(e) => updateHardwareSystem(system.id, 'title', e.target.value)}
                      placeholder="System title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={system.description}
                      onChange={(e) => updateHardwareSystem(system.id, 'description', e.target.value)}
                      placeholder="System description"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Specifications (comma-separated)</Label>
                    <Input
                      value={system.features.join(', ')}
                      onChange={(e) => updateHardwareSystem(system.id, 'features', e.target.value.split(',').map(f => f.trim()))}
                      placeholder="Spec 1, Spec 2, Spec 3"
                    />
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteHardwareSystem(system.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
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
