"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TinyMCEEditor } from "@/components/admin/tinymce-editor";
import { FileUpload } from "@/components/admin/file-upload";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Client-side image compression function
async function compressImagesInContent(formData: any): Promise<any> {
  const content = formData.content;
  
  // Find all base64 images
  const imgRegex = /<img([^>]*?)src="(data:image\/[^"]*)"([^>]*?)>/gi;
  let compressedContent = content;
  const matches = [...content.matchAll(imgRegex)];
  
  console.log(`Found ${matches.length} images to compress`);
  
  if (matches.length === 0) {
    return formData;
  }
  
  // Process each image
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const fullMatch = match[0];
    const base64Src = match[2];
    
    try {
      // Compress the image
      const compressedBase64 = await compressBase64Image(base64Src);
      compressedContent = compressedContent.replace(fullMatch, fullMatch.replace(base64Src, compressedBase64));
      console.log(`Compressed image ${i + 1}/${matches.length}`);
    } catch (error) {
      console.error(`Failed to compress image ${i + 1}:`, error);
      // Keep original if compression fails
    }
  }
  
  return {
    ...formData,
    content: compressedContent
  };
}

// Compress a single base64 image
async function compressBase64Image(base64Src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    img.onload = () => {
      try {
        // Calculate new dimensions (max width 800px for web)
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        
        resolve(compressedBase64);
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = reject;
    img.src = base64Src;
  });
}

export default function NewBlogPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    coverImage: "",
    videoUrl: "",
    author: "",
    category: "General" as 'General' | 'Tech News' | 'R&D' | 'Creative',
    published: false,
    publishedAt: new Date().toISOString(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      const requiredFields = ['title', 'description', 'content', 'author', 'category'];
      const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Compress images in content before sending
      const compressedFormData = await compressImagesInContent(formData);
      
      // Debug: Log the form data
      console.log('Original content size:', formData.content.length);
      console.log('Compressed content size:', compressedFormData.content.length);
      
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(compressedFormData),
      });

      // Debug: Log the response
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to create post: ${response.status} - ${errorText}`);
      }

      const post = await response.json();
      console.log('Created post:', post);
      router.push(`/admin/blog/${post.id}/edit`);
    } catch (error) {
      console.error('Error creating post:', error);
      alert(`Failed to create post: ${(error as Error).message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Link href="/admin/blog">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Posts
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Create New Post</h1>
          <p className="text-muted-foreground">Write and publish a new blog post</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
                <CardDescription>Main content for your blog post</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    required
                    placeholder="Enter post title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Subtitle)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    required
                    rows={2}
                    placeholder="Brief description or subtitle for the post"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => handleChange('author', e.target.value)}
                      placeholder="Author name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleChange('category', e.target.value)}
                      className="w-full p-2 border rounded-md bg-background"
                    >
                      <option value="General">General</option>
                      <option value="R&D">R&D</option>
                      <option value="Tech News">Tech News</option>
                      <option value="Creative">Creative</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <TinyMCEEditor
                    content={formData.content}
                    onChange={(content: string) => handleChange('content', content)}
                    placeholder="Write your post content here..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
                <CardDescription>Add cover image or video</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FileUpload
                  value={formData.coverImage}
                  onChange={(url: string | undefined) => handleChange('coverImage', url || '')}
                  label="Cover Image"
                />
                
                <div className="space-y-2">
                  <Label htmlFor="videoUrl">YouTube Video URL</Label>
                  <Input
                    id="videoUrl"
                    value={formData.videoUrl}
                    onChange={(e) => handleChange('videoUrl', e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Publishing</CardTitle>
                <CardDescription>Control when your post goes live</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => handleChange('published', e.target.checked)}
                    className="rounded border-input"
                  />
                  <Label htmlFor="published" className="text-sm font-medium">
                    Publish immediately
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="publishedAt">Publish Date</Label>
                  <Input
                    id="publishedAt"
                    type="datetime-local"
                    value={formData.publishedAt ? new Date(formData.publishedAt).toISOString().slice(0, 16) : ''}
                    onChange={(e) => handleChange('publishedAt', e.target.value)}
                    placeholder="Select publish date"
                  />
                </div>
                
                <div className="pt-4">
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? 'Creating...' : 'Create Post'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
