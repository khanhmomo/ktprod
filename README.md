# 🚀 KTProd Platform

A modern, professional blog platform built with Next.js 16, featuring a rich text editor with TinyMCE, responsive design, and comprehensive content management.

## ✨ Features

### 🎨 **Professional Blog Editor**
- **TinyMCE Rich Text Editor** - Microsoft Word-like editing experience
- **Advanced Text Formatting** - Bold, italic, underline, strikethrough, headers
- **Image Management** - Upload, paste, and drag-and-drop images
- **Tables & Media** - Full table support and media embedding
- **Fullscreen Mode** - Distraction-free writing environment
- **Auto-save** - Prevents content loss during editing

### 🛠️ **Technical Stack**
- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Editor**: TinyMCE 7 with premium API integration
- **UI Components**: Custom components with shadcn/ui
- **Database**: JSON-based storage with persistent file system
- **Deployment**: Vercel with automatic CI/CD

### 📱 **Responsive Design**
- **Mobile-First** - Optimized for all screen sizes
- **Dark Mode** - Built-in theme toggle
- **Professional UI** - Clean, modern interface
- **Accessibility** - WCAG compliant design

### 🔐 **Admin Features**
- **Secure Authentication** - Protected admin routes
- **Content Management** - Create, edit, delete blog posts
- **Image Upload** - Local and cloud-based image handling
- **Category Management** - Organize content by categories
- **SEO Optimization** - Meta tags and structured data

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/khanhmomo/ktprod.git
cd ktprod
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Add your TinyMCE API key and other environment variables
```

4. **Run development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ktprod/
├── app/                    # Next.js 16 App Router
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   └── (pages)/           # Public pages
├── components/            # React components
│   ├── admin/             # Admin components
│   ├── layout/            # Layout components
│   ├── shared/            # Shared components
│   └── ui/                # UI components
├── lib/                   # Utility libraries
├── types/                 # TypeScript definitions
├── data/                  # Static data
└── public/                # Static assets
```

## 🛠️ Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

### Environment Variables

Create a `.env.local` file with:

```env
# TinyMCE API Key
TINYMCE_API_KEY=your_api_key_here

# Next.js
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Database (if using external DB)
DATABASE_URL=your_database_url
```

## 📝 Content Management

### Creating Blog Posts

1. **Access Admin Panel**
   - Navigate to `/admin`
   - Log in with your credentials

2. **Create New Post**
   - Click "New Blog Post"
   - Fill in title, description, and content
   - Use the rich text editor for formatting
   - Add images via upload or paste
   - Select category and publish

3. **Edit Existing Posts**
   - Go to `/admin/blog`
   - Click "Edit" on any post
   - Make changes and save

### Rich Text Editor Features

- **Text Formatting**: Bold, italic, underline, strikethrough
- **Headers**: H1-H6 heading levels
- **Lists**: Ordered and bullet lists
- **Links**: Internal and external links
- **Images**: Upload, paste, or drag-and-drop
- **Tables**: Create and edit tables
- **Colors**: Text and background colors
- **Alignment**: Left, center, right, justify

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   - Push to `main` branch triggers automatic deployment
   - Configure environment variables in Vercel dashboard

2. **Branch Strategy**
   - `main` → Production (auto-deploys to Vercel)
   - `dev` → Development (requires review)
   - `feature/*` → Feature branches

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔄 Git Workflow

### Development Process

1. **Create Feature Branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make Changes**
```bash
git add .
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
```

3. **Create Pull Request**
   - Create PR to `dev` branch
   - Wait for review and approval
   - Merge to `dev` after approval

4. **Deploy to Production**
```bash
git checkout main
git merge dev
git push origin main  # Triggers Vercel deployment
```

### Branch Protection

- **Dev Branch**: Requires pull request and approval
- **Main Branch**: Protected, only accepts merges from dev
- **Automated Checks**: Build, TypeScript, and test validation

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Type Checking
```bash
# Check TypeScript types
npm run type-check
```

## 🎨 Customization

### Theming

The application uses Tailwind CSS with a custom theme. Modify `tailwind.config.ts` to customize:

- **Colors**: Update color palette
- **Fonts**: Change typography
- **Spacing**: Adjust layout spacing
- **Breakpoints**: Modify responsive breakpoints

### Components

Add new components in the `components/` directory:

```typescript
// components/ui/new-component.tsx
export function NewComponent() {
  return (
    <div className="custom-styles">
      {/* Your component content */}
    </div>
  );
}
```

## 🔧 Configuration

### TinyMCE Editor

Configure the rich text editor in `components/admin/tinymce-editor.tsx`:

- **Toolbar**: Customize available tools
- **Plugins**: Add or remove editor plugins
- **Themes**: Change editor appearance
- **Image Handling**: Configure upload and paste behavior

### Database

The application uses JSON-based storage by default. To use an external database:

1. Update database configuration in `lib/`
2. Modify API routes in `app/api/`
3. Update TypeScript types in `types/`

## 🐛 Troubleshooting

### Common Issues

1. **TinyMCE API Key Error**
   - Ensure valid API key in environment variables
   - Check domain configuration in TinyMCE dashboard

2. **Build Errors**
   - Run `npm run type-check` to check TypeScript
   - Verify all environment variables are set

3. **Image Upload Issues**
   - Check file permissions
   - Verify image size limits (5MB default)

4. **Deployment Issues**
   - Ensure all environment variables are set in Vercel
   - Check build logs for errors

### Getting Help

- **Documentation**: Check this README and `WORKFLOW.md`
- **Issues**: Create GitHub issue with detailed description
- **Support**: Contact development team

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Create a pull request to `dev`
6. Wait for review and approval

## 📞 Contact

- **GitHub**: [@khanhmomo](https://github.com/khanhmomo)
- **Email**: [your-email@example.com](mailto:your-email@example.com)
- **Website**: [https://your-domain.com](https://your-domain.com)

---

**Built with ❤️ using Next.js 16, TypeScript, and TinyMCE**
