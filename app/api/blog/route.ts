import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts, createBlogPost, initializeBlogData } from '@/lib/blog-db-persistent';

// Initialize sample data on first API call
let initialized = false;

export async function GET(request: NextRequest) {
  try {
    if (!initialized) {
      await initializeBlogData();
      initialized = true;
    }
    
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
    
    const post = await createBlogPost(data);
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Failed to create blog post:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
