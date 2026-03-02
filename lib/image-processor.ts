// Helper function to get dynamic upload URL
function getUploadUrl() {
  return `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/upload`;
}
// Helper function to extract and upload images from HTML content (server-side)
export async function processImagesInContent(content: string): Promise<string> {
  console.log('Starting image processing for content length:', content.length);
  
  // Use regex to find all img tags with data:image src
  const imgRegex = /<img([^>]*?)src="(data:image\/[^"]*)"([^>]*?)>/gi;
  let processedContent = content;
  const matches = [...content.matchAll(imgRegex)];
  
  console.log(`Found ${matches.length} images to process`);
  
  if (matches.length === 0) {
    console.log('No base64 images found, returning content as-is');
    return content;
  }
  
  // Process each image
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const fullMatch = match[0];
    const beforeSrc = match[1];
    const base64Src = match[2];
    const afterSrc = match[3];
    
    console.log(`Processing image ${i + 1}/${matches.length}, base64 length: ${base64Src.length}`);
    
    try {
      // Convert base64 to blob
      const base64Data = base64Src.split(',')[1];
      const mimeType = base64Src.split(':')[1].split(';')[0];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let j = 0; j < byteCharacters.length; j++) {
        byteNumbers[j] = byteCharacters.charCodeAt(j);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });
      
      // Create file from blob
      const filename = `image-${Date.now()}-${i}.${mimeType.split('/')[1]}`;
      const file = new File([blob], filename, { type: mimeType });
      
      console.log(`Created file: ${filename}, size: ${file.size} bytes`);
      
      // Upload to Appwrite Storage
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'blog/content');
      
      const response = await fetch(getUploadUrl(), {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.json();
        // Replace base64 src with storage URL
        const newImgTag = `<img${beforeSrc}src="${result.url}"${afterSrc}>`;
        processedContent = processedContent.replace(fullMatch, newImgTag);
        console.log(`✅ Uploaded image ${i + 1}: ${result.url}`);
      } else {
        const errorText = await response.text();
        console.error(`❌ Failed to upload image ${i + 1}:`, errorText);
      }
    } catch (error) {
      console.error(`❌ Failed to process image ${i + 1}:`, error);
      // Keep original src if upload fails
    }
  }
  
  console.log(`Image processing complete. Processed ${matches.length} images`);
  return processedContent;
}

// Optimized version that only processes new images (compares with existing URLs)
export async function processImagesInContentOptimized(content: string, existingContent?: string): Promise<string> {
  if (!existingContent) {
    // If no existing content, process all images
    return processImagesInContent(content);
  }
  
  console.log('Starting optimized image processing...');
  
  // Extract existing image URLs from old content
  const existingUrls = new Set<string>();
  const existingImgRegex = /<img[^>]*?src="(https:\/\/nyc\.cloud\.appwrite\.io\/v1\/storage\/buckets\/[^"]*)"[^>]*?>/gi;
  const existingMatches = existingContent.matchAll(existingImgRegex);
  
  for (const match of existingMatches) {
    if (match[1]) {
      existingUrls.add(match[1]);
    }
  }
  
  console.log(`Found ${existingUrls.size} existing image URLs to preserve`);
  
  // Process only new base64 images
  const imgRegex = /<img([^>]*?)src="(data:image\/[^"]*)"([^>]*?)>/gi;
  let processedContent = content;
  const matches = [...content.matchAll(imgRegex)];
  
  console.log(`Found ${matches.length} new base64 images to process`);
  
  if (matches.length === 0) {
    console.log('No new base64 images found, returning content as-is');
    return content;
  }
  
  // Process each new image
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const fullMatch = match[0];
    const beforeSrc = match[1];
    const base64Src = match[2];
    const afterSrc = match[3];
    
    console.log(`Processing new image ${i + 1}/${matches.length}, base64 length: ${base64Src.length}`);
    
    try {
      // Convert base64 to blob
      const base64Data = base64Src.split(',')[1];
      const mimeType = base64Src.split(':')[1].split(';')[0];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let j = 0; j < byteCharacters.length; j++) {
        byteNumbers[j] = byteCharacters.charCodeAt(j);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });
      
      // Create file from blob
      const filename = `image-${Date.now()}-${i}.${mimeType.split('/')[1]}`;
      const file = new File([blob], filename, { type: mimeType });
      
      console.log(`Created file: ${filename}, size: ${file.size} bytes`);
      
      // Upload to Appwrite Storage
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'blog/content');
      
      const response = await fetch(getUploadUrl(), {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.json();
        // Replace base64 src with storage URL
        const newImgTag = `<img${beforeSrc}src="${result.url}"${afterSrc}>`;
        processedContent = processedContent.replace(fullMatch, newImgTag);
        console.log(`✅ Uploaded new image ${i + 1}: ${result.url}`);
      } else {
        const errorText = await response.text();
        console.error(`❌ Failed to upload new image ${i + 1}:`, errorText);
      }
    } catch (error) {
      console.error(`❌ Failed to process new image ${i + 1}:`, error);
      // Keep original src if upload fails
    }
  }
  
  console.log(`Optimized image processing complete. Processed ${matches.length} new images`);
  return processedContent;
}

// Helper function to upload cover/featured images
export async function uploadCoverImage(base64String: string): Promise<string | null> {
  if (!base64String || !base64String.startsWith('data:image')) {
    return base64String; // Return as-is if not a base64 image
  }
  
  try {
    // Convert base64 to blob
    const base64Data = base64String.split(',')[1];
    const mimeType = base64String.split(':')[1].split(';')[0];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    
    // Create file from blob
    const filename = `cover-${Date.now()}.${mimeType.split('/')[1]}`;
    const file = new File([blob], filename, { type: mimeType });
    
    // Upload to Appwrite Storage
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'blog/covers');
    
    const response = await fetch(getUploadUrl(), {
      method: 'POST',
      body: formData,
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log(`Uploaded cover image: ${result.url}`);
      return result.url; // Return the storage URL
    } else {
      console.error('Failed to upload cover image:', await response.text());
    }
  } catch (error) {
    console.error('Failed to upload cover image:', error);
  }
  
  return null; // Return null if upload fails
}
