export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  featuredImage?: string; // For backward compatibility
  videoUrl?: string;
  author?: string;
  category?: string;
  published: boolean;
  readingTime?: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface BlogPostInput {
  title: string;
  description: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  featuredImage?: string; // For backward compatibility
  videoUrl?: string;
  author?: string;
  category?: string;
  published: boolean;
  publishedAt?: string;
}
