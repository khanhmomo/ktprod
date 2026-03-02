import { NextRequest, NextResponse } from 'next/server';
import { uploadImage, deleteImage } from '@/lib/database-appwrite';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'blog';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Upload image to Appwrite Storage
    const result = await uploadImage(file, folder);
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Failed to upload image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('fileId');

    if (!fileId) {
      return NextResponse.json({ error: 'No fileId provided' }, { status: 400 });
    }

    // Delete image from Appwrite Storage
    const success = await deleteImage(fileId);
    
    if (success) {
      return NextResponse.json({ message: 'Image deleted successfully' });
    } else {
      return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
    }
  } catch (error) {
    console.error('Failed to delete image:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
