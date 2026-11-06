import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../shared/SectionHeader';
import Button from '../shared/Button';

const DIWALI_REPORT = encodeURI('/pics/Diwali Report 2026.pdf');
const SEMINAR_REPORT = encodeURI('/pics/RKC Education Seminar August 2026.pdf');
const SEMINAR_PAMPHLET = encodeURI('/pics/Seminar Pamphlet.pdf');

function RecentCard({ title, when, place, children }: { title: string; when: string; place: string; children: ReactNode }) {
  return (
    <article className="rounded-lg border border-indian-saffron/30 bg-gradient-to-br from-indian-cream to-white p-5 md:p-6">
      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(16rem,1fr)]">
        <div>
          <h3 className="font-heading text-2xl font-semibold text-indian-maroon">{title}</h3>
          <p className="mt-3 text-gray-800">{when}</p>
          <p className="mt-1 text-gray-700">{place}</p>
        </div>
        <div className="flex flex-col gap-3 border-t border-indian-saffron/20 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
          {children}
        </div>
      </div>
    </article>
  );
}

const linkClass = 'text-indian-saffron font-medium hover:underline';

const FeaturedEvents = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-indian-cream to-white border-t border-indian-saffron/30 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Recent Events"
          subtitle="The Centre's most recent gatherings"
        />

        <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-4">
          <RecentCard
            title="Diwali distribution, 2026"
            when="31 October and 1 November 2026"
            place="Ramakrishna Hall, Lenasia"
          >
            <a href={DIWALI_REPORT} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Read the Diwali report
            </a>
            <Link to="/services/seva" className={linkClass}>
              The account on the Seva/Outreach page
            </Link>
          </RecentCard>

          <RecentCard
            title="Seminar: The Importance of Spiritual Education for Children"
            when="Sunday, 16th August 2026 · 10:00 AM - 12:30 PM"
            place="Vodaworld at Vodacom Office Park, Vodacom Boulevard, Midrand"
          >
            <a href={SEMINAR_REPORT} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Read the seminar account
            </a>
            <a href={SEMINAR_PAMPHLET} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Read the pamphlet
            </a>
            <Link to="/services/seva" className={linkClass}>
              The account on the Seva/Outreach page
            </Link>
            <Link to="/services/hinduism-for-children" className={linkClass}>
              Hinduism for Children
            </Link>
          </RecentCard>
        </div>

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
