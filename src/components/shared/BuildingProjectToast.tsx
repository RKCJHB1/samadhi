import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

const SILENCE_KEY = 'rkcjhb-building-project-toast';
const PROJECT_PATH = '/new-ashram-project';
const CHANTER_PATHS = ['/learn/games/aum-chanter', '/chant'];

let lastShownAt = 0;
let toastIsOpen = false;
let dismissOpenToast = () => {};

const isChanterPath = (pathname: string) =>
  CHANTER_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));

const isSilenced = () => {
  try {
    return localStorage.getItem(SILENCE_KEY) === 'silenced';
  } catch {
    return false;
  }
};

const silenceToast = () => {
  try {
    localStorage.setItem(SILENCE_KEY, 'silenced');
  } catch {
    // Private browsing can block storage. The toast still closes for this visit.
  }
};

const showBuildingProjectToast = () => {
  if (isSilenced() || toastIsOpen) return;
  if (Date.now() - lastShownAt < 1000) return;

  lastShownAt = Date.now();
  toastIsOpen = true;
  let dismissToast = () => {};

  dismissOpenToast = () => {};
  const handle = toast({
    duration: 20000,
    // The shared toast sits at the top of a phone and covers the chant totals.
    // Keep it at the bottom on small screens. Wider screens already use the bottom corner.
    className: 'max-sm:!fixed max-sm:!inset-x-4 max-sm:!bottom-4 max-sm:!top-auto max-sm:!w-auto',
    title: 'New Ashram Project',
    description: (
      <span className="mt-1 flex flex-col items-start gap-2">
        <span>Help us build a new spiritual home in Johannesburg.</span>
        <button
          type="button"
          className="text-xs underline underline-offset-2 opacity-80 hover:opacity-100"
          onClick={() => {
            silenceToast();
            dismissToast();
          }}
        >
          Don't show again
        </button>
      </span>
    ),
    action: (
      <ToastAction altText="Open the New Ashram Project" asChild>
        <a href={PROJECT_PATH}>View project</a>
      </ToastAction>
    ),
    onOpenChange: (open) => {
      if (!open) toastIsOpen = false;
    },
  });

  dismissToast = handle.dismiss;
  dismissOpenToast = handle.dismiss;
};

const BuildingProjectToast = () => {
  const location = useLocation();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    const path = location.pathname;
    const previous = previousPath.current;
    previousPath.current = path;

    if (!isChanterPath(path)) {
      dismissOpenToast();
      return;
    }
    if (isSilenced() || previous === path) return;

    showBuildingProjectToast();
  }, [location.pathname]);

  useEffect(() => {
    const showOnReturn = () => {
      if (document.visibilityState !== 'visible') return;
      if (!isChanterPath(location.pathname)) return;
      showBuildingProjectToast();
    };

    document.addEventListener('visibilitychange', showOnReturn);
    window.addEventListener('pageshow', showOnReturn);
    return () => {
      document.removeEventListener('visibilitychange', showOnReturn);
      window.removeEventListener('pageshow', showOnReturn);
    };
  }, [location.pathname]);

  return null;
};

export default BuildingProjectToast;
