import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { fill, scale } from '@cloudinary/url-gen/actions/resize';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import { quality } from '@cloudinary/url-gen/actions/delivery';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Upload image to Cloudinary
export async function uploadImage(file: File, folder: string = 'blog') {
  try {
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const dataURI = `data:${file.type};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder,
      resource_type: 'auto',
      quality: 'auto',
      fetch_format: 'auto',
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      size: result.bytes,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image');
  }
}

// Delete image from Cloudinary
export async function deleteImage(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete image');
  }
}

// Get optimized image URL
export function getOptimizedUrl(publicId: string, options: {
  width?: number;
  height?: number;
  crop?: string;
  quality?: number;
  format?: string;
} = {}) {
  const image = new CloudinaryImage(publicId);
  
  // Apply transformations
  if (options.width || options.height) {
    if (options.width && options.height) {
      image.resize(fill().width(options.width).height(options.height));
    } else if (options.width) {
      image.resize(scale().width(options.width));
    } else if (options.height) {
      image.resize(scale().height(options.height));
    }
  }
  
  if (options.quality) {
    image.delivery(quality(options.quality));
  }
  
  if (options.format) {
    image.format(options.format);
  } else {
    // Auto format (WebP, AVIF, etc.)
    image.format('auto');
  }
  
  return image.toURL();
}

// Store content in Cloudinary as JSON
export async function storeContent(content: any, folder: string = 'content', publicId?: string) {
  try {
    const jsonString = JSON.stringify(content);
    const base64 = Buffer.from(jsonString).toString('base64');
    const dataURI = `data:application/json;base64,${base64}`;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      folder,
      resource_type: 'raw',
      format: 'json',
      public_id: publicId || `${folder}/${content.type || 'unknown'}-${content.id || Date.now()}`,
    });
    
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('Cloudinary content storage error:', error);
    throw new Error('Failed to store content');
  }
}

// Retrieve content from Cloudinary
export async function getContent(publicId: string) {
  try {
    const result = await cloudinary.api.resource(publicId, {
      resource_type: 'raw',
    });
    
    console.log(`Retrieving content for ${publicId}:`, {
      format: result.format,
      resource_type: result.resource_type,
      secure_url: result.secure_url
    });
    
    // For raw files, the format might not be 'json' but the content is still JSON
    if (result.resource_type === 'raw' && result.secure_url) {
      const response = await fetch(result.secure_url);
      const contentType = response.headers.get('content-type');
      
      console.log(`Content type for ${publicId}:`, contentType);
      
      if (contentType && contentType.includes('application/json')) {
        const content = await response.json();
        return content;
      } else {
        // Try to parse as JSON anyway since we upload JSON as base64 data URIs
        const text = await response.text();
        try {
          const content = JSON.parse(text);
          return content;
        } catch (parseError) {
          console.error(`Failed to parse content as JSON for ${publicId}:`, parseError);
          console.error(`Raw content:`, text.substring(0, 200));
          throw new Error('Content is not valid JSON');
        }
      }
    }
    
    throw new Error('Invalid content format');
  } catch (error) {
    console.error('Cloudinary content retrieval error:', error);
    throw new Error('Failed to retrieve content');
  }
}

export { cloudinary };
