import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../shared/SectionHeader';
import EventCard from '../shared/EventCard';
import Button from '../shared/Button';
import { EVENTS } from '../../data/eventsData';

// Filter only upcoming events
const upcomingEvents = EVENTS.filter(event => event.status === 'upcoming');

const FeaturedEvents = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-indian-cream to-white border-t border-indian-saffron/30 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Upcoming Events"
          subtitle="Join us for these upcoming spiritual gatherings and educational programs"
        />

        {upcomingEvents.length > 0 ? (
          upcomingEvents.length === 1 ? (
            <div className="mt-8 flex justify-center">
              <div className="w-full lg:w-4/5 xl:w-3/4">
                <div className="rounded-lg overflow-hidden border-2 border-indian-saffron bg-white hover:border-indian-saffron/60 hover:shadow-lg transition-all hover:scale-[1.02] duration-300 flex flex-col lg:flex-row">
                  <div className="p-6 bg-gradient-to-br from-indian-cream to-white flex flex-col justify-center lg:w-1/2">
                    <h3 className="text-2xl font-heading font-semibold text-indian-maroon mb-4">{upcomingEvents[0].title}</h3>
                    <div className="space-y-3">
                      <div className="flex items-start text-indian-saffron">
                        <svg className="h-6 w-6 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v2H4a2 2 0 00-2 2v2h16V7a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v2H7V3a1 1 0 00-1-1zm0 5a2 2 0 012 2v2H4V9a2 2 0 012-2h8zm8 8H4v5a2 2 0 002 2h8a2 2 0 002-2v-5z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="font-semibold text-gray-800">{upcomingEvents[0].date}</p>
                          <p className="text-gray-700">{upcomingEvents[0].time}</p>
                        </div>
                      </div>
                      {upcomingEvents[0].location && (
                        <div className="flex items-start text-indian-saffron">
                          <svg className="h-6 w-6 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <p className="text-gray-700">{upcomingEvents[0].location}</p>
                        </div>
                      )}
                      <p className="text-gray-700 mt-4 leading-relaxed">{upcomingEvents[0].description}</p>
                    </div>
                    <div className="mt-6 flex gap-3 flex-wrap">
                      {upcomingEvents[0].registrationUrl && (
                        <a href={upcomingEvents[0].registrationUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-indian-saffron text-white rounded-lg hover:bg-indian-saffron/90 transition-colors font-semibold">
                          Register Online
                        </a>
                      )}
                      {upcomingEvents[0].pdfUrl && (
                        <a href={upcomingEvents[0].pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 border-2 border-indian-saffron text-indian-saffron rounded-lg hover:bg-indian-saffron/10 transition-colors font-semibold">
                          View Details (PDF)
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indian-cream to-white items-center justify-center p-8">
                    <div className="text-center">
                      <div className="inline-block p-8 bg-indian-saffron/10 rounded-full mb-4">
                        <svg className="h-16 w-16 text-indian-saffron" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm4 2v4h8V8H6z" />
                        </svg>
                      </div>
                      <p className="text-gray-700 font-semibold">Educational Seminar</p>
                      <p className="text-gray-600 text-sm mt-2">Join us for an enriching experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  location={event.location}
                  description={event.description}
                  link="/services/special-functions"
                  className="border-indian-saffron bg-gradient-to-br from-indian-cream to-white"
                />
              ))}
            </div>
          )
        ) : (
          <div className="text-center mt-8 p-8 bg-gradient-to-br from-indian-cream to-white border border-indian-saffron/30 rounded-lg">
            <p className="text-lg text-gray-600 mb-4">No upcoming events at this time.</p>
            <p className="text-sm text-gray-500">Please check back soon for new announcements or view our past events.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button href="/services/special-functions" variant="outline" className="border-indian-saffron text-indian-saffron hover:bg-indian-saffron/10">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
