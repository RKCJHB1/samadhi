import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

const PROGRAMME = '/pics/novemberprogramme.jpeg';
const PROGRAMME_FILE = 'November-programme-2026.jpeg';

function ProgrammeActions({ onDark = false }: { onDark?: boolean }) {
  const [note, setNote] = useState<string | null>(null);

  const share = async () => {
    setNote(null);
    const title = 'November programme';
    const text = 'Weekly Satsangs and Hinduism for Children classes, November 2026. Ramakrishna Centre of South Africa, Johannesburg.';
    try {
      const response = await fetch(PROGRAMME);
      const blob = await response.blob();
      const file = new File([blob], PROGRAMME_FILE, { type: blob.type || 'image/jpeg' });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title, text });
        return;
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
    }
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url: new URL(PROGRAMME, window.location.origin).href });
        return;
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
    }
    try {
      await navigator.clipboard.writeText(new URL(PROGRAMME, window.location.origin).href);
      setNote('Link copied.');
    } catch {
      setNote('Download the programme, then send the picture.');
    }
  };

  const actionClass = onDark
    ? 'rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/25'
    : 'text-indian-saffron font-medium hover:underline';

  return (
    <div className={onDark ? 'flex flex-col items-center gap-2' : 'mt-4'}>
      <div className={onDark ? 'flex gap-3' : 'flex flex-wrap gap-x-6 gap-y-2'}>
        <a href={PROGRAMME} download={PROGRAMME_FILE} className={actionClass}>
          Download
        </a>
        <button type="button" onClick={() => void share()} className={actionClass}>
          Share
        </button>
      </div>
      {note && <p className={onDark ? 'text-sm text-white/80' : 'mt-2 text-sm text-gray-600'}>{note}</p>}
    </div>
  );
}

function ProgrammeView({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[80] flex flex-col bg-black" role="dialog" aria-modal="true" aria-label="November programme">
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>
      <div className="flex min-h-0 flex-1 items-center justify-center px-4 pb-24 pt-16">
        <img
          src={PROGRAMME}
          alt="November programme: Sunday Satsangs and Hinduism for Children classes, 1 to 29 November 2026"
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex justify-center px-4 pb-6">
        <ProgrammeActions onDark />
      </div>
    </div>,
    document.body,
  );
}

const Satsangs = () => {
  const [programmeOpen, setProgrammeOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-gradient-to-br from-indian-cream to-white">
      <div className="w-full bg-gradient-to-br from-indian-cream to-white">
        {/* Removed py-4 from this container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block p-6 rounded-lg bg-gradient-to-br from-indian-cream to-white border border-indian-saffron shadow-lg transform transition-all duration-500 hover:shadow-xl hover:scale-[1.01] text-center w-full">
              <h1 className="text-3xl font-heading font-bold mb-4 text-black">Satsangs</h1>
                <p className="text-gray-700">
                  Join our regular spiritual gatherings which include the chanting of prayers, meditation, and a discourse on Vedantic Philosophy and Principles. The Sub-Centre also celebrates all major hindu festivals. For details on upcoming special functions, please <Link to="/services/special-functions" className="text-indian-saffron hover:underline">click here</Link>.
                </p>
              </div>

              <div className="mt-12 rounded-lg border border-indian-saffron/30 bg-gradient-to-br from-indian-cream to-white p-5 md:p-6">
                <p className="text-sm uppercase tracking-[0.18em] text-indian-saffron font-semibold">This month</p>
                <h2 className="mt-2 font-heading text-2xl font-semibold text-black">November programme</h2>
                <p className="mt-2 text-gray-700">Weekly Satsangs and the Hinduism for Children classes.</p>
                <button
                  type="button"
                  onClick={() => setProgrammeOpen(true)}
                  className="mt-6 block w-full cursor-zoom-in"
                  aria-label="View the November programme larger"
                >
                  <img
                    src={PROGRAMME}
                    alt=""
                    width={1131}
                    height={1600}
                    className="mx-auto w-full max-w-md"
                  />
                </button>
                <ProgrammeActions />
              </div>

              <div className="mt-12 bg-gradient-to-br from-indian-cream to-white rounded-lg p-6 shadow-sm border border-indian-saffron/20">
                <h3 className="text-2xl font-heading font-semibold mb-6">Satsang Information</h3>

                <div className="space-y-8">
                  <div className="bg-gradient-to-br from-indian-cream to-white p-6 rounded-lg border border-indian-saffron/30">
                    <h4 className="font-bold text-xl mb-3">Sunday Satsang</h4>
                    <p className="text-gray-700">Time: 9:00 AM - 10:30 AM</p>
                    <p className="text-gray-700">Location: Benvenuto Conference Centre</p>
                    <p className="text-gray-700">Format: Join us for our weekly Sunday Satsang, featuring bhajans, chantings, a spiritual discourse and arati.</p>
                  </div>

                  <div className="bg-gradient-to-br from-indian-cream to-white p-6 rounded-lg border border-indian-saffron/30">
                    <h4 className="font-bold text-xl mb-3">Sri Ramakrishna says:</h4>
                    <p className="text-gray-700 italic border-l-4 border-indian-saffron/30 pl-4 py-2">
                      Japa means silently repeating God's name in solitude. When you chant His name with single-minded devotion you can see God's form and realize Him. Suppose there is a piece of timber sunk in the water of the Ganges and fastened with a chain to the bank. You proceed link by link, holding to the chain, and you dive into the water and follow the chain. Finally, you are able to reach the timber. In the same way, by repeating God's name you become absorbed in Him and finally realize Him.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {programmeOpen && <ProgrammeView onClose={() => setProgrammeOpen(false)} />}
    </>
  );
};

export default Satsangs;
