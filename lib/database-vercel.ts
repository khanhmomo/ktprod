import { kv } from '@vercel/kv';
import { put } from '@vercel/blob';
import { BlogPost } from '@/types/blog';

// Blog Posts Management using Vercel KV
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    // Get all blog post keys
    const keys = await kv.keys('blog:*');
    
    if (!keys || keys.length === 0) {
      return [];
    }
    
    // Get all posts in parallel
    const posts = await Promise.all(
      keys.map(async (key) => {
        const post = await kv.get(key);
        return post ? JSON.parse(post) : null;
      })
    );
    
    // Filter out nulls and sort by date
    return posts
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error('Failed to get blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const post = await kv.get(`blog:${slug}`);
    return post ? JSON.parse(post) : null;
  } catch (error) {
    console.error('Failed to get blog post:', error);
    return null;
  }
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    // Since KV is key-value, we need to search through all posts
    const posts = await getAllBlogPosts();
    return posts.find(post => post.id === id) || null;
  } catch (error) {
    console.error('Failed to get blog post by ID:', error);
    return null;
  }
}

export async function createBlogPost(post: Omit<BlogPost, 'id' | 'slug' | 'createdAt' | 'updatedAt' | 'readingTime'>): Promise<BlogPost> {
  try {
    // Generate slug from title
    const slug = post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    // Generate ID
    const id = Date.now().toString();
    
    // Calculate reading time
    const wordsPerMinute = 200;
    const wordCount = post.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
    const now = new Date();
    const newPost: BlogPost = {
      ...post,
      id,
      slug,
      readingTime,
      createdAt: now,
      updatedAt: now,
    };
    
    // Store in KV
    await kv.set(`blog:${slug}`, JSON.stringify(newPost));
    
    return newPost;
  } catch (error) {
    console.error('Failed to create blog post:', error);
    throw new Error('Failed to create blog post');
  }
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  try {
    // Get existing post
    const posts = await getAllBlogPosts();
    const existingPost = posts.find(post => post.id === id);
    
    if (!existingPost) return null;
    
    // Recalculate reading time if content updated
    let readingTime = existingPost.readingTime;
    if (updates.content) {
      const wordsPerMinute = 200;
      const wordCount = updates.content.split(/\s+/).length;
      readingTime = Math.ceil(wordCount / wordsPerMinute);
    }
    
    const updatedPost: BlogPost = {
      ...existingPost,
      ...updates,
      readingTime,
      updatedAt: new Date(),
    };
    
    // Update in KV
    await kv.set(`blog:${updatedPost.slug}`, JSON.stringify(updatedPost));
    
    return updatedPost;
  } catch (error) {
    console.error('Failed to update blog post:', error);
    return null;
  }
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    // Get the post to find its slug
    const posts = await getAllBlogPosts();
    const post = posts.find(p => p.id === id);
    
    if (!post) return false;
    
    // Delete from KV
    await kv.del(`blog:${post.slug}`);
    
    return true;
  } catch (error) {
    console.error('Failed to delete blog post:', error);
    return false;
  }
}

// Image upload using Vercel Blob
export async function uploadImage(file: File, folder: string = 'blog'): Promise<{ url: string; key: string }> {
  try {
    const filename = `${folder}/${Date.now()}-${file.name}`;
    const blob = await put(filename, file, { access: 'public' });
    
    return {
      url: blob.url,
      key: blob.url,
    };
  } catch (error) {
    console.error('Failed to upload image:', error);
    throw new Error('Failed to upload image');
  }
}

// Page Content Management
export async function getPageContent(type: string): Promise<any> {
  try {
    const content = await kv.get(`page:${type}`);
    return content ? JSON.parse(content) : null;
  } catch (error) {
    console.error('Failed to get page content:', error);
    return null;
  }
}

export async function storePageContent(type: string, content: any): Promise<void> {
  try {
    await kv.set(`page:${type}`, JSON.stringify(content));
  } catch (error) {
    console.error('Failed to store page content:', error);
    throw new Error('Failed to store page content');
  }
}
