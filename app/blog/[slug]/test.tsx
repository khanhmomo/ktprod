import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function TestBlogPostPage({ params }: BlogPostPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-8">Test Blog Post Page</h1>
        <p className="text-lg">Slug: {params.slug}</p>
        <p className="text-muted-foreground">This is a test to see if the routing works.</p>
      </div>
    </div>
  );
}
