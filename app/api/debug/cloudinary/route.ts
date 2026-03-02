import { NextRequest, NextResponse } from 'next/server';
import { cloudinary } from '@/lib/cloudinary';

export async function GET(request: NextRequest) {
  try {
    console.log('Debug: Starting Cloudinary API call...');
    
    // Try different API calls
    const results: any = {};
    
    // Try 1: Get all resources
    try {
      const result1 = await cloudinary.api.resources({
        type: 'upload',
        resource_type: 'raw',
      });
      results.all_resources = {
        total: result1.resources.length,
        count: result1.resources.length
      };
    } catch (error: any) {
      results.all_resources_error = error.message;
    }
    
    // Try 2: Get resources with prefix
    try {
      const result2 = await cloudinary.api.resources({
        type: 'upload',
        resource_type: 'raw',
        prefix: 'blog/posts/',
      });
      results.blog_resources = {
        total: result2.resources.length,
        resources: result2.resources.map((r: any) => ({
          public_id: r.public_id,
          format: r.format,
          resource_type: r.resource_type,
          secure_url: r.secure_url
        }))
      };
    } catch (error: any) {
      results.blog_resources_error = error.message;
    }
    
    // Try 3: Get specific resource
    try {
      const result3 = await cloudinary.api.resource('blog/posts/test-123', {
        resource_type: 'raw',
      });
      results.specific_resource = {
        public_id: result3.public_id,
        secure_url: result3.secure_url,
        format: result3.format
      };
    } catch (error: any) {
      results.specific_resource_error = error.message;
    }

    return NextResponse.json(results);
  } catch (error: any) {
    console.error('Cloudinary debug error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
