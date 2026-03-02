import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostById, updateBlogPost, deleteBlogPost } from '@/lib/blog-db-persistent';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const post = await getBlogPostById(id);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
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
    
    // Validate category if provided
    if (data.category) {
      const validCategories = ['General', 'Tech News', 'R&D'];
      if (!validCategories.includes(data.category)) {
        return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
      }
    }
    
    // Update excerpt if description changed
    if (data.description && !data.excerpt) {
      data.excerpt = data.description.substring(0, 150) + (data.description.length > 150 ? '...' : '');
    }
    
    const post = await updateBlogPost(id, data);
    
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
    const success = await deleteBlogPost(id);
    
    if (!success) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete blog post:', error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
