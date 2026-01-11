
import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../shared/SectionHeader';
import { Card, CardContent } from '../ui/card';
import './trinity.css';

const HolyTrinity = () => {
  // Custom styles for each deity image container
  const imageStyles = {
    ramakrishna: {
      backgroundImage: "url('/lovable-uploads/ff802407-da30-4efc-941c-05f69a329db7.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat'
    },
    saradaDevi: {
      backgroundImage: "url('/lovable-uploads/6103c45d-7ef6-40da-a95e-d5695cd3526d.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat'
    },
    vivekananda: {
      backgroundImage: "url('/lovable-uploads/0ee38c83-a4f6-4d5b-8142-1c66e6c7ff04.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat'
    }
  };

  const deities = [
    {
      name: "Sri Ramakrishna",
      description: "(1836 – 1886)\n\nSri Ramakrishna is regarded by millions all over the world as a divine incarnation. His early life was devoted to the practice and testing of spiritual disciplines including those of Hinduism, Christianity, Islam as well as the various subsets of Hinduism. After realizing God in each of those paths, he declared that all faiths, if followed with earnestness, lead to the same final goal.",
      image: "/lovable-uploads/ff802407-da30-4efc-941c-05f69a329db7.png",
      tabValue: "sri-ramakrishna"
    },
    {
      name: "Sri Sarada Devi",
      description: "(1853-1920)\n\nSri Sarada Devi, known as the Holy Mother, was Sri Ramakrishna's spiritual consort and first disciple. After his passing, she continued his spiritual work, blessing many devotees. Her final message was: \"My child if you want peace of mind, then do not find fault with others. Learn to make all your own. No one is a stranger my child … the whole world is your own.\"",
      image: "/lovable-uploads/6103c45d-7ef6-40da-a95e-d5695cd3526d.png",
      tabValue: "sri-sarada-devi"
    },
    {
      name: "Swami Vivekananda",
      description: "(1863-1902)\n\nSwami Vivekananda, Sri Ramakrishna's chief disciple, founded the Ramakrishna Order. In 1893, he brought Vedanta to the West, representing Vedanta at the Parliament of World's Religions in Chicago. He reshaped Vedanta's ancient wisdom to help humanity realize God as Truth.",
      image: "/lovable-uploads/0ee38c83-a4f6-4d5b-8142-1c66e6c7ff04.png",
      tabValue: "swami-vivekananda"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-indian-cream to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="The Holy Trinity"
          subtitle="Understanding Sri Ramakrishna, Sri Sarada Devi, and Swami Vivekananda"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {deities.map((deity, index) => (
            <Link
              key={index}
              to={`/about/holy-trinity?tab=${deity.tabValue}`}
              className="flex flex-col items-center p-6 border-2 border-indian-saffron/50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-indian-cream to-white trinity-container"
            >
              <div
                className="w-32 h-40 md:w-48 md:h-64 overflow-hidden mb-4 md:mb-6 bg-white rounded-lg trinity-image pop-shadow"
                style={{
                  ...(index === 0 ? imageStyles.ramakrishna :
                     index === 1 ? imageStyles.saradaDevi :
                     imageStyles.vivekananda),
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 10px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(241, 169, 18, 0.5)',
                  border: '3px solid #F1A912',
                  transform: 'translateZ(0)'
                }}
                aria-label={deity.name}
              ></div>
              <h3 className="text-lg md:text-2xl font-heading font-bold mb-2 md:mb-3 tracking-tight trinity-name">{deity.name}</h3>
              <div className="text-center text-gray-600 leading-relaxed tracking-wide whitespace-pre-line">{deity.description}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HolyTrinity;
