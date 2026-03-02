import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, where, setDoc } from 'firebase-admin/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase-admin/storage';
import { BlogPost } from '@/types/blog';

// Initialize Firebase Admin SDK
const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
};

// Initialize Firebase if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const storage = getStorage(app);

// Blog Posts Management
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const postsRef = collection(db, 'blog_posts');
    const q = query(postsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        slug: data.slug,
        description: data.description,
        excerpt: data.excerpt || undefined,
        content: data.content,
        coverImage: data.coverImage || undefined,
        featuredImage: data.featuredImage || undefined,
        videoUrl: data.videoUrl || undefined,
        author: data.author || undefined,
        category: data.category || undefined,
        published: data.published,
        readingTime: data.readingTime || undefined,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        publishedAt: data.publishedAt ? data.publishedAt.toDate() : undefined,
      };
    });
  } catch (error) {
    console.error('Failed to get blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const postsRef = collection(db, 'blog_posts');
    const q = query(postsRef, where('slug', '==', slug));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return null;
    
    const doc = snapshot.docs[0];
    const data = doc.data();
    
    return {
      id: doc.id,
      title: data.title,
      slug: data.slug,
      description: data.description,
      excerpt: data.excerpt || undefined,
      content: data.content,
      coverImage: data.coverImage || undefined,
      featuredImage: data.featuredImage || undefined,
      videoUrl: data.videoUrl || undefined,
      author: data.author || undefined,
      category: data.category || undefined,
      published: data.published,
      readingTime: data.readingTime || undefined,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
      publishedAt: data.publishedAt ? data.publishedAt.toDate() : undefined,
    };
  } catch (error) {
    console.error('Failed to get blog post:', error);
    return null;
  }
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const docRef = doc(db, 'blog_posts', id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return null;
    
    const data = docSnap.data();
    return {
      id: docSnap.id,
      title: data.title,
      slug: data.slug,
      description: data.description,
      excerpt: data.excerpt || undefined,
      content: data.content,
      coverImage: data.coverImage || undefined,
      featuredImage: data.featuredImage || undefined,
      videoUrl: data.videoUrl || undefined,
      author: data.author || undefined,
      category: data.category || undefined,
      published: data.published,
      readingTime: data.readingTime || undefined,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
      publishedAt: data.publishedAt ? data.publishedAt.toDate() : undefined,
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
    const docRef = await addDoc(collection(db, 'blog_posts'), {
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
      createdAt: now,
      updatedAt: now,
      publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
    });
    
    // Return the created post with ID
    return await getBlogPostById(docRef.id) as BlogPost;
  } catch (error) {
    console.error('Failed to create blog post:', error);
    throw new Error('Failed to create blog post');
  }
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  try {
    const docRef = doc(db, 'blog_posts', id);
    
    // Recalculate reading time if content updated
    let readingTime = updates.readingTime;
    if (updates.content) {
      const wordsPerMinute = 200;
      const wordCount = updates.content.split(/\s+/).length;
      readingTime = Math.ceil(wordCount / wordsPerMinute);
    }
    
    await updateDoc(docRef, {
      ...updates,
      readingTime,
      updatedAt: new Date(),
      publishedAt: updates.publishedAt ? new Date(updates.publishedAt) : null,
    });
    
    return await getBlogPostById(id);
  } catch (error) {
    console.error('Failed to update blog post:', error);
    return null;
  }
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'blog_posts', id));
    return true;
  } catch (error) {
    console.error('Failed to delete blog post:', error);
    return false;
  }
}

// Image upload using Firebase Storage
export async function uploadImage(file: File, folder: string = 'blog'): Promise<{ url: string; path: string }> {
  try {
    const filename = `${folder}/${Date.now()}-${file.name}`;
    const storageRef = ref(storage, filename);
    
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    
    return {
      url: downloadUrl,
      path: filename,
    };
  } catch (error) {
    console.error('Failed to upload image:', error);
    throw new Error('Failed to upload image');
  }
}

export async function deleteImage(path: string): Promise<boolean> {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error('Failed to delete image:', error);
    return false;
  }
}

// Page Content Management
export async function getPageContent(type: string): Promise<any> {
  try {
    const docRef = doc(db, 'page_contents', type);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('Failed to get page content:', error);
    return null;
  }
}

export async function storePageContent(type: string, content: any): Promise<void> {
  try {
    const docRef = doc(db, 'page_contents', type);
    await setDoc(docRef, {
      ...content,
      updatedAt: new Date(),
    }, { merge: true });
  } catch (error) {
    console.error('Failed to store page content:', error);
    throw new Error('Failed to store page content');
  }
}
