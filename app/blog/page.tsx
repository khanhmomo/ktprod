"use client";

import { useState, useEffect } from "react";
import { getAllBlogPosts } from "@/lib/database-appwrite";
import { BlogCard } from "@/components/shared/blog-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BlogPost } from "@/types/blog";

const categories = ['All', 'General', 'Tech News', 'R&D'] as const;

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('All');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getAllBlogPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const filteredPosts = posts
    .filter(post => post.published)
    .filter(post => selectedCategory === 'All' || post.category === selectedCategory)
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.createdAt);
      const dateB = new Date(b.publishedAt || b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });

  if (loading) {
    return (
      <div className="space-y-16">
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
        <section>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-4">Loading posts...</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

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

      {/* Category Navigation */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold mb-4">
                {selectedCategory === 'All' ? 'No posts yet' : `No posts in ${selectedCategory}`}
              </h3>
              <p className="text-muted-foreground">
                {selectedCategory === 'All' 
                  ? 'Check back soon for insights from our R&D team.'
                  : 'Try selecting a different category or check back later.'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
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
