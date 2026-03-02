import { BlogPost, BlogPostInput } from "@/types/blog";

// Mock data - in a real app this would come from a database
const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Automated Runner Tracking System",
    slug: "automated-runner-tracking-system",
    description: "How our computer vision system captures runners automatically on track with precision timing and perfect moments.",
    content: `# Automated Runner Tracking System

At KTProd Technology, we've developed a cutting-edge system that automatically tracks and photographs runners on track, eliminating the need for manual camera operation.

## Real-Time Tracking Technology

Our system uses advanced computer vision algorithms to:
- Track multiple runners simultaneously across different lanes
- Predict optimal photo moments based on runner positioning and speed
- Automatically trigger cameras at the perfect moment for each runner

## Precision Timing Integration

The system integrates with existing timing infrastructure to:
- Synchronize photo capture with timing gates
- Ensure consistent photo quality across all participants
- Provide instant photo delivery linked to runner results

## Technical Specifications

- **Tracking Accuracy**: 99.8% lane detection
- **Response Time**: Under 50ms from detection to capture
- **Multi-Lane Support**: Up to 12 lanes simultaneously
- **Weather Resistance**: Operates in all weather conditions

## Results

Our automated system has increased photo coverage by 300% while reducing manual labor costs by 80%. Event organizers report higher participant satisfaction and faster photo delivery times.`,
    coverImage: "/api/placeholder/800/400",
    published: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    publishedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Face Recognition for Smart Photo Albums",
    slug: "face-recognition-photo-albums",
    description: "Revolutionary facial recognition technology that automatically organizes sport event photos by participants.",
    content: `# Face Recognition for Smart Photo Albums

Our facial recognition system transforms how sport event photos are organized and delivered, creating personalized albums for each participant automatically.

## Privacy-First Recognition

We've built our system with privacy as the foundation:
- On-premise processing - no cloud uploads of facial data
- Optional participation - athletes can opt-out of recognition
- Data deletion - facial data is deleted after event completion
- GDPR compliant - full compliance with privacy regulations

## Smart Album Creation

The system automatically:
- Identifies participants across all event photos
- Creates personalized photo albums for each athlete
- Groups photos by event, heat, and achievement
- Sends secure links to participants for their photos

## Technical Implementation

- **Recognition Accuracy**: 97.3% for sport photography conditions
- **Processing Speed**: 1000 photos per minute
- **Database Support**: Up to 10,000 participants per event
- **Mobile Integration**: Native apps for photo browsing and sharing

## Impact

Events using our system see:
- 400% increase in photo sales
- 95% participant satisfaction rate
- 60% reduction in manual photo sorting
- Instant photo delivery after events`,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    published: true,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
    publishedAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    title: "IoT Devices for Sport Photography",
    slug: "iot-devices-sport-photography",
    description: "Custom IoT sensors and devices that enable real-time automation and intelligent photography triggers.",
    content: `# IoT Devices for Sport Photography

Our custom IoT devices form the backbone of our automated photography system, enabling real-time data collection and intelligent camera triggers.

## Sensor Network Architecture

We've developed a comprehensive IoT ecosystem:
- Wireless motion sensors along track boundaries
- Precision timing gates with photo trigger integration
- Environmental sensors for optimal camera settings
- Network mesh for redundant communication

## Smart Trigger System

The IoT network enables:
- Automatic camera positioning based on runner location
- Adaptive settings for lighting and weather conditions
- Predictive triggering before runners reach optimal positions
- Fail-safe redundancy for critical moments

## Hardware Specifications

- **Battery Life**: 72 hours continuous operation
- **Range**: 500m wireless communication
- **Accuracy**: 10cm positioning precision
- **Weather Rating**: IP67 for outdoor use

## Integration Capabilities

Our IoT devices integrate with:
- Existing timing systems (ChronoTrack, FinishLynx)
- Professional camera systems (Canon, Nikon, Sony)
- Event management platforms
- Photo delivery systems

## Results

Events using our IoT integration report:
- Zero missed photo opportunities
- 50% reduction in manual camera operations
- Perfect synchronization with timing systems
- Real-time photo availability for media`,
    published: true,
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
    publishedAt: new Date("2024-01-05"),
  },
  {
    id: "4",
    title: "3D Printing Custom Camera Equipment",
    slug: "3d-printing-camera-equipment",
    description: "Rapid prototyping and manufacturing of specialized camera mounts and equipment for sport photography.",
    content: `# 3D Printing Custom Camera Equipment

Our 3D design and printing capabilities allow us to create custom equipment solutions for unique sport photography challenges.

## Custom Equipment Design

We specialize in:
- Camera mounts for irregular surfaces and venues
- Protective housings for extreme weather conditions
- Custom brackets for multi-camera setups
- Specialized equipment for niche sports

## Rapid Prototyping Process

Our development workflow:
- On-site measurement and requirements gathering
- CAD modeling with stress analysis
- 3D printing with industrial-grade materials
- Field testing and iteration

## Materials and Capabilities

- **Materials**: Carbon fiber, ABS, PETG, flexible TPU
- **Print Volume**: Up to 500mm build area
- **Resolution**: 50 micron layer height
- **Strength**: Industrial-grade durability

## Success Stories

Recent custom projects include:
- Underwater camera housing for swimming events
- Pole-mounted camera system for track events
- Custom helmet mounts for action sports
- Weather-protected remote camera enclosures

## Benefits

3D printing enables:
- 70% faster equipment development
- 60% cost reduction vs traditional manufacturing
- Perfect customization for each venue
- Rapid iteration for optimization`,
    published: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    publishedAt: new Date("2024-01-01"),
  },
];

export async function getBlogPosts(): Promise<BlogPost[]> {
  // In a real app, this would query a database
  return mockBlogPosts.filter(post => post.published);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // In a real app, this would query a database
  return mockBlogPosts.find(post => post.slug === slug && post.published) || null;
}

export async function createBlogPost(data: BlogPostInput): Promise<BlogPost> {
  // In a real app, this would insert into a database
  const newPost: BlogPost = {
    id: Date.now().toString(),
    slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: data.published ? new Date() : undefined,
  };
  
  mockBlogPosts.push(newPost);
  return newPost;
}

export async function updateBlogPost(id: string, data: Partial<BlogPostInput>): Promise<BlogPost | null> {
  // In a real app, this would update a database record
  const postIndex = mockBlogPosts.findIndex(post => post.id === id);
  if (postIndex === -1) return null;
  
  mockBlogPosts[postIndex] = {
    ...mockBlogPosts[postIndex],
    ...data,
    updatedAt: new Date(),
    publishedAt: data.published && !mockBlogPosts[postIndex].publishedAt ? new Date() : mockBlogPosts[postIndex].publishedAt,
  };
  
  return mockBlogPosts[postIndex];
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  // In a real app, this would delete from a database
  const postIndex = mockBlogPosts.findIndex(post => post.id === id);
  if (postIndex === -1) return false;
  
  mockBlogPosts.splice(postIndex, 1);
  return true;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  // For admin - includes unpublished posts
  return mockBlogPosts;
}
