import React from 'react';
import { Heart, Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const NutritionProgramme = () => {
  // All nutrition programme images
  const nutritionImages = [
    {
      id: 'june2025',
      title: 'June Distribution',
      path: '/images/nutrition/june2025.jpg'
    },
    {
      id: 'may2025',
      title: 'May Distribution',
      path: '/images/nutrition/may2025.jpg'
    },
    {
      id: 'april2025',
      title: 'April Distribution',
      path: '/images/nutrition/april2025.jpg'
    },
    {
      id: 'march2025',
      title: 'March Distribution',
      path: '/images/nutrition/march2025.jpg'
    },
    {
      id: 'feb2025',
      title: 'February Distribution',
      path: '/images/nutrition/feb2025.jpg'
    },
    {
      id: 'jan2025',
      title: 'January Distribution',
      path: '/images/nutrition/jan2025.jpg'
    },
    {
      id: 'december2024',
      title: 'December Distribution',
      path: '/images/nutrition/december2024.jpg'
    },
    {
      id: 'november2024',
      title: 'November Distribution',
      path: '/images/nutrition/november2024.jpg'
    },
    {
      id: 'october1',
      title: 'October Distribution',
      path: '/images/nutrition/october1.jpg'
    },
    {
      id: 'october2',
      title: 'October Distribution',
      path: '/images/nutrition/october2.jpg'
    },
    {
      id: 'september2024',
      title: 'September Distribution',
      path: '/images/nutrition/september2024.jpg'
    },
    {
      id: 'august2024',
      title: 'August Distribution',
      path: '/images/nutrition/august2024.jpg'
    }
  ];

  // State for carousel scrolling
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const desktopCarouselRef = React.useRef<HTMLDivElement>(null);
  const mobileCarouselRef = React.useRef<HTMLDivElement>(null);

  // Reset scroll position to beginning when component mounts
  React.useEffect(() => {
    if (desktopCarouselRef.current) {
      desktopCarouselRef.current.scrollLeft = 0;
    }
    if (mobileCarouselRef.current) {
      mobileCarouselRef.current.scrollLeft = 0;
    }
    setScrollPosition(0);
  }, []);

  const scrollLeft = () => {
    // For desktop
    if (desktopCarouselRef.current && window.innerWidth >= 768) {
      desktopCarouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      setScrollPosition(Math.max(0, scrollPosition - 300));
    }
    // For mobile
    if (mobileCarouselRef.current && window.innerWidth < 768) {
      mobileCarouselRef.current.scrollBy({ left: -mobileCarouselRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    // For desktop
    if (desktopCarouselRef.current && window.innerWidth >= 768) {
      desktopCarouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      setScrollPosition(scrollPosition + 300);
    }
    // For mobile
    if (mobileCarouselRef.current && window.innerWidth < 768) {
      mobileCarouselRef.current.scrollBy({ left: mobileCarouselRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  return (
      <div className="min-h-screen w-full bg-gradient-to-br from-indian-cream to-white">
        <div className="w-full">
          {/* Restored some padding */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-2">
            <div className="max-w-4xl mx-auto overflow-visible">
              <div className="inline-block p-6 rounded-lg bg-gradient-to-br from-indian-cream to-white border border-indian-saffron shadow-lg transform transition-all duration-500 hover:shadow-xl hover:scale-[1.01] text-center w-full mb-4">
                <h1 className="text-3xl font-heading font-bold mb-4 text-black flex items-center justify-center gap-2">
                  <Heart className="w-8 h-8 text-indian-saffron" />
                  Nutrition Programme and Community Outreach
                </h1>

                <p className="text-gray-700 mt-4">
                  The Ramakrishna Centre is committed to serving the community through various outreach programs,
                  following Swami Vivekananda's guiding principle that "Service to man is worship of God."
                </p>
              </div>

              <div className="mt-2 mb-12 bg-gradient-to-br from-indian-cream to-white rounded-lg p-6 shadow-sm border border-indian-saffron/20 max-w-full lg:max-w-[115%] mx-auto overflow-visible md:overflow-visible" style={{ width: '115%', marginLeft: '-7.5%', marginRight: '-7.5%' }}>
                <h3 className="text-2xl font-heading font-semibold mb-6 text-center">Nutrition Programme Activities</h3>

                {/* Desktop Carousel - Hidden on mobile */}
                <div className="relative hidden md:block">
                  {/* Container for carousel and buttons */}
                  <div className="relative mx-auto w-[900px]">
                    {/* Left scroll button */}
                    <button
                      onClick={scrollLeft}
                      className="absolute -left-10 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft className="h-6 w-6 text-indian-saffron" />
                    </button>

                    {/* Image carousel */}
                    <div
                      ref={desktopCarouselRef}
                      className="flex overflow-x-hidden gap-[45px] py-4 scroll-smooth justify-start"
                    >
                      {nutritionImages.slice(0, 9).map((image) => (
                        <div
                          key={image.id}
                          className="flex-shrink-0 w-[270px] h-[400px] bg-gradient-to-br from-indian-cream to-white rounded-lg overflow-hidden shadow-sm border border-indian-saffron/30 hover:shadow-md transition-all hover:scale-[1.02] duration-300 pop-shadow-card"
                        >
                          <Link to={`/services/nutrition-programme/image/${image.id}`} className="block h-full">
                            <div className="h-[320px] overflow-hidden bg-gradient-to-br from-indian-cream to-white border-b border-indian-saffron/30 flex items-center justify-center p-2">
                              <img
                                src={image.path}
                                alt={image.title}
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300 rounded-lg"
                              />
                            </div>
                            <div className="p-3 text-center">
                              <h4 className="text-sm font-medium text-indian-maroon truncate">{image.title}</h4>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>

                    {/* Right scroll button */}
                    <button
                      onClick={scrollRight}
                      className="absolute -right-10 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
                      aria-label="Scroll right"
                    >
                      <ChevronRight className="h-6 w-6 text-indian-saffron" />
                    </button>
                  </div>
                </div>

                {/* Mobile Carousel - Shown only on mobile */}
                <div className="md:hidden">
                  <div className="relative">
                    {/* Mobile navigation buttons */}
                    <div className="flex justify-between mb-4">
                      <button
                        onClick={scrollLeft}
                        className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 w-5 text-indian-saffron" />
                      </button>
                      <button
                        onClick={scrollRight}
                        className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 w-5 text-indian-saffron" />
                      </button>
                    </div>

                    {/* Mobile image carousel - single image at a time */}
                    <div
                      ref={mobileCarouselRef}
                      className="overflow-x-auto snap-x snap-mandatory flex scroll-smooth hide-scrollbar"
                    >
                      {nutritionImages.slice(0, 9).map((image) => (
                        <div
                          key={image.id}
                          className="flex-shrink-0 w-full snap-center bg-gradient-to-br from-indian-cream to-white rounded-lg overflow-hidden shadow-sm border border-indian-saffron/30 pop-shadow-card"
                        >
                          <Link to={`/services/nutrition-programme/image/${image.id}`} className="block">
                            <div className="h-[250px] overflow-hidden bg-gradient-to-br from-indian-cream to-white border-b border-indian-saffron/30 flex items-center justify-center p-2">
                              <img
                                src={image.path}
                                alt={image.title}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                            <div className="p-3 text-center">
                              <h4 className="text-sm font-medium text-indian-maroon">{image.title}</h4>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indian-cream to-white rounded-lg overflow-hidden shadow-sm border border-indian-saffron/20 hover:shadow-md transition-all hover:scale-[1.02] duration-300 my-8 pop-shadow-card">
                <div className="p-6">
                  <h3 className="text-xl font-heading font-semibold mb-4 text-spiritual-600">
                    Women Empowerment Programme (WEP)
                  </h3>
                  <p className="text-gray-700 mb-4">
                    The WEP supports women in developing skills for financial independence and personal growth.
                    Through workshops, training sessions, and mentoring, we help women become self-reliant and confident.
                  </p>
                  <h4 className="font-bold mt-4 mb-2 text-spiritual-600">Activities</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-spiritual-400"></span>
                      Vocational training in various crafts and skills
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-spiritual-400"></span>
                      Financial literacy and entrepreneurship workshops
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-spiritual-400"></span>
                      Health and wellness education
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-spiritual-400"></span>
                      Support groups and counseling services
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indian-cream to-white rounded-lg shadow-sm border border-indian-saffron/20 my-8 pop-shadow-card">
                <div className="p-6">
                  <h3 className="text-xl font-heading font-semibold mb-4 text-spiritual-600 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indian-saffron" />
                    Children's Value Classes
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Beyond our regular Hinduism for Children program, we offer special value-based education classes
                    in schools and community centers. These classes focus on universal values like truth, compassion,
                    and respect, presented in an interfaith, inclusive manner.
                  </p>
                  <h4 className="font-bold mt-4 mb-2 text-spiritual-600">Program Details</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Weekly classes in partner schools",
                      "Holiday programs during school breaks",
                      "Special workshops for teachers and parents",
                      "Distribution of educational materials"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-spiritual-400"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="my-8">
                <div className="bg-gradient-to-br from-indian-cream to-white rounded-lg border-l-4 border-spiritual-500 p-6 pop-shadow-card">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="md:w-1/2">
                      <h3 className="text-xl font-heading font-semibold mb-4 text-spiritual-600 flex items-center gap-2">
                        <Users className="w-5 h-5 text-indian-saffron" />
                        Get Involved
                      </h3>
                      <p className="text-gray-700 mb-4">
                        Our community outreach programs rely on the generous support of volunteers and donors.
                        If you would like to contribute your time, skills, or resources to any of these initiatives,
                        please contact us on our <Link to="/contact" className="text-indian-saffron hover:underline font-medium">Contact Page</Link>.
                      </p>
                    </div>
                    <div className="md:w-1/2 border-t-2 md:border-t-0 md:border-l-2 border-spiritual-300 pt-4 md:pt-0 md:pl-6">
                      <p className="italic text-gray-600 text-sm md:text-base">
                        "Awake, awake, great ones! The world is burning with misery. Can you sleep? Let us call and call till the sleeping gods awake, till the god within answers to the call. What more is in life? What greater work? The details come to me as I go. I never make plans. Plans grow and work themselves. I only say, awake, awake!"<br />
                        - Swami Vivekananda
                      </p>
                    </div>
                  </div>
                </div>
              </div>



            </div>
          </div>
        </div>
      </div>
  );
};

export default NutritionProgramme;
