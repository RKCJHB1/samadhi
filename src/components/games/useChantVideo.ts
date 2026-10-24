import { useCallback, useEffect, useRef, useState } from 'react';

const MAX_RECORDING_MS = 90_000;
const VIDEO_LONG_SIDE = 1280;

export type ChantVideoPhase = 'idle' | 'starting' | 'recording' | 'ready';

export type ChantVideoFrame = {
  chantName: string;
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

function isPermissionError(error: unknown): boolean {
  const name = errorName(error);
  return name === 'NotAllowedError' || name === 'PermissionDeniedError' || name === 'SecurityError';
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

async function openCamera(): Promise<MediaStream> {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error('unsupported');
  }

  // A bare facingMode value is an exact match and rejects many desktop webcams.
  // ideal prefers the front camera on a phone and still accepts any webcam.
  const preferredVideo: MediaTrackConstraints = {
    facingMode: { ideal: 'user' },
    width: { ideal: 1280 },
    height: { ideal: 720 },
  };

  try {
    return await navigator.mediaDevices.getUserMedia({ video: preferredVideo, audio: true });
  } catch (error) {
    if (isPermissionError(error)) throw error;
  }

  try {
    return await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  } catch (error) {
    if (isPermissionError(error)) throw error;
  }

  return navigator.mediaDevices.getUserMedia({ video: true, audio: false });
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

  const phaseRef = useRef<ChantVideoPhase>('idle');
  const runRef = useRef(0);
  const frameRef = useRef<ChantVideoFrame>({ chantName: 'Om' });
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

  const stopTracks = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    const sourceVideo = sourceVideoRef.current;
    if (sourceVideo) {
      sourceVideo.pause();
      sourceVideo.srcObject = null;
      sourceVideoRef.current = null;
    }
  }, []);

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
    setPhase('idle');
  }, [clearTimers, releasePlayback, stopTracks]);

  const syncFrame = useCallback((frame: ChantVideoFrame) => {
    frameRef.current = frame;
  }, []);

  const noteChant = useCallback(() => {
    if (phaseRef.current !== 'recording') return;
    sessionCountRef.current += 1;
  }, []);

  const setCanvasNode = useCallback((node: HTMLCanvasElement | null) => {
    canvasRef.current = node;
  }, []);

  const startRecording = useCallback(async () => {
    if (phaseRef.current === 'recording' || phaseRef.current === 'starting') return;
    setError(null);
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
    try {
      const stream = await openCamera();
      if (runId !== runRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      streamRef.current = stream;
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

      const sourceVideo = document.createElement('video');
      sourceVideo.muted = true;
      sourceVideo.playsInline = true;
      sourceVideo.srcObject = stream;
      sourceVideoRef.current = sourceVideo;
      await sourceVideo.play();
      if (runId !== runRef.current) {
        stream.getTracks().forEach((track) => track.stop());
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
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      const sourceWidth = sourceVideo.videoWidth || 720;
      const sourceHeight = sourceVideo.videoHeight || 1280;
      const scale = Math.min(1, VIDEO_LONG_SIDE / Math.max(sourceWidth, sourceHeight));
      canvas.width = evenSize(sourceWidth * scale);
      canvas.height = evenSize(sourceHeight * scale);
      const context = canvas.getContext('2d');
      if (!context || typeof canvas.captureStream !== 'function') {
        throw new Error('unsupported');
      }

      const facingMode = stream.getVideoTracks()[0]?.getSettings().facingMode;
      const mirror = facingMode !== 'environment';
      const startedAt = performance.now();
      drawingRef.current = true;

      const draw = () => {
        if (!drawingRef.current || runId !== runRef.current) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        if (mirror) {
          context.translate(canvas.width, 0);
          context.scale(-1, 1);
        }
        context.drawImage(sourceVideo, 0, 0, canvas.width, canvas.height);
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
        context.shadowColor = 'rgba(0,0,0,0.7)';
        context.shadowBlur = 12;
        context.shadowOffsetY = 2;
        context.fillStyle = 'rgba(251, 191, 36, 0.95)';
        context.font = `600 ${titleSize}px sans-serif`;
        context.fillText('AUM CHANTER', canvas.width / 2, Math.round(shortSide * 0.12));
        context.fillStyle = '#fff7ed';
        context.font = `600 ${nameSize}px sans-serif`;
        context.fillText(chantName, canvas.width / 2, nameY);
        context.fillStyle = '#ffffff';
        context.font = `700 ${countSize}px sans-serif`;
        context.fillText(chants.toLocaleString(), canvas.width / 2, countY);
        context.font = `500 ${labelSize}px sans-serif`;
        context.fillStyle = 'rgba(255,247,237,0.88)';
        context.fillText(chants === 1 ? 'chant' : 'chants', canvas.width / 2, labelY);
        context.restore();

        rafRef.current = requestAnimationFrame(draw);
      };
      draw();

      const mimeType = preferredVideoMime();
      const canvasStream = canvas.captureStream(30);
      const mixed = new MediaStream([
        ...canvasStream.getVideoTracks(),
        ...stream.getAudioTracks(),
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
      clearTimers();
      cancelAnimationFrame(rafRef.current);
      stopTracks();
      const message = startError instanceof Error && startError.message === 'cancelled'
        ? null
        : startError instanceof Error && startError.message === 'canvas-timeout'
          ? 'Could not open the video preview.'
          : recordingErrorMessage(startError);
      setPhase('idle');
      if (message) setError(message);
    }
  }, [clearTimers, releasePlayback, stopRecording, stopTracks]);

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
