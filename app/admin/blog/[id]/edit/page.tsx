"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TinyMCEEditor } from "@/components/admin/tinymce-editor";
import { FileUpload } from "@/components/admin/file-upload";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BlogPost, ImageMarker } from "@/types/content";

interface EditBlogPostProps {
  params: any;
}

export default function EditBlogPost({ params }: EditBlogPostProps) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [originalPost, setOriginalPost] = useState<BlogPost | null>(null);
  const [imageMarkers, setImageMarkers] = useState<ImageMarker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [postId, setPostId] = useState<string>('');

  useEffect(() => {
    const getPostId = async () => {
      const resolvedParams = await params;
      setPostId(resolvedParams.id);
    };
    getPostId();
  }, [params]);

  useEffect(() => {
    if (postId) {
      loadPost();
    }
  }, [postId]);

  const loadPost = async () => {
    try {
      const response = await fetch(`/api/blog/${postId}`);
      if (response.ok) {
        const postData = await response.json();
        console.log('Loaded post for editing:', postData);
        console.log('Content:', postData.content);
        console.log('Content contains img:', postData.content.includes('<img'));
        console.log('Image markers:', postData.imageMarkers);
        
        // Convert date strings to Date objects for compatibility
        const processedPost: BlogPost = {
          ...postData,
          createdAt: new Date(postData.createdAt),
          updatedAt: new Date(postData.updatedAt),
          publishedAt: postData.publishedAt ? new Date(postData.publishedAt) : undefined,
        };
        
        setPost(processedPost);
        setOriginalPost(processedPost); // Store original content
        setImageMarkers(processedPost.imageMarkers || []); // Set image markers
      } else {
        console.error('Failed to load post');
      }
    } catch (error) {
      console.error('Error loading post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    setIsSubmitting(true);

    try {
      console.log('=== SAVING POST ===');
      console.log('Post content:', post.content);
      console.log('Content length:', post.content.length);
      
      // Extract images from content
      const extractedImages = extractImagesFromContent(post.content);
      console.log('Extracted images:', extractedImages.length);
      
      // Prepare post data with extracted images
      const postData = {
        ...post,
        imageMarkers: extractedImages,
        updatedAt: new Date().toISOString(),
      };
      
      console.log('Final post data to save:', {
        title: postData.title,
        contentLength: postData.content.length,
        imageCount: extractedImages.length,
        hasImages: extractedImages.length > 0
      });
      
      // Save the post
      const response = await fetch(`/api/blog/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      const updatedPost = await response.json();
      console.log('Post saved successfully');
      console.log('Saved image markers:', updatedPost.imageMarkers?.length || 0);

      router.push('/admin/blog');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Extract images from HTML content
  const extractImagesFromContent = (content: string): ImageMarker[] => {
    const imageMarkers: ImageMarker[] = [];
    
    // Create a temporary DOM element to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    // Find all img elements
    const imgElements = tempDiv.querySelectorAll('img');
    
    imgElements.forEach((img, index) => {
      if (img.src) {
        const marker: ImageMarker = {
          id: `img_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`,
          src: img.src,
          position: 0, // Position not needed for simple approach
          alt: img.alt || ''
        };
        imageMarkers.push(marker);
      }
    });
    
    return imageMarkers;
  };

  // Handle validation from RichTextEditor
  const handleValidation = (validation: { isValid: boolean; issues: string[] }) => {
    setValidationErrors(validation.issues);
    console.log('Validation received:', validation);
  };

  const handleChange = (field: keyof BlogPost, value: any) => {
    if (!post) return;
    
    console.log('handleChange called:', field, typeof value, value?.substring?.(0, 50) || value);
    
    // Special handling for content field to sync image markers
    if (field === 'content') {
      console.log('Content changed:', value);
      console.log('Current image markers:', imageMarkers);
      
      // Check if content has placeholders but markers don't match
      const hasPlaceholders = value.includes('🖼️');
      const hasMarkers = imageMarkers.length > 0;
      
      let finalMarkers = imageMarkers;
      
      // Force clear markers if no placeholders exist
      if (!hasPlaceholders && hasMarkers) {
        console.log('No placeholders found in content, clearing all image markers');
        finalMarkers = [];
        setImageMarkers([]);
      }
      
      // Update post with content and markers
      setPost(prev => {
        if (!prev) return null;
        const updated = { ...prev, [field]: value, imageMarkers: finalMarkers };
        console.log('Post updated:', { 
          contentLength: updated.content?.length, 
          markerCount: updated.imageMarkers?.length 
        });
        return updated;
      });
    } else {
      // Handle other fields normally
      setPost(prev => {
        if (!prev) return null;
        const updated = { ...prev, [field]: value };
        console.log('Post updated (other field):', field, value);
        return updated;
      });
    }
  };

  // Comprehensive content validation before save
  const validatePostContent = (): { isValid: boolean; issues: string[] } => {
    const issues: string[] = [];
    
    if (!post) {
      issues.push('No post data available');
      return { isValid: false, issues };
    }
    
    // Check required fields
    if (!post.title || post.title.trim() === '') {
      issues.push('Title is required');
    }
    
    if (!post.content || post.content.trim() === '') {
      issues.push('Content is required');
    }
    
    if (!post.description || post.description.trim() === '') {
      issues.push('Description is required');
    }
    
    // Check content vs markers consistency
    const placeholderCount = (post.content.match(/🖼️/g) || []).length;
    const markerCount = imageMarkers.length;
    
    if (placeholderCount !== markerCount) {
      issues.push(`Content has ${placeholderCount} image placeholders but ${markerCount} markers found`);
    }
    
    // Validate each image marker
    imageMarkers.forEach((marker, index) => {
      if (!marker.src || marker.src.trim() === '') {
        issues.push(`Image ${index + 1}: No image source`);
      }
      if (!marker.src.startsWith('data:image/') && !marker.src.startsWith('http')) {
        issues.push(`Image ${index + 1}: Invalid image source format`);
      }
    });
    
    console.log('Final validation issues:', issues);
    return { isValid: issues.length === 0, issues };
  };

  if (isLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">Loading...</div>
    </div>;
  }

  if (!post) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">Post not found</div>
    </div>;
  }

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
          <h1 className="text-3xl font-bold">Edit Post</h1>
          <p className="text-muted-foreground">Update your blog post</p>
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
                    value={post.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    required
                    placeholder="Enter post title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Subtitle)</Label>
                  <Textarea
                    id="description"
                    value={post.description}
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
                      value={post.author || ''}
                      onChange={(e) => handleChange('author', e.target.value)}
                      placeholder="Author name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      value={post.category || 'General'}
                      onChange={(e) => handleChange('category', e.target.value)}
                      className="w-full p-2 border rounded-md bg-background"
                    >
                      <option value="General">General</option>
                      <option value="R&D">R&D</option>
                      <option value="Tech News">Tech News</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <TinyMCEEditor
                    content={post.content}
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
                  value={post.featuredImage || ''}
                  onChange={(url: string | undefined) => handleChange('featuredImage', url || '')}
                  label="Cover Image"
                />
                
                <div className="space-y-2">
                  <Label htmlFor="videoUrl">YouTube Video URL</Label>
                  <Input
                    id="videoUrl"
                    value={post.videoUrl || ''}
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
                    checked={post.published}
                    onChange={(e) => handleChange('published', e.target.checked)}
                    className="rounded border-input"
                  />
                  <Label htmlFor="published" className="text-sm font-medium">
                    Published
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="publishedAt">Publish Date</Label>
                  <Input
                    id="publishedAt"
                    type="datetime-local"
                    value={post.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 16) : ''}
                    onChange={(e) => handleChange('publishedAt', e.target.value)}
                    placeholder="Select publish date"
                  />
                </div>
                
                <div className="pt-4 space-y-2">
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? 'Updating...' : 'Update Post'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => router.push('/admin/blog')}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Post Info</CardTitle>
                <CardDescription>Post metadata</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div>Created: {new Date(post.createdAt).toLocaleDateString()}</div>
                <div>Updated: {new Date(post.updatedAt).toLocaleDateString()}</div>
                {post.publishedAt && (
                  <div>Published: {new Date(post.publishedAt).toLocaleDateString()}</div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
