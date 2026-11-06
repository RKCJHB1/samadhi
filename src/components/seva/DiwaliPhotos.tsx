import { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type DiwaliPhoto = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

const hall: DiwaliPhoto = {
  src: '/images/seva/diwali-2026-hall.jpg',
  alt: 'Women of the Centre singing on stage at the Diwali programme in Ramakrishna Hall, Lenasia, on 1 November 2026',
  caption: 'The Women’s Empowerment Programme on stage at Ramakrishna Hall, Lenasia, 1 November 2026. One hundred and twenty families attended.',
  width: 800,
  height: 533,
};

const details: DiwaliPhoto[] = [
  {
    src: '/images/seva/diwali-2026-hamper.jpg',
    alt: 'A table laid with rice, oil, tins, vegetables, a broom, and a standing fan',
    caption: 'What each household received.',
    width: 800,
    height: 450,
  },
  {
    src: '/images/seva/diwali-2026-meal.jpg',
    alt: 'Volunteers serving a hot meal at the Diwali gathering',
    caption: 'Breyani, dhal, salad, and soji, with a meal to take home.',
    width: 800,
    height: 686,
  },
  {
    src: '/images/seva/diwali-2026-handover.jpg',
    alt: 'A standing fan and a box of eats given to a family at the Diwali outreach',
    caption: 'A standing fan and a box of eats for the home.',
    width: 726,
    height: 800,
  },
];

const GalleryContext = createContext<{
  album: DiwaliPhoto[];
  open: (src: string) => void;
} | null>(null);

export function DiwaliGallery({
  children,
  heroCaption,
}: {
  children: React.ReactNode;
  heroCaption?: string;
}) {
  const album = [heroCaption ? { ...hall, caption: heroCaption } : hall, ...details];
  const [index, setIndex] = useState<number | null>(null);

  const open = (src: string) => {
    const found = album.findIndex((photo) => photo.src === src);
    setIndex(found === -1 ? 0 : found);
  };

  return (
    <GalleryContext.Provider value={{ album, open }}>
      {children}
      {index !== null && (
        <Fullscreen album={album} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
      )}
    </GalleryContext.Provider>
  );
}

function useGallery() {
  const gallery = useContext(GalleryContext);
  if (!gallery) {
    throw new Error('Diwali photographs must be shown inside DiwaliGallery');
  }
  return gallery;
}

function Fullscreen({
  album,
  index,
  onClose,
  onIndex,
}: {
  album: DiwaliPhoto[];
  index: number;
  onClose: () => void;
  onIndex: (index: number) => void;
}) {
  const photo = album[index];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onIndex((index + 1) % album.length);
      if (event.key === 'ArrowLeft') onIndex((index - 1 + album.length) % album.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [album.length, index, onClose, onIndex]);

  return createPortal(
    <div className="fixed inset-0 z-[80] flex flex-col bg-black" role="dialog" aria-modal="true" aria-label={photo.caption}>
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={() => onIndex((index - 1 + album.length) % album.length)}
        className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
        aria-label="Previous photograph"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={() => onIndex((index + 1) % album.length)}
        className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
        aria-label="Next photograph"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      <div className="flex min-h-0 flex-1 items-center justify-center px-16 pt-16">
        <img src={photo.src} alt={photo.alt} className="max-h-full max-w-full object-contain" />
      </div>
      <p className="px-6 pb-6 pt-4 text-center text-sm leading-relaxed text-white/90">{photo.caption}</p>
    </div>,
    document.body,
  );
}

function DiwaliCard({ photo }: { photo: DiwaliPhoto }) {
  const { open } = useGallery();

  return (
    <figure className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-indian-saffron/30 bg-gradient-to-br from-indian-cream to-white">
      <button
        type="button"
        onClick={() => open(photo.src)}
        className="block w-full cursor-zoom-in text-left"
        aria-label={`View larger: ${photo.caption}`}
      >
        <div className="bg-indian-cream" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
          <img
            src={photo.src}
            alt=""
            width={photo.width}
            height={photo.height}
            className="h-full w-full object-cover"
          />
        </div>
      </button>
      <figcaption className="border-t border-indian-saffron/15 bg-gradient-to-br from-indian-cream to-white px-4 py-3 text-sm leading-relaxed text-gray-600 md:min-h-[4.5rem]">
        {photo.caption}
      </figcaption>
    </figure>
  );
}

export function DiwaliHero() {
  const { album } = useGallery();
  return <DiwaliCard photo={album[0]} />;
}

export function DiwaliDetailCards() {
  const { album } = useGallery();
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.778fr_1.166fr_0.908fr] md:items-start">
      {album.slice(1).map((photo) => (
        <DiwaliCard key={photo.src} photo={photo} />
      ))}
    </div>
  );
}
