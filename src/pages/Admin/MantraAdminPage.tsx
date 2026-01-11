import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Save, Download, Upload, RotateCcw, ChevronUp, ChevronDown, Minus, ChevronsUp, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import {
  TimedSyllable,
  SvaraType,
  gayatriMantraSyllables,
  sahaNavatuMantraSyllables,
} from '@/data/mantraTimings';
import {
  MantraConfig,
  saveMantraConfig,
  getMantraConfig,
  exportMantraConfigs,
  importMantraConfigs,
  svaraInfo,
} from '@/utils/mantraStorage';

// Helper to create placeholder syllables from transliteration
const createPlaceholderSyllables = (transliteration: string): TimedSyllable[] => {
  const words = transliteration.split(/\s+/);
  let time = 0;
  return words.map(word => {
    const syl: TimedSyllable = { text: word + ' ', startTime: time, endTime: time + 0.5, svara: 'neutral' };
    time += 0.5;
    return syl;
  });
};

// Available mantras with their default data
const availableMantras = [
  {
    id: 'gayatri',
    name: 'Gayatri Mantra',
    audioSrc: '/audio/gayatri.mp3',
    defaultSyllables: gayatriMantraSyllables,
    transliteration: 'Oṃ bhūr bhuvaḥ svaḥ tat savitur vareṇyaṃ bhargo devasya dhīmahi dhiyo yo naḥ pracodayāt',
  },
  {
    id: 'saha-navavatu',
    name: 'Saha Navavatu',
    audioSrc: '/audio/sahana.mp3',
    defaultSyllables: sahaNavatuMantraSyllables,
    transliteration: 'Oṃ saha nāvavatu saha nau bhunaktu saha vīryaṃ karavāvahai tejasvināvadhītamastu mā vidviṣāvahai oṃ śāntiḥ śāntiḥ śāntiḥ',
  },
  {
    id: 'ganapati-prarthana',
    name: 'Ganapati Prarthana',
    audioSrc: '/audio/ganapati.MP3',
    defaultSyllables: createPlaceholderSyllables('Oṃ gaṇānāṃ tvā gaṇapatiṃ havāmahe kaviṃ kavīnāmupamaśravastamam jyeṣṭharājaṃ brahmaṇāṃ brahmaṇaspata ā naḥ śṛṇvannūtibhissīda sādanam mahāgaṇapataye namaḥ'),
    transliteration: 'Oṃ gaṇānāṃ tvā gaṇapatiṃ havāmahe kaviṃ kavīnāmupamaśravastamam jyeṣṭharājaṃ brahmaṇāṃ brahmaṇaspata ā naḥ śṛṇvannūtibhissīda sādanam mahāgaṇapataye namaḥ',
  },
  {
    id: 'sham-no-mitrah',
    name: 'Sham No Mitrah',
    audioSrc: '/audio/shannomitra.mp3',
    defaultSyllables: createPlaceholderSyllables('Oṃ śaṃ no mitraḥ śaṃ varuṇaḥ śaṃ no bhavatvaryamā śaṃ na indro bṛhaspatiḥ śaṃ no viṣṇururukramaḥ namo brahmaṇe namaste vāyo tvameva pratyakṣaṃ brahmāsi oṃ śāntiḥ śāntiḥ śāntiḥ'),
    transliteration: 'Oṃ śaṃ no mitraḥ śaṃ varuṇaḥ śaṃ no bhavatvaryamā śaṃ na indro bṛhaspatiḥ śaṃ no viṣṇururukramaḥ namo brahmaṇe namaste vāyo tvameva pratyakṣaṃ brahmāsi oṃ śāntiḥ śāntiḥ śāntiḥ',
  },
  {
    id: 'bhadram-karnebhih',
    name: 'Bhadram Karnebhih',
    audioSrc: '/audio/bhadramkarNebhi.mp3',
    defaultSyllables: createPlaceholderSyllables('Oṃ bhadraṃ karṇebhiḥ śṛṇuyāma devāḥ bhadraṃ paśyemākṣabhiryajatrāḥ sthirairaṅgaistuṣṭuvāṃsastanūbhiḥ vyaśema devahitaṃ yadāyuḥ svasti na indro vṛddhaśravāḥ oṃ śāntiḥ śāntiḥ śāntiḥ'),
    transliteration: 'Oṃ bhadraṃ karṇebhiḥ śṛṇuyāma devāḥ bhadraṃ paśyemākṣabhiryajatrāḥ sthirairaṅgaistuṣṭuvāṃsastanūbhiḥ vyaśema devahitaṃ yadāyuḥ svasti na indro vṛddhaśravāḥ oṃ śāntiḥ śāntiḥ śāntiḥ',
  },
  {
    id: 'namo-brahmane',
    name: 'Namo Brahmane',
    audioSrc: '/audio/namobrahmaNe.mp3',
    defaultSyllables: createPlaceholderSyllables('Oṃ namo brahmaṇe namo astvagnaye namaḥ pṛthivyai nama oṣadhībhyaḥ namo vāce namo vācaspataye namo viṣṇave bṛhate karomi oṃ śāntiḥ śāntiḥ śāntiḥ'),
    transliteration: 'Oṃ namo brahmaṇe namo astvagnaye namaḥ pṛthivyai nama oṣadhībhyaḥ namo vāce namo vācaspataye namo viṣṇave bṛhate karomi oṃ śāntiḥ śāntiḥ śāntiḥ',
  },
  {
    id: 'yaschandasam',
    name: 'Yaschandasam',
    audioSrc: '/audio/yashcchandasAm.mp3',
    defaultSyllables: createPlaceholderSyllables('Oṃ yaśchandasāmṛṣabho viśvarūpaḥ chandobhyo adhyamṛtāthsambabhūva sa mendro medhayā spṛṇotu amṛtasya deva dhāraṇo bhūyāsam oṃ śāntiḥ śāntiḥ śāntiḥ'),
    transliteration: 'Oṃ yaśchandasāmṛṣabho viśvarūpaḥ chandobhyo adhyamṛtāthsambabhūva sa mendro medhayā spṛṇotu amṛtasya deva dhāraṇo bhūyāsam oṃ śāntiḥ śāntiḥ śāntiḥ',
  },
  {
    id: 'vang-me-manasi',
    name: 'Vang Me Manasi',
    audioSrc: '/audio/vAngmemanasi.MP3',
    defaultSyllables: createPlaceholderSyllables('Oṃ vāṅ me manasi pratiṣṭhitā mano me vāci pratiṣṭhitam āvirāvīrma edhi vedasya ma āṇīsthaḥ śrutaṃ me mā prahāsīḥ oṃ śāntiḥ śāntiḥ śāntiḥ'),
    transliteration: 'Oṃ vāṅ me manasi pratiṣṭhitā mano me vāci pratiṣṭhitam āvirāvīrma edhi vedasya ma āṇīsthaḥ śrutaṃ me mā prahāsīḥ oṃ śāntiḥ śāntiḥ śāntiḥ',
  },
  {
    id: 'durga-suktam',
    name: 'Durga Suktam',
    audioSrc: '/audio/durgAsUktam.mp3',
    defaultSyllables: createPlaceholderSyllables('Oṃ jātavedase sunavāma somam arātīyato nidahāti vedaḥ sa naḥ parṣadati durgāṇi viśvā nāveva sindhuṃ duritātyagniḥ'),
    transliteration: 'Oṃ jātavedase sunavāma somam arātīyato nidahāti vedaḥ sa naḥ parṣadati durgāṇi viśvā nāveva sindhuṃ duritātyagniḥ',
  },
];

const MantraAdminPage: React.FC = () => {
  const [selectedMantraId, setSelectedMantraId] = useState<string>('gayatri');
  const [syllables, setSyllables] = useState<TimedSyllable[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const highlightIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedMantra = availableMantras.find(m => m.id === selectedMantraId)!;

  // Load mantra data when selection changes
  useEffect(() => {
    const saved = getMantraConfig(selectedMantraId);
    if (saved) {
      setSyllables(saved.syllables);
      setIsConfirmed(saved.confirmed);
    } else {
      // Use default syllables
      setSyllables(selectedMantra.defaultSyllables.map(s => ({ ...s, svara: s.svara || 'neutral' })));
      setIsConfirmed(false);
    }
    // Reset audio state
    setCurrentTime(0);
    setActiveIndex(-1);
    setIsPlaying(false);
  }, [selectedMantraId, selectedMantra.defaultSyllables]);

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

  // Save configuration
  const handleSave = async () => {
    // Extract transliteration syllables from the timed syllables
    const transliterationSyllables = syllables.map(s => s.text);

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

  // Confirm configuration
  const handleConfirm = async () => {
    setIsConfirmed(true);
    // Extract transliteration syllables from the timed syllables
    const transliterationSyllables = syllables.map(s => s.text);

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-heading font-bold mb-6">Mantra Configuration Admin</h1>

        {/* Top Controls */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Select Mantra</span>
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
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedMantraId} onValueChange={setSelectedMantraId}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableMantras.map(m => (
                  <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                      {syl.text}
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
                <Button size="sm" onClick={handleConfirm} className="bg-green-600 hover:bg-green-700">
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
              {syllables.map((syl, idx) => (
                <div
                  key={idx}
                  className={`
                    flex items-center gap-4 p-3 rounded-lg border
                    ${idx === activeIndex ? 'bg-indian-saffron/10 border-indian-saffron' : 'bg-white border-gray-200'}
                  `}
                >
                  <span className="w-8 text-gray-400 text-sm">#{idx + 1}</span>
                  <span className="w-16 text-xl font-mono">{syl.text}</span>

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
              ))}
            </div>
          </CardContent>
        </Card>

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
  );
};

export default MantraAdminPage;

