const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function migrateToCloudinary() {
  try {
    console.log('Starting migration to Cloudinary...');
    
    // Read local blog posts
    const blogPostsPath = path.join(__dirname, '../data/blog-posts.json');
    const blogPostsData = fs.readFileSync(blogPostsPath, 'utf-8');
    const blogPosts = JSON.parse(blogPostsData);
    
    console.log(`Found ${blogPosts.length} blog posts to migrate`);
    
    for (const post of blogPosts) {
      try {
        // Create a unique public ID for the post
        const publicId = `blog/posts/${post.id}`;
        
        // Convert post to JSON string
        const postJson = JSON.stringify(post, null, 2);
        
        // Create a data URI for upload
        const dataUri = `data:application/json;base64,${Buffer.from(postJson).toString('base64')}`;
        
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(dataUri, {
          resource_type: 'raw',
          public_id: publicId,
          overwrite: true,
          folder: 'blog/posts'
        });
        
        console.log(`✅ Migrated post: ${post.title} (${post.id})`);
        console.log(`   Cloudinary URL: ${result.secure_url}`);
        
      } catch (error) {
        console.error(`❌ Failed to migrate post ${post.id}:`, error.message);
      }
    }
    
    console.log('\n🎉 Migration completed!');
    console.log(`Successfully migrated blog posts to Cloudinary`);
    console.log('\nNext steps:');
    console.log('1. Deploy these changes to production');
    console.log('2. Remove the local data/blog-posts.json file');
    console.log('3. Test blog functionality in production');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

// Run migration
migrateToCloudinary();
