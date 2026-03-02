import { NextRequest, NextResponse } from 'next/server';
import { getPageContent, storePageContent } from '@/lib/database-appwrite';

export async function GET(request: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  try {
    // Wait for params to be available in Next.js 15
    const { type } = await params;
    
    console.log(`Loading content for type: ${type}`);
    
    // Get the content from Appwrite
    const content = await getPageContent(type);
    
    if (!content) {
      console.log(`No content found for ${type}`);
      return NextResponse.json(null, { status: 404 });
    }
    
    console.log(`Successfully loaded content for ${type}:`, content);
    return NextResponse.json(content);
  } catch (error) {
    console.error(`Failed to load content:`, error);
    return NextResponse.json(null, { status: 404 });
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  try {
    // Wait for params to be available in Next.js 15
    const { type } = await params;
    
    const content = await request.json();
    console.log(`Saving content for ${type}:`, content);
    
    // Store the content in Appwrite
    await storePageContent(type, content);
    
    console.log(`Successfully saved content for ${type}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save content:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
