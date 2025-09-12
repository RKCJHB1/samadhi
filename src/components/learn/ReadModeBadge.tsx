import React from 'react';
import { isSupabaseConfigured } from '@/services/translationsSupabase';

const ReadModeBadge: React.FC = () => {
  if (!import.meta.env.DEV) return null;

  const envLabel = import.meta.env.DEV ? 'DEV' : 'PROD';
  const supabase = isSupabaseConfigured();
  const modeLabel = supabase ? 'Supabase' : 'Local';
  const dotColor = supabase ? 'bg-emerald-500' : 'bg-gray-400';

  return (
    <div
      className="fixed bottom-4 right-4 z-50 select-none"
      aria-live="polite"
      role="status"
    >
      <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/90 backdrop-blur px-3 py-1 shadow-md text-sm text-gray-700">
        <span className={`inline-block h-2 w-2 rounded-full ${dotColor}`} />
        <span className="font-medium">{envLabel}</span>
        <span className="text-gray-400">•</span>
        <span>{modeLabel} mode</span>
      </div>
    </div>
  );
};

export default ReadModeBadge;

