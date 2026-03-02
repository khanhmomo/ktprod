import { Client, Databases, Storage, ID, Query } from 'node-appwrite';
import { BlogPost } from '@/types/blog';

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.APPWRITE_PROJECT_ID || '');

const databases = new Databases(client);
const storage = new Storage(client);

// Database and Storage IDs
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || 'ktprod-blog';
const BLOG_POSTS_COLLECTION_ID = process.env.APPWRITE_BLOG_POSTS_COLLECTION_ID || 'blog-posts';
const PAGE_CONTENTS_COLLECTION_ID = process.env.APPWRITE_PAGE_CONTENTS_COLLECTION_ID || 'page-contents';
const BUCKET_ID = process.env.APPWRITE_BUCKET_ID || 'blog-images';

// Blog Posts Management
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      BLOG_POSTS_COLLECTION_ID,
      [Query.orderDesc('createdAt')]
    );

    return response.documents.map((doc: any) => ({
      id: doc.$id,
      title: doc.title,
      slug: doc.slug,
      description: doc.description,
      excerpt: doc.excerpt || undefined,
      content: doc.content,
      coverImage: doc.coverImage || undefined,
      featuredImage: doc.featuredImage || undefined,
      videoUrl: doc.videoUrl || undefined,
      author: doc.author || undefined,
      category: doc.category || undefined,
      published: doc.published,
      readingTime: doc.readingTime || undefined,
      createdAt: new Date(doc.createdAt),
      updatedAt: new Date(doc.updatedAt),
      publishedAt: doc.publishedAt ? new Date(doc.publishedAt) : undefined,
    }));
  } catch (error) {
    console.error('Failed to get blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      BLOG_POSTS_COLLECTION_ID,
      [Query.equal('slug', slug)]
    );

    if (response.documents.length === 0) return null;

    const doc = response.documents[0];
    return {
      id: doc.$id,
      title: doc.title,
      slug: doc.slug,
      description: doc.description,
      excerpt: doc.excerpt || undefined,
      content: doc.content,
      coverImage: doc.coverImage || undefined,
      featuredImage: doc.featuredImage || undefined,
      videoUrl: doc.videoUrl || undefined,
      author: doc.author || undefined,
      category: doc.category || undefined,
      published: doc.published,
      readingTime: doc.readingTime || undefined,
      createdAt: new Date(doc.createdAt),
      updatedAt: new Date(doc.updatedAt),
      publishedAt: doc.publishedAt ? new Date(doc.publishedAt) : undefined,
    };
  } catch (error) {
    console.error('Failed to get blog post:', error);
    return null;
  }
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const doc = await databases.getDocument(
      DATABASE_ID,
      BLOG_POSTS_COLLECTION_ID,
      id
    );

    return {
      id: doc.$id,
      title: doc.title,
      slug: doc.slug,
      description: doc.description,
      excerpt: doc.excerpt || undefined,
      content: doc.content,
      coverImage: doc.coverImage || undefined,
      featuredImage: doc.featuredImage || undefined,
      videoUrl: doc.videoUrl || undefined,
      author: doc.author || undefined,
      category: doc.category || undefined,
      published: doc.published,
      readingTime: doc.readingTime || undefined,
      createdAt: new Date(doc.createdAt),
      updatedAt: new Date(doc.updatedAt),
      publishedAt: doc.publishedAt ? new Date(doc.publishedAt) : undefined,
    };
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
    
    // Calculate reading time
    const wordsPerMinute = 200;
    const wordCount = post.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
    const now = new Date();
    const response = await databases.createDocument(
      DATABASE_ID,
      BLOG_POSTS_COLLECTION_ID,
      ID.unique(),
      {
        title: post.title,
        slug,
        description: post.description,
        excerpt: post.excerpt || null,
        content: post.content,
        coverImage: post.coverImage || null,
        featuredImage: post.featuredImage || null,
        videoUrl: post.videoUrl || null,
        author: post.author || null,
        category: post.category || null,
        published: post.published,
        readingTime,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString() : null,
      }
    );

    return await getBlogPostById(response.$id) as BlogPost;
  } catch (error) {
    console.error('Failed to create blog post:', error);
    throw new Error('Failed to create blog post');
  }
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  try {
    // Recalculate reading time if content updated
    let readingTime = updates.readingTime;
    if (updates.content) {
      const wordsPerMinute = 200;
      const wordCount = updates.content.split(/\s+/).length;
      readingTime = Math.ceil(wordCount / wordsPerMinute);
    }

    const response = await databases.updateDocument(
      DATABASE_ID,
      BLOG_POSTS_COLLECTION_ID,
      id,
      {
        ...updates,
        readingTime,
        updatedAt: new Date().toISOString(),
        publishedAt: updates.publishedAt ? new Date(updates.publishedAt).toISOString() : undefined,
      }
    );

    return await getBlogPostById(response.$id);
  } catch (error) {
    console.error('Failed to update blog post:', error);
    return null;
  }
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    await databases.deleteDocument(
      DATABASE_ID,
      BLOG_POSTS_COLLECTION_ID,
      id
    );
    return true;
  } catch (error) {
    console.error('Failed to delete blog post:', error);
    return false;
  }
}

// Image upload using Appwrite Storage
export async function uploadImage(file: File, folder: string = 'blog'): Promise<{ url: string; fileId: string }> {
  try {
    const filename = `${folder}/${Date.now()}-${file.name}`;
    const response = await storage.createFile(
      BUCKET_ID,
      ID.unique(),
      new File([file], filename, { type: file.type })
    );

    // Get file URL
    const url = storage.getFileView(BUCKET_ID, response.$id);
    
    return {
      url: url.toString(),
      fileId: response.$id,
    };
  } catch (error) {
    console.error('Failed to upload image:', error);
    throw new Error('Failed to upload image');
  }
}

export async function deleteImage(fileId: string): Promise<boolean> {
  try {
    await storage.deleteFile(BUCKET_ID, fileId);
    return true;
  } catch (error) {
    console.error('Failed to delete image:', error);
    return false;
  }
}

// Page Content Management
export async function getPageContent(type: string): Promise<any> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PAGE_CONTENTS_COLLECTION_ID,
      [Query.equal('type', type)]
    );

    return response.documents.length > 0 ? response.documents[0] : null;
  } catch (error) {
    console.error('Failed to get page content:', error);
    return null;
  }
}

export async function storePageContent(type: string, content: any): Promise<void> {
  try {
    const existing = await getPageContent(type);
    
    if (existing) {
      await databases.updateDocument(
        DATABASE_ID,
        PAGE_CONTENTS_COLLECTION_ID,
        existing.$id,
        {
          ...content,
          updatedAt: new Date().toISOString(),
        }
      );
    } else {
      await databases.createDocument(
        DATABASE_ID,
        PAGE_CONTENTS_COLLECTION_ID,
        ID.unique(),
        {
          type,
          ...content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );
    }
  } catch (error) {
    console.error('Failed to store page content:', error);
    throw new Error('Failed to store page content');
  }
}
