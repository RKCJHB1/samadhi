
import React, { useEffect, useRef } from 'react';
import PageLayout from '../components/layout/PageLayout';
import HomeBanner from '../components/home/HomeBanner';
import FeaturedEvents from '../components/home/FeaturedEvents';
import ServiceBand from '../components/home/ServiceBand';
import HolyTrinity from '../components/home/HolyTrinity';
import QuickInfo from '../components/home/QuickInfo';
import GradientBackground from '../components/shared/GradientBackground';
import SimpleScrollButton from '../components/test/SimpleScrollButton';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { staggerElements } from '@/lib/animation';

const Index = () => {
  const donateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (donateRef.current) {
      // Animate buttons when they come into view
      const buttons = donateRef.current.querySelectorAll('a');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            staggerElements(Array.from(buttons), 0.2, {
              scale: 0.9,
              y: 20,
              duration: 0.6,
              ease: 'back.out(1.7)'
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(donateRef.current);

      return () => {
        if (donateRef.current) {
          observer.unobserve(donateRef.current);
        }
      };
    }
  }, []);
  return (
    <PageLayout>
      <SimpleScrollButton />
      <HomeBanner />
      <HolyTrinity />
      <QuickInfo />
      <div className="border-t border-indian-saffron/30 bg-gradient-to-br from-indian-cream to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceBand />
        </div>
      </div>

      <div className="border-t border-indian-saffron/30 bg-gradient-to-r from-indian-cream to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedEvents />
        </div>
      </div>

      {/* Quick link to Donate page */}
      <div className="py-10 border-t border-indian-saffron/30 bg-gradient-to-br from-indian-cream to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            ref={donateRef}
            className="inline-block p-6 rounded-lg bg-gradient-to-br from-indian-cream to-white border border-indian-saffron shadow-lg transform transition-all duration-500 hover:shadow-xl hover:scale-[1.01]"
          >
            <h2 className="text-2xl font-heading font-semibold mb-4 bg-gradient-to-r from-spiritual-600 to-indian-saffron bg-clip-text text-transparent">Support Our Mission</h2>
            <p className="mb-6 max-w-2xl mx-auto text-gray-700">
              A gift keeps the feeding in Lenasia going, and helps raise the ashram that will house this work.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/donate">
                <Button className="bg-indian-saffron hover:bg-indian-saffron/90 text-white hover:text-white gap-2 shadow-md hover:shadow-lg transition-all">
                  <Heart className="h-5 w-5 animate-pulse" />
                  Donate Now
                </Button>
              </Link>
              <Link to="/new-ashram-project/fundraising">
                <Button variant="outline" className="border-indian-saffron text-indian-saffron hover:bg-indian-saffron/10 hover:text-white gap-2 shadow-sm hover:shadow-md transition-all">
                  Support New Ashram Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
