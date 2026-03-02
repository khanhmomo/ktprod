export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  description: string;
  featuredImage?: string;
  videoUrl?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  tags: string[];
  author: string;
  category: 'General' | 'Tech News' | 'R&D';
  readingTime: number;
  imageMarkers?: ImageMarker[]; // New field for image position tracking
}

export interface ImageMarker {
  id: string;
  src: string;
  position: number; // Character position in content
  alt?: string;
  width?: number;
  height?: number;
}

export interface PageContent {
  id: string;
  type: 'home' | 'about' | 'tech' | 'contact';
  title: string;
  description: string;
  content: Record<string, any>;
  images?: Record<string, string>;
  updatedAt: Date;
}

export interface HomePageContent {
  heroTitle: string;
  heroDescription: string;
  ctaButtonText: string;
  secondaryButtonText: string;
  featuredVideo?: string;
}

export interface AboutPageContent {
  pageTitle: string;
  pageDescription: string;
  companyStory: string;
  missionStatement: string;
  teamMembers?: TeamMember[];
}

export interface TechPageContent {
  pageTitle: string;
  pageDescription: string;
  softwareSolutions: TechSolution[];
  hardwareSystems: TechSolution[];
}

export interface ContactPageContent {
  pageTitle: string;
  pageDescription: string;
  email: string;
  phone: string;
  address: string;
  formTitle: string;
  formDescription: string;
}

export interface TechSolution {
  id: string;
  title: string;
  description: string;
  features: string[];
  image?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface CloudinaryResource {
  publicId: string;
  url: string;
  width?: number;
  height?: number;
  size?: number;
  format?: string;
}
