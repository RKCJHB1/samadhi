import { Link } from 'react-router-dom';
import { DiwaliDetailCards, DiwaliGallery, DiwaliHero } from '../../components/seva/DiwaliPhotos';

const DIWALI_REPORT = encodeURI('/pics/Diwali Report 2026.pdf');
const SEMINAR_REPORT = encodeURI('/pics/RKC Education Seminar August 2026.pdf');
const SEMINAR_PAMPHLET = encodeURI('/pics/Seminar Pamphlet.pdf');

const gift = (purpose: string) => `/donate?purpose=${encodeURIComponent(purpose)}`;

const earlierYears = [
  {
    year: '2025',
    months: [
      { id: 'june2025', label: 'June', path: '/images/nutrition/june2025.jpg' },
      { id: 'may2025', label: 'May', path: '/images/nutrition/may2025.jpg' },
      { id: 'april2025', label: 'April', path: '/images/nutrition/april2025.jpg' },
      { id: 'march2025', label: 'March', path: '/images/nutrition/march2025.jpg' },
      { id: 'feb2025', label: 'February', path: '/images/nutrition/feb2025.jpg' },
      { id: 'jan2025', label: 'January', path: '/images/nutrition/jan2025.jpg' },
    ],
  },
  {
    year: '2024',
    months: [
      { id: 'december2024', label: 'December', path: '/images/nutrition/december2024.jpg' },
      { id: 'november2024', label: 'November', path: '/images/nutrition/november2024.jpg' },
      { id: 'october1', label: 'October', path: '/images/nutrition/october1.jpg' },
      { id: 'october2', label: 'October', path: '/images/nutrition/october2.jpg' },
      { id: 'september2024', label: 'September', path: '/images/nutrition/september2024.jpg' },
      { id: 'august2024', label: 'August', path: '/images/nutrition/august2024.jpg' },
    ],
  },
];

const papers = [
  { speaker: 'Mrs Ragini Haribhai', title: 'The Necessity and Role of Religious Education for Children' },
  { speaker: 'Mr M. K. Angajan', title: 'The Role of Parents in Establishing and Developing Spiritual Education in the Home' },
  { speaker: 'Revered Swami Viprananda', title: 'Effective Methods for Imparting Spiritual Education to Children' },
  { speaker: 'Revered Pravrajika Ishtaprana Mataji', title: 'Choosing the Right Teaching Resources for Age-Appropriate Spiritual Education' },
];

const figures = [
  { value: '180', label: 'families', note: '31 October and 1 November 2026' },
  { value: '540', label: 'people, about', note: 'in those 180 households' },
  { value: 'R1,100', label: 'each hamper', note: 'food, household goods, and a fan' },
];

const SevaPage = () => {
  return (
    <article className="max-w-5xl mx-auto pb-20 text-gray-800">
      <header className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-black">Seva/Outreach</h1>
        <p className="mt-6 font-heading text-xl md:text-2xl text-black leading-snug">
          Shiva Jnane Jiva Seva -<br />
          Service to Man is Worship of God
        </p>
        <p className="mt-3 text-lg italic text-gray-700">Swami Vivekananda</p>
        <div className="mx-auto mt-6 h-px w-16 bg-indian-saffron" />
      </header>

      <DiwaliGallery>
      <section className="mt-12">
        <DiwaliHero />

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <p className="text-sm uppercase tracking-[0.18em] text-indian-saffron font-semibold">Latest</p>
            <h2 className="mt-2 font-heading text-3xl md:text-4xl font-semibold text-black">Diwali outreach, 2026</h2>
            <p className="mt-2 text-gray-600">Ramakrishna Hall, Lenasia · 31 October and 1 November</p>
            <div className="mt-6 space-y-4 leading-relaxed">
              <p>
                Over that weekend the Centre’s annual Diwali drive supported 180 families, about 540 people. Voluntary social workers of the Centre chose the families, together with local temples and community organisations.
              </p>
              <p>
                Each family received a hamper for at least a month: fresh fruit and vegetables, tinned food, rice, cereal, oil, sugar, and other kitchen staples, with cleaning material and a broom. A box of eats and a standing fan went with the hamper, for the summer ahead. The voluntary social workers and the Centre’s medical wing chose the food. Each hamper was worth at least R1,100.
              </p>
              <p>
                Families were served a hot meal of breyani, dhal, salad, and soji, and each household took a meal home.
              </p>
              <p>
                The ladies of the Women’s Empowerment Programme gave the musical item in the hall. That is the programme as it stood on this Diwali: present, and part of the celebration.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6">
              <a href={DIWALI_REPORT} className="text-indian-saffron font-medium hover:underline" target="_blank" rel="noopener noreferrer">
                Read the Diwali report
              </a>
              <Link to={gift('Nutrition Programme')} className="text-indian-saffron font-medium hover:underline">
                Give toward the feeding
              </Link>
              <Link to={gift('Women Empowerment')} className="text-indian-saffron font-medium hover:underline">
                Give toward the women’s programme
              </Link>
            </div>
          </div>

          <dl className="lg:col-span-2 lg:border-l lg:border-indian-saffron/40 lg:pl-8">
            {figures.map((figure) => (
              <div key={figure.label} className="border-b border-indian-saffron/20 py-5 first:pt-0 last:border-b-0">
                <dd className="font-heading text-4xl text-black">{figure.value}</dd>
                <dt className="mt-1 text-gray-800">{figure.label}</dt>
                <dd className="mt-1 text-sm text-gray-600">{figure.note}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12">
          <DiwaliDetailCards />
        </div>
      </section>
      </DiwaliGallery>

      <section className="mt-20 min-w-0">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold text-black">Earlier distributions</h2>
          <p className="mt-3 leading-relaxed">
            The monthly nutrition work of the months before this Diwali. Each photograph opens on its own.
          </p>
        </div>
        {earlierYears.map((year) => (
          <div key={year.year} className="mt-8">
            <h3 className="font-heading text-xl text-black">{year.year}</h3>
            <ul className="mt-4 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
              {year.months.map((month) => (
                <li key={month.id} className="w-36 shrink-0 snap-start sm:w-44">
                  <Link to={`/services/nutrition-programme/image/${month.id}`} className="block group">
                    <img
                      src={month.path}
                      alt={`${month.label} ${year.year} distribution${month.id === 'october2' ? ', second photograph' : ''}`}
                      className="h-52 w-full border border-indian-saffron/20 bg-white object-contain object-top sm:h-64"
                    />
                    <span className="mt-2 block text-sm text-gray-700 group-hover:text-indian-saffron">{month.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mt-20">
        <figure>
          <img
            src="/images/seva/seminar-2026-hall.jpg"
            alt="The seminar on spiritual education for children at Vodacom Business Park, Midrand, on 16 August 2026"
            className="w-full h-auto"
          />
          <figcaption className="mt-4 max-w-2xl text-sm text-gray-600">
            About 150 parents, educators, and community leaders attended.
          </figcaption>
        </figure>

        <div className="mt-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.18em] text-indian-saffron font-semibold">16 August 2026</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-black">Spiritual education for children</h2>
          <p className="mt-2 text-gray-600">Vodacom Business Park, Midrand · 10:00–12:30</p>
          <p className="mt-6 leading-relaxed">
            The Centre held a seminar on the importance of spiritual education for children. The Sunday classes continue on their own page. This was a day for parents and teachers to sit with the question of how a child grows in character.
          </p>
        </div>

        <ol className="mt-8 grid gap-6 sm:grid-cols-2">
          {papers.map((paper) => (
            <li key={paper.speaker} className="border-t border-indian-saffron/30 pt-4">
              <p className="font-medium text-black">{paper.speaker}</p>
              <p className="mt-1 text-gray-700">{paper.title}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6">
          <a href={SEMINAR_REPORT} className="text-indian-saffron font-medium hover:underline" target="_blank" rel="noopener noreferrer">
            Read the seminar account
          </a>
          <a href={SEMINAR_PAMPHLET} className="text-indian-saffron font-medium hover:underline" target="_blank" rel="noopener noreferrer">
            Read the pamphlet
          </a>
          <Link to="/services/hinduism-for-children" className="text-indian-saffron font-medium hover:underline">
            Hinduism for Children
          </Link>
        </div>
      </section>

      <blockquote className="mx-auto mt-20 max-w-2xl text-center">
        <p className="font-heading text-xl leading-relaxed text-gray-800 md:text-2xl">
          “Awake, awake, great ones! The world is burning with misery. Can you sleep? Let us call and call till the sleeping gods awake, till the god within answers to the call. What more is in life? What greater work? The details come to me as I go. I never make plans. Plans grow and work themselves. I only say, awake, awake!”
        </p>
        <footer className="mt-6 text-sm text-gray-600">Swami Vivekananda, letter to Margaret Noble, 7 June 1896</footer>
      </blockquote>
    </article>
  );
};

export default SevaPage;
