import { NextRequest, NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/database-appwrite';

export async function GET(request: NextRequest) {
  try {
    const posts = await getAllBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Failed to get blog posts:', error);
    return NextResponse.json({ error: 'Failed to get blog posts' }, { status: 500 });
  }
}
