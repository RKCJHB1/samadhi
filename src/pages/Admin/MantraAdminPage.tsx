import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Play, Pause, Save, Download, Upload, RotateCcw, ChevronUp, ChevronDown, Minus, ChevronsUp, Check, AlertCircle, Eye, EyeOff, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import SyncedAudioPlayer from '@/components/audio/SyncedAudioPlayer';
import {
  TimedSyllable,
  SvaraType,
} from '@/data/mantraTimings';
import { ADMIN_MANTRAS } from '@/data/adminMantras';
import {
  MantraConfig,
  saveMantraConfig,
  getMantraConfig,
  deleteMantraConfig,
  exportMantraConfigs,
  importMantraConfigs,
  svaraInfo,
} from '@/utils/mantraStorage';
import AdminNav from '@/components/admin/AdminNav';
import { getCurrentSession, isSuperAdmin } from '@/services/adminAuth';
import { adminStorage } from '@/services/adminStorage';
import { MantraAssignment } from '@/types/adminTypes';

const MantraAdminPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedMantraId, setSelectedMantraId] = useState<string>('gayatri');
  const [syllables, setSyllables] = useState<TimedSyllable[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [myAssignments, setMyAssignments] = useState<MantraAssignment[]>([]);
  const [isLoadingAssignments, setIsLoadingAssignments] = useState(false);
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const highlightIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const session = getCurrentSession();
  const isAdmin = isSuperAdmin();

  // Filter mantras based on role
  const filteredMantras = isAdmin
    ? ADMIN_MANTRAS
    : ADMIN_MANTRAS.filter(m => myAssignments.some(a => a.mantraId === m.id));

  const selectedMantra = ADMIN_MANTRAS.find(m => m.id === selectedMantraId);

  // Load assignments for moderators
  useEffect(() => {
    const loadAssignments = async () => {
      if (!isAdmin && session) {
        try {
          const assignments = await adminStorage.getAssignmentsByModerator(session.userId);
          setMyAssignments(assignments);

          // Check for mantra param in URL (from moderator dashboard)
          const mantraParam = searchParams.get('mantra');
          if (mantraParam && assignments.some(a => a.mantraId === mantraParam)) {
            setSelectedMantraId(mantraParam);
          } else if (assignments.length > 0) {
            setSelectedMantraId(assignments[0].mantraId);
          }
        } catch (error) {
          console.error('Failed to load assignments:', error);
        }
      }
    };
    loadAssignments();
  }, [isAdmin, session]);

  // Load mantra data when selection changes
  useEffect(() => {
    if (!selectedMantraId || !selectedMantra) return;

    const saved = getMantraConfig(selectedMantraId);

    // Check if saved config has empty syllables or Devanagari text
    const hasValidSavedSyllables = saved &&
      saved.syllables &&
      saved.syllables.length > 0 &&
      !containsDevanagari(saved.syllables.map(s => s.text));

    if (hasValidSavedSyllables) {
      setSyllables(saved.syllables);
      setIsConfirmed(saved.confirmed);
    } else {
      // Use default syllables
      setSyllables(selectedMantra.defaultSyllables.map(s => ({ ...s, svara: s.svara || 'neutral' })));
      setIsConfirmed(false);

      // If there was a saved config with invalid data, delete it
      if (saved) {
        deleteMantraConfig(selectedMantraId);
      }
    }
    // Reset audio state
    setCurrentTime(0);
    setActiveIndex(-1);
    setIsPlaying(false);
  }, [selectedMantraId, selectedMantra]);

  // Audio event handlers
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const startHighlightInterval = () => {
    if (highlightIntervalRef.current) {
      clearInterval(highlightIntervalRef.current);
    }
    highlightIntervalRef.current = setInterval(() => {
      if (audioRef.current) {
        const time = audioRef.current.currentTime;
        const idx = syllables.findIndex(s => time >= s.startTime && time <= s.endTime);
        setActiveIndex(idx);
      }
    }, 50);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        if (highlightIntervalRef.current) {
          clearInterval(highlightIntervalRef.current);
        }
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            startHighlightInterval();
          })
          .catch(err => {
            console.error('Play error:', err);
            toast.error('Could not play audio');
          });
      }
    }
  };

  const handleSeek = (values: number[]) => {
    if (audioRef.current && values.length > 0) {
      audioRef.current.currentTime = values[0];
      setCurrentTime(values[0]);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (highlightIntervalRef.current) {
        clearInterval(highlightIntervalRef.current);
      }
    };
  }, []);

  // Update syllable timing
  const updateSyllableTiming = (index: number, field: 'startTime' | 'endTime', value: number) => {
    setSyllables(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    setIsConfirmed(false);
  };

  // Update syllable svara
  const updateSyllableSvara = (index: number, svara: SvaraType) => {
    setSyllables(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], svara };
      return updated;
    });
    setIsConfirmed(false);
  };

  const containsDevanagari = (tokens: string[]) => /[\u0900-\u097F]/.test(tokens.join(''));

  const getTransliterationSyllablesForSave = (): string[] | undefined => {
    if (!selectedMantraId || !selectedMantra) return undefined;

    // 1) Prefer existing saved transliteration syllables (if aligned + non-Devanagari)
    const existing = getMantraConfig(selectedMantraId);
    const existingTokens = existing?.transliterationSyllables;
    if (existingTokens && existingTokens.length === syllables.length && !containsDevanagari(existingTokens)) {
      return existingTokens;
    }

    // 2) Fall back to catalog-provided transliteration syllables (if aligned)
    const catalogTokens = selectedMantra.transliterationSyllables;
    if (catalogTokens && catalogTokens.length === syllables.length && !containsDevanagari(catalogTokens)) {
      return catalogTokens;
    }

    // 3) For placeholder syllables, syllable.text is already romanized. Use that if it's non-Devanagari.
    const syllableTokens = syllables.map((s) => s.text);
    if (syllableTokens.length === syllables.length && !containsDevanagari(syllableTokens)) {
      return syllableTokens;
    }

    // Otherwise omit transliterationSyllables to avoid saving Devanagari as transliteration.
    return undefined;
  };

  // ─── Health-check validation ───────────────────────────────────────
  interface ValidationIssue {
    type: 'error' | 'warning';
    message: string;
  }

  const validationResults = useMemo(() => {
    if (!selectedMantra || syllables.length === 0) return { errors: [] as ValidationIssue[], warnings: [] as ValidationIssue[], isValid: true };

    const errors: ValidationIssue[] = [];
    const warnings: ValidationIssue[] = [];

    // 1) Placeholder / zero-duration timings
    const placeholderCount = syllables.filter(s => s.startTime === s.endTime || (s.endTime - s.startTime) < 0.01).length;
    if (placeholderCount === syllables.length) {
      errors.push({ type: 'error', message: 'All syllables have zero duration — timings have not been set.' });
    } else if (placeholderCount > 0) {
      warnings.push({ type: 'warning', message: `${placeholderCount} syllable(s) have zero or near-zero duration.` });
    }

    // 2) Negative durations
    const negativeCount = syllables.filter(s => s.endTime < s.startTime).length;
    if (negativeCount > 0) {
      errors.push({ type: 'error', message: `${negativeCount} syllable(s) have endTime before startTime.` });
    }

    // 3) Overlapping time ranges
    const sorted = [...syllables].sort((a, b) => a.startTime - b.startTime);
    let overlapCount = 0;
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i].startTime < sorted[i - 1].endTime - 0.01) {
        overlapCount++;
      }
    }
    if (overlapCount > 0) {
      warnings.push({ type: 'warning', message: `${overlapCount} pair(s) of syllables have overlapping time ranges.` });
    }

    // 4) Large gaps (> 2s) between consecutive syllables
    let gapCount = 0;
    for (let i = 1; i < sorted.length; i++) {
      const gap = sorted[i].startTime - sorted[i - 1].endTime;
      if (gap > 2) gapCount++;
    }
    if (gapCount > 0) {
      warnings.push({ type: 'warning', message: `${gapCount} gap(s) larger than 2 seconds between consecutive syllables.` });
    }

    // 5) Transliteration syllable count mismatch
    const catalogTokens = selectedMantra.transliterationSyllables;
    if (catalogTokens && catalogTokens.length > 0 && catalogTokens.length !== syllables.length) {
      errors.push({ type: 'error', message: `Transliteration syllable count (${catalogTokens.length}) does not match timing syllable count (${syllables.length}).` });
    }

    // 6) Devanagari leaking into transliteration syllables
    const translitTokens = getTransliterationSyllablesForSave();
    if (translitTokens && containsDevanagari(translitTokens)) {
      errors.push({ type: 'error', message: 'Transliteration syllables contain Devanagari characters — they should be romanized.' });
    }
    if (!translitTokens && catalogTokens && catalogTokens.length > 0) {
      warnings.push({ type: 'warning', message: 'No valid transliteration syllables could be resolved. Follow Along may show Devanagari.' });
    }

    // 7) Syllables extending beyond audio duration
    if (duration > 0) {
      const lastEnd = Math.max(...syllables.map(s => s.endTime));
      if (lastEnd > duration + 0.5) {
        warnings.push({ type: 'warning', message: `Last syllable ends at ${lastEnd.toFixed(2)}s but audio is only ${duration.toFixed(2)}s long.` });
      }
    }

    return { errors, warnings, isValid: errors.length === 0 };
  }, [syllables, selectedMantra, duration]);

  // Save configuration
  const handleSave = async () => {
    const transliterationSyllables = getTransliterationSyllablesForSave();

    const config: MantraConfig = {
      id: selectedMantraId,
      name: selectedMantra.name,
      audioSrc: selectedMantra.audioSrc,
      syllables,
      transliteration: selectedMantra.transliteration,
      transliterationSyllables,
      confirmed: isConfirmed,
      lastModified: new Date().toISOString(),
    };
    await saveMantraConfig(config);
    toast.success(`${selectedMantra.name} configuration saved to file!`);
  };

  // Confirm configuration — runs health check first
  const handleConfirmClick = () => {
    if (!validationResults.isValid || validationResults.warnings.length > 0) {
      setShowValidationDialog(true);
    } else {
      doConfirm();
    }
  };

  const doConfirm = async () => {
    setShowValidationDialog(false);
    setIsConfirmed(true);
    const transliterationSyllables = getTransliterationSyllablesForSave();

    const config: MantraConfig = {
      id: selectedMantraId,
      name: selectedMantra.name,
      audioSrc: selectedMantra.audioSrc,
      syllables,
      transliteration: selectedMantra.transliteration,
      transliterationSyllables,
      confirmed: true,
      lastModified: new Date().toISOString(),
    };
    await saveMantraConfig(config);
    toast.success(`${selectedMantra.name} confirmed and saved to file!`);
  };

  // Export all configs
  const handleExport = () => {
    const json = exportMantraConfigs();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mantra-configs.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Configurations exported!');
  };

  // Import configs
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (importMantraConfigs(result)) {
        toast.success('Configurations imported! Refresh to see changes.');
        // Reload current mantra
        const saved = getMantraConfig(selectedMantraId);
        if (saved) {
          setSyllables(saved.syllables);
          setIsConfirmed(saved.confirmed);
        }
      } else {
        toast.error('Failed to import configurations');
      }
    };
    reader.readAsText(file);
  };

  // Reset to defaults
  const handleReset = () => {
    setSyllables(selectedMantra.defaultSyllables.map(s => ({ ...s, svara: s.svara || 'neutral' })));
    setIsConfirmed(false);
    toast.info('Reset to default timings');
  };

  // Get svara icon
  const getSvaraIcon = (svara: SvaraType) => {
    switch (svara) {
      case 'udatta': return <ChevronUp className="w-4 h-4 text-green-600" />;
      case 'anudatta': return <ChevronDown className="w-4 h-4 text-red-600" />;
      case 'svarita': return <ChevronsUp className="w-4 h-4 text-blue-600" />;
      case 'dirgha-svarita': return <ChevronsUp className="w-4 h-4 text-purple-600" />;
      default: return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const formatTime = (t: number) => t.toFixed(2) + 's';

  // Show loading state
  if (isLoadingAssignments) {
    return (
      <>
        <AdminNav />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indian-saffron"></div>
        </div>
      </>
    );
  }

  // Show message if moderator has no assignments
  if (!isAdmin && filteredMantras.length === 0) {
    return (
      <>
        <AdminNav />
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="py-12 text-center">
                <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-700 mb-2">No Mantras Assigned</h2>
                <p className="text-gray-500">
                  You don't have any mantras assigned to you yet.
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Contact the Super Admin to get mantras assigned.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  // Show message if no mantra selected
  if (!selectedMantra) {
    return (
      <>
        <AdminNav />
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-gray-500">Please select a mantra to edit.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNav />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-heading font-bold mb-6">
            Mantra Configuration {!isAdmin && <span className="text-lg font-normal text-gray-500">(Moderator View)</span>}
          </h1>

          {/* Top Controls */}
          <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Select Mantra {!isAdmin && `(${filteredMantras.length} assigned)`}</span>
              {isAdmin && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleExport}>
                    <Download className="w-4 h-4 mr-1" /> Export All
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-1" /> Import
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleImport}
                  />
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Available mantras: {filteredMantras.length}</p>
              {filteredMantras.length === 0 ? (
                <p className="text-red-600">No mantras available</p>
              ) : (
                <Select value={selectedMantraId} onValueChange={setSelectedMantraId}>
                  <SelectTrigger className="w-full max-w-md">
                    <SelectValue placeholder="Select a mantra..." />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredMantras.map(m => (
                      <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Audio Player & Preview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <audio
              ref={audioRef}
              src={selectedMantra.audioSrc}
              preload="auto"
              onLoadedMetadata={handleLoadedMetadata}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => {
                setIsPlaying(false);
                if (highlightIntervalRef.current) clearInterval(highlightIntervalRef.current);
                setActiveIndex(-1);
              }}
              onError={(e) => {
                console.error('Audio error:', e);
                toast.error(`Could not load audio: ${selectedMantra.audioSrc}`);
              }}
              onCanPlay={() => console.log('Audio can play:', selectedMantra.audioSrc)}
            />

            {/* Syllable preview with svara animations */}
            <div className="bg-indian-cream/30 rounded-lg p-4 mb-4 min-h-[80px] flex items-center justify-center">
              <div className="text-2xl font-mono text-center leading-relaxed">
                {syllables.map((syl, idx) => {
                  const isActive = idx === activeIndex;
                  const svara = syl.svara || 'neutral';
                  const transliterationTokens = getTransliterationSyllablesForSave();
                  const displayText = transliterationTokens && idx < transliterationTokens.length
                    ? transliterationTokens[idx]
                    : syl.text;
                  return (
                    <span
                      key={idx}
                      className={`
                        inline-block px-0.5 transition-all duration-200
                        ${isActive ? 'bg-indian-saffron/30 text-indian-saffron font-bold' : ''}
                        ${isActive && svara === 'udatta' ? 'svara-syllable-udatta' : ''}
                        ${isActive && svara === 'anudatta' ? 'svara-syllable-anudatta' : ''}
                        ${isActive && svara === 'svarita' ? 'svara-syllable-svarita' : ''}
                        ${isActive && svara === 'dirgha-svarita' ? 'svara-syllable-dirgha' : ''}
                      `}
                      style={isActive && svara !== 'neutral' ? { animationDuration: `${Math.max(syl.endTime - syl.startTime, 0.3)}s` } : undefined}
                    >
                      {displayText}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Playback controls */}
            <div className="flex items-center gap-4">
              <Button onClick={togglePlayPause} variant="default">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <div className="flex-1">
                <Slider
                  value={[currentTime]}
                  min={0}
                  max={duration || 1}
                  step={0.01}
                  onValueChange={handleSeek}
                />
              </div>
              <span className="text-sm text-gray-500 w-24 text-right">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Health Check Status */}
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {validationResults.errors.length > 0 ? (
                  <XCircle className="w-5 h-5 text-red-500" />
                ) : validationResults.warnings.length > 0 ? (
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
                <span className="font-medium">
                  {validationResults.errors.length > 0
                    ? 'Issues found'
                    : validationResults.warnings.length > 0
                    ? 'Warnings'
                    : 'All checks passed'}
                </span>
                {validationResults.errors.length > 0 && (
                  <Badge variant="destructive">{validationResults.errors.length} error{validationResults.errors.length !== 1 ? 's' : ''}</Badge>
                )}
                {validationResults.warnings.length > 0 && (
                  <Badge variant="outline" className="border-amber-400 text-amber-700">{validationResults.warnings.length} warning{validationResults.warnings.length !== 1 ? 's' : ''}</Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowValidationDialog(true)}>
                  <AlertCircle className="w-4 h-4 mr-1" /> View Details
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
                  {showPreview ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                  {showPreview ? 'Hide Preview' : 'Live Preview'}
                </Button>
              </div>
            </div>
            {/* Inline summary of issues */}
            {(validationResults.errors.length > 0 || validationResults.warnings.length > 0) && (
              <div className="mt-3 space-y-1">
                {validationResults.errors.map((e, i) => (
                  <div key={`e-${i}`} className="flex items-center gap-2 text-sm text-red-600">
                    <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{e.message}</span>
                  </div>
                ))}
                {validationResults.warnings.map((w, i) => (
                  <div key={`w-${i}`} className="flex items-center gap-2 text-sm text-amber-600">
                    <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{w.message}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Syllable Editor */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Syllable Editor ({syllables.length} syllables)</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RotateCcw className="w-4 h-4 mr-1" /> Reset
                </Button>
                <Button variant="outline" size="sm" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-1" /> Save Draft
                </Button>
                <Button size="sm" onClick={handleConfirmClick} className="bg-green-600 hover:bg-green-700">
                  <Check className="w-4 h-4 mr-1" /> Confirm
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isConfirmed && (
              <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>This configuration is confirmed and will be used on the public site.</span>
              </div>
            )}

            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {syllables.map((syl, idx) => {
                const transliterationTokens = getTransliterationSyllablesForSave();
                const displayText = transliterationTokens && idx < transliterationTokens.length
                  ? transliterationTokens[idx]
                  : syl.text;
                return (
                <div
                  key={idx}
                  className={`
                    flex items-center gap-4 p-3 rounded-lg border
                    ${idx === activeIndex ? 'bg-indian-saffron/10 border-indian-saffron' : 'bg-white border-gray-200'}
                  `}
                >
                  <span className="w-8 text-gray-400 text-sm">#{idx + 1}</span>
                  <span className="w-16 text-xl font-mono">{displayText}</span>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Start:</span>
                    <input
                      type="number"
                      step="0.05"
                      min="0"
                      value={syl.startTime}
                      onChange={(e) => updateSyllableTiming(idx, 'startTime', parseFloat(e.target.value) || 0)}
                      className="w-20 px-2 py-1 border rounded text-sm"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">End:</span>
                    <input
                      type="number"
                      step="0.05"
                      min="0"
                      value={syl.endTime}
                      onChange={(e) => updateSyllableTiming(idx, 'endTime', parseFloat(e.target.value) || 0)}
                      className="w-20 px-2 py-1 border rounded text-sm"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Duration:</span>
                    <span className="text-sm font-mono w-16">{(syl.endTime - syl.startTime).toFixed(2)}s</span>
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    {getSvaraIcon(syl.svara || 'neutral')}
                    <Select
                      value={syl.svara || 'neutral'}
                      onValueChange={(v) => updateSyllableSvara(idx, v as SvaraType)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(svaraInfo).map(([key, info]) => (
                          <SelectItem key={key} value={key}>
                            {info.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Live Preview Panel */}
        {showPreview && (
          <Card className="mb-6 border-2 border-indian-saffron/30">
            <CardHeader className="bg-indian-cream/30">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-indian-saffron" />
                  Live Preview — How it will appear in the Learn page
                </span>
                <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)}>
                  <EyeOff className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-6 md:p-8 space-y-8 bg-white rounded-b-lg">
                {/* Transliteration (shows only when no synced Follow Along) */}
                {selectedMantra.transliteration && syllables.length === 0 && (
                  <div className="bg-gradient-to-br from-spiritual-50 to-white rounded-xl p-6 border border-spiritual-100">
                    <h3 className="text-lg font-heading font-semibold text-spiritual-600 mb-3">Transliteration</h3>
                    <p className="text-lg md:text-xl leading-relaxed text-gray-700 italic">
                      {selectedMantra.transliteration}
                    </p>
                  </div>
                )}

                {/* Follow Along — SyncedAudioPlayer */}
                {selectedMantra.audioSrc && syllables.length > 0 && (
                  <SyncedAudioPlayer
                    src={selectedMantra.audioSrc}
                    title="Follow Along"
                    syllables={syllables}
                    originalText={selectedMantra.transliteration}
                    transliteration={selectedMantra.transliteration}
                    transliterationSyllables={getTransliterationSyllablesForSave()}
                    mantraId={selectedMantra.id}
                  />
                )}

                {/* Audio player only (no syllables) */}
                {selectedMantra.audioSrc && syllables.length === 0 && (
                  <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100">
                    <h3 className="text-lg font-heading font-semibold text-blue-700 mb-3">Listen</h3>
                    <audio controls className="w-full" src={selectedMantra.audioSrc} />
                  </div>
                )}

                {/* English Meaning placeholder */}
                <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-100">
                  <h3 className="text-lg font-heading font-semibold text-green-700 mb-3">English Meaning</h3>
                  <p className="text-gray-600 italic leading-relaxed">
                    (English meaning is stored in Learn page data — preview shows layout only.)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Legend */}
        <Card>
          <CardHeader>
            <CardTitle>Svara Types Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(svaraInfo).map(([key, info]) => (
                <div key={key} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="mt-0.5">{getSvaraIcon(key as SvaraType)}</div>
                  <div>
                    <div className="font-medium">{info.name}</div>
                    <div className="text-sm text-gray-600">{info.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </div>
      </div>

      {/* Validation Dialog */}
      <Dialog open={showValidationDialog} onOpenChange={setShowValidationDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {validationResults.isValid ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              Health Check Results
            </DialogTitle>
            <DialogDescription>
              {validationResults.isValid
                ? 'No blocking errors found. Review any warnings below.'
                : 'There are errors that should be fixed before confirming.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 max-h-[400px] overflow-y-auto py-2">
            {validationResults.errors.length === 0 && validationResults.warnings.length === 0 && (
              <div className="flex items-center gap-2 text-green-600 p-3 bg-green-50 rounded-lg">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">All health checks passed!</span>
              </div>
            )}
            {validationResults.errors.map((e, i) => (
              <div key={`err-${i}`} className="flex items-start gap-2 p-3 bg-red-50 rounded-lg text-red-700">
                <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{e.message}</span>
              </div>
            ))}
            {validationResults.warnings.map((w, i) => (
              <div key={`warn-${i}`} className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg text-amber-700">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{w.message}</span>
              </div>
            ))}
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowValidationDialog(false)}>
              Go Back & Fix
            </Button>
            {validationResults.isValid && (
              <Button onClick={doConfirm} className="bg-green-600 hover:bg-green-700">
                <Check className="w-4 h-4 mr-1" /> Confirm Anyway
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MantraAdminPage;

