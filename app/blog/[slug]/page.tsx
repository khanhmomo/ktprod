import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft, Clock, User, Tag } from "lucide-react";

import { VideoEmbed } from "@/components/ui/video-embed";
import { Button } from "@/components/ui/button";
import { ImageMarker } from "@/types/content";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Remove static generation to force dynamic rendering
// export async function generateStaticParams() {
//   try {
//     // Use Appwrite database
//     const { getAllBlogPosts } = await import("@/lib/database-appwrite");
//     const posts = await getAllBlogPosts();
//     
//     // Filter out posts without valid slugs
//     const validPosts = posts.filter((post: any) => post && post.slug && typeof post.slug === 'string');
//     
//     return validPosts.map((post: any) => ({
//       slug: post.slug,
//     }));
//   } catch (error) {
//     console.error('Failed to generate static params:', error);
//     return [];
//   }
// }

export async function generateMetadata({ params }: BlogPostPageProps) {
  // Await params in Next.js 16
  const { slug } = await params;
  
  try {
    // Use Appwrite database
    const { getBlogPost } = await import("@/lib/database-appwrite");
    const post = await getBlogPost(slug);
    
    if (!post) {
      return {
        title: "Post Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    // Get the base URL from environment or fallback
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ktprod.com';
    const postUrl = `${baseUrl}/blog/${slug}`;
    
    // Prepare metadata with enhanced social sharing
    const metadata: any = {
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
        // Facebook specific
        appId: "your-facebook-app-id", // Optional: Add your Facebook App ID
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        creator: "@ktprod", // Replace with your actual Twitter handle
        site: "@ktprod", // Replace with your actual Twitter handle
      },
    };

    // Add cover image if available, otherwise use default
    const defaultImageUrl = `${baseUrl}/images/social-default.jpg`;
    const imageUrl = post.featuredImage || defaultImageUrl;
    
    metadata.openGraph.images = [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: post.title,
      },
    ];
    
    metadata.twitter.images = [imageUrl];

    return metadata;
  } catch (error) {
    console.error('Failed to generate metadata:', error);
    return {
      title: "Blog Post",
      description: "A blog post from KTProd Platform",
    };
  }
}

// Force dynamic rendering and disable caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Reconstruct content with images from markers
const reconstructContentWithImages = (baseContent: string, markers: ImageMarker[] = []) => {
  let reconstructedContent = baseContent;
  
  // Remove any existing image placeholders (🖼️)
  reconstructedContent = reconstructedContent.replace(/🖼️/g, '');
  
  // Sort markers by position (in reverse order to avoid position shifting)
  const sortedMarkers = [...markers].sort((a, b) => b.position - a.position);
  
  sortedMarkers.forEach(marker => {
    const imageHtml = `<img src="${marker.src}" alt="${marker.alt || ''}" style="max-width: 100%; height: auto; border-radius: 0.5rem; margin: 1rem 0; display: block;" />`;
    reconstructedContent = reconstructedContent.slice(0, marker.position) + 
                         imageHtml + 
                         reconstructedContent.slice(marker.position);
  });
  
  return reconstructedContent;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Await params in Next.js 16
  const { slug } = await params;
  
  try {
    // Use Appwrite database
    const { getBlogPost } = await import("@/lib/database-appwrite");
    const post = await getBlogPost(slug);
    
    if (!post) {
      notFound();
    }

    // Since we now embed images directly in content, we don't need reconstruction
    // Just use the content as-is (it already contains the images)
    const finalContent = post.content;

    return (
      <div className="space-y-16">
        {/* Back Navigation */}
        <section>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/blog">
              <Button variant="ghost" className="mb-8">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </section>

        {/* Article Header */}
        <section>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Tag className="h-4 w-4" />
                  <span>{post.category}</span>
                </div>
              </div>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {post.description}
              </p>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {post.featuredImage && (
          <section>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  width={1200}
                  height={630}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </section>
        )}

        {/* Article Content */}
        <section>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="prose prose-lg max-w-none dark:prose-invert [&_img]:mx-auto [&_img]:block [&_img]:max-w-full [&_img]:h-auto"
              dangerouslySetInnerHTML={{ __html: finalContent }}
            />
          </div>
        </section>

        {/* Video Embed */}
        {post.videoUrl && (
          <section>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <VideoEmbed url={post.videoUrl} title={post.title} />
            </div>
          </section>
        )}
      </div>
    );
  } catch (error) {
    console.error('Failed to load blog post:', error);
    notFound();
  }
}
