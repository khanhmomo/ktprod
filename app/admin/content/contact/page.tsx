"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getPageContent, storePageContent } from "@/lib/database-appwrite";
import { Save, ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function ContactPageContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [content, setContent] = useState({
    pageTitle: "Contact Us",
    pageDescription: "Get in touch with our team to discuss your project or learn more about our innovative technology solutions.",
    email: "info@ktprodtechnology.com",
    phone: "+1 (555) 123-4567",
    address: "123 Innovation Drive, Tech City, TC 12345",
    formTitle: "Send us a message",
    formDescription: "Have a question or want to start a project? Fill out the form below and we'll get back to you within 24 hours.",
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const pageContent = await getPageContent('contact');
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
      await storePageContent('contact', content);
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
          <h1 className="text-3xl font-bold font-poppins">Contact Page Content</h1>
          <p className="text-muted-foreground">Update contact information and form settings</p>
        </div>
      </div>

      {/* Page Header */}
      <Card>
        <CardHeader>
          <CardTitle>Page Header</CardTitle>
          <CardDescription>
            Update the main heading and description for the contact page
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

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Update the contact details displayed on the page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">
              <Mail className="h-4 w-4 mr-2 inline" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={content.email}
              onChange={(e) => setContent({...content, email: e.target.value})}
              placeholder="contact@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              <Phone className="h-4 w-4 mr-2 inline" />
              Phone Number
            </Label>
            <Input
              id="phone"
              value={content.phone}
              onChange={(e) => setContent({...content, phone: e.target.value})}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">
              <MapPin className="h-4 w-4 mr-2 inline" />
              Address
            </Label>
            <Input
              id="address"
              value={content.address}
              onChange={(e) => setContent({...content, address: e.target.value})}
              placeholder="123 Street, City, State 12345"
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Form</CardTitle>
          <CardDescription>
            Update the contact form heading and description
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="form-title">Form Title</Label>
            <Input
              id="form-title"
              value={content.formTitle}
              onChange={(e) => setContent({...content, formTitle: e.target.value})}
              placeholder="Send us a message"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="form-description">Form Description</Label>
            <Textarea
              id="form-description"
              value={content.formDescription}
              onChange={(e) => setContent({...content, formDescription: e.target.value})}
              placeholder="Description of the contact form"
              rows={3}
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
