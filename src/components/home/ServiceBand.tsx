import { Link } from 'react-router-dom';
import { DiwaliDetailCards, DiwaliGallery, DiwaliHero } from '../seva/DiwaliPhotos';

const introductions = [
  {
    name: 'Satsang',
    href: '/services/satsangs',
    line: 'Sunday prayers, meditation, and a discourse at Benvenuto Conference Centre.',
  },
  {
    name: 'Children',
    href: '/services/hinduism-for-children',
    line: 'Sunday classes in Hindu stories, values, and practice.',
  },
  {
    name: 'Seva/Outreach',
    href: '/services/seva',
    line: 'Food and care for families in Lenasia.',
  },
];

const ServiceBand = () => {
  return (
    <section className="py-12 sm:py-16">
      <DiwaliGallery heroCaption="Ramakrishna Hall, Lenasia · 1 November 2026">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm uppercase tracking-[0.18em] text-indian-saffron font-semibold">Seva/Outreach</p>
        <h2 className="mt-2 text-3xl font-heading font-bold text-black">Diwali outreach</h2>
        <div className="mt-6">
          <DiwaliHero />
        </div>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-800">
          One hundred and eighty families received a month of food, household goods, a hot meal, and a standing fan.
        </p>
        <div className="mt-6">
          <DiwaliDetailCards />
        </div>
        <Link to="/services/seva" className="mt-6 inline-block text-indian-saffron font-medium hover:underline">
          Read the account
        </Link>
      </div>
      </DiwaliGallery>

      <ul className="mt-14 max-w-5xl mx-auto grid grid-cols-1 gap-4 md:grid-cols-3">
        {introductions.map((item) => (
          <li key={item.name} className="min-w-0">
            <Link
              to={item.href}
              className="group flex h-full flex-col rounded-lg border border-indian-saffron/30 bg-gradient-to-br from-indian-cream to-white px-5 py-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="block h-0.5 w-10 bg-indian-saffron" aria-hidden="true" />
              <h3 className="mt-4 font-heading text-xl font-semibold text-black">{item.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{item.line}</p>
              <span className="mt-5 text-sm font-medium text-indian-saffron group-hover:underline">Read</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ServiceBand;
