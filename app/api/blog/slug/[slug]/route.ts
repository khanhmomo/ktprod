import { NextRequest, NextResponse } from 'next/server';
import { getBlogPost } from '@/lib/database-appwrite';

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const post = await getBlogPost(slug);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Failed to get blog post by slug:', error);
    return NextResponse.json({ error: 'Failed to get blog post' }, { status: 500 });
  }
}
