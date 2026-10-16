import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

const STORAGE_KEY = 'rkcjhb-building-project-toast';
const PROJECT_PATH = '/new-ashram-project';

const BuildingProjectToast = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === PROJECT_PATH || location.pathname.startsWith(`${PROJECT_PATH}/`)) {
      return;
    }

    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      sessionStorage.setItem(STORAGE_KEY, 'shown');
    } catch {
      return;
    }

    toast({
      duration: 20000,
      title: 'New Ashram Project',
      description: 'Help us build a new spiritual home in Johannesburg.',
      action: (
        <ToastAction altText="Open the New Ashram Project" asChild>
          <a href={PROJECT_PATH}>View project</a>
        </ToastAction>
      ),
    });
  }, [location.pathname]);

  return null;
};

export default BuildingProjectToast;
