import React from 'react';
import { Link } from 'react-router-dom';
import { vivekanandaLectures } from '@/data/readings/vivekanandaParliament';
import { countSentences } from '@/lib/translationUtils';
import { getMyReadingProgressFor } from '@/services/translationsSupabase';

const ResumeBannerInline: React.FC<{ lectureId: string }> = ({ lectureId }) => {
  const [lastIdx, setLastIdx] = React.useState<number | null>(null);
  const total = React.useMemo(() => {
    const lec = vivekanandaLectures.find(l => l.id === lectureId);
    return lec ? countSentences(lec.paragraphs) : 0;
  }, [lectureId]);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const prog = await getMyReadingProgressFor(lectureId, 'en');
      if (!cancelled) setLastIdx(typeof prog?.lastSentenceIndex === 'number' ? (prog!.lastSentenceIndex as number) : null);
    })();
    return () => { cancelled = true; };
  }, [lectureId]);

  if (lastIdx === null || lastIdx < 0) return null;
  const resumeTo = Math.min(Math.max(0, lastIdx), Math.max(0, total - 1));

  return (
    <div className="flex items-center justify-between rounded-md border border-yellow-300 bg-yellow-50 p-3 text-sm">
      <div>
        Resume from sentence {resumeTo + 1} of {total}
      </div>
      <Link to={`#sent-${resumeTo}`} className="underline text-spiritual-700">Jump</Link>
    </div>
  );
};

export default ResumeBannerInline;

