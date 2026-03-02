import { getAllBlogPosts } from "@/lib/blog-db-persistent";
import { BlogCard } from "@/components/shared/blog-card";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-poppins">
              <span className="text-primary">Innovation</span> Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Insights, breakthroughs, and technical updates from our R&D team. 
              Follow our journey as we transform every bright idea into technological innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold mb-4">No posts yet</h3>
              <p className="text-muted-foreground">
                Check back soon for insights from our R&D team.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.filter(post => post.published).map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <BlogCard post={post} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold">
              Stay Updated on Our Innovations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get the latest insights and breakthroughs in event photography technology 
              delivered directly to your inbox.
            </p>
            <div className="bg-card rounded-2xl p-8 shadow-lg max-w-md mx-auto">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Newsletter coming soon. Follow our blog for the latest updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
