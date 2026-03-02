import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/database-appwrite';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File must be less than 5MB' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename
    const timestamp = Date.now();
    const filename = `content-${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;

    console.log(`Uploading content image: ${filename}`);

    // Upload to Appwrite Storage
    const result = await uploadImage(file, 'content');

    console.log(`Successfully uploaded content image: ${result.fileId}`);

    return NextResponse.json({
      url: result.url,
      publicId: result.fileId,
    });
  } catch (error) {
    console.error('Failed to upload content image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
