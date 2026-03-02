export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage?: string;
  videoUrl?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface BlogPostInput {
  title: string;
  description: string;
  content: string;
  coverImage?: string;
  videoUrl?: string;
  published: boolean;
}
