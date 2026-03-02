import { BlogPost, ImageMarker } from '@/types/content';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';

const DB_FILE = join(process.cwd(), 'data', 'blog-posts.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await mkdir(join(process.cwd(), 'data'), { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
}

// Read blog posts from file
async function readBlogPosts(): Promise<BlogPost[]> {
  try {
    await ensureDataDir();
    const data = await readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist or is empty, return empty array
    return [];
  }
}

// Write blog posts to file
async function writeBlogPosts(posts: BlogPost[]): Promise<void> {
  await ensureDataDir();
  await writeFile(DB_FILE, JSON.stringify(posts, null, 2));
}

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
  const posts = await readBlogPosts();
  return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await readBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const posts = await readBlogPosts();
  return posts.find(post => post.id === id) || null;
}

export async function createBlogPost(data: Omit<BlogPost, 'id' | 'slug' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
  const posts = await readBlogPosts();
  const id = generateId();
  const slug = generateSlug(data.title);
  
  // Check if slug already exists
  let finalSlug = slug;
  let counter = 1;
  while (posts.some(post => post.slug === finalSlug)) {
    finalSlug = `${slug}-${counter}`;
    counter++;
  }
  
  const newPost: BlogPost = {
    ...data,
    id,
    slug: finalSlug,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  posts.push(newPost);
  await writeBlogPosts(posts);
  return newPost;
}

export async function updateBlogPost(id: string, data: Partial<Omit<BlogPost, 'id' | 'slug' | 'createdAt'>>): Promise<BlogPost | null> {
  const posts = await readBlogPosts();
  const postIndex = posts.findIndex(post => post.id === id);
  if (postIndex === -1) return null;
  
  const updatedPost: BlogPost = {
    ...posts[postIndex],
    ...data,
    updatedAt: new Date(),
  };
  
  posts[postIndex] = updatedPost;
  await writeBlogPosts(posts);
  return updatedPost;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const posts = await readBlogPosts();
  const postIndex = posts.findIndex(post => post.id === id);
  if (postIndex === -1) return false;
  
  posts.splice(postIndex, 1);
  await writeBlogPosts(posts);
  return true;
}

// Initialize with sample data
export async function initializeBlogData() {
  const posts = await readBlogPosts();
  if (posts.length === 0) {
    const samplePost: Omit<BlogPost, 'id' | 'slug' | 'createdAt' | 'updatedAt'> & { imageMarkers?: ImageMarker[] } = {
      title: "Welcome to Our Blog",
      description: "This is a sample blog post to get you started",
      excerpt: "This is a sample blog post to get you started",
      content: "<p>Welcome to our blog! This is a sample post to demonstrate the blog system.</p><h2>Features</h2><ul><li>Rich text editor</li><li>File uploads</li><li>YouTube video embedding</li><li>Category system</li></ul>",
      imageMarkers: [], 
      featuredImage: undefined,
      videoUrl: undefined,
      author: "Admin",
      category: "General",
      published: true,
      publishedAt: new Date(),
      tags: [],
      readingTime: 0,
    };
    
    await createBlogPost(samplePost);
  }
}
