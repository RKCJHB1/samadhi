import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { listMyReadingProgress, getCurrentUser } from '@/services/translationsSupabase';
import { vivekanandaLectures } from '@/data/readings/vivekanandaParliament';
import { countSentences } from '@/lib/translationUtils';
import { Link } from 'react-router-dom';

const ResumeListInline: React.FC<{ viewedUserId: string | null }> = ({ viewedUserId }) => {
  const [selfId, setSelfId] = useState<string | null>(null);

	  const refresh = async () => {
	    try {
	      const me = await getCurrentUser();
	      if (!me || !viewedUserId || me.id !== viewedUserId) { setRows([]); return; }
	      const r = await listMyReadingProgress('en', 5);
	      setRows(r.map(x => ({ lectureId: x.lectureId, lastSentenceIndex: x.lastSentenceIndex })));
	    } catch {
	      setRows([]);
	    }
	  };

  const [rows, setRows] = useState<Array<{ lectureId: string; lastSentenceIndex: number }>>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const me = await getCurrentUser();
        if (cancelled) return;
        setSelfId(me?.id || null);
        if (me?.id && viewedUserId && me.id === viewedUserId) {
          await refresh();
        } else {
          setRows([]);
        }


      } catch {


        setRows([]);
      }
    })();
    // Auto refresh when window gains focus
    const onFocus = () => { refresh(); };
    window.addEventListener('focus', onFocus);
    return () => { cancelled = true; window.removeEventListener('focus', onFocus); };
  }, [viewedUserId]);

  // Hidden per request
  return null;
};

export default ResumeListInline;

