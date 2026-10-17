import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

const SILENCE_KEY = 'rkcjhb-building-project-toast';
const PROJECT_PATH = '/new-ashram-project';

let lastShownAt = 0;
let toastIsOpen = false;

const isProjectPath = (pathname: string) =>
  pathname === PROJECT_PATH || pathname.startsWith(`${PROJECT_PATH}/`);

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

  const handle = toast({
    duration: 20000,
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
};

const BuildingProjectToast = () => {
  const location = useLocation();
  const previousPath = useRef<string | null>(null);
  const seenPaths = useRef(new Set<string>());

  useEffect(() => {
    const path = location.pathname;
    const previous = previousPath.current;
    previousPath.current = path;

    if (isProjectPath(path) || isSilenced()) return;

    const firstArrival = previous === null;
    const returnedToSeenPage = previous !== null && previous !== path && seenPaths.current.has(path);
    const returnedFromProject = previous !== null && isProjectPath(previous);
    seenPaths.current.add(path);

    if (firstArrival || returnedToSeenPage || returnedFromProject) {
      showBuildingProjectToast();
    }
  }, [location.pathname]);

  useEffect(() => {
    const showOnReturn = () => {
      if (document.visibilityState !== 'visible') return;
      if (isProjectPath(location.pathname)) return;
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
