import Image from "next/image";
import Link from "next/link";
import { Calendar, Play, User, Tag } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
        <div className="relative aspect-video overflow-hidden">
          {(post.coverImage || post.featuredImage) ? (
            <Image
              src={post.coverImage || post.featuredImage || ''}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-muted"></div>
          )}
        </div>
        
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <div className="flex items-center space-x-4">
              {post.category && (
                <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  <Tag className="h-3 w-3" />
                  <span>{post.category}</span>
                </div>
              )}
              {post.author && (
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-0">
          <CardDescription className="line-clamp-3">
            {post.excerpt || post.description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
