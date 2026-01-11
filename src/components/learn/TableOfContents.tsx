import React, { useState, useEffect } from 'react';
import { List, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentRef: React.RefObject<HTMLElement>;
  className?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ contentRef, className }) => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  // Extract headings from content
  useEffect(() => {
    if (!contentRef.current) return;

    const elements = contentRef.current.querySelectorAll('h2, h3, h4');
    const items: TOCItem[] = [];

    elements.forEach((el, index) => {
      const id = el.id || `heading-${index}`;
      if (!el.id) el.id = id;

      items.push({
        id,
        text: el.textContent || '',
        level: parseInt(el.tagName.charAt(1))
      });
    });

    setHeadings(items);
  }, [contentRef]);

  // Track active heading on scroll
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  if (headings.length < 3) return null;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-20 right-4 z-40 bg-indian-saffron text-white p-3 rounded-full shadow-lg hover:bg-indian-saffron/90 transition-all"
        aria-label="Table of Contents"
      >
        <List className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={cn(
          'fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 overflow-y-auto max-h-[70vh]',
          // Desktop: sticky sidebar
          'lg:sticky lg:top-24 lg:z-0 lg:w-56 lg:shadow-none lg:border-gray-100',
          // Mobile: slide-in drawer
          'lg:translate-x-0 transition-transform duration-300',
          isOpen ? 'bottom-4 right-4 left-4 sm:left-auto sm:w-72' : 'lg:block hidden',
          className
        )}
      >
        <div className="flex items-center justify-between mb-3 lg:mb-4">
          <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <List className="w-4 h-4" />
            Contents
          </h4>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <ul className="space-y-1">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={cn(
                  'w-full text-left py-1.5 px-2 rounded text-sm transition-all flex items-center gap-1 group',
                  activeId === heading.id
                    ? 'bg-indian-saffron/10 text-indian-saffron font-medium'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <ChevronRight className={cn(
                  'w-3 h-3 transition-transform',
                  activeId === heading.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                )} />
                <span className="truncate">{heading.text}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default TableOfContents;

