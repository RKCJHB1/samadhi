import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';


const ServicesPage = () => {
  const location = useLocation();

  // Navigation links for Services section
  const servicesLinks = [
    { name: "Satsangs", path: "/services/satsangs" },
    { name: "Hinduism for Children", path: "/services/hinduism-for-children" },
    { name: "Upcoming Events", path: "/services/special-functions" },

    { name: "Nutrition Programme and Community Outreach", path: "/services/nutrition-programme" },
  ];

  // Check if we're on the main services page or a subpage
  const isMainServicesPage = location.pathname === '/services' || location.pathname === '/services/';

  return (
    <PageLayout title="Services">
      <div className="flex items-center justify-center py-8 bg-gradient-to-br from-indian-cream to-white">
        <div className="inline-block p-6 rounded-lg bg-gradient-to-br from-indian-cream to-white border border-indian-saffron shadow-lg transform transition-all duration-500 hover:shadow-xl hover:scale-[1.01] text-center">
          <h1 className="text-3xl font-heading font-bold mb-4 text-black">Our Services</h1>
          <p className="text-gray-700">
            Explore the spiritual and community services offered by the Ramakrishna Centre
          </p>
        </div>
      </div>

      <div className="w-full bg-gradient-to-br from-indian-cream to-white py-4 -mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Services Navigation */}
          <div className="flex justify-center mb-0">
            <div className="p-0.5 rounded-lg sm:rounded-full bg-gradient-to-r from-indian-saffron/40 to-indian-saffron/20 w-full sm:w-auto">
              <nav className="flex flex-col sm:inline-flex sm:items-center sm:flex-row overflow-x-auto scrollbar-none w-full sm:max-w-fit mx-auto px-4 sm:px-6 py-2 bg-white/90 rounded-lg sm:rounded-full">
                {servicesLinks.map((link, index) => (
                  <React.Fragment key={link.name}>
                    {index > 0 && index < servicesLinks.length && <span className="hidden sm:inline-block mx-2 text-gray-400 font-light">|</span>}
                    <Link
                      to={link.path}
                      className={`tab-nav-link text-md px-1 py-1 sm:py-0 ${link.name.length > 15 ? 'long-item' : ''} ${
                        location.pathname === link.path
                          ? 'active text-spiritual-500'
                          : 'text-gray-500'
                      } ${index > 0 ? 'mt-1 sm:mt-0' : ''}`}
                    >
                      {link.name}
                    </Link>
                  </React.Fragment>
                ))}
              </nav>
            </div>
          </div>

          {isMainServicesPage ? (
            // Main Services page content
            <div className="max-w-none animate-fade-in mt-8">
              <h2 className="text-3xl font-heading font-semibold mb-6">Services Offered by the Ramakrishna Centre</h2>

              <p className="text-gray-700 mb-4">
                The Ramakrishna Centre of South Africa offers a variety of spiritual and community services aimed at promoting spiritual growth, education, and community welfare in line with the teachings of Sri Ramakrishna, Holy Mother Sri Sarada Devi, and Swami Vivekananda.
              </p>

              <p className="text-gray-700 mb-8">
                Explore the sections below to learn more about our various services and how you can participate.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {servicesLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="block p-6 bg-gradient-to-br from-indian-cream to-white border border-indian-saffron rounded-lg pop-shadow-card transition-all duration-300"
                  >
                    <h3 className="text-xl font-heading font-semibold mb-2">{link.name}</h3>
                    <p className="text-gray-600 mb-2">
                      {link.name === "Satsangs" && "Join our regular spiritual gatherings which include the chanting of prayers, meditation, and a discourse on Vedantic Philosophy and Principles. The Sub-Centre also celebrates all major hindu festivals."}
                      {link.name === "Hinduism for Children" && "Interactive lessons, games, mantras, and Sunday classes teaching Hindu values, philosophy, and culture to children."}
                      {link.name === "Upcoming Events" && "Celebrations of major religious festivals and other special programmes extending our service activities (seminars/workshops etc)."}
                      {link.name === "Nutrition Programme and Community Outreach" && "Our initiatives to serve the community through nutrition programs and various welfare activities."}
                    </p>
                    <span className="text-spiritual-500 inline-flex items-center">
                      Read More
                      <svg
                        className="ml-1 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-4">
              <Outlet />
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ServicesPage;
