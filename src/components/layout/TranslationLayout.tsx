import React, { useEffect, useRef } from 'react';
import TranslationNavbar from './TranslationNavbar';
import Footer from './Footer';
import ScrollToTop from '../shared/ScrollToTop';
import ReadModeBadge from '@/components/learn/ReadModeBadge';

interface Props {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const TranslationLayout: React.FC<Props> = ({ children, title, className = '' }) => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const defaultTitle = 'Ramakrishna Centre of South Africa, Johannesburg';
    document.title = title ? `${title} | ${defaultTitle}` : defaultTitle;
    try { window.scrollTo({ top: 0, behavior: 'auto' }); } catch { window.scrollTo(0, 0); }
  }, [title]);

  return (
    <div className="flex flex-col min-h-screen">
      <TranslationNavbar />
      <main ref={mainRef} className={`flex-grow pt-20 ${className}`}>
        {children}
      </main>
      <Footer />
      <ScrollToTop />
      <ReadModeBadge />
    </div>
  );
};

export default TranslationLayout;

