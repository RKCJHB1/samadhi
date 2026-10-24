import { useCallback, useEffect, useRef, useState } from 'react';

const MAX_RECORDING_MS = 90_000;
const VIDEO_LONG_SIDE = 1280;

export type ChantVideoPhase = 'idle' | 'starting' | 'recording' | 'ready';

export type ChantVideoFrame = {
  chantName: string;
  symbol: string;
  imageSrc?: string;
  audioSrc?: string;
  imageScale?: number;
};

export function formatRecordingTime(ms: number): string {
  const totalSeconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function preferredVideoMime(): string {
  if (typeof MediaRecorder === 'undefined' || typeof MediaRecorder.isTypeSupported !== 'function') {
    return '';
  }
  const candidates = [
    'video/mp4;codecs=avc1.42E01E,mp4a.40.2',
    'video/mp4',
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm',
  ];
  return candidates.find((type) => MediaRecorder.isTypeSupported(type)) ?? '';
}

function extensionForMime(mimeType: string): string {
  return mimeType.includes('mp4') ? 'mp4' : 'webm';
}

function errorName(error: unknown): string {
  if (error instanceof DOMException) return error.name;
  if (error && typeof error === 'object' && 'name' in error && typeof (error as { name: unknown }).name === 'string') {
    return (error as { name: string }).name;
  }
  return '';
}

const CANVAS_FONT = '"Nirmala UI", "Segoe UI", sans-serif';
const NO_CAMERA_NOTICE = 'No camera was found, so this video shows the chant. Allow the camera for this site and record again to include your picture.';

function isPermissionError(error: unknown): boolean {
  const name = errorName(error);
  return name === 'NotAllowedError' || name === 'PermissionDeniedError' || name === 'SecurityError';
}

function isBusyCamera(error: unknown): boolean {
  const name = errorName(error);
  return name === 'NotReadableError' || name === 'TrackStartError' || name === 'AbortError';
}

function createAudioContext(): AudioContext | null {
  const Ctx = window.AudioContext
    ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  try {
    return new Ctx();
  } catch {
    return null;
  }
}

async function loadChantBuffer(src: string, context: AudioContext): Promise<AudioBuffer | null> {
  try {
    const response = await fetch(src);
    if (!response.ok) return null;
    const bytes = await response.arrayBuffer();
    return await context.decodeAudioData(bytes.slice(0));
  } catch {
    return null;
  }
}

function drawCover(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
  zoom: number,
) {
  const sourceWidth = image.naturalWidth || image.width;
  const sourceHeight = image.naturalHeight || image.height;
  if (!sourceWidth || !sourceHeight) return;
  const scale = Math.max(width / sourceWidth, height / sourceHeight) * Math.max(1, zoom);
  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale;
  context.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
}

function recordingErrorMessage(error: unknown): string {
  const name = errorName(error);
  if (name === 'NotAllowedError' || name === 'PermissionDeniedError' || name === 'SecurityError') {
    return 'Camera access is blocked. Allow the camera for this site in the browser, then try again.';
  }
  if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
    return 'No camera was found. On a phone, allow camera access. On a computer, connect a webcam and allow it in the browser.';
  }
  if (name === 'NotReadableError' || name === 'TrackStartError' || name === 'AbortError') {
    return 'The camera is already in use by another app.';
  }
  return 'Could not record a video in this browser.';
}

async function attemptCamera(constraints: MediaStreamConstraints): Promise<MediaStream | 'busy' | 'missing'> {
  try {
    return await navigator.mediaDevices.getUserMedia(constraints);
  } catch (error) {
    if (isPermissionError(error)) throw error;
    if (isBusyCamera(error)) return 'busy';
    return 'missing';
  }
}

// A bare facingMode value is an exact match and rejects many desktop webcams.
// ideal prefers the front camera on a phone and still accepts any webcam.
// Chrome uses NotFoundError both when no camera is attached and when the
// operating system is hiding it. Callers record a chant card in that case.
async function openCamera(): Promise<MediaStream | null> {
  if (!navigator.mediaDevices?.getUserMedia) return null;

  const attempts: MediaStreamConstraints[] = [
    {
      video: {
        facingMode: { ideal: 'user' },
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
      audio: true,
    },
    { video: true, audio: true },
    { video: true, audio: false },
  ];

  let sawBusy = false;
  for (const constraints of attempts) {
    const result = await attemptCamera(constraints);
    if (result === 'busy') {
      sawBusy = true;
      continue;
    }
    if (result !== 'missing') return result;
  }

  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    for (const device of devices) {
      if (device.kind !== 'videoinput' || !device.deviceId) continue;
      const result = await attemptCamera({
        video: { deviceId: { exact: device.deviceId } },
        audio: false,
      });
      if (result === 'busy') {
        sawBusy = true;
        continue;
      }
      if (result !== 'missing') return result;
    }
  } catch (error) {
    if (isPermissionError(error)) throw error;
  }

  if (sawBusy) {
    throw new DOMException('The camera is already in use.', 'NotReadableError');
  }
  return null;
}

function evenSize(value: number): number {
  const even = Math.max(2, Math.round(value));
  return even - (even % 2);
}

export function useChantVideo() {
  const [phase, setPhase] = useState<ChantVideoPhase>('idle');
  const [elapsedMs, setElapsedMs] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState('aum-chant.webm');
  const [sessionCount, setSessionCount] = useState(0);
  const [canShare, setCanShare] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const phaseRef = useRef<ChantVideoPhase>('idle');
  const runRef = useRef(0);
  const frameRef = useRef<ChantVideoFrame>({
    chantName: 'Om',
    symbol: 'ॐ',
    imageSrc: '/om.jpg',
    audioSrc: '/aum.mp3',
    imageScale: 1,
  });
  const sessionCountRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const playbackUrlRef = useRef<string | null>(null);
  const blobRef = useRef<Blob | null>(null);
  const rafRef = useRef(0);
  const drawingRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const maxTimerRef = useRef<number | null>(null);
  const sourceVideoRef = useRef<HTMLVideoElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const chantDestRef = useRef<MediaStreamAudioDestinationNode | null>(null);
  const chantBufferRef = useRef<AudioBuffer | null>(null);
  const chantSourcesRef = useRef<AudioBufferSourceNode[]>([]);

  phaseRef.current = phase;

  const clearTimers = useCallback(() => {
    if (timerRef.current != null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (maxTimerRef.current != null) {
      window.clearTimeout(maxTimerRef.current);
      maxTimerRef.current = null;
    }
  }, []);

  const closeChantAudio = useCallback(() => {
    chantSourcesRef.current.forEach((source) => {
      try {
        source.stop();
      } catch {
        // The source already finished.
      }
    });
    chantSourcesRef.current = [];
    chantBufferRef.current = null;
    chantDestRef.current = null;
    const context = audioContextRef.current;
    audioContextRef.current = null;
    if (context && context.state !== 'closed') {
      void context.close();
    }
  }, []);

  const stopTracks = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    const sourceVideo = sourceVideoRef.current;
    if (sourceVideo) {
      sourceVideo.pause();
      sourceVideo.srcObject = null;
      sourceVideoRef.current = null;
    }
    closeChantAudio();
  }, [closeChantAudio]);

  const releasePlayback = useCallback(() => {
    if (playbackUrlRef.current) {
      URL.revokeObjectURL(playbackUrlRef.current);
      playbackUrlRef.current = null;
    }
    blobRef.current = null;
    setVideoUrl(null);
    setCanShare(false);
  }, []);

  const stopRecording = useCallback(() => {
    drawingRef.current = false;
    clearTimers();
    cancelAnimationFrame(rafRef.current);
    const recorder = recorderRef.current;
    if (recorder && recorder.state !== 'inactive') {
      recorder.stop();
      return;
    }
    runRef.current += 1;
    stopTracks();
    if (phaseRef.current === 'recording' || phaseRef.current === 'starting') {
      setPhase('idle');
    }
  }, [clearTimers, stopTracks]);

  const discardVideo = useCallback(() => {
    runRef.current += 1;
    drawingRef.current = false;
    clearTimers();
    cancelAnimationFrame(rafRef.current);
    const recorder = recorderRef.current;
    recorderRef.current = null;
    if (recorder && recorder.state !== 'inactive') {
      recorder.onstop = null;
      recorder.stop();
    }
    stopTracks();
    releasePlayback();
    sessionCountRef.current = 0;
    setSessionCount(0);
    setElapsedMs(0);
    setError(null);
    setNotice(null);
    setPhase('idle');
  }, [clearTimers, releasePlayback, stopTracks]);

  const syncFrame = useCallback((frame: ChantVideoFrame) => {
    frameRef.current = frame;
  }, []);

  const noteChant = useCallback(() => {
    if (phaseRef.current !== 'recording') return;
    sessionCountRef.current += 1;
    const context = audioContextRef.current;
    const destination = chantDestRef.current;
    const buffer = chantBufferRef.current;
    if (!context || !destination || !buffer) return;
    if (context.state === 'suspended') void context.resume();
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(destination);
    source.onended = () => {
      chantSourcesRef.current = chantSourcesRef.current.filter((item) => item !== source);
    };
    chantSourcesRef.current.push(source);
    try {
      source.start();
    } catch {
      // The context closed between the tap and playback.
    }
  }, []);

  const setCanvasNode = useCallback((node: HTMLCanvasElement | null) => {
    canvasRef.current = node;
  }, []);

  const startRecording = useCallback(async () => {
    if (phaseRef.current === 'recording' || phaseRef.current === 'starting') return;
    setError(null);
    setNotice(null);
    releasePlayback();
    sessionCountRef.current = 0;
    setSessionCount(0);
    setElapsedMs(0);

    if (typeof MediaRecorder === 'undefined' || typeof HTMLCanvasElement === 'undefined') {
      setError('This browser cannot record a video.');
      return;
    }

    const runId = ++runRef.current;
    setPhase('starting');
    // Resume during the click. A later await drops the browser's user-activation.
    const audioContext = createAudioContext();
    if (audioContext) {
      audioContextRef.current = audioContext;
      void audioContext.resume();
    }
    const abandon = (stream: MediaStream | null) => {
      stream?.getTracks().forEach((track) => track.stop());
      if (!audioContext) return;
      if (audioContextRef.current === audioContext) {
        closeChantAudio();
      } else if (audioContext.state !== 'closed') {
        void audioContext.close();
      }
    };

    try {
      const stream = await openCamera();
      if (runId !== runRef.current) {
        abandon(stream);
        return;
      }

      let sourceVideo: HTMLVideoElement | null = null;
      if (stream) {
        abandon(null);
        streamRef.current = stream;
        setNotice(null);
      } else {
        setNotice(NO_CAMERA_NOTICE);
        if (audioContextRef.current) {
          chantDestRef.current = audioContextRef.current.createMediaStreamDestination();
          const src = frameRef.current.audioSrc;
          if (src) {
            void loadChantBuffer(src, audioContextRef.current).then((buffer) => {
              if (runId === runRef.current) chantBufferRef.current = buffer;
            });
          }
        }
      }

      setPhase('recording');

      const canvas = await new Promise<HTMLCanvasElement>((resolve, reject) => {
        const startedAt = performance.now();
        const check = () => {
          if (runId !== runRef.current) {
            reject(new Error('cancelled'));
            return;
          }
          if (canvasRef.current) {
            resolve(canvasRef.current);
            return;
          }
          if (performance.now() - startedAt > 3000) {
            reject(new Error('canvas-timeout'));
            return;
          }
          requestAnimationFrame(check);
        };
        check();
      });

      if (stream) {
        sourceVideo = document.createElement('video');
        sourceVideo.muted = true;
        sourceVideo.playsInline = true;
        sourceVideo.srcObject = stream;
        sourceVideoRef.current = sourceVideo;
        await sourceVideo.play();
        if (runId !== runRef.current) {
          abandon(stream);
          return;
        }
        if (!sourceVideo.videoWidth) {
          await new Promise<void>((resolve) => {
            const onReady = () => resolve();
            sourceVideo.addEventListener('loadeddata', onReady, { once: true });
            window.setTimeout(onReady, 1000);
          });
        }
        if (runId !== runRef.current) {
          abandon(stream);
          return;
        }
        const sourceWidth = sourceVideo.videoWidth || 720;
        const sourceHeight = sourceVideo.videoHeight || 1280;
        const scale = Math.min(1, VIDEO_LONG_SIDE / Math.max(sourceWidth, sourceHeight));
        canvas.width = evenSize(sourceWidth * scale);
        canvas.height = evenSize(sourceHeight * scale);
      } else {
        canvas.width = 720;
        canvas.height = 1280;
      }

      const context = canvas.getContext('2d');
      if (!context || typeof canvas.captureStream !== 'function') {
        throw new Error('unsupported');
      }

      const facingMode = stream?.getVideoTracks()[0]?.getSettings().facingMode;
      const mirror = facingMode !== 'environment';
      const startedAt = performance.now();
      drawingRef.current = true;
      let loadedSrc = '';
      let art: HTMLImageElement | null = null;
      let artReady = false;
      let seenCount = 0;
      let pulseUntil = 0;

      const ensureArt = () => {
        const src = frameRef.current.imageSrc || '';
        if (src === loadedSrc) return;
        loadedSrc = src;
        artReady = false;
        art = null;
        if (!src) return;
        const image = new Image();
        image.onload = () => {
          if (loadedSrc === src) artReady = true;
        };
        image.src = src;
        art = image;
      };

      const drawCamera = (video: HTMLVideoElement) => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        if (mirror) {
          context.translate(canvas.width, 0);
          context.scale(-1, 1);
        }
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        context.restore();

        const scrim = context.createLinearGradient(0, canvas.height * 0.62, 0, canvas.height);
        scrim.addColorStop(0, 'rgba(0,0,0,0)');
        scrim.addColorStop(1, 'rgba(0,0,0,0.72)');
        context.fillStyle = scrim;
        context.fillRect(0, canvas.height * 0.58, canvas.width, canvas.height * 0.42);

        const chantName = frameRef.current.chantName || 'Om';
        const chants = sessionCountRef.current;
        const shortSide = Math.min(canvas.width, canvas.height);
        const titleSize = Math.max(16, Math.round(shortSide * 0.055));
        const nameSize = Math.max(20, Math.round(shortSide * 0.07));
        const countSize = Math.max(32, Math.round(shortSide * 0.14));
        const labelSize = Math.max(14, Math.round(shortSide * 0.04));
        const labelY = canvas.height - Math.round(shortSide * 0.07);
        const countY = labelY - labelSize - Math.round(shortSide * 0.02);
        const nameY = countY - Math.round(countSize * 0.92);
        context.save();
        context.textAlign = 'center';
        context.textBaseline = 'alphabetic';
        context.shadowColor = 'rgba(0,0,0,0.7)';
        context.shadowBlur = 12;
        context.shadowOffsetY = 2;
        context.fillStyle = 'rgba(251, 191, 36, 0.95)';
        context.font = `600 ${titleSize}px ${CANVAS_FONT}`;
        context.fillText('AUM CHANTER', canvas.width / 2, Math.round(shortSide * 0.12));
        context.fillStyle = '#fff7ed';
        context.font = `600 ${nameSize}px ${CANVAS_FONT}`;
        context.fillText(chantName, canvas.width / 2, nameY);
        context.fillStyle = '#ffffff';
        context.font = `700 ${countSize}px ${CANVAS_FONT}`;
        context.fillText(chants.toLocaleString(), canvas.width / 2, countY);
        context.font = `500 ${labelSize}px ${CANVAS_FONT}`;
        context.fillStyle = 'rgba(255,247,237,0.88)';
        context.fillText(chants === 1 ? 'chant' : 'chants', canvas.width / 2, labelY);
        context.restore();
      };

      const drawCard = () => {
        const chants = sessionCountRef.current;
        if (chants !== seenCount) {
          seenCount = chants;
          pulseUntil = performance.now() + 700;
        }
        ensureArt();
        const width = canvas.width;
        const height = canvas.height;
        const cx = width / 2;
        const cy = height * 0.4;
        const radius = Math.round(Math.min(width, height) * 0.3);
        const breathe = 0.5 + 0.5 * Math.sin(performance.now() / 700);

        context.clearRect(0, 0, width, height);
        context.fillStyle = '#140e08';
        context.fillRect(0, 0, width, height);
        const glow = context.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 2.4);
        glow.addColorStop(0, `rgba(217, 119, 6, ${0.35 + breathe * 0.25})`);
        glow.addColorStop(1, 'rgba(20, 14, 8, 0)');
        context.fillStyle = glow;
        context.fillRect(0, 0, width, height);

        context.save();
        context.beginPath();
        context.arc(cx, cy, radius, 0, Math.PI * 2);
        context.clip();
        if (art && artReady) {
          drawCover(context, art, cx - radius, cy - radius, radius * 2, radius * 2, frameRef.current.imageScale || 1);
        } else {
          const disc = context.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius);
          disc.addColorStop(0, '#fde68a');
          disc.addColorStop(0.55, '#fdba74');
          disc.addColorStop(1, '#fda4af');
          context.fillStyle = disc;
          context.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
          const symbol = frameRef.current.symbol || 'ॐ';
          let symbolSize = Math.round(radius * 0.72);
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillStyle = '#431407';
          context.font = `600 ${symbolSize}px ${CANVAS_FONT}`;
          while (symbolSize > 32 && context.measureText(symbol).width > radius * 1.5) {
            symbolSize -= 4;
            context.font = `600 ${symbolSize}px ${CANVAS_FONT}`;
          }
          context.fillText(symbol, cx, cy);
        }
        context.restore();

        context.beginPath();
        context.arc(cx, cy, radius + 8, 0, Math.PI * 2);
        context.strokeStyle = `rgba(251, 191, 36, ${0.35 + breathe * 0.45})`;
        context.lineWidth = 8;
        context.stroke();
        if (performance.now() < pulseUntil) {
          const progress = 1 - (pulseUntil - performance.now()) / 700;
          context.beginPath();
          context.arc(cx, cy, radius * (1 + progress * 0.28), 0, Math.PI * 2);
          context.strokeStyle = `rgba(253, 224, 71, ${1 - progress})`;
          context.lineWidth = 6;
          context.stroke();
        }

        const chantName = frameRef.current.chantName || 'Om';
        context.save();
        context.textAlign = 'center';
        context.textBaseline = 'alphabetic';
        context.shadowColor = 'rgba(0,0,0,0.7)';
        context.shadowBlur = 12;
        context.shadowOffsetY = 2;
        context.fillStyle = 'rgba(251, 191, 36, 0.95)';
        context.font = `600 36px ${CANVAS_FONT}`;
        context.fillText('AUM CHANTER', cx, 120);
        let nameSize = 54;
        context.font = `600 ${nameSize}px ${CANVAS_FONT}`;
        while (nameSize > 24 && context.measureText(chantName).width > width - 80) {
          nameSize -= 2;
          context.font = `600 ${nameSize}px ${CANVAS_FONT}`;
        }
        context.fillStyle = '#fff7ed';
        context.fillText(chantName, cx, cy + radius + 110);
        context.fillStyle = '#ffffff';
        context.font = `700 120px ${CANVAS_FONT}`;
        context.fillText(chants.toLocaleString(), cx, cy + radius + 250);
        context.font = `500 32px ${CANVAS_FONT}`;
        context.fillStyle = 'rgba(255,247,237,0.88)';
        context.fillText(chants === 1 ? 'chant' : 'chants', cx, cy + radius + 310);
        context.restore();
      };

      const draw = () => {
        if (!drawingRef.current || runId !== runRef.current) return;
        if (sourceVideo) drawCamera(sourceVideo);
        else drawCard();
        rafRef.current = requestAnimationFrame(draw);
      };
      draw();

      const mimeType = preferredVideoMime();
      const canvasStream = canvas.captureStream(30);
      const audioTracks = stream
        ? stream.getAudioTracks()
        : chantDestRef.current?.stream.getAudioTracks() ?? [];
      const mixed = new MediaStream([
        ...canvasStream.getVideoTracks(),
        ...audioTracks,
      ]);

      let recorder: MediaRecorder;
      try {
        recorder = new MediaRecorder(mixed, mimeType ? { mimeType, videoBitsPerSecond: 2_000_000 } : undefined);
      } catch {
        recorder = new MediaRecorder(new MediaStream(canvasStream.getVideoTracks()), mimeType ? { mimeType } : undefined);
      }

      const chunks: Blob[] = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data);
      };
      recorder.onstop = () => {
        drawingRef.current = false;
        clearTimers();
        cancelAnimationFrame(rafRef.current);
        stopTracks();
        recorderRef.current = null;
        if (runId !== runRef.current) return;
        const blobType = recorder.mimeType || mimeType || 'video/webm';
        const blob = new Blob(chunks, { type: blobType });
        if (blob.size < 1000) {
          setNotice(null);
          setError('That video was too short to save. Record a little longer.');
          setPhase('idle');
          return;
        }
        const url = URL.createObjectURL(blob);
        const safeName = (frameRef.current.chantName || 'chant').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'chant';
        const name = `${safeName}-${new Date().toISOString().slice(0, 10)}.${extensionForMime(blobType)}`;
        playbackUrlRef.current = url;
        blobRef.current = blob;
        setFileName(name);
        setVideoUrl(url);
        setSessionCount(sessionCountRef.current);
        const file = new File([blob], name, { type: blobType });
        let shareable = false;
        try {
          shareable = !!navigator.canShare?.({ files: [file] });
        } catch {
          shareable = false;
        }
        setCanShare(shareable);
        setPhase('ready');
      };

      if (audioContextRef.current?.state === 'suspended') {
        void audioContextRef.current.resume();
      }
      recorderRef.current = recorder;
      recorder.start(250);
      timerRef.current = window.setInterval(() => {
        setElapsedMs(Math.min(MAX_RECORDING_MS, performance.now() - startedAt));
      }, 200);
      maxTimerRef.current = window.setTimeout(() => {
        if (runId !== runRef.current) return;
        stopRecording();
      }, MAX_RECORDING_MS);
    } catch (startError) {
      if (runId !== runRef.current) return;
      drawingRef.current = false;
      clearTimers();
      cancelAnimationFrame(rafRef.current);
      stopTracks();
      const message = startError instanceof Error && startError.message === 'cancelled'
        ? null
        : startError instanceof Error && startError.message === 'canvas-timeout'
          ? 'Could not open the video preview.'
          : recordingErrorMessage(startError);
      setNotice(null);
      setPhase('idle');
      if (message) setError(message);
    }
  }, [clearTimers, closeChantAudio, releasePlayback, stopRecording, stopTracks]);

  const downloadVideo = useCallback(() => {
    if (!playbackUrlRef.current) return;
    const anchor = document.createElement('a');
    anchor.href = playbackUrlRef.current;
    anchor.download = fileName;
    anchor.click();
  }, [fileName]);

  const shareVideo = useCallback(async () => {
    const blob = blobRef.current;
    if (!blob) return;
    const file = new File([blob], fileName, { type: blob.type || 'video/webm' });
    try {
      if (!navigator.canShare?.({ files: [file] })) {
        downloadVideo();
        return;
      }
      await navigator.share({
        files: [file],
        title: `${frameRef.current.chantName} chant`,
      });
    } catch (shareError) {
      if (shareError instanceof DOMException && shareError.name === 'AbortError') return;
      setError('Could not open sharing. Download the video instead.');
    }
  }, [downloadVideo, fileName]);

  useEffect(() => {
    return () => {
      runRef.current += 1;
      drawingRef.current = false;
      clearTimers();
      cancelAnimationFrame(rafRef.current);
      const recorder = recorderRef.current;
      if (recorder && recorder.state !== 'inactive') {
        recorder.onstop = null;
        recorder.stop();
      }
      stopTracks();
      if (playbackUrlRef.current) URL.revokeObjectURL(playbackUrlRef.current);
    };
  }, [clearTimers, stopTracks]);

  return {
    phase,
    elapsedMs,
    error,
    videoUrl,
    fileName,
    sessionCount,
    canShare,
    notice,
    maxRecordingMs: MAX_RECORDING_MS,
    setCanvasNode,
    syncFrame,
    noteChant,
    startRecording,
    stopRecording,
    discardVideo,
    downloadVideo,
    shareVideo,
  };
}
