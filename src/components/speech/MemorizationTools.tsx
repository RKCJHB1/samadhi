/**
 * Memorization Tools Component - Full featured version
 * Adapted from the original Gemini app with complete feature parity
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MemorizationMode, MODE_DESCRIPTIONS, MODE_LABELS, SpeechChunk } from '@/data/speechChunks';
import { BookOpen, Shuffle, PenLine, Eye, Type, FileText, Ghost, Info, X, Lightbulb } from 'lucide-react';

interface MemorizationToolsProps {
  chunk: SpeechChunk;
  mode: MemorizationMode;
  onModeChange: (mode: MemorizationMode) => void;
}

interface ScramblePart { id: number; text: string; }
interface WordScrambleObj { id: number; text: string; }

const MemorizationTools: React.FC<MemorizationToolsProps> = ({ chunk, mode, onModeChange }) => {
  const [showDescription, setShowDescription] = useState(true);
  const [clozeInput, setClozeInput] = useState<{[key: number]: string}>({});
  const [hintsUsed, setHintsUsed] = useState<{[key: number]: boolean}>({});
  const [revealedWords, setRevealedWords] = useState<{[key: number]: boolean}>({});
  const [scrambleParts, setScrambleParts] = useState<ScramblePart[]>([]);
  const [solvedParts, setSolvedParts] = useState<ScramblePart[]>([]);
  const [shakeId, setShakeId] = useState<number | null>(null);
  const [wsSentences, setWsSentences] = useState<string[]>([]);
  const [wsCurrentIndex, setWsCurrentIndex] = useState(0);
  const [wsUserWords, setWsUserWords] = useState<WordScrambleObj[]>([]);
  const [wsTargetOrder, setWsTargetOrder] = useState<string[]>([]);
  const [wsShowHint, setWsShowHint] = useState(false);
  const [wsIsComplete, setWsIsComplete] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null);
  const [vanishLevel, setVanishLevel] = useState(0);
  const charThresholds = useRef<number[]>([]);

  const words = useMemo(() => chunk.text.split(' '), [chunk.text]);
  const fullText = chunk.text;

  const MODE_ICONS: Record<MemorizationMode, React.ReactNode> = {
    [MemorizationMode.READ]: <BookOpen className="w-4 h-4" />,
    [MemorizationMode.SCRAMBLE]: <Shuffle className="w-4 h-4" />,
    [MemorizationMode.WORD_SCRAMBLE]: <PenLine className="w-4 h-4" />,
    [MemorizationMode.BLUR]: <Eye className="w-4 h-4" />,
    [MemorizationMode.FIRST_LETTER]: <Type className="w-4 h-4" />,
    [MemorizationMode.CLOZE]: <FileText className="w-4 h-4" />,
    [MemorizationMode.VANISHING]: <Ghost className="w-4 h-4" />,
  };

  const initializeWordScramble = (sentence: string) => {
    if (!sentence) return;
    setWsShowHint(false);
    setWsIsComplete(false);
    setSelectedWordIndex(null);
    const sentenceWords = sentence.split(/\s+/);
    setWsTargetOrder(sentenceWords);
    const wordObjs = sentenceWords.map((w, i) => ({ id: i, text: w }));
    let shuffled = [...wordObjs];
    if (sentenceWords.length > 1) shuffled.sort(() => Math.random() - 0.5);
    setWsUserWords(shuffled);
  };

  useEffect(() => {
    setClozeInput({}); setRevealedWords({}); setHintsUsed({}); setVanishLevel(0); setSolvedParts([]);
    
    if (mode === MemorizationMode.SCRAMBLE) {
      const parts = chunk.text.match(/[^.?!;]+[.?!;]*\s*/g) || [chunk.text];
      const formatted = parts.map((p, i) => ({ id: i, text: p.trim() }));
      const shuffled = [...formatted];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setScrambleParts(shuffled);
    }
    if (mode === MemorizationMode.WORD_SCRAMBLE) {
      const raw = chunk.text.match(/[^.?!;]+[.?!;]+["']?|[^.?!;]+$/g) || [chunk.text];
      const sentences = raw.map(s => s.trim()).filter(s => s.length > 0);
      setWsSentences(sentences);
      setWsCurrentIndex(0);
      if (sentences.length > 0) initializeWordScramble(sentences[0]);
    }
    if (mode === MemorizationMode.VANISHING) {
      charThresholds.current = fullText.split('').map(() => Math.random() * 100);
    }
  }, [chunk.id, mode, chunk.text, fullText]);

  const checkCloze = (index: number, word: string) => {
    const input = (clozeInput[index] || '').toLowerCase().replace(/[^\w]/g, '');
    const clean = word.replace(/[^\w]/g, '').toLowerCase();
    return clean === input;
  };

  const handleClozeChange = (index: number, value: string) => {
    setClozeInput(prev => ({ ...prev, [index]: value }));
  };

  const handleHint = () => {
    if (mode === MemorizationMode.CLOZE) {
      for (let i = 0; i < words.length; i++) {
        if ((i + chunk.id) % 3 !== 0) continue;
        if (checkCloze(i, words[i]) || hintsUsed[i]) continue;
        setHintsUsed(prev => ({ ...prev, [i]: true }));
        handleClozeChange(i, words[i].replace(/[^\w]/g, ''));
        break;
      }
    } else if (mode === MemorizationMode.FIRST_LETTER) {
      for (let i = 0; i < words.length; i++) {
        if (revealedWords[i] || hintsUsed[i]) continue;
        setHintsUsed(prev => ({ ...prev, [i]: true }));
        break;
      }
    }
  };

  const handleScrambleClick = (part: ScramblePart) => {
    if (part.id === solvedParts.length) {
      setSolvedParts(prev => [...prev, part]);
      setScrambleParts(prev => prev.filter(p => p.id !== part.id));
    } else {
      setShakeId(part.id);
      setTimeout(() => setShakeId(null), 500);
    }
  };

  // Word Scramble handlers
  const reorderWords = (fromIndex: number, toIndex: number) => {
    const newWords = [...wsUserWords];
    const [moved] = newWords.splice(fromIndex, 1);
    newWords.splice(toIndex, 0, moved);
    setWsUserWords(newWords);

    const currentText = newWords.map(w => w.text).join(' ');
    const targetText = wsTargetOrder.join(' ');
    if (currentText === targetText && !wsIsComplete) {
      setWsIsComplete(true);
      setTimeout(() => {
        if (wsCurrentIndex + 1 < wsSentences.length) {
          setWsCurrentIndex(prev => prev + 1);
          initializeWordScramble(wsSentences[wsCurrentIndex + 1]);
        } else {
          setWsCurrentIndex(prev => prev + 1);
        }
      }, 800);
    }
  };

  const onDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    setDraggedIndex(index);
  };
  const onDragOver = (e: React.DragEvent) => e.preventDefault();
  const onDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    setDraggedIndex(null);
    if (!isNaN(dragIndex) && dragIndex !== dropIndex) reorderWords(dragIndex, dropIndex);
  };
  const onWordClick = (index: number) => {
    if (selectedWordIndex === null) setSelectedWordIndex(index);
    else if (selectedWordIndex === index) setSelectedWordIndex(null);
    else { reorderWords(selectedWordIndex, index); setSelectedWordIndex(null); }
  };

  const handleWsReset = () => { if (wsCurrentIndex < wsSentences.length) initializeWordScramble(wsSentences[wsCurrentIndex]); };
  const handleWsHint = () => { setWsShowHint(true); setTimeout(() => setWsShowHint(false), 2500); };

  // === RENDER MODES ===
  const renderReadMode = () => (
    <p className="text-xl md:text-2xl leading-relaxed text-justify font-serif text-spiritual-800">
      {chunk.text}
    </p>
  );

  const renderFirstLetterMode = () => (
    <div className="text-xl md:text-2xl leading-relaxed text-spiritual-800 flex flex-wrap gap-2 font-serif">
      {words.map((word, i) => {
        const isRevealed = revealedWords[i];
        const isHinted = hintsUsed[i];
        const visLen = isRevealed ? word.length : (isHinted ? 2 : 1);
        const visible = word.slice(0, visLen);
        const hidden = word.slice(visLen);
        return (
          <span key={i} className={`cursor-pointer select-none transition-colors ${isRevealed ? 'text-indian-saffron bg-indian-saffron/10 rounded px-1' : isHinted ? 'text-indian-saffron/70' : 'hover:text-indian-saffron'}`}
            onClick={() => setRevealedWords(prev => ({...prev, [i]: !prev[i]}))} title={isRevealed ? "Click to hide" : "Click to reveal"}>
            <span className="font-bold">{visible}</span>
            {hidden.length > 0 && <span className="tracking-widest opacity-40">{"_".repeat(hidden.length)}</span>}
          </span>
        );
      })}
    </div>
  );

  const renderBlurMode = () => (
    <p className="text-xl md:text-2xl leading-relaxed text-spiritual-800 text-justify font-serif">
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span className="filter blur-[5px] hover:blur-none transition-all duration-300 cursor-crosshair select-none inline-block">{word}</span>{' '}
        </React.Fragment>
      ))}
    </p>
  );

  const renderClozeMode = () => {
    const shouldHide = (idx: number) => (idx + chunk.id) % 3 === 0;
    return (
      <div className="text-xl md:text-2xl leading-loose text-spiritual-800 flex flex-wrap gap-x-2 gap-y-4 items-baseline font-serif">
        {words.map((word, i) => {
          if (!shouldHide(i)) return <span key={i}>{word}</span>;
          const isCorrect = checkCloze(i, word);
          const isHinted = hintsUsed[i];
          const cleanWord = word.replace(/[.,;!?]/g, '');
          const suffix = word.slice(cleanWord.length);
          return (
            <span key={i} className="inline-flex items-baseline">
              <input type="text" value={clozeInput[i] || ''} onChange={(e) => handleClozeChange(i, e.target.value)}
                style={{ width: `${Math.max(cleanWord.length, 3) + 2}ch` }}
                className={`border-b-2 bg-transparent px-1 text-center outline-none transition-colors font-serif ${
                  isCorrect ? 'border-green-500 text-green-700 font-bold' : isHinted ? 'border-yellow-400 text-yellow-700' : 'border-indian-saffron/30 focus:border-indian-saffron'
                }`} placeholder="?" />
              {suffix}
            </span>
          );
        })}
      </div>
    );
  };

  const renderVanishingMode = () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 bg-indian-saffron/5 p-4 rounded-lg border border-indian-saffron/20">
        <span className="font-bold text-indian-saffron whitespace-nowrap">Vanishing: {vanishLevel}%</span>
        <input type="range" min="0" max="100" value={vanishLevel} onChange={(e) => setVanishLevel(parseInt(e.target.value))}
          className="w-full h-2 bg-indian-saffron/20 rounded-lg appearance-none cursor-pointer accent-indian-saffron" />
      </div>
      <p className="text-xl md:text-2xl leading-relaxed text-spiritual-800 text-justify font-serif">
        {fullText.split('').map((char, i) => {
          const isVisible = (charThresholds.current[i] ?? 100) >= vanishLevel;
          const showChar = isVisible || char === ' ';
          return <span key={i} className={`transition-opacity duration-300 ${showChar ? 'opacity-100' : 'opacity-0'}`}>{showChar ? char : '_'}</span>;
        })}
      </p>
    </div>
  );

  const renderScrambleMode = () => {
    const isComplete = scrambleParts.length === 0;
    return (
      <div className="space-y-8">
        <div className="min-h-[100px] p-4 bg-indian-saffron/5 rounded-lg border-2 border-dashed border-indian-saffron/20">
          {solvedParts.length === 0 && !isComplete && (
            <div className="text-spiritual-400 text-center italic mt-4">Tap the segments below in the correct order to reconstruct the speech.</div>
          )}
          <div className="flex flex-wrap gap-2">
            {solvedParts.map((part) => (
              <span key={part.id} className="bg-white border border-indian-saffron/20 text-indian-saffron px-2 py-1 rounded shadow-sm">{part.text}</span>
            ))}
          </div>
        </div>
        {isComplete ? (
          <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
            <h3 className="text-xl font-bold text-green-800 mb-2">Excellent!</h3>
            <p className="text-green-700">You have reconstructed the flow of this passage perfectly.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3 justify-center">
            {scrambleParts.map((part) => (
              <button key={part.id} onClick={() => handleScrambleClick(part)}
                className={`px-4 py-3 bg-white border border-spiritual-200 rounded-lg shadow-sm hover:shadow-md hover:border-indian-saffron/30 transition-all text-spiritual-800 text-left ${
                  shakeId === part.id ? 'animate-bounce bg-red-50 border-red-300' : ''
                }`}>{part.text}</button>
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
        <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200 my-8">
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
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center text-sm text-spiritual-500 font-medium uppercase tracking-wide">
            <span>Sentence {wsCurrentIndex + 1} / {wsSentences.length}</span>
            <div className="flex gap-2">
              <button onClick={handleWsReset} className="text-xs px-3 py-1 text-indian-saffron hover:bg-indian-saffron/10 bg-white border border-indian-saffron/20 rounded transition-colors font-medium">Reset</button>
              <button onClick={handleWsHint} className="text-xs px-3 py-1 bg-indian-saffron/10 text-indian-saffron hover:bg-indian-saffron/20 border border-indian-saffron/20 rounded transition-colors font-medium">Peek</button>
            </div>
          </div>
          <div className="w-full h-2 bg-spiritual-100 rounded-full overflow-hidden">
            <div className="h-full bg-indian-saffron transition-all duration-500" style={{ width: `${(wsCurrentIndex / wsSentences.length) * 100}%` }}></div>
          </div>
        </div>
        <div className="relative p-6 bg-indian-saffron/5 rounded-xl border border-indian-saffron/20 min-h-[150px]">
          {wsShowHint && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex items-center justify-center rounded-xl p-6 text-center shadow-inner">
              <p className="text-lg font-serif text-indian-saffron font-medium">{currentSentenceText}</p>
            </div>
          )}
          <p className="text-xs text-spiritual-400 mb-4 text-center">Drag words to reorder or tap to swap</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {wsUserWords.map((w, index) => {
              const isCorrect = w.text === wsTargetOrder[index];
              const isSelected = selectedWordIndex === index;
              const isDragged = draggedIndex === index;
              let cls = "cursor-grab active:cursor-grabbing px-4 py-2 rounded-lg font-serif text-lg shadow-sm border-2 transition-all duration-200 select-none ";
              if (isDragged) cls += "opacity-40 scale-95 border-dashed border-spiritual-400 bg-spiritual-100 ";
              else if (wsIsComplete) cls += "bg-green-100 border-green-400 text-green-900 scale-105 ";
              else if (isCorrect) cls += "bg-green-50 border-green-200 text-green-800 ";
              else if (isSelected) cls += "bg-blue-50 border-blue-400 text-blue-900 shadow-md scale-105 z-10 ";
              else cls += "bg-white border-spiritual-200 text-spiritual-800 hover:border-indian-saffron/30 hover:shadow-md ";
              return (
                <div key={w.id} draggable={!wsIsComplete} onDragStart={(e) => onDragStart(e, index)} onDragOver={onDragOver}
                  onDrop={(e) => onDrop(e, index)} onClick={() => onWordClick(index)} className={cls}>{w.text}</div>
              );
            })}
          </div>
          {wsIsComplete && (
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
              <div className="text-6xl text-green-500 opacity-20 animate-ping">✓</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Main render
  return (
    <div className="space-y-4">
      {/* Mode Selector - Horizontal scrollable on mobile, wraps on larger screens */}
      <div className="bg-white rounded-xl border border-indian-saffron/20 shadow-sm p-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap scrollbar-thin scrollbar-thumb-indian-saffron/20">
          {Object.values(MemorizationMode).map((m) => (
            <button key={m} onClick={() => onModeChange(m)}
              className={`px-3 sm:px-4 py-2 rounded-md font-medium text-sm transition-all whitespace-nowrap flex-shrink-0 ${
                mode === m
                  ? 'bg-indian-saffron text-white shadow-sm'
                  : 'text-spiritual-600 hover:bg-spiritual-50'
              }`}>
              {MODE_LABELS[m]}
            </button>
          ))}
        </div>

        {/* Mode Description - inline below tabs */}
        <div className="mt-3 pt-3 border-t border-spiritual-100 flex items-start gap-2">
          <Info className="w-4 h-4 text-indian-saffron flex-shrink-0 mt-0.5" />
          <p className="text-sm text-spiritual-600">{MODE_DESCRIPTIONS[mode]}</p>
        </div>
      </div>

      {/* Section Title with orange left border */}
      <div className="border-l-4 border-indian-saffron pl-4 py-1">
        <h2 className="text-xl font-bold text-spiritual-800">{chunk.title}</h2>
      </div>

      {/* Content Area */}
      <div className="min-h-[200px] p-6 bg-white rounded-xl border border-indian-saffron/20 shadow-sm flex flex-col">
        <div className="flex-grow">
          {mode === MemorizationMode.READ && renderReadMode()}
          {mode === MemorizationMode.SCRAMBLE && renderScrambleMode()}
          {mode === MemorizationMode.WORD_SCRAMBLE && renderWordScrambleMode()}
          {mode === MemorizationMode.FIRST_LETTER && renderFirstLetterMode()}
          {mode === MemorizationMode.CLOZE && renderClozeMode()}
          {mode === MemorizationMode.BLUR && renderBlurMode()}
          {mode === MemorizationMode.VANISHING && renderVanishingMode()}
        </div>

        {/* Hint Button for Cloze and First Letter modes */}
        {(mode === MemorizationMode.CLOZE || mode === MemorizationMode.FIRST_LETTER) && (
          <div className="mt-8 flex justify-center border-t border-indian-saffron/10 pt-4">
            <button onClick={handleHint}
              className="flex items-center gap-2 px-5 py-2 bg-yellow-100 text-yellow-800 rounded-full font-medium hover:bg-yellow-200 transition-colors shadow-sm">
              <Lightbulb className="w-5 h-5" />
              Need a Hint?
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemorizationTools;

