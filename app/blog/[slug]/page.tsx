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

export async function generateStaticParams() {
  // Use the API route to get all blog posts
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog`);
  
  if (!response.ok) {
    return [];
  }
  
  const posts = await response.json();
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  // Await params in Next.js 16
  const { slug } = await params;
  
  // Use the API route to get the blog post
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog/slug/${slug}`);
  
  if (!response.ok) {
    return {
      title: "Post Not Found",
    };
  }
  
  const post = await response.json();
  
  if (!post || post.error) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';

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
  
  // Use the API route to get the blog post
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog/slug/${slug}`);
  
  if (!response.ok) {
    notFound();
  }
  
  const post = await response.json();
  
  // Debug: Log the loaded content
  console.log('Loaded post content:', post.content);
  console.log('Content length:', post.content.length);
  console.log('Content contains img:', post.content.includes('<img>'));
  console.log('Image markers:', post.imageMarkers);
  
  // Since we now embed images directly in content, we don't need reconstruction
  // Just use the content as-is (it already contains the images)
  const finalContent = post.content;
  
  if (!post || post.error) {
    notFound();
  }

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

      {/* Featured Media */}
      {post.videoUrl || post.featuredImage ? (
        <section>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {post.videoUrl ? (
              <VideoEmbed url={post.videoUrl} title={post.title} />
            ) : post.featuredImage ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Article Content */}
      <section>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: finalContent }}
          />
        </div>
      </section>

      {/* Related Posts */}
      <section className="bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold mb-8">Related Posts</h2>
          <div className="text-center text-muted-foreground">
            <p>Related posts will be shown here once we implement the feature.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
