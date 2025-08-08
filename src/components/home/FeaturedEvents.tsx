import React from 'react';
import SectionHeader from '../shared/SectionHeader';
import EventCard from '../shared/EventCard';
import Button from '../shared/Button';

// Sample events data
const events = [
  {
    title: 'Special Programme',
    date: 'Upcoming Event',
    time: 'Date TBA',
    location: 'Venue TBA',
    description: 'Programme featuring Revered Swami Medhanandaji - details available in the programme PDF.',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/pics/Revered Swami Medhanandaji.pdf',
  },
];

const FeaturedEvents = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-indian-cream to-white border-t border-indian-saffron/30 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Upcoming Events"
          subtitle="Join us for these upcoming spiritual gatherings and educational programs"
        />

        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {events.map((event, index) => (
              <EventCard
                key={index}
                title={event.title}
                date={event.date}
                time={event.time}
                location={event.location}
                description={event.description}
                // image prop removed to hide images
                link={event.link}
                className="border-indian-saffron bg-gradient-to-br from-indian-cream to-white"
              />
            ))}
          </div>
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
