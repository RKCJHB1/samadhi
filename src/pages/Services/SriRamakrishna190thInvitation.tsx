import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollToTop from '@/components/shared/ScrollToTop';
import Footer from '@/components/layout/Footer';

const SriRamakrishna190thInvitation = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="w-full bg-gradient-to-br from-indian-cream to-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block p-4 sm:p-6 rounded-lg bg-gradient-to-br from-indian-cream to-white border border-indian-saffron shadow-lg transform transition-all duration-500 hover:shadow-xl hover:scale-[1.01] text-center w-full mb-8">
              <h1 className="text-2xl sm:text-3xl font-heading font-bold mb-4 text-black">190th Birth Anniversary of Sri Ramakrishna</h1>
              <p className="text-sm sm:text-base text-gray-700">
                Join us for the celebration of the 190th Birth Anniversary of Sri Ramakrishna - Sunday, 22nd February from 10:00 AM to 12:00 PM
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
                  {/* PDF Viewer */}
                  <div className="w-full max-w-2xl">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <iframe
                        src="/pics/190th Birth Anniversary  of  Sri Ramakrishna.pdf#zoom=50"
                        width="100%"
                        height="600px"
                        className="border-0 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
                        title="190th Birth Anniversary of Sri Ramakrishna Programme"
                        onError={() => console.error('PDF failed to load')}
                      />
                    </div>

                    {/* Fallback message */}
                    <div className="mt-4 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-700">
                        <strong>Note:</strong> If the PDF doesn't display above, please use the download button below to view the programme details.
                      </p>
                    </div>
                  </div>

                  {/* PDF Action Buttons */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/pics/190th Birth Anniversary  of  Sri Ramakrishna.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-indian-saffron text-white rounded-lg hover:bg-indian-saffron/90 transition-colors shadow-md hover:shadow-lg"
                    >
                      View PDF in New Tab
                    </a>
                    <a
                      href="/pics/190th Birth Anniversary  of  Sri Ramakrishna.pdf"
                      download="Sri_Ramakrishna_190th_Birth_Anniversary.pdf"
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
                        <p className="text-indian-saffron font-semibold">Sunday, 22nd February from 10:00 AM to 12:00 PM</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Venue</p>
                        <p className="text-indian-saffron font-semibold">
                          <a href="https://maps.app.goo.gl/hjBs9ZfkPp1uqFRd8" target="_blank" rel="noopener noreferrer" className="hover:underline">
                            Fontainebleau Community Campus
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-gray-700 mb-2">
                        <strong>Keynote address by:</strong>
                      </p>
                      <p className="text-gray-700 font-semibold">Revered Swami Swatmaramanandaji Maharaj</p>
                      <p className="text-gray-700">President: Ramakrishna Centre of South Africa - Durban</p>
                      <p className="text-gray-700 italic mt-2">"The Life and Teachings of Sri Ramakrishna"</p>
                      <p className="text-gray-700 mt-3">
                        The programme includes cultural items, devotional singing, and peace chants. Lunch thereafter.
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

export default SriRamakrishna190thInvitation;

