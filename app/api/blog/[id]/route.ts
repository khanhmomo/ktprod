import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostById, updateBlogPost, deleteBlogPost } from '@/lib/database-appwrite';
import { processImagesInContentOptimized, uploadCoverImage } from '@/lib/image-processor';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const post = await getBlogPostById(id);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // Parse imageMarkers back to array if it exists
    if ((post as any).imageMarkers && typeof (post as any).imageMarkers === 'string') {
      try {
        (post as any).imageMarkers = JSON.parse((post as any).imageMarkers);
      } catch (error) {
        console.error('Failed to parse imageMarkers:', error);
        (post as any).imageMarkers = [];
      }
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Failed to get blog post:', error);
    return NextResponse.json({ error: 'Failed to get blog post' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    
    console.log('Updating blog post:', id, JSON.stringify(data, null, 2));
    
    // Get the current post to compare changes
    const currentPost = await getBlogPostById(id);
    if (!currentPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // Track what fields actually changed
    const changedFields: any = {};
    
    // Fields that should never be sent by client (system-managed)
    const systemFields = ['id', 'slug', 'createdAt', 'updatedAt', 'readingTime'];
    
    // Only include fields that are different and not system-managed
    for (const [key, newValue] of Object.entries(data)) {
      // Skip system fields
      if (systemFields.includes(key)) {
        console.log(`Skipping system field: ${key}`);
        continue;
      }
      
      const currentValue = currentPost[key as keyof typeof currentPost];
      
      // Handle null/undefined comparisons
      if (newValue !== currentValue) {
        changedFields[key] = newValue;
        console.log(`Field changed: ${key} = ${newValue}`);
      }
    }
    
    // If no fields changed, return current post
    if (Object.keys(changedFields).length === 0) {
      console.log('No changes detected, returning current post');
      return NextResponse.json(currentPost);
    }
    
    // Validate category if provided
    if (changedFields.category) {
      const validCategories = ['General', 'Tech News', 'R&D'];
      if (!validCategories.includes(changedFields.category)) {
        return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
      }
    }
    
    // Update excerpt if description changed
    if (changedFields.description && !changedFields.excerpt) {
      changedFields.excerpt = changedFields.description.substring(0, 150) + (changedFields.description.length > 150 ? '...' : '');
    }
    
    // Only process images if content actually changed
    if (changedFields.content) {
      console.log('Processing images in updated content...');
      const processedContent = await processImagesInContentOptimized(changedFields.content, currentPost.content);
      changedFields.content = processedContent;
    }
    
    // Only process cover image if it actually changed
    if (changedFields.coverImage) {
      if (changedFields.coverImage.startsWith('data:image')) {
        console.log('Uploading new cover image to storage...');
        const coverImageUrl = await uploadCoverImage(changedFields.coverImage);
        changedFields.coverImage = coverImageUrl;
      } else if (changedFields.coverImage === '' || changedFields.coverImage === null) {
        // Handle cover image removal
        console.log('Removing cover image');
        changedFields.coverImage = null;
      }
      // If it's already a URL, keep it as-is
    }
    
    // Only process featured image if it actually changed
    if (changedFields.featuredImage) {
      if (changedFields.featuredImage.startsWith('data:image')) {
        console.log('Uploading new featured image to storage...');
        const featuredImageUrl = await uploadCoverImage(changedFields.featuredImage);
        changedFields.featuredImage = featuredImageUrl;
      } else if (changedFields.featuredImage === '' || changedFields.featuredImage === null) {
        // Handle featured image removal
        console.log('Removing featured image');
        changedFields.featuredImage = null;
      }
      // If it's already a URL, keep it as-is
    }
    
    // Handle imageMarkers - convert array to JSON string for storage
    if (changedFields.imageMarkers && Array.isArray(changedFields.imageMarkers)) {
      console.log('Converting imageMarkers array to JSON string for storage');
      changedFields.imageMarkers = JSON.stringify(changedFields.imageMarkers);
    }
    
    console.log('Final changes to apply:', JSON.stringify(changedFields, null, 2));
    
    const post = await updateBlogPost(id, changedFields);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Failed to update blog post:', error);
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    console.log(`Deleting blog post: ${id}`);
    const success = await deleteBlogPost(id);
    
    if (!success) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Blog post and associated images deleted successfully' });
  } catch (error) {
    console.error('Failed to delete blog post:', error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
