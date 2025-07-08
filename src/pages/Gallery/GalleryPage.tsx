import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import SectionHeader from '../../components/shared/SectionHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { galleryImages, galleryCategories, GalleryImage } from '../../data/galleryData';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter images based on selected category
  const filteredImages = selectedCategory === 'all'
    ? galleryImages
    : galleryImages.filter(image => image.category === selectedCategory);

  return (
    <PageLayout title="Gallery">
      {/* Header in the style of Hinduism for Children */}
      <div className="flex items-center justify-center py-12 bg-gradient-to-br from-indian-cream to-white">
        <div className="inline-block p-6 rounded-lg bg-gradient-to-br from-indian-cream to-white border border-indian-saffron shadow-lg transform transition-all duration-500 hover:shadow-xl hover:scale-[1.01] text-center">
          <h1 className="text-3xl font-heading font-bold mb-4 text-black">Gallery</h1>
          <p className="text-gray-700">
            Visual journey through our centre's programmes, activities, and spiritual heritage
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full bg-gradient-to-br from-indian-cream to-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Gallery"
            subtitle="Browse images from our seminars and educational activities"
          />

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className={`mb-2 ${
                selectedCategory === 'all'
                  ? 'bg-spiritual-600 hover:bg-spiritual-700 text-white border-spiritual-600'
                  : 'border-indian-saffron text-indian-saffron hover:bg-indian-saffron/10 bg-white'
              }`}
            >
              All
            </Button>
            <Button
              variant={selectedCategory === 'seminars' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('seminars')}
              className={`mb-2 ${
                selectedCategory === 'seminars'
                  ? 'bg-spiritual-600 hover:bg-spiritual-700 text-white border-spiritual-600'
                  : 'border-indian-saffron text-indian-saffron hover:bg-indian-saffron/10 bg-white'
              }`}
            >
              Seminars
            </Button>
          </div>

          {/* Results Count */}
          <div className="text-center mb-6">
            <p className="text-gray-600">
              Showing {filteredImages.length} image{filteredImages.length !== 1 ? 's' : ''}
              {selectedCategory === 'seminars' && ' from Seminars & Lectures'}
            </p>
          </div>

          {/* Gallery Grid */}
          <GalleryGrid images={filteredImages} />
        </div>
      </div>
    </PageLayout>
  );
};

// Gallery Grid Component
interface GalleryGridProps {
  images: GalleryImage[];
}

const GalleryGrid = ({ images }: GalleryGridProps) => {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  // Function to handle image load success
  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => ({
      ...prev,
      [id]: true
    }));
  };

  // Function to handle image load error
  const handleImageError = (id: string) => {
    setLoadedImages(prev => ({
      ...prev,
      [id]: false
    }));
  };

  // Filter out images that failed to load
  const validImages = images.filter(image => loadedImages[image.id] !== false);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((image) => (
        <Link
          key={image.id}
          to={`/gallery/image/${image.id}`}
          className={`block transform transition-all duration-300 hover:scale-[1.02] h-[300px] ${
            loadedImages[image.id] === false ? 'hidden' : ''
          }`}
        >
          <Card className="overflow-hidden border border-indian-saffron/30 bg-gradient-to-br from-indian-cream to-white pop-shadow-card h-full relative hover:shadow-lg transition-all duration-300">
            {/* Image fills the entire card */}
            <div className="w-full h-full absolute inset-0">
              <img
                src={image.path}
                alt={image.title}
                className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                onLoad={() => handleImageLoad(image.id)}
                onError={() => handleImageError(image.id)}
              />
            </div>
            {/* No text overlay or content on the cards */}
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default GalleryPage;
