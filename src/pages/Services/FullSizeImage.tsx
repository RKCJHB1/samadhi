import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import ImageViewLayout from '../../components/layout/ImageViewLayout';

const FullSizeImage = () => {
  const { imageId } = useParams();
  const navigate = useNavigate();

  // Map of image IDs to their paths and titles for nutrition programme
  const nutritionImages = [
    {
      id: 'june2025',
      path: '/images/nutrition/june2025.jpg',
      title: 'June Distribution'
    },
    {
      id: 'may2025',
      path: '/images/nutrition/may2025.jpg',
      title: 'May Distribution'
    },
    {
      id: 'april2025',
      path: '/images/nutrition/april2025.jpg',
      title: 'April Distribution'
    },
    {
      id: 'march2025',
      path: '/images/nutrition/march2025.jpg',
      title: 'March Distribution'
    },
    {
      id: 'feb2025',
      path: '/images/nutrition/feb2025.jpg',
      title: 'February Distribution'
    },
    {
      id: 'jan2025',
      path: '/images/nutrition/jan2025.jpg',
      title: 'January Distribution'
    },
    {
      id: 'december2024',
      path: '/images/nutrition/december2024.jpg',
      title: 'December Distribution'
    },
    {
      id: 'november2024',
      path: '/images/nutrition/november2024.jpg',
      title: 'November Distribution'
    },
    {
      id: 'september2024',
      path: '/images/nutrition/september2024.jpg',
      title: 'September Distribution'
    },
    {
      id: 'august2024',
      path: '/images/nutrition/august2024.jpg',
      title: 'August Distribution'
    },
    {
      id: 'october1',
      path: '/images/nutrition/october1.jpg',
      title: 'October Distribution'
    },
    {
      id: 'october2',
      path: '/images/nutrition/october2.jpg',
      title: 'October Distribution'
    }
  ];

  // Get the image array and return path
  const imageArray = nutritionImages;
  const returnPath = '/services/nutrition-programme';

  // Find the current image and its index - we need to handle both string and number IDs
  const currentImageIndex = imageArray.findIndex(img =>
    img.id.toString() === imageId
  );
  const currentImage = currentImageIndex !== -1 ? imageArray[currentImageIndex] : null;

  // Calculate previous and next image indices
  const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : imageArray.length - 1;
  const nextIndex = currentImageIndex < imageArray.length - 1 ? currentImageIndex + 1 : 0;

  const handleClose = () => {
    navigate(returnPath);
  };

  const handlePrev = () => {
    navigate(`/services/nutrition-programme/image/${imageArray[prevIndex].id}`);
  };

  const handleNext = () => {
    navigate(`/services/nutrition-programme/image/${imageArray[nextIndex].id}`);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [imageId]); // Re-add event listener when imageId changes

  if (!currentImage) {
    return (
      <ImageViewLayout className="pt-20">
        <div className="min-h-screen w-full bg-gradient-to-br from-indian-cream to-white">
          <div className="w-full">
            <div className="container mx-auto px-4 py-4 text-center">
              <h1 className="text-2xl font-heading font-semibold mb-4">Image Not Found</h1>
              <p className="mb-8">The requested image could not be found.</p>
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-spiritual-500 text-white rounded hover:bg-spiritual-600"
              >
                Return to Nutrition Programme
              </button>
            </div>
          </div>
        </div>
      </ImageViewLayout>
    );
  }

  return (
    <ImageViewLayout className="pt-20">
      <div className="min-h-screen w-full bg-gradient-to-br from-indian-cream to-white">
        <div className="w-full">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl font-heading font-semibold">{currentImage.title}</h1>
              <button
                onClick={handleClose}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="relative bg-gradient-to-br from-indian-cream to-white p-4 rounded-lg flex justify-center items-center min-h-[60vh] border border-indian-saffron/30">
              {/* Left arrow */}
              <button
                onClick={handlePrev}
                className="absolute left-2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8 text-indian-saffron" />
              </button>

              <img
                src={currentImage.path}
                alt={currentImage.title}
                className="max-w-full max-h-[80vh] object-contain"
              />

              {/* Right arrow */}
              <button
                onClick={handleNext}
                className="absolute right-2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md z-10"
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8 text-indian-saffron" />
              </button>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={handlePrev}
                className="px-4 py-2 flex items-center gap-2 bg-gradient-to-br from-indian-cream to-white hover:bg-white rounded border border-indian-saffron/30"
              >
                <ChevronLeft className="h-5 w-5" /> Previous
              </button>

              <button
                onClick={handleClose}
                className="px-4 py-2 bg-spiritual-500 text-white rounded hover:bg-spiritual-600"
              >
                Return to Nutrition Programme
              </button>

              <button
                onClick={handleNext}
                className="px-4 py-2 flex items-center gap-2 bg-gradient-to-br from-indian-cream to-white hover:bg-white rounded border border-indian-saffron/30"
              >
                Next <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </ImageViewLayout>
  );
};

export default FullSizeImage;
