import { BlogPost } from '@/types/content';

// In-memory database for blog posts (in production, this would be a real database)
let blogPosts: BlogPost[] = [];

// Generate unique ID
function generateId(): string {
  return Date.now().toString();
}

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Blog CRUD operations
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return blogPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return blogPosts.find(post => post.slug === slug) || null;
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  return blogPosts.find(post => post.id === id) || null;
}

export async function createBlogPost(data: Omit<BlogPost, 'id' | 'slug' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
  const id = generateId();
  const slug = generateSlug(data.title);
  const now = new Date();
  
  // Check if slug already exists
  let finalSlug = slug;
  let counter = 1;
  while (blogPosts.some(post => post.slug === finalSlug)) {
    finalSlug = `${slug}-${counter}`;
    counter++;
  }
  
  const newPost: BlogPost = {
    ...data,
    id,
    slug: finalSlug,
    createdAt: now,
    updatedAt: now,
  };
  
  blogPosts.push(newPost);
  return newPost;
}

export async function updateBlogPost(id: string, data: Partial<Omit<BlogPost, 'id' | 'slug' | 'createdAt'>>): Promise<BlogPost | null> {
  const postIndex = blogPosts.findIndex(post => post.id === id);
  if (postIndex === -1) return null;
  
  const updatedPost: BlogPost = {
    ...blogPosts[postIndex],
    ...data,
    updatedAt: new Date(),
  };
  
  blogPosts[postIndex] = updatedPost;
  return updatedPost;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const postIndex = blogPosts.findIndex(post => post.id === id);
  if (postIndex === -1) return false;
  
  blogPosts.splice(postIndex, 1);
  return true;
}

// Initialize with sample data
export async function initializeBlogData() {
  if (blogPosts.length === 0) {
    const samplePost: Omit<BlogPost, 'id' | 'slug' | 'createdAt' | 'updatedAt'> = {
      title: "Welcome to Our Blog",
      description: "This is a sample blog post to get you started",
      excerpt: "This is a sample blog post to get you started",
      content: "<p>Welcome to our blog! This is a sample post to demonstrate the blog system.</p><h2>Features</h2><ul><li>Rich text editor</li><li>File uploads</li><li>YouTube video embedding</li><li>Category system</li></ul>",
      author: "Admin",
      category: "General",
      published: true,
      publishedAt: new Date(),
      featuredImage: undefined,
      videoUrl: undefined,
      tags: [],
      readingTime: 3,
    };
    
    await createBlogPost(samplePost);
  }
}
