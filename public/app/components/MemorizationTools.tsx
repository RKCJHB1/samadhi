import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MemorizationMode, SpeechChunk } from '../types';

interface MemorizationToolsProps {
  chunk: SpeechChunk;
  mode: MemorizationMode;
  audioProgress: number; // 0 to 1
}

interface WordTiming {
  word: string;
  index: number;
  start: number; // 0 to 1
  end: number;   // 0 to 1
  weight: number;
}

interface ScramblePart {
    id: number;
    text: string;
}

interface WordScrambleObj {
  id: number;
  text: string;
}

export const MemorizationTools: React.FC<MemorizationToolsProps> = ({ 
  chunk, 
  mode, 
  audioProgress,
}) => {
  const [clozeInput, setClozeInput] = useState<{[key: number]: string}>({});
  const [revealedWords, setRevealedWords] = useState<{[key: number]: boolean}>({});
  const [hintsUsed, setHintsUsed] = useState<{[key: number]: boolean}>({});
  
  // Scramble State (Phrase Level)
  const [scrambleParts, setScrambleParts] = useState<ScramblePart[]>([]);
  const [solvedParts, setSolvedParts] = useState<ScramblePart[]>([]);
  const [shakeId, setShakeId] = useState<number | null>(null);

  // Word Scramble State (Sentence Level)
  const [wsSentences, setWsSentences] = useState<string[]>([]);
  const [wsCurrentIndex, setWsCurrentIndex] = useState(0);
  // Replaced pool/solved arrays with a single user-ordered array for DnD
  const [wsUserWords, setWsUserWords] = useState<WordScrambleObj[]>([]);
  const [wsTargetOrder, setWsTargetOrder] = useState<string[]>([]);
  const [wsShowHint, setWsShowHint] = useState(false);
  const [wsIsComplete, setWsIsComplete] = useState(false);
  
  // DnD & Selection State
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null);

  // Vanishing State
  const [vanishLevel, setVanishLevel] = useState(0); // 0 to 100
  // Store a random threshold for every character to keep vanishing consistent
  const charThresholds = useRef<number[]>([]); 

  const words = useMemo(() => chunk.text.split(' '), [chunk.text]);
  const fullText = chunk.text;

  // Reset state when chunk or mode changes
  useEffect(() => {
    setClozeInput({});
    setRevealedWords({});
    setHintsUsed({});
    setVanishLevel(0);
    
    // Reset Scramble
    setSolvedParts([]);
    if (mode === MemorizationMode.SCRAMBLE) {
        // Split by punctuation for meaningful chunks, but keep the punctuation
        const parts = chunk.text.match(/[^.?!;]+[.?!;]*\s*/g) || [chunk.text];
        const formattedParts = parts.map((p, i) => ({ id: i, text: p.trim() }));
        // Fisher-Yates shuffle
        const shuffled = [...formattedParts];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setScrambleParts(shuffled);
    }

    // Reset Word Scramble
    if (mode === MemorizationMode.WORD_SCRAMBLE) {
        // Split by major punctuation (.;?!) to get sentences
        const rawSentences = chunk.text.match(/[^.?!;]+[.?!;]+["']?|[^.?!;]+$/g) || [chunk.text];
        const sentences = rawSentences.map(s => s.trim()).filter(s => s.length > 0);
        setWsSentences(sentences);
        setWsCurrentIndex(0);
        if (sentences.length > 0) {
            initializeWordScramble(sentences[0]);
        }
    }

    // Reset Vanishing thresholds
    if (mode === MemorizationMode.VANISHING) {
        charThresholds.current = fullText.split('').map(() => Math.random() * 100);
    }

  }, [chunk.id, mode, chunk.text]);

  const initializeWordScramble = (sentence: string) => {
    if (!sentence) return;
    setWsShowHint(false);
    setWsIsComplete(false);
    setSelectedWordIndex(null);
    
    const words = sentence.split(/\s+/);
    setWsTargetOrder(words);
    
    const wordObjs = words.map((w, i) => ({ id: i, text: w }));
    
    // Shuffle
    let shuffled = [...wordObjs];
    if (words.length > 1) {
        shuffled.sort(() => Math.random() - 0.5);
    }
    setWsUserWords(shuffled);
  };

  const handleWsReset = () => {
    if (wsCurrentIndex < wsSentences.length) {
      initializeWordScramble(wsSentences[wsCurrentIndex]);
    }
  };

  const handleWsHint = () => {
    setWsShowHint(true);
    setTimeout(() => setWsShowHint(false), 2500);
  };

  // Reorder Logic
  const reorderWords = (fromIndex: number, toIndex: number) => {
      const newWords = [...wsUserWords];
      const [movedItem] = newWords.splice(fromIndex, 1);
      newWords.splice(toIndex, 0, movedItem);
      setWsUserWords(newWords);
      
      // Check correctness
      const currentText = newWords.map(w => w.text).join(' ');
      const targetText = wsTargetOrder.join(' ');
      
      if (currentText === targetText && !wsIsComplete) {
          setWsIsComplete(true);
          // Auto advance after delay
          setTimeout(() => {
              if (wsCurrentIndex + 1 < wsSentences.length) {
                  setWsCurrentIndex(prev => prev + 1);
                  initializeWordScramble(wsSentences[wsCurrentIndex + 1]);
              } else {
                  setWsCurrentIndex(prev => prev + 1); // Mark all done
              }
          }, 800);
      }
  };

  const onDragStart = (e: React.DragEvent, index: number) => {
      e.dataTransfer.setData('text/plain', index.toString());
      e.dataTransfer.effectAllowed = 'move';
      setDraggedIndex(index);
  };

  const onDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (e: React.DragEvent, dropIndex: number) => {
      e.preventDefault();
      const dragIndexStr = e.dataTransfer.getData('text/plain');
      const dragIndex = parseInt(dragIndexStr, 10);
      setDraggedIndex(null);
      
      if (isNaN(dragIndex) || dragIndex === dropIndex) return;
      reorderWords(dragIndex, dropIndex);
  };

  const onWordClick = (index: number) => {
      if (selectedWordIndex === null) {
          setSelectedWordIndex(index);
      } else if (selectedWordIndex === index) {
          setSelectedWordIndex(null); // Deselect
      } else {
          reorderWords(selectedWordIndex, index);
          setSelectedWordIndex(null);
      }
  };

  const handleClozeChange = (index: number, value: string) => {
    setClozeInput(prev => ({...prev, [index]: value}));
  };

  const checkCloze = (index: number, word: string) => {
    const input = clozeInput[index]?.toLowerCase().trim() || '';
    const cleanWord = word.replace(/[^\w]/g, '').toLowerCase(); // Remove punctuation for checking
    const cleanInput = input.replace(/[^\w]/g, '');
    return cleanWord === cleanInput;
  };

  const handleHint = () => {
    let foundIndex = -1;
    
    if (mode === MemorizationMode.CLOZE) {
       for (let i = 0; i < words.length; i++) {
         const shouldHide = (i + chunk.id) % 3 === 0;
         if (!shouldHide) continue; // Not a blank
         
         const isCorrect = checkCloze(i, words[i]);
         if (isCorrect) continue; // Already solved
         
         if (hintsUsed[i]) continue; // Already used hint
         
         foundIndex = i;
         break;
       }
       
       if (foundIndex !== -1) {
         setHintsUsed(prev => ({...prev, [foundIndex]: true}));
         const word = words[foundIndex];
         const cleanWord = word.replace(/[^\w]/g, '');
         handleClozeChange(foundIndex, cleanWord);
       }
    } else if (mode === MemorizationMode.FIRST_LETTER) {
       for (let i = 0; i < words.length; i++) {
         if (revealedWords[i]) continue; // Fully revealed by user toggle
         if (hintsUsed[i]) continue; // Already used hint
         
         foundIndex = i;
         break;
       }
       
       if (foundIndex !== -1) {
         setHintsUsed(prev => ({...prev, [foundIndex]: true}));
       }
    }
  };

  const handleScrambleClick = (part: ScramblePart) => {
    const nextIndex = solvedParts.length;
    // The correct part should have id === nextIndex because ids were assigned sequentially
    if (part.id === nextIndex) {
        setSolvedParts(prev => [...prev, part]);
        setScrambleParts(prev => prev.filter(p => p.id !== part.id));
    } else {
        setShakeId(part.id);
        setTimeout(() => setShakeId(null), 500);
    }
  };

  // Helper to count syllables for better timing estimation
  const countSyllables = (word: string) => {
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const match = word.match(/[aeiouy]{1,2}/g);
    return match ? match.length : 1;
  };

  // Generate and store word-level timing data for the current chunk
  const wordTimings = useMemo<WordTiming[]>(() => {
    // 1. Calculate raw weights based on linguistics and punctuation
    const weights = words.map(word => {
      const syllables = countSyllables(word);
      let weight = syllables * 10; // Base weight per syllable
      
      // Punctuation adjustments for pauses
      if (/[.!?;]+$/.test(word)) weight += 25; // Significant pause
      else if (/[,:]+$/.test(word)) weight += 12; // Moderate pause
      else if (/[-–—]/.test(word)) weight += 10; // Em dash/hyphen pause

      // Adjustment for short functional words
      if (word.length <= 3) weight = Math.max(5, weight - 2);
      
      return weight;
    });

    const totalWeight = weights.reduce((a, b) => a + b, 0);
    
    // 2. Normalize to 0-1 range to create structured timing segments
    let currentWeight = 0;
    return words.map((word, i) => {
      const weight = weights[i];
      const start = currentWeight / totalWeight;
      currentWeight += weight;
      const end = currentWeight / totalWeight;
      
      return {
        word,
        index: i,
        start,
        end,
        weight
      };
    });
  }, [words]);

  // Renderers
  const renderReadMode = () => {
    let activeIndex = -1;

    // Use the pre-calculated timing data to find the active word
    if (audioProgress > 0 && audioProgress < 1) {
      const activeTiming = wordTimings.find(t => audioProgress >= t.start && audioProgress < t.end);
      if (activeTiming) activeIndex = activeTiming.index;
    }

    return (
      <div className="serif-text text-xl md:text-2xl leading-relaxed text-justify">
        {words.map((word, i) => {
          let stateClass = "text-gray-800";
          
          if (activeIndex !== -1) {
            if (i === activeIndex) {
              stateClass = "bg-orange-500 text-white rounded px-1.5 shadow-md transform scale-105 z-10 mx-1";
            } else if (i < activeIndex) {
              stateClass = "text-gray-900"; // Past words
            } else {
              stateClass = "text-gray-400"; // Future words dimmed
            }
          }

          return (
            <React.Fragment key={i}>
              <span 
                className={`transition-all duration-200 inline-block ${stateClass}`}
              >
                {word}
              </span>
              {' '}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const renderFirstLetterMode = () => (
    <div className="serif-text text-xl md:text-2xl leading-relaxed text-gray-800 flex flex-wrap gap-2">
      {words.map((word, i) => {
        const isRevealed = revealedWords[i];
        const isHinted = hintsUsed[i];

        // If revealed, show full word. 
        // If hinted, show 2 letters.
        // Else show 1 letter.
        const visibleLength = isRevealed ? word.length : (isHinted ? 2 : 1);
        
        const visiblePart = word.slice(0, visibleLength);
        const hiddenPart = word.slice(visibleLength);

        return (
          <span 
            key={i} 
            className={`cursor-pointer select-none transition-colors ${
                isRevealed 
                ? 'text-orange-900 bg-orange-100 rounded px-1 hover:bg-orange-200' 
                : isHinted ? 'text-orange-700' : 'hover:text-orange-600'
            }`}
            onClick={() => setRevealedWords(prev => ({...prev, [i]: !prev[i]}))}
            title={isRevealed ? "Click to hide" : "Click to reveal"}
          >
            <span className="font-bold">{visiblePart}</span>
            {hiddenPart.length > 0 && (
              <span className="tracking-widest opacity-40">{"_".repeat(hiddenPart.length)}</span>
            )}
          </span>
        );
      })}
    </div>
  );

  const renderClozeMode = () => {
    const shouldHide = (index: number) => (index + chunk.id) % 3 === 0;

    return (
      <div className="serif-text text-xl md:text-2xl leading-loose text-gray-800 flex flex-wrap gap-x-2 gap-y-4 items-baseline">
        {words.map((word, i) => {
          if (!shouldHide(i)) return <span key={i}>{word}</span>;

          const isCorrect = checkCloze(i, word);
          const isHinted = hintsUsed[i];
          const cleanWord = word.replace(/[.,;!?]/g, '');
          const suffix = word.slice(cleanWord.length);

          return (
            <span key={i} className="inline-flex items-baseline">
              <input
                type="text"
                value={clozeInput[i] || ''}
                onChange={(e) => handleClozeChange(i, e.target.value)}
                style={{ width: `${Math.max(cleanWord.length, 3) + 2}ch` }}
                className={`border-b-2 bg-transparent px-1 text-center outline-none transition-colors font-serif ${
                  isCorrect 
                    ? 'border-green-500 text-green-700 font-bold' 
                    : isHinted 
                       ? 'border-yellow-400 text-yellow-700' 
                       : 'border-orange-300 focus:border-orange-600'
                }`}
                placeholder="?"
              />
              {suffix}
            </span>
          );
        })}
      </div>
    );
  };

  const renderBlurMode = () => (
    <p className="serif-text text-xl md:text-2xl leading-relaxed text-gray-800 text-justify">
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span 
            className="filter blur-[5px] hover:blur-none transition-all duration-300 cursor-crosshair select-none inline-block rounded-sm"
          >
            {word}
          </span>
          {' '}
        </React.Fragment>
      ))}
    </p>
  );

  const renderVanishingMode = () => {
      return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 bg-orange-50 p-4 rounded-lg border border-orange-200">
                <span className="font-bold text-orange-900 whitespace-nowrap">Vanishing Level: {vanishLevel}%</span>
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={vanishLevel} 
                    onChange={(e) => setVanishLevel(parseInt(e.target.value))}
                    className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
            </div>
            
            <p className="serif-text text-xl md:text-2xl leading-relaxed text-gray-800 text-justify">
                {fullText.split('').map((char, i) => {
                    const isVisible = (charThresholds.current[i] ?? 100) >= vanishLevel;
                    // Always show spaces to keep layout, punctuation is usually kept until very high levels or treated as chars
                    // Let's treat punctuation as characters that also vanish to force pure memory
                    const showChar = isVisible || char === ' '; 
                    
                    return (
                        <span 
                            key={i} 
                            className={`transition-opacity duration-300 ${showChar ? 'opacity-100' : 'opacity-0'}`}
                        >
                            {showChar ? char : '_'}
                        </span>
                    );
                })}
            </p>
        </div>
      );
  };

  const renderScrambleMode = () => {
      const isComplete = scrambleParts.length === 0;

      return (
          <div className="space-y-8">
              <div className="min-h-[100px] p-4 bg-orange-50 rounded-lg border-2 border-dashed border-orange-200">
                  {solvedParts.length === 0 && !isComplete && (
                      <div className="text-gray-400 text-center italic mt-4">
                          Tap the segments below in the correct order to reconstruct the speech.
                      </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {solvedParts.map((part) => (
                        <span key={part.id} className="bg-white border border-orange-200 text-orange-900 px-2 py-1 rounded shadow-sm">
                            {part.text}
                        </span>
                    ))}
                  </div>
              </div>

              {isComplete ? (
                   <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200 animate-fade-in">
                       <h3 className="text-xl font-bold text-green-800 mb-2">Excellent!</h3>
                       <p className="text-green-700">You have reconstructed the flow of this passage perfectly.</p>
                   </div>
              ) : (
                <div className="flex flex-wrap gap-3 justify-center">
                    {scrambleParts.map((part) => (
                        <button
                            key={part.id}
                            onClick={() => handleScrambleClick(part)}
                            className={`px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-orange-300 transition-all active:scale-95 text-gray-800 text-left ${
                                shakeId === part.id ? 'animate-bounce bg-red-50 border-red-300' : ''
                            }`}
                        >
                            {part.text}
                        </button>
                    ))}
                </div>
              )}
          </div>
      );
  };

  const renderWordScrambleMode = () => {
      const isAllComplete = wsCurrentIndex >= wsSentences.length;

      if (isAllComplete) {
          return (
             <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200 animate-fade-in my-8">
                <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold text-green-800 mb-2">Chunk Completed!</h3>
                <p className="text-green-700">You have successfully reconstructed all sentences.</p>
             </div>
          );
      }

      const currentSentenceText = wsSentences[wsCurrentIndex];

      return (
          <div className="space-y-6">
              {/* Progress and Toolbar */}
              <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center text-sm text-gray-500 font-medium uppercase tracking-wide">
                      <span>Sentence {wsCurrentIndex + 1} / {wsSentences.length}</span>
                      <div className="flex gap-2">
                           <button 
                             onClick={handleWsReset}
                             className="text-xs px-3 py-1 text-orange-600 hover:bg-orange-50 bg-white border border-orange-200 rounded transition-colors font-medium"
                             title="Reset current sentence"
                           >
                             Reset
                           </button>
                           <button 
                             onClick={handleWsHint}
                             className="text-xs px-3 py-1 bg-orange-100 text-orange-700 hover:bg-orange-200 border border-orange-200 rounded transition-colors font-medium"
                             title="Peek at the sentence"
                           >
                             Peek
                           </button>
                      </div>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-orange-500 transition-all duration-500"
                        style={{ width: `${(wsCurrentIndex / wsSentences.length) * 100}%` }}
                      ></div>
                  </div>
              </div>

              {/* Interaction Area */}
              <div className="relative p-6 bg-orange-50 rounded-xl border border-orange-200 min-h-[150px]">
                   {wsShowHint && (
                       <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex items-center justify-center rounded-xl p-6 text-center animate-fade-in shadow-inner">
                           <p className="text-lg font-serif text-orange-900 font-medium">{currentSentenceText}</p>
                       </div>
                   )}
                   
                   <p className="text-xs text-gray-400 mb-4 text-center">
                      Drag words to reorder or tap to swap
                   </p>

                   <div className="flex flex-wrap gap-3 justify-center">
                      {wsUserWords.map((w, index) => {
                          const isCorrect = w.text === wsTargetOrder[index];
                          const isSelected = selectedWordIndex === index;
                          const isDragged = draggedIndex === index;

                          let baseClass = "cursor-grab active:cursor-grabbing px-4 py-2 rounded-lg font-serif text-lg shadow-sm border-2 transition-all duration-200 select-none ";
                          
                          if (isDragged) {
                              baseClass += "opacity-40 scale-95 border-dashed border-gray-400 bg-gray-100 ";
                          } else if (wsIsComplete) {
                              baseClass += "bg-green-100 border-green-400 text-green-900 scale-105 ";
                          } else if (isCorrect) {
                              baseClass += "bg-green-50 border-green-200 text-green-800 ";
                          } else if (isSelected) {
                              baseClass += "bg-blue-50 border-blue-400 text-blue-900 shadow-md scale-105 z-10 ";
                          } else {
                              baseClass += "bg-white border-gray-200 text-gray-800 hover:border-orange-300 hover:shadow-md ";
                          }

                          return (
                              <div
                                key={w.id}
                                draggable={!wsIsComplete}
                                onDragStart={(e) => onDragStart(e, index)}
                                onDragOver={onDragOver}
                                onDrop={(e) => onDrop(e, index)}
                                onClick={() => onWordClick(index)}
                                className={baseClass}
                              >
                                {w.text}
                              </div>
                          );
                      })}
                   </div>
                   
                   {wsIsComplete && (
                       <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                           <div className="text-6xl text-green-500 opacity-20 animate-ping">
                               ✓
                           </div>
                       </div>
                   )}
              </div>
          </div>
      );
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg border border-orange-100 min-h-[300px] flex flex-col">
      <div className="flex-grow">
        {mode === MemorizationMode.READ && renderReadMode()}
        {mode === MemorizationMode.SCRAMBLE && renderScrambleMode()}
        {mode === MemorizationMode.WORD_SCRAMBLE && renderWordScrambleMode()}
        {mode === MemorizationMode.FIRST_LETTER && renderFirstLetterMode()}
        {mode === MemorizationMode.CLOZE && renderClozeMode()}
        {mode === MemorizationMode.BLUR && renderBlurMode()}
        {mode === MemorizationMode.VANISHING && renderVanishingMode()}
      </div>

      {(mode === MemorizationMode.CLOZE || mode === MemorizationMode.FIRST_LETTER) && (
        <div className="mt-8 flex justify-center border-t border-orange-100 pt-4">
          <button 
            onClick={handleHint}
            className="flex items-center gap-2 px-5 py-2 bg-yellow-100 text-yellow-800 rounded-full font-medium hover:bg-yellow-200 transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Need a Hint?
          </button>
        </div>
      )}
    </div>
  );
};