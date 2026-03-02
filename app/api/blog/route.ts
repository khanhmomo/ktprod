import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts, createBlogPost, deleteBlogPost, updateBlogPost } from '@/lib/database-appwrite';
import { processImagesInContent, uploadCoverImage } from '@/lib/image-processor';

export async function GET(request: NextRequest) {
  try {
    const posts = await getAllBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Failed to get blog posts:', error);
    return NextResponse.json({ error: 'Failed to get blog posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Log the received data for debugging
    console.log('Received blog post data:', JSON.stringify(data, null, 2));
    console.log('Content type:', typeof data.content);
    console.log('Content length:', data.content?.length);
    console.log('CoverImage type:', typeof data.coverImage);
    console.log('CoverImage length:', data.coverImage?.length);
    console.log('FeaturedImage type:', typeof data.featuredImage);
    console.log('FeaturedImage length:', data.featuredImage?.length);
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'content', 'author', 'category'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }
    
    // Validate category
    const validCategories = ['General', 'Tech News', 'R&D'];
    if (!validCategories.includes(data.category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }
    
    // Create excerpt from description if not provided
    if (!data.excerpt) {
      data.excerpt = data.description.substring(0, 150) + (data.description.length > 150 ? '...' : '');
    }
    
    // Process images in content
    console.log('Processing images in content...');
    const processedContent = await processImagesInContent(data.content);
    data.content = processedContent;
    
    // Process cover image
    if (data.coverImage && data.coverImage.startsWith('data:image')) {
      console.log('Uploading cover image to storage...');
      const coverImageUrl = await uploadCoverImage(data.coverImage);
      data.coverImage = coverImageUrl;
    }
    
    // Process featured image
    if (data.featuredImage && data.featuredImage.startsWith('data:image')) {
      console.log('Uploading featured image to storage...');
      const featuredImageUrl = await uploadCoverImage(data.featuredImage);
      data.featuredImage = featuredImageUrl;
    }
    
    console.log('Creating blog post with processed images...');
    const post = await createBlogPost(data);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Failed to create blog post:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing post ID' }, { status: 400 });
    }

    console.log(`Deleting blog post: ${id}`);
    const success = await deleteBlogPost(id);
    
    if (success) {
      return NextResponse.json({ message: 'Blog post and associated images deleted successfully' });
    } else {
      return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
    }
  } catch (error) {
    console.error('Failed to delete blog post:', error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const data = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing post ID' }, { status: 400 });
    }

    console.log('Updating blog post:', id, JSON.stringify(data, null, 2));
    
    // Process images in content if content is being updated
    if (data.content) {
      console.log('Processing images in updated content...');
      const processedContent = await processImagesInContent(data.content);
      data.content = processedContent;
    }
    
    // Process cover image if it's being updated
    if (data.coverImage && data.coverImage.startsWith('data:image')) {
      console.log('Uploading new cover image to storage...');
      const coverImageUrl = await uploadCoverImage(data.coverImage);
      data.coverImage = coverImageUrl;
    }
    
    // Process featured image if it's being updated
    if (data.featuredImage && data.featuredImage.startsWith('data:image')) {
      console.log('Uploading new featured image to storage...');
      const featuredImageUrl = await uploadCoverImage(data.featuredImage);
      data.featuredImage = featuredImageUrl;
    }
    
    // Update the post
    const updatedPost = await updateBlogPost(id, data);
    
    if (updatedPost) {
      return NextResponse.json(updatedPost);
    } else {
      return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
    }
  } catch (error) {
    console.error('Failed to update blog post:', error);
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}
