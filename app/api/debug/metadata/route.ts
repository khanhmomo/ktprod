import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');
  
  if (!slug) {
    return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 });
  }

  try {
    // Import the same function that generates metadata
    const { getBlogPost } = await import('@/lib/database-appwrite');
    const post = await getBlogPost(slug);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Get the base URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ktprod.com';
    const postUrl = `${baseUrl}/blog/${slug}`;
    
    // Generate the same metadata as the page
    const defaultImageUrl = `${baseUrl}/images/social-default.jpg`;
    const imageUrl = post.coverImage || post.featuredImage || defaultImageUrl;
    const absoluteImageUrl = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`;
    
    const metadata = {
      title: post.title,
      description: post.description,
      alternates: {
        canonical: postUrl,
      },
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.publishedAt || post.createdAt,
        authors: [post.author],
        url: postUrl,
        siteName: "KTProd Platform",
        locale: "en_US",
        images: [
          {
            url: absoluteImageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
            type: 'image/jpeg',
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        creator: "@ktprod",
        site: "@ktprod",
        images: [absoluteImageUrl],
      },
    };

    return NextResponse.json({
      slug,
      post: {
        id: post.id,
        title: post.title,
        coverImage: post.coverImage,
        featuredImage: post.featuredImage,
      },
      metadata,
      debug: {
        baseUrl,
        postUrl,
        defaultImageUrl,
        imageUrl,
        absoluteImageUrl,
      }
    });
  } catch (error) {
    console.error('Debug metadata error:', error);
    return NextResponse.json({ error: 'Failed to generate metadata' }, { status: 500 });
  }
}
