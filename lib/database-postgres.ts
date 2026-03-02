import { neon } from '@neondatabase/serverless';
import { BlogPost } from '@/types/blog';

// Create Neon database connection
const sql = neon(process.env.DATABASE_URL!);

// Blog Posts Management
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await sql`
      SELECT * FROM blog_posts 
      ORDER BY created_at DESC
    `;

    // Convert to BlogPost format
    return posts.map((post: any) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      description: post.description,
      excerpt: post.excerpt || undefined,
      content: post.content,
      coverImage: post.cover_image || undefined,
      featuredImage: post.featured_image || undefined,
      videoUrl: post.video_url || undefined,
      author: post.author || undefined,
      category: post.category || undefined,
      published: post.published,
      readingTime: post.reading_time || undefined,
      createdAt: new Date(post.created_at),
      updatedAt: new Date(post.updated_at),
      publishedAt: post.published_at ? new Date(post.published_at) : undefined,
    }));
  } catch (error) {
    console.error('Failed to get blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await sql`
      SELECT * FROM blog_posts 
      WHERE slug = ${slug}
      LIMIT 1
    `;

    if (!posts || posts.length === 0) return null;
    
    const post = posts[0];
    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      description: post.description,
      excerpt: post.excerpt || undefined,
      content: post.content,
      coverImage: post.cover_image || undefined,
      featuredImage: post.featured_image || undefined,
      videoUrl: post.video_url || undefined,
      author: post.author || undefined,
      category: post.category || undefined,
      published: post.published,
      readingTime: post.reading_time || undefined,
      createdAt: new Date(post.created_at),
      updatedAt: new Date(post.updated_at),
      publishedAt: post.published_at ? new Date(post.published_at) : undefined,
    };
  } catch (error) {
    console.error('Failed to get blog post:', error);
    return null;
  }
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const posts = await sql`
      SELECT * FROM blog_posts 
      WHERE id = ${id}
      LIMIT 1
    `;

    if (!posts || posts.length === 0) return null;
    
    const post = posts[0];
    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      description: post.description,
      excerpt: post.excerpt || undefined,
      content: post.content,
      coverImage: post.cover_image || undefined,
      featuredImage: post.featured_image || undefined,
      videoUrl: post.video_url || undefined,
      author: post.author || undefined,
      category: post.category || undefined,
      published: post.published,
      readingTime: post.reading_time || undefined,
      createdAt: new Date(post.created_at),
      updatedAt: new Date(post.updated_at),
      publishedAt: post.published_at ? new Date(post.published_at) : undefined,
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
    
    // Calculate reading time (average 200 words per minute)
    const wordsPerMinute = 200;
    const wordCount = post.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
    const result = await sql`
      INSERT INTO blog_posts (
        title, slug, description, excerpt, content, cover_image, featured_image, 
        video_url, author, category, published, reading_time, published_at
      ) VALUES (
        ${post.title}, ${slug}, ${post.description}, ${post.excerpt || null}, 
        ${post.content}, ${post.coverImage || null}, ${post.featuredImage || null},
        ${post.videoUrl || null}, ${post.author || null}, ${post.category || null},
        ${post.published}, ${readingTime}, ${post.publishedAt ? new Date(post.publishedAt) : null}
      )
      RETURNING *
    `;

    const newPost = result[0];
    return {
      id: newPost.id,
      title: newPost.title,
      slug: newPost.slug,
      description: newPost.description,
      excerpt: newPost.excerpt || undefined,
      content: newPost.content,
      coverImage: newPost.cover_image || undefined,
      featuredImage: newPost.featured_image || undefined,
      videoUrl: newPost.video_url || undefined,
      author: newPost.author || undefined,
      category: newPost.category || undefined,
      published: newPost.published,
      readingTime: newPost.reading_time || undefined,
      createdAt: new Date(newPost.created_at),
      updatedAt: new Date(newPost.updated_at),
      publishedAt: newPost.published_at ? new Date(newPost.published_at) : undefined,
    };
  } catch (error) {
    console.error('Failed to create blog post:', error);
    throw new Error('Failed to create blog post');
  }
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  try {
    // Get existing post
    const existingPosts = await sql`SELECT * FROM blog_posts WHERE id = ${id} LIMIT 1`;
    if (!existingPosts || existingPosts.length === 0) return null;
    
    const existingPost = existingPosts[0];

    // Recalculate reading time if content was updated
    let readingTime = existingPost.reading_time;
    if (updates.content) {
      const wordsPerMinute = 200;
      const wordCount = updates.content.split(/\s+/).length;
      readingTime = Math.ceil(wordCount / wordsPerMinute);
    }

    const result = await sql`
      UPDATE blog_posts SET
        title = COALESCE(${updates.title || null}, title),
        description = COALESCE(${updates.description || null}, description),
        excerpt = COALESCE(${updates.excerpt || null}, excerpt),
        content = COALESCE(${updates.content || null}, content),
        cover_image = COALESCE(${updates.coverImage || null}, cover_image),
        featured_image = COALESCE(${updates.featuredImage || null}, featured_image),
        video_url = COALESCE(${updates.videoUrl || null}, video_url),
        author = COALESCE(${updates.author || null}, author),
        category = COALESCE(${updates.category || null}, category),
        published = COALESCE(${updates.published || null}, published),
        reading_time = ${readingTime},
        published_at = COALESCE(${updates.publishedAt ? new Date(updates.publishedAt) : null}, published_at),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    const updatedPost = result[0];
    return {
      id: updatedPost.id,
      title: updatedPost.title,
      slug: updatedPost.slug,
      description: updatedPost.description,
      excerpt: updatedPost.excerpt || undefined,
      content: updatedPost.content,
      coverImage: updatedPost.cover_image || undefined,
      featuredImage: updatedPost.featured_image || undefined,
      videoUrl: updatedPost.video_url || undefined,
      author: updatedPost.author || undefined,
      category: updatedPost.category || undefined,
      published: updatedPost.published,
      readingTime: updatedPost.reading_time || undefined,
      createdAt: new Date(updatedPost.created_at),
      updatedAt: new Date(updatedPost.updated_at),
      publishedAt: updatedPost.published_at ? new Date(updatedPost.published_at) : undefined,
    };
  } catch (error) {
    console.error('Failed to update blog post:', error);
    return null;
  }
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    await sql`DELETE FROM blog_posts WHERE id = ${id}`;
    return true;
  } catch (error) {
    console.error('Failed to delete blog post:', error);
    return false;
  }
}

// Page Content Management
export async function getPageContent(type: string): Promise<any> {
  try {
    const result = await sql`SELECT * FROM page_contents WHERE type = ${type} LIMIT 1`;
    return result[0] || null;
  } catch (error) {
    console.error('Failed to get page content:', error);
    return null;
  }
}

export async function storePageContent(type: string, content: any): Promise<void> {
  try {
    await sql`
      INSERT INTO page_contents (type, title, description, content, images)
      VALUES (${type}, ${content.title}, ${content.description}, ${JSON.stringify(content.content)}, ${JSON.stringify(content.images || {})})
      ON CONFLICT (type) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        content = EXCLUDED.content,
        images = EXCLUDED.images,
        updated_at = NOW()
    `;
  } catch (error) {
    console.error('Failed to store page content:', error);
    throw new Error('Failed to store page content');
  }
}
