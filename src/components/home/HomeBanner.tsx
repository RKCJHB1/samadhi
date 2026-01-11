import React, { useState, useEffect, useRef } from 'react';
import Button from '../shared/Button';
import './banner.css';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

// Banner slide interface
interface BannerSlide {
  image: string;
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
}

// Banner slides data
const bannerSlides: BannerSlide[] = [
  {
    image: '/lovable-uploads/belurmath.jpg',
    title: 'Welcome to Ramakrishna Centre',
    subtitle: 'A Sub-Centre of the Ramakrishna Centre of South Africa - Phoenix',
    buttonText: 'Explore Our Centre',
    buttonLink: '/about/our-centre',
  },
];

const HomeBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardRef = useRef(null);
  const textRefs = useRef([]);
  const headingRef = useRef(null);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Handle manual navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  useEffect(() => {
    // Fade-in and scale animation for the card
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
    );

    // Staggered animation for text elements
    gsap.fromTo(
      textRefs.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    // Split text into letters and preserve spaces
    const headingText = headingRef.current;
    const letters = headingText.textContent.split('');
    headingText.innerHTML = letters
      .map(letter => letter === ' ' ? '<span class=\'inline-block\'>&nbsp;</span>' : `<span class='inline-block'>${letter}</span>`)
      .join('');

    // Animate each letter
    gsap.fromTo(
      headingText.querySelectorAll('span'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.05, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    // Typewriter effect for the word 'Johannesburg'
    const headingText = headingRef.current;
    const fullText = 'Welcome to The Ramakrishna Centre of South Africa, Johannesburg';
    const animatedWord = 'Johannesburg';
    const staticText = fullText.replace(animatedWord, `<span id='animated-word'>${animatedWord}</span>`);
    headingText.innerHTML = staticText;

    gsap.fromTo(
      '#animated-word',
      { text: '' },
      { text: animatedWord, duration: 6, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-indian-cream to-white flex items-center justify-center py-4 md:py-8">
      <div
        ref={cardRef}
        className="inline-block p-4 md:p-6 rounded-lg bg-gradient-to-br from-indian-cream to-white border border-indian-saffron shadow-lg transform transition-all duration-500 hover:shadow-xl hover:scale-[1.01] text-center mx-4"
      >
        <h1
          ref={headingRef}
          className="text-xl md:text-3xl font-heading font-bold mb-3 md:mb-4 text-black leading-tight"
        >
          Welcome to The Ramakrishna Centre of South Africa, Johannesburg
        </h1>
        <p
          ref={(el) => (textRefs.current[1] = el)}
          className="mb-4 md:mb-6 max-w-2xl mx-auto text-gray-700 text-sm md:text-base"
        >
          A Sub-Centre of the Ramakrishna Centre of South Africa - Phoenix
        </p>
        <a
          ref={(el) => (textRefs.current[2] = el)}
          href="/about/our-centre"
          className="inline-block bg-indian-saffron hover:bg-indian-saffron/90 text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all text-sm md:text-base"
        >
          Explore Our Centre
        </a>
      </div>
    </div>
  );
};

export default HomeBanner;
