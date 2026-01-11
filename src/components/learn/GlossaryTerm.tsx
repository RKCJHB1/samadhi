import React from 'react';
import { Volume2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface GlossaryTermProps {
  term: string;
  definition: string;
  pronunciation?: string;
  sanskrit?: string;
  children: React.ReactNode;
  className?: string;
}

const GlossaryTerm: React.FC<GlossaryTermProps> = ({
  term,
  definition,
  pronunciation,
  sanskrit,
  children,
  className
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <span
            className={cn(
              'border-b-2 border-dashed border-indian-saffron/50 cursor-help',
              'hover:border-indian-saffron hover:text-indian-saffron transition-colors',
              className
            )}
          >
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="max-w-xs p-0 overflow-hidden bg-white border border-indian-saffron/30"
        >
          <div className="bg-gradient-to-r from-indian-saffron to-orange-500 px-3 py-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">{term}</span>
              {sanskrit && (
                <span className="text-white/80 text-sm ml-2">{sanskrit}</span>
              )}
            </div>
          </div>
          <div className="p-3">
            {pronunciation && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                <Volume2 className="w-3 h-3" />
                <span className="italic">{pronunciation}</span>
              </div>
            )}
            <p className="text-sm text-gray-700">{definition}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Common glossary terms data
export const GLOSSARY_TERMS: Record<string, {
  definition: string;
  pronunciation?: string;
  sanskrit?: string;
}> = {
  'Brahman': {
    definition: 'The ultimate reality, the infinite, eternal truth and bliss that is the source of all creation.',
    pronunciation: 'BRUH-mun',
    sanskrit: 'ब्रह्मन्'
  },
  'Atman': {
    definition: 'The individual soul or self, which is ultimately one with Brahman.',
    pronunciation: 'AAT-mun',
    sanskrit: 'आत्मन्'
  },
  'Dharma': {
    definition: 'Righteous duty, moral law, the cosmic order that upholds the universe.',
    pronunciation: 'DHAR-muh',
    sanskrit: 'धर्म'
  },
  'Karma': {
    definition: 'The law of cause and effect; actions and their consequences across lifetimes.',
    pronunciation: 'KAR-muh',
    sanskrit: 'कर्म'
  },
  'Maya': {
    definition: 'The illusion or appearance of the phenomenal world; the cosmic creative power.',
    pronunciation: 'MAA-yaa',
    sanskrit: 'माया'
  },
  'Moksha': {
    definition: 'Liberation from the cycle of birth and death; spiritual freedom.',
    pronunciation: 'MOHK-shuh',
    sanskrit: 'मोक्ष'
  },
  'Samsara': {
    definition: 'The cycle of birth, death, and rebirth; worldly existence.',
    pronunciation: 'sum-SAA-ruh',
    sanskrit: 'संसार'
  },
  'Vedas': {
    definition: 'The oldest sacred scriptures of Hinduism, revealed knowledge.',
    pronunciation: 'VAY-duz',
    sanskrit: 'वेद'
  },
  'Upanishads': {
    definition: 'Philosophical texts forming the concluding portion of the Vedas, exploring the nature of reality.',
    pronunciation: 'oo-PAN-i-shadz',
    sanskrit: 'उपनिषद्'
  },
  'Bhakti': {
    definition: 'Devotion and loving worship of the Divine.',
    pronunciation: 'BHUK-tee',
    sanskrit: 'भक्ति'
  },
  'Yoga': {
    definition: 'Union with the Divine; spiritual discipline and practice.',
    pronunciation: 'YOH-guh',
    sanskrit: 'योग'
  },
  'Mantra': {
    definition: 'Sacred sound, word, or phrase used in meditation and worship.',
    pronunciation: 'MUN-truh',
    sanskrit: 'मन्त्र'
  },
  'Puja': {
    definition: 'Ritual worship involving offerings to a deity.',
    pronunciation: 'POO-jaa',
    sanskrit: 'पूजा'
  },
  'Guru': {
    definition: 'Spiritual teacher who guides disciples on the path to enlightenment.',
    pronunciation: 'GOO-roo',
    sanskrit: 'गुरु'
  },
  'Avatar': {
    definition: 'Divine incarnation; God descending to earth in physical form.',
    pronunciation: 'AV-uh-tar',
    sanskrit: 'अवतार'
  }
};

export default GlossaryTerm;

