import { NextRequest, NextResponse } from 'next/server';
import { cloudinary } from '@/lib/cloudinary';

export async function GET(request: NextRequest) {
  try {
    // Test upload a simple JSON file
    const testData = {
      id: 'test-123',
      title: 'Test Post',
      content: 'Test content',
      createdAt: new Date().toISOString()
    };

    const jsonString = JSON.stringify(testData);
    const base64 = Buffer.from(jsonString).toString('base64');
    const dataURI = `data:application/json;base64,${base64}`;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'raw',
      public_id: 'blog/posts/test-123',
      overwrite: true,
    });

    return NextResponse.json({
      success: true,
      result: {
        public_id: result.public_id,
        secure_url: result.secure_url,
        resource_type: result.resource_type,
        format: result.format
      }
    });
  } catch (error: any) {
    console.error('Upload test error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
