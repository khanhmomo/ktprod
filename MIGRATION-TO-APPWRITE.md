# Complete Cloudinary to Appwrite Migration Guide

## What Needs to be Migrated

### 1. **Database & Storage** (Already Done ✅)
- Blog posts: Appwrite Databases API
- Images: Appwrite Storage
- Page content: Appwrite Databases

### 2. **Remaining Cloudinary References to Remove**

#### Files to Update/Delete:
- `/lib/cloudinary.ts` - DELETE (no longer needed)
- `/lib/database.ts` - DELETE (old Cloudinary version)
- `/lib/server-db.ts` - UPDATE to use Appwrite
- `/lib/simple-db.ts` - UPDATE to use Appwrite
- `/app/api/content/[type]/route.ts` - UPDATE to use Appwrite
- `/app/api/upload/content-image/route.ts` - UPDATE to use Appwrite
- `/app/api/debug/cloudinary/route.ts` - DELETE
- `/app/api/debug/cloudinary-config/route.ts` - DELETE
- `/app/api/debug/upload-test/route.ts` - DELETE

### 3. **TinyMCE Image Handling** (Keep - uses Appwrite upload API)
- TinyMCE editor already uses `/api/upload/blog-image` which is now Appwrite ✅

### 4. **Environment Variables to Remove**
```
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

### 5. **Dependencies to Remove**
```bash
npm uninstall cloudinary @cloudinary/url-gen @cloudinary/transformation-builder-sdk
```

## Appwrite Setup Checklist

### 1. **Create Appwrite Project**
- Go to https://cloud.appwrite.io
- Create new project: "ktprod-blog"

### 2. **Create Database**
- Database ID: `ktprod-blog`
- Tables:
  - `blog-posts` (for blog posts)
  - `page-contents` (for page content)

### 3. **Create Storage Bucket**
- Bucket ID: `blog-images`
- Permissions: Read/Write for testing

### 4. **Create API Key**
- Permissions: Databases, Storage, Users
- Copy Project ID, API Key, Endpoint

### 5. **Environment Variables for Vercel**
```env
APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
APPWRITE_PROJECT_ID="your-project-id"
APPWRITE_API_KEY="your-api-key"
APPWRITE_DATABASE_ID="ktprod-blog"
APPWRITE_BLOG_POSTS_TABLE_ID="blog-posts"
APPWRITE_PAGE_CONTENTS_TABLE_ID="page-contents"
APPWRITE_BUCKET_ID="blog-images"
```

### 6. **Table Attributes for blog-posts**
- title (Text, Required)
- slug (Text, Required, Unique)
- description (Text, Required)
- excerpt (Text, Optional)
- content (Text, Required)
- coverImage (Text, Optional)
- featuredImage (Text, Optional)
- videoUrl (Text, Optional)
- author (Text, Optional)
- category (Text, Optional)
- published (Boolean, Default: false)
- readingTime (Integer, Optional)
- createdAt (DateTime, Default: now)
- updatedAt (DateTime, Default: now)
- publishedAt (DateTime, Optional)

### 7. **Table Attributes for page-contents**
- type (Text, Required, Unique)
- title (Text, Required)
- description (Text, Required)
- content (Any, Required)
- images (Any, Optional)
- createdAt (DateTime, Default: now)
- updatedAt (DateTime, Default: now)

## Benefits After Migration
✅ No rate limits (unlike Cloudinary's 500/day)
✅ 2GB free storage (1GB DB + 1GB Storage)
✅ Unlimited bandwidth
✅ Real-time features
✅ No credit card required
✅ Better performance with CDN
