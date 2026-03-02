import { getPageContent, storePageContent } from './database-appwrite';

// Server-side content storage using Appwrite
export async function savePageContentServer(type: string, content: any) {
  try {
    console.log(`Saving content for ${type}:`, content);
    await storePageContent(type, content);
    console.log(`Successfully saved content for ${type}`);
  } catch (error) {
    console.error('Failed to save page content:', error);
    throw new Error('Failed to save page content');
  }
}

// Server-side content retrieval using Appwrite
export async function loadPageContentServer(type: string) {
  try {
    console.log(`Loading content for ${type}`);
    const content = await getPageContent(type);
    console.log(`Successfully loaded content for ${type}`);
    return content;
  } catch (error) {
    console.error('Failed to load page content:', error);
    return null;
  }
}
