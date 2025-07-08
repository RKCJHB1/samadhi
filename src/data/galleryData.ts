// Define the structure for gallery images
export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  path: string;
  category: string;
  date?: string;
  featured?: boolean;
}

// Define the structure for gallery categories
export interface GalleryCategory {
  id: string;
  name: string;
  description?: string;
}

// Define gallery categories - only showing categories that have actual images
export const galleryCategories: GalleryCategory[] = [
  {
    id: 'seminars',
    name: 'Seminars & Lectures',
    description: 'Educational seminars and spiritual lectures at the Centre'
  }
];

// Define gallery images organized by programmes/functions
export const galleryImages: GalleryImage[] = [
  // Seminars & Lectures Category
  {
    id: 'seminar1',
    title: 'Seminar (18th May 2025) - Opening Session',
    description: 'Opening session of the spiritual seminar',
    path: '/images/1.jpg',
    category: 'seminars',
    date: '2025-05-18',
    featured: true
  },
  {
    id: 'seminar2',
    title: 'Seminar (18th May 2025) - Lecture Hall',
    description: 'Participants attending the seminar lecture',
    path: '/images/2.jpg',
    category: 'seminars',
    date: '2025-05-18'
  },
  {
    id: 'seminar3',
    title: 'Seminar (18th May 2025) - Group Discussion',
    description: 'Interactive group discussion session',
    path: '/images/3.jpg',
    category: 'seminars',
    date: '2025-05-18'
  },
  {
    id: 'seminar4',
    title: 'Seminar (18th May 2025) - Prayer Session',
    description: 'Collective prayer and meditation',
    path: '/images/4.jpg',
    category: 'seminars',
    date: '2025-05-18'
  },
  {
    id: 'seminar5',
    title: 'Seminar (18th May 2025) - Participants',
    description: 'Seminar participants and attendees',
    path: '/images/5.jpg',
    category: 'seminars',
    date: '2025-05-18'
  },

  // Additional Seminar Images
  {
    id: 'seminar6',
    title: 'Seminar (18th May 2025) - Closing Ceremony',
    description: 'Closing ceremony of the seminar',
    path: '/images/6.jpg',
    category: 'seminars',
    date: '2025-05-18'
  },
  {
    id: 'seminar7',
    title: 'Seminar (18th May 2025) - Group Photo',
    description: 'Group photograph of all participants',
    path: '/images/7.jpg',
    category: 'seminars',
    date: '2025-05-18'
  },
  {
    id: 'seminar8',
    title: 'Seminar (18th May 2025) - Workshop Session',
    description: 'Interactive workshop activities',
    path: '/images/8.jpg',
    category: 'seminars',
    date: '2025-05-18'
  },
  {
    id: 'seminar9',
    title: 'Seminar (18th May 2025) - Refreshments',
    description: 'Tea break and refreshments',
    path: '/images/9.jpg',
    category: 'seminars',
    date: '2025-05-18'
  },
  {
    id: 'seminar10',
    title: 'Seminar (18th May 2025) - Final Session',
    description: 'Final session and concluding remarks',
    path: '/images/10.jpg',
    category: 'seminars',
    date: '2025-05-18'
  },
];

// Helper function to get images by category
export const getImagesByCategory = (categoryId: string): GalleryImage[] => {
  return galleryImages.filter(image => image.category === categoryId);
};

// Helper function to get featured images
export const getFeaturedImages = (): GalleryImage[] => {
  return galleryImages.filter(image => image.featured);
};

// Helper function to get image by ID
export const getImageById = (imageId: string): GalleryImage | undefined => {
  return galleryImages.find(image => image.id === imageId);
};
