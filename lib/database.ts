import { v2 as cloudinary } from 'cloudinary';
import { BlogPost } from '@/types/blog';
import { getContent, storeContent, deleteImage, uploadImage } from '@/lib/cloudinary';

// Type definitions for page content
interface PageContent {
  id: string;
  type: 'home' | 'about' | 'tech' | 'contact';
  title: string;
  description: string;
  content: Record<string, any>;
  images?: Record<string, string>;
  updatedAt: Date;
}

interface HomePageContent {
  heroTitle: string;
  heroDescription: string;
  ctaButtonText: string;
  secondaryButtonText: string;
  featuredVideo?: string;
}

interface AboutPageContent {
  pageTitle: string;
  pageDescription: string;
  companyStory: string;
  missionStatement: string;
  teamMembers?: any[];
}

interface TechPageContent {
  pageTitle: string;
  pageDescription: string;
  softwareSolutions: any[];
  hardwareSystems: any[];
}

interface ContactPageContent {
  pageTitle: string;
  pageDescription: string;
  email: string;
  phone: string;
  address: string;
  formTitle: string;
  formDescription: string;
}

// Simple in-memory cache with 5-minute TTL
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getFromCache(key: string): any | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  if (cached) {
    cache.delete(key);
  }
  return null;
}

function setCache(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() });
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Blog Posts Management
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const cachedPosts = getFromCache('all-blog-posts');
    if (cachedPosts) {
      return cachedPosts;
    }

    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'blog/posts/',
      resource_type: 'raw',
    });

    const posts: BlogPost[] = [];

    for (const resource of result.resources) {
      try {
        const content = await getContent(resource.public_id);
        if (content && typeof content === 'object' && 'slug' in content) {
          posts.push(content as BlogPost);
        }
      } catch (error) {
        console.error(`Failed to load blog post ${resource.public_id}:`, error);
        // Continue loading other posts even if one fails
      }
    }

    const sortedPosts = posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setCache('all-blog-posts', sortedPosts);
    return sortedPosts;
  } catch (error) {
    console.error('Failed to get blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const cachedPost = getFromCache(`blog-post-${slug}`);
    if (cachedPost) {
      return cachedPost;
    }

    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'blog/posts/',
      resource_type: 'raw',
    });

    for (const resource of result.resources) {
      try {
        const content = await getContent(resource.public_id);
        if (content && typeof content === 'object' && 'slug' in content) {
          const post = content as BlogPost;
          if (post.slug === slug) {
            setCache(`blog-post-${slug}`, post);
            return post;
          }
        }
      } catch (error) {
        console.error(`Failed to load blog post ${resource.public_id}:`, error);
      }
    }

    return null;
  } catch (error) {
    console.error('Failed to get blog post:', error);
    return null;
  }
}

export async function createBlogPost(post: Omit<BlogPost, 'id' | 'slug' | 'createdAt' | 'updatedAt' | 'readingTime'>): Promise<BlogPost> {
  const id = Date.now().toString();
  const now = new Date();
  
  // Generate slug from title
  const slug = post.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  // Calculate reading time (average 200 words per minute)
  const wordsPerMinute = 200;
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  const newPost: BlogPost = {
    ...post,
    id,
    slug,
    readingTime,
    createdAt: now,
    updatedAt: now,
  };

  await storeContent(newPost, 'blog/posts');
  return newPost;
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  try {
    // Get all posts to find the one with matching ID
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'blog/posts/',
      resource_type: 'raw',
    });

    let existingPost: BlogPost | null = null;
    let resourcePublicId: string | null = null;

    for (const resource of result.resources) {
      try {
        const content = await getContent(resource.public_id);
        if (content && typeof content === 'object' && 'id' in content && content.id === id) {
          existingPost = content as BlogPost;
          resourcePublicId = resource.public_id;
          break;
        }
      } catch (error) {
        console.error(`Failed to load blog post ${resource.public_id}:`, error);
      }
    }

    if (!existingPost || !resourcePublicId) {
      return null;
    }

    const updatedPost: BlogPost = {
      ...existingPost,
      ...updates,
      updatedAt: new Date(),
    };

    // Keep the existing slug even if title changes
    // This prevents breaking existing links
    
    // Recalculate reading time if content was updated
    if (updates.content) {
      const wordsPerMinute = 200;
      const wordCount = updates.content.split(/\s+/).length;
      updatedPost.readingTime = Math.ceil(wordCount / wordsPerMinute);
    }

    // Update the content in Cloudinary using the same public_id
    await storeContent(updatedPost, 'blog/posts', resourcePublicId);
    
    return updatedPost;
  } catch (error) {
    console.error('Failed to update blog post:', error);
    return null;
  }
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    // Get all posts to find the one with matching ID
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'blog/posts/',
      resource_type: 'raw',
    });

    let existingPost: BlogPost | null = null;
    let resourcePublicId: string | null = null;

    for (const resource of result.resources) {
      try {
        const content = await getContent(resource.public_id);
        if (content && typeof content === 'object' && 'id' in content && content.id === id) {
          existingPost = content as BlogPost;
          resourcePublicId = resource.public_id;
          break;
        }
      } catch (error) {
        console.error(`Failed to load blog post ${resource.public_id}:`, error);
      }
    }

    if (!existingPost || !resourcePublicId) {
      return false;
    }

    // Delete associated images
    if (existingPost.featuredImage) {
      const publicId = existingPost.featuredImage.split('/').pop()?.split('.')[0];
      if (publicId) {
        await deleteImage(`blog/featured/${publicId}`);
      }
    }

    // Delete the post content
    await cloudinary.uploader.destroy(resourcePublicId, { resource_type: 'raw' });
    return true;
  } catch (error) {
    console.error('Failed to delete blog post:', error);
    return false;
  }
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    // Get all posts to find the one with matching ID
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'blog/posts/',
      resource_type: 'raw',
    });

    for (const resource of result.resources) {
      try {
        const content = await getContent(resource.public_id);
        if (content && typeof content === 'object' && 'id' in content && content.id === id) {
          return content as BlogPost;
        }
      } catch (error) {
        console.error(`Failed to load blog post ${resource.public_id}:`, error);
      }
    }

    return null;
  } catch (error) {
    console.error('Failed to get blog post by ID:', error);
    return null;
  }
}

// Page Content Management
export async function getPageContent(type: PageContent['type']): Promise<PageContent | null> {
  try {
    const content = await getContent(`content/pages/${type}`);
    return content as PageContent;
  } catch (error) {
    console.error(`Failed to get page content for ${type}:`, error);
    return null;
  }
}

export async function updatePageContent(type: PageContent['type'], content: any): Promise<PageContent> {
  const pageContent: PageContent = {
    id: type,
    type,
    content,
    updatedAt: new Date(),
    title: content.pageTitle || '',
    description: content.pageDescription || '',
  };

  await storeContent(pageContent, 'content/pages');
  return pageContent;
}

// Image Upload Helper
export async function uploadBlogImage(file: File, type: 'featured' | 'content'): Promise<string> {
  const result = await uploadImage(file, `blog/${type}`);
  return result.url;
}

// Initialize default content
export async function initializeDefaultContent() {
  // Check if home content exists
  const homeContent = await getPageContent('home');
  if (!homeContent) {
    const defaultHome: HomePageContent = {
      heroTitle: "R&D for Every Bright Idea",
      heroDescription: "KTProd Technology pioneers innovative hardware and software solutions for any concept that pushes boundaries. From automation to IoT, we transform creative ideas into technological reality.",
      ctaButtonText: "Explore Technology",
      secondaryButtonText: "Learn More",
    };

    await updatePageContent('home', defaultHome);
  }

  // Check if about content exists
  const aboutContent = await getPageContent('about');
  if (!aboutContent) {
    const defaultAbout: AboutPageContent = {
      pageTitle: "About KTProd Technology",
      pageDescription: "Pioneering research and development for every bright idea. We combine software innovation with hardware engineering to create comprehensive solutions for any concept that pushes technological boundaries.",
      companyStory: "Founded with a vision to transform creative ideas into technological reality, KTProd Technology has been at the forefront of innovation in event and sport photography automation. Our team of expert engineers and developers work tirelessly to push the boundaries of what's possible.",
      missionStatement: "To empower businesses and individuals with cutting-edge technology solutions that transform their creative visions into reality.",
    };

    await updatePageContent('about', defaultAbout);
  }

  // Check if tech content exists
  const techContent = await getPageContent('tech');
  if (!techContent) {
    const defaultTech: TechPageContent = {
      pageTitle: "Technology Innovation",
      pageDescription: "Our research and development spans every bright idea, creating comprehensive technology platforms that transform concepts into reality.",
      softwareSolutions: [
        {
          id: "1",
          title: "Sport Photography Automation",
          description: "Advanced capture systems that automatically track and photograph athletes in real-time",
          features: ["Real-time tracking", "Automatic capture", "Cloud processing", "Instant delivery"],
        },
        {
          id: "2",
          title: "Face Recognition Albums",
          description: "AI-powered photo organization that automatically sorts and tags images by person",
          features: ["Face detection", "Auto-tagging", "Smart albums", "Privacy protection"],
        },
      ],
      hardwareSystems: [
        {
          id: "1",
          title: "IoT Camera Systems",
          description: "Network-connected cameras with advanced sensing and processing capabilities",
          features: ["Wireless connectivity", "Edge processing", "Remote monitoring", "Power efficient"],
        },
        {
          id: "2",
          title: "3D Printing Solutions",
          description: "Custom 3D printing services for prototyping and manufacturing",
          features: ["Custom designs", "Rapid prototyping", "Multiple materials", "Precision printing"],
        },
      ],
    };

    await updatePageContent('tech', defaultTech);
  }

  // Check if contact content exists
  const contactContent = await getPageContent('contact');
  if (!contactContent) {
    const defaultContact: ContactPageContent = {
      pageTitle: "Contact Us",
      pageDescription: "Get in touch with our team to discuss your project or learn more about our innovative technology solutions.",
      email: "info@ktprodtechnology.com",
      phone: "+1 (555) 123-4567",
      address: "123 Innovation Drive, Tech City, TC 12345",
      formTitle: "Send us a message",
      formDescription: "Have a question or want to start a project? Fill out the form below and we'll get back to you within 24 hours.",
    };

    await updatePageContent('contact', defaultContact);
  }
}
