import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollToTop from '@/components/shared/ScrollToTop';
import Footer from '@/components/layout/Footer';

const WelcomeReceptionInvitation = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const totalPages = 1; // Assuming the PDF has 1 page, adjust if needed

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="w-full bg-gradient-to-br from-indian-cream to-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block p-4 sm:p-6 rounded-lg bg-gradient-to-br from-indian-cream to-white border border-indian-saffron shadow-lg transform transition-all duration-500 hover:shadow-xl hover:scale-[1.01] text-center w-full mb-8">
              <h1 className="text-2xl sm:text-3xl font-heading font-bold mb-4 text-black">Welcome Reception</h1>
              <p className="text-sm sm:text-base text-gray-700">
                Welcome Reception for Revered Swami Shantatmanandaji Maharaj - Monday, 28th July from 7:00 PM to 8:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow w-full bg-gradient-to-br from-indian-cream to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Link */}
            <Link 
              to="/services/special-functions" 
              className="inline-flex items-center text-indian-saffron hover:text-spiritual-600 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Upcoming Events
            </Link>

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indian-saffron"></div>
              </div>
            )}

            {/* PDF Display */}
            <div className={`${isLoading ? 'hidden' : 'block'} w-full`}>
              <div className="bg-gradient-to-br from-indian-cream to-white rounded-lg p-6 shadow-sm border border-indian-saffron/20">
                <div className="flex flex-col items-center">
                  {/* Navigation Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between w-full mb-4">
                      <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="flex items-center px-2 sm:px-4 py-2 bg-indian-saffron text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indian-saffron/90 transition-colors text-sm sm:text-base"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        <span className="hidden sm:inline">Previous</span>
                        <span className="sm:hidden">Prev</span>
                      </button>

                      <span className="text-gray-600 font-medium text-sm sm:text-base">
                        Page {currentPage} of {totalPages}
                      </span>

                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="flex items-center px-2 sm:px-4 py-2 bg-indian-saffron text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indian-saffron/90 transition-colors text-sm sm:text-base"
                      >
                        <span className="hidden sm:inline">Next</span>
                        <span className="sm:hidden">Next</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  )}

                  {/* PDF Viewer */}
                  <div className="w-full max-w-4xl">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <iframe
                        src={`/pics/Welcome Reception for Revered Swami Shantatmanandaji Maharaj.pdf#page=${currentPage}`}
                        width="100%"
                        height="600px"
                        className="border-0 h-[400px] sm:h-[600px] md:h-[700px] lg:h-[800px]"
                        title={`Welcome Reception - Page ${currentPage}`}
                        onError={() => console.error('PDF failed to load')}
                      />
                    </div>

                    {/* Fallback message */}
                    <div className="mt-4 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-700">
                        <strong>Note:</strong> If the PDF doesn't display above, please use the buttons below to view the programme details.
                      </p>
                    </div>
                  </div>

                  {/* PDF Action Buttons */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/pics/Welcome Reception for Revered Swami Shantatmanandaji Maharaj.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-indian-saffron text-white rounded-lg hover:bg-indian-saffron/90 transition-colors shadow-md hover:shadow-lg"
                    >
                      View PDF in New Tab
                    </a>
                    <a
                      href="/pics/Welcome Reception for Revered Swami Shantatmanandaji Maharaj.pdf"
                      download="Welcome_Reception_Swami_Shantatmanandaji_Maharaj.pdf"
                      className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg"
                    >
                      Download PDF
                    </a>
                  </div>

                  {/* Event Details */}
                  <div className="mt-8 p-6 bg-indian-cream/50 rounded-lg border border-indian-saffron/20 w-full">
                    <h3 className="text-xl font-heading font-semibold mb-4 text-center">Event Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="font-medium text-gray-700">Date & Time</p>
                        <p className="text-indian-saffron font-semibold">Monday, 28th July from 7:00 PM to 8:00 PM</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Venue</p>
                        <p className="text-indian-saffron font-semibold">
                          <a href="https://maps.app.goo.gl/UrNQXYUviohniWLw8" target="_blank" rel="noopener noreferrer" className="hover:underline">
                            Benvenuto Conference Centre
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-gray-700">
                        Join us for this special welcome reception honoring the visit of Revered Swami Shantatmanandaji Maharaj.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default WelcomeReceptionInvitation;
