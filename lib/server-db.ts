import { cloudinary } from './cloudinary';

// Server-side content storage (for use in server components and API routes)
export async function savePageContentServer(type: string, content: any) {
  try {
    console.log(`Saving content for ${type}:`, content);
    
    const jsonString = JSON.stringify(content);
    const base64 = Buffer.from(jsonString).toString('base64');
    const dataURI = `data:application/json;base64,${base64}`;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'content/pages',
      resource_type: 'raw',
      public_id: `content/pages/${type}`,
      overwrite: true,
    });
    
    console.log(`Successfully saved ${type}:`, result.public_id);
    return result;
  } catch (error) {
    console.error(`Failed to save ${type}:`, error);
    throw error;
  }
}

export async function loadPageContentServer(type: string) {
  try {
    console.log(`Loading content for ${type}`);
    
    const result = await cloudinary.api.resource(`content/pages/${type}`, {
      resource_type: 'raw',
    });
    
    if (result && result.secure_url) {
      const response = await fetch(result.secure_url);
      const content = await response.json();
      console.log(`Successfully loaded ${type}:`, content);
      return content;
    }
    
    console.log(`No content found for ${type}`);
    return null;
  } catch (error) {
    console.error(`Failed to load ${type}:`, error);
    return null;
  }
}
