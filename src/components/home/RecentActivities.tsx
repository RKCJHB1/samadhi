import React, { useState, useEffect } from 'react';
import SectionHeader from '../shared/SectionHeader';
import Button from '../shared/Button';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import type { CarouselApi } from '../ui/carousel';
import './carousel.css';

// Nutrition programme activities data with real images
const activities = [
  {
    id: 'june2025',
    title: 'June Nutrition Programme',
    date: 'June 21, 2025',
    location: 'Lenasia',
    description: 'Monthly food distribution serving 300 families in need.',
    image: '/images/nutrition/june2025.jpg',
    link: '/services/nutrition-programme/image/june2025',
  },
  {
    id: 'may2025',
    title: 'May Nutrition Programme',
    date: 'May 24, 2025',
    location: 'Lenasia',
    description: 'Monthly food distribution serving 280 families in need.',
    image: '/images/nutrition/may2025.jpg',
    link: '/services/nutrition-programme/image/may2025',
  },
  {
    id: 'april2025',
    title: 'April Nutrition Programme',
    date: 'April 12, 2025',
    location: 'Lenasia',
    description: 'Monthly food distribution serving 250 families in need.',
    image: '/images/nutrition/april2025.jpg',
    link: '/services/nutrition-programme/image/april2025',
  },
  {
    id: 'march2025',
    title: 'March Nutrition Programme',
    date: 'March 29, 2025',
    location: 'Lenasia',
    description: 'Workshop on balanced diets and healthy eating habits.',
    image: '/images/nutrition/march2025.jpg',
    link: '/services/nutrition-programme/image/march2025',
  },
  {
    id: 'feb2025',
    title: 'February Nutrition Programme',
    date: 'February 22, 2025',
    location: 'Lenasia',
    description: 'Food parcels with staples and fresh produce for 220 families.',
    image: '/images/nutrition/feb2025.jpg',
    link: '/services/nutrition-programme/image/feb2025',
  },
  {
    id: 'jan2025',
    title: 'January Nutrition Programme',
    date: 'January 25, 2025',
    location: 'Lenasia',
    description: 'Emergency food relief for families affected by recent floods.',
    image: '/images/nutrition/jan2025.jpg',
    link: '/services/nutrition-programme/image/jan2025',
  },
  {
    id: 'december2024',
    title: 'December Nutrition Programme',
    date: 'December 7, 2024',
    location: 'Lenasia',
    description: 'Special holiday nutrition program for children and families.',
    image: '/images/nutrition/december2024.jpg',
    link: '/services/nutrition-programme/image/december2024',
  },
  {
    id: 'november2024',
    title: 'November Nutrition Programme',
    date: 'November 23, 2024',
    location: 'Lenasia',
    description: 'Community food drive providing meals to 180 families.',
    image: '/images/nutrition/november2024.jpg',
    link: '/services/nutrition-programme/image/november2024',
  },
  {
    id: 'september2024',
    title: 'September Nutrition Programme',
    date: 'September 21, 2024',
    location: 'Lenasia',
    description: 'Food distribution supporting 200 families in Soweto.',
    image: '/images/nutrition/september2024.jpg',
    link: '/services/nutrition-programme/image/september2024',
  },
];

const RecentActivities = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section className="py-10 sm:py-16 bg-gradient-to-br from-indian-cream to-white w-full">
      <div className="container mx-auto px-4">
        <div className="mb-6 sm:mb-8 text-center">
          <SectionHeader
            title="Nutrition Programme Activities"
            subtitle="Recent humanitarian efforts to serve our community"
          />
        </div>

        {/* Navigation arrows above the carousel for mobile */}
        <div className="max-w-[1140px] mx-auto flex justify-center gap-4 mb-4 sm:hidden">
          <button
            className="h-10 w-10 rounded-full flex items-center justify-center bg-white border border-indian-saffron text-indian-saffron shadow-md hover:bg-indian-saffron/10 transition-colors"
            onClick={() => api?.scrollPrev()}
            aria-label="Previous slide"
          >
            <span className="sr-only">Previous</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            className="h-10 w-10 rounded-full flex items-center justify-center bg-white border border-indian-saffron text-indian-saffron shadow-md hover:bg-indian-saffron/10 transition-colors"
            onClick={() => api?.scrollNext()}
            aria-label="Next slide"
          >
            <span className="sr-only">Next</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

        <div className="max-w-[1140px] mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {activities.map((activity, index) => (
                <CarouselItem key={activity.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="h-[420px] sm:h-[470px] md:h-[495px] flex flex-col bg-white rounded-lg overflow-hidden border-2 border-indian-saffron/40 hover:border-indian-saffron/60 hover:shadow-lg transition-all hover:scale-[1.02] duration-300">
                    <Link to={activity.link} className="h-full flex flex-col">
                      <div className="h-[75%] bg-gradient-to-br from-indian-cream to-white flex items-center justify-center px-4">
                        <img
                          src={activity.image}
                          alt={activity.title}
                          className="w-[90%] h-full object-contain transform hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-grow p-4 pb-6 bg-gradient-to-br from-indian-cream to-white border-t-2 border-indian-saffron/40 text-center">
                        <h3 className="text-lg md:text-xl font-heading font-semibold mb-1 md:mb-2 text-indian-maroon">
                          {activity.title}
                        </h3>
                        <div className="flex items-center justify-center text-xs md:text-sm text-indian-saffron mb-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{activity.date}</span>
                        </div>
                        <div className="flex items-center justify-center text-xs md:text-sm text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{activity.location}</span>
                        </div>
                        <div className="h-8"></div>

                      </div>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-8 h-10 w-10 bg-white hover:bg-white border-indian-saffron text-indian-saffron hover:text-indian-saffron shadow-md hover:bg-indian-saffron/10 transition-colors" />
            <CarouselNext className="hidden sm:flex -right-8 h-10 w-10 bg-white hover:bg-white border-indian-saffron text-indian-saffron hover:text-indian-saffron shadow-md hover:bg-indian-saffron/10 transition-colors" />
          </Carousel>

          {/* Mobile indicator dots */}
          <div className="flex justify-center mt-4 sm:hidden">
            <div className="flex space-x-2">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${index === current ? 'bg-indian-saffron' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Button
            href="/services/nutrition-programme"
            variant="outline"
            className="border-indian-saffron text-indian-saffron hover:bg-indian-saffron/10"
          >
            View All Nutrition Programme Activities
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecentActivities;
