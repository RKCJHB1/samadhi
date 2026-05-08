import React, { useMemo } from 'react';

interface MalaBeadsProps {
  totalBeads?: number;
  litBeads: number;
  size?: 'sm' | 'md' | 'lg' | 'chant';
  className?: string;
  showCenterLabel?: boolean;
  showProgressText?: boolean;
}

const MalaBeads: React.FC<MalaBeadsProps> = ({
  totalBeads = 108,
  litBeads,
  size = 'md',
  className = '',
  showCenterLabel = true,
  showProgressText = true,
}) => {
  // Calculate the number of beads lit (wrap around for multiple rounds)
  const currentRound = Math.floor(litBeads / totalBeads);
  const beadsInCurrentRound = litBeads % totalBeads;
  
  // Size configurations for responsiveness
  const sizeConfig = {
    sm: {
      containerSize: 'w-48 h-48 sm:w-56 sm:h-56',
      beadSize: 'w-2 h-2 sm:w-2.5 sm:h-2.5',
      radius: 85,
      mobileRadius: 75,
    },
    md: {
      containerSize: 'w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96',
      beadSize: 'w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5',
      radius: 140,
      mobileRadius: 95,
    },
    lg: {
      containerSize: 'w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem]',
      beadSize: 'w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5',
      radius: 180,
      mobileRadius: 120,
    },
    chant: {
      containerSize: 'w-[clamp(10rem,52vmin,20rem)] h-[clamp(10rem,52vmin,20rem)]',
      beadSize: 'w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3',
      radius: 0,
      mobileRadius: 0,
    },
  };

  const config = sizeConfig[size];
  
  // Generate bead positions in a circle
  const beads = useMemo(() => {
    const beadElements = [];
    for (let i = 0; i < totalBeads; i++) {
      // Start from top (270 degrees) and go clockwise
      const angle = (270 + (i * 360) / totalBeads) * (Math.PI / 180);
      
      // Determine if this bead is lit
      const isLit = i < beadsInCurrentRound;
      const isNextBead = i === beadsInCurrentRound;
      
      beadElements.push({
        index: i,
        angle,
        isLit,
        isNextBead,
      });
    }
    return beadElements;
  }, [totalBeads, beadsInCurrentRound]);

  // Get color based on round (cycle through colors)
  const roundColors = [
    { lit: 'bg-amber-400 shadow-amber-400/50', glow: 'shadow-[0_0_8px_rgba(251,191,36,0.8)]' },
    { lit: 'bg-spiritual-400 shadow-spiritual-400/50', glow: 'shadow-[0_0_8px_rgba(168,85,247,0.8)]' },
    { lit: 'bg-emerald-400 shadow-emerald-400/50', glow: 'shadow-[0_0_8px_rgba(52,211,153,0.8)]' },
    { lit: 'bg-rose-400 shadow-rose-400/50', glow: 'shadow-[0_0_8px_rgba(251,113,133,0.8)]' },
    { lit: 'bg-cyan-400 shadow-cyan-400/50', glow: 'shadow-[0_0_8px_rgba(34,211,238,0.8)]' },
  ];
  const currentColor = roundColors[currentRound % roundColors.length];

  return (
    <div className={`relative ${config.containerSize} ${className}`}>
      {/* Round counter */}
      {showCenterLabel && currentRound > 0 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
          <p className="text-xs sm:text-sm text-spiritual-300/70 font-sans">Round</p>
          <p className="text-2xl sm:text-3xl font-mono text-spiritual-200 font-bold">{currentRound + 1}</p>
        </div>
      )}
      
      {/* Beads container */}
      <div className="absolute inset-0">
        {beads.map((bead) => {
          // Use CSS custom properties for responsive positioning
          const xPercent = 50 + Math.cos(bead.angle) * 45;
          const yPercent = 50 + Math.sin(bead.angle) * 45;
          
          return (
            <div
              key={bead.index}
              className={`absolute rounded-full transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2
                ${config.beadSize}
                ${bead.isLit 
                  ? `${currentColor.lit} ${currentColor.glow} scale-110` 
                  : bead.isNextBead 
                    ? 'bg-spiritual-400/40 animate-pulse scale-105' 
                    : 'bg-slate-600/50'
                }
              `}
              style={{
                left: `${xPercent}%`,
                top: `${yPercent}%`,
              }}
              title={`Bead ${bead.index + 1}`}
            />
          );
        })}
      </div>
      
      {/* Guru bead (top center, larger) */}
      <div 
        className={`absolute left-1/2 -translate-x-1/2 rounded-full
          w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6
          ${litBeads > 0 ? 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.8)]' : 'bg-slate-500/50'}
          transition-all duration-300
        `}
        style={{ top: '2%' }}
        title="Guru Bead"
      />
      
      {/* Progress text */}
      {showProgressText && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
          <p className="text-xs sm:text-sm text-spiritual-300/60">
            <span className="font-mono text-spiritual-200">{beadsInCurrentRound}</span>
            <span className="mx-1">/</span>
            <span className="font-mono">{totalBeads}</span>
            <span className="ml-2 text-spiritual-400/60">beads</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default MalaBeads;

