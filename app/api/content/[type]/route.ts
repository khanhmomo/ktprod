import { NextRequest, NextResponse } from 'next/server';
import { cloudinary } from '@/lib/cloudinary';

export async function GET(request: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  try {
    // Wait for params to be available in Next.js 15
    const { type } = await params;
    
    console.log(`Loading content for type: ${type}`);
    
    // Try to get the content from Cloudinary
    const result = await cloudinary.api.resource(`content/pages/${type}`, {
      resource_type: 'raw',
    });
    
    if (result && result.secure_url) {
      const response = await fetch(result.secure_url);
      const content = await response.json();
      console.log(`Successfully loaded content for ${type}:`, content);
      return NextResponse.json(content);
    }
    
    console.log(`No content found for ${type}`);
    return NextResponse.json(null, { status: 404 });
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
    
    console.log(`Saving content for type: ${type}:`, content);
    
    const jsonString = JSON.stringify(content);
    const base64 = Buffer.from(jsonString).toString('base64');
    const dataURI = `data:application/json;base64,${base64}`;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'raw',
      public_id: `content/pages/${type}`,
      overwrite: true,
    });
    
    console.log(`Successfully saved ${type}:`, result.public_id);
    
    return NextResponse.json({ 
      success: true, 
      publicId: result.public_id,
      url: result.secure_url 
    });
  } catch (error) {
    console.error(`Failed to save content:`, error);
    return NextResponse.json(
      { error: 'Failed to save content' },
      { status: 500 }
    );
  }
}
