const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: 'dvc6icxjj',
  api_key: '428694789933271',
  api_secret: 'dtEe6M2C06UXWEPsplY-WHU1M_o',
  secure: true,
});

async function checkBlogPosts() {
  try {
    console.log('Checking Cloudinary configuration...');
    console.log('Cloud name: dvc6icxjj');
    console.log('API Key: Set');
    console.log('API Secret: Set');
    
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'blog/posts/',
      resource_type: 'raw'
    });
    
    console.log('\nFound', result.resources.length, 'blog posts in Cloudinary:');
    result.resources.forEach(resource => {
      console.log('- Public ID:', resource.public_id);
      console.log('  Created:', new Date(resource.created_at).toLocaleString());
    });
    
    if (result.resources.length > 0) {
      // Try to fetch content of first post
      const firstResource = result.resources[0];
      console.log('\nTrying to fetch content of first post...');
      
      const url = cloudinary.url(firstResource.public_id, {
        resource_type: 'raw',
        secure: true
      });
      
      console.log('Content URL:', url);
      
      const response = await fetch(url);
      const content = await response.json();
      console.log('Content preview:', {
        id: content.id,
        title: content.title,
        slug: content.slug,
        published: content.published
      });
    }
  } catch (error) {
    console.error('Error:', error);
    console.error('Stack:', error.stack);
  }
}

checkBlogPosts();
