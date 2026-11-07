import { useCallback, useEffect, useRef, useState } from 'react';
import { CHANT_APP_NAME, groupChantGoal } from '../../services/chantGroupService';

const MAX_RECORDING_MS = 90_000;
const VIDEO_LONG_SIDE = 1280;
const END_CARD_MS = 2500;
const TANPURA_SRC = '/tanpura.mp3';
const TANPURA_GAIN = 0.2;
const VIDEO_CHANT_LIMITS = [11, 21, 108];

export type ChantVideoPhase = 'idle' | 'starting' | 'recording' | 'preparing' | 'ready';

export type ChantVideoFrame = {
  chantName: string;
  symbol: string;
  imageSrc?: string;
  audioSrc?: string;
  imageScale?: number;
  personName?: string;
  globalChants?: number;
  groupTitle?: string;
  groupTotal?: number;
  groupChantTotal?: number;
  personTotal?: number;
  shareText?: string;
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

function shareableVideoType(mimeType: string): string {
  const base = mimeType.split(';')[0]?.trim().toLowerCase() ?? '';
  if (base === 'video/mp4' || base === 'video/webm' || base === 'video/ogg' || base === 'video/mpeg') return base;
  return mimeType.toLowerCase().includes('mp4') ? 'video/mp4' : 'video/webm';
}

// WhatsApp Desktop shows a thumbnail and then refuses the message unless the clip is
// Constrained Baseline H.264 at a steady 30 frames a second, with limited-range color
// and stereo AAC in a fast-start MP4. A downloaded copy can still play. The bytes below
// correct the flags and color, then time every frame at exactly 1/30 second.
const WHATSAPP_VIDEO_ATTEMPTS = [
  {
    codec: 'avc' as const,
    fullCodecString: 'avc1.42001F',
    hardwareAcceleration: 'prefer-hardware' as const,
    latencyMode: 'quality' as const,
  },
  {
    codec: 'avc' as const,
    fullCodecString: 'avc1.42E01F',
    hardwareAcceleration: 'prefer-software' as const,
    latencyMode: 'quality' as const,
  },
];

function whatsAppBrands(file: ArrayBuffer): ArrayBuffer {
  const bytes = new Uint8Array(file);
  if (bytes.length >= 28 && String.fromCharCode(bytes[4], bytes[5], bytes[6], bytes[7]) === 'ftyp') {
    bytes.set([0x6d, 0x70, 0x34, 0x32], 8);
    bytes.set([0x00, 0x00, 0x00, 0x00], 12);
    bytes.set([0x6d, 0x70, 0x34, 0x32, 0x69, 0x73, 0x6f, 0x6d, 0x6d, 0x70, 0x34, 0x31], 16);
  }
  for (let i = 0; i + 16 < bytes.length; i += 1) {
    if (bytes[i] !== 0x61 || bytes[i + 1] !== 0x76 || bytes[i + 2] !== 0x63 || bytes[i + 3] !== 0x43) continue;
    if (bytes[i + 5] === 66) bytes[i + 6] = 0xc0;
    for (let j = i + 8; j < i + 24 && j + 3 < bytes.length; j += 1) {
      if (bytes[j] === 0x67 && bytes[j + 1] === 0x42) bytes[j + 2] = 0xc0;
    }
  }
  for (let i = 0; i + 12 < bytes.length; i += 1) {
    if (bytes[i] !== 0x6e || bytes[i + 1] !== 0x63 || bytes[i + 2] !== 0x6c || bytes[i + 3] !== 0x78) continue;
    bytes[i + 6] = 0x00;
    bytes[i + 7] = 0x01;
    bytes[i + 10] = 0x00;
  }
  return steadyVideoTiming(file);
}

const MP4_CONTAINERS = new Set(['moov', 'trak', 'mdia', 'minf', 'stbl', 'edts', 'udta']);

type Mp4Box = { o: number; size: number; type: string; children: Mp4Box[] };

function readU32(bytes: Uint8Array, offset: number): number {
  return ((bytes[offset] << 24) | (bytes[offset + 1] << 16) | (bytes[offset + 2] << 8) | bytes[offset + 3]) >>> 0;
}

function writeU32(bytes: Uint8Array, offset: number, value: number) {
  const next = value >>> 0;
  bytes[offset] = (next >>> 24) & 255;
  bytes[offset + 1] = (next >>> 16) & 255;
  bytes[offset + 2] = (next >>> 8) & 255;
  bytes[offset + 3] = next & 255;
}

function boxType(bytes: Uint8Array, offset: number): string {
  return String.fromCharCode(bytes[offset + 4], bytes[offset + 5], bytes[offset + 6], bytes[offset + 7]);
}

function parseBoxes(bytes: Uint8Array, start: number, end: number): Mp4Box[] {
  const list: Mp4Box[] = [];
  let o = start;
  while (o + 8 <= end) {
    const size = readU32(bytes, o);
    if (size < 8 || o + size > bytes.length) break;
    const type = boxType(bytes, o);
    const box: Mp4Box = { o, size, type, children: [] };
    if (MP4_CONTAINERS.has(type)) box.children = parseBoxes(bytes, o + 8, o + size);
    list.push(box);
    o += size;
  }
  return list;
}

function findBox(box: Mp4Box | undefined, type: string): Mp4Box | null {
  if (!box) return null;
  if (box.type === type) return box;
  for (const child of box.children) {
    const found = findBox(child, type);
    if (found) return found;
  }
  return null;
}

function walkBoxes(list: Mp4Box[], visit: (box: Mp4Box) => void) {
  for (const box of list) {
    visit(box);
    walkBoxes(box.children, visit);
  }
}

// The picture header says the clip is exactly 30 frames a second. The recorder does not
// hit that rate, and WhatsApp's sender rejects the disagreement. Every frame is retimed
// to 1/30 second, and the audio roll groups are removed. Movie timing stays version 0.
function steadyVideoTiming(file: ArrayBuffer): ArrayBuffer {
  const bytes = new Uint8Array(file.slice(0));
  const tree = parseBoxes(bytes, 0, bytes.length);
  const moov = tree.find((box) => box.type === 'moov');
  const video = moov?.children.find((box) => box.type === 'trak');
  const stts = findBox(video, 'stts');
  const mdhd = findBox(video, 'mdhd');
  const tkhd = findBox(video, 'tkhd');
  const mvhd = findBox(moov, 'mvhd');
  const handler = findBox(video, 'hdlr');
  const videoHandler = !!handler
    && bytes[handler.o + 16] === 0x76
    && bytes[handler.o + 17] === 0x69
    && bytes[handler.o + 18] === 0x64
    && bytes[handler.o + 19] === 0x65;
  if (!moov || !video || !stts || !mdhd || !tkhd || !mvhd || !videoHandler) return file;
  if (bytes[mdhd.o + 8] !== 0 || bytes[tkhd.o + 8] !== 0 || bytes[mvhd.o + 8] !== 0) return file;
  if (stts.size < 24) return file;

  const entryCount = readU32(bytes, stts.o + 12);
  let samples = 0;
  let total = 0;
  const tableEnd = Math.min(stts.o + stts.size, stts.o + 16 + entryCount * 8);
  for (let at = stts.o + 16; at + 8 <= tableEnd; at += 8) {
    const count = readU32(bytes, at);
    const delta = readU32(bytes, at + 4);
    samples += count;
    total += count * delta;
  }
  const timescale = readU32(bytes, mdhd.o + 20);
  if (samples < 1 || total < 1 || timescale < 30) return file;

  const frameDelta = Math.round(timescale / 30);
  const duration = samples * frameDelta;
  const audio = moov.children.filter((box) => box.type === 'trak')[1];
  const audioTkhd = findBox(audio, 'tkhd');
  const audioDuration = audioTkhd ? readU32(bytes, audioTkhd.o + 28) : 0;
  // Version 0: mdhd and mvhd store duration 24 bytes in, tkhd stores it 28 bytes in.
  writeU32(bytes, mdhd.o + 24, duration);
  writeU32(bytes, tkhd.o + 28, duration);
  writeU32(bytes, mvhd.o + 24, Math.max(duration, audioDuration));
  writeU32(bytes, stts.o + 12, 1);
  writeU32(bytes, stts.o + 16, samples);
  writeU32(bytes, stts.o + 20, frameDelta);

  const cuts: { o: number; n: number }[] = [];
  if (entryCount > 1 && stts.size > 24) cuts.push({ o: stts.o + 24, n: stts.size - 24 });
  walkBoxes(tree, (box) => {
    if (box.type === 'sgpd' || box.type === 'sbgp') cuts.push({ o: box.o, n: box.size });
  });
  if (cuts.length === 0) return bytes.buffer;

  const removedBefore = (pos: number) => cuts.reduce((sum, cut) => sum + (cut.o + cut.n <= pos ? cut.n : 0), 0);
  walkBoxes(tree, (box) => {
    const inside = cuts.reduce((sum, cut) => (
      sum + (box.o < cut.o && cut.o + cut.n <= box.o + box.size ? cut.n : 0)
    ), 0);
    if (inside > 0) writeU32(bytes, box.o, box.size - inside);
    if (box.type !== 'stco') return;
    const count = readU32(bytes, box.o + 12);
    if (box.o + 16 + count * 4 > box.o + box.size) return;
    for (let i = 0; i < count; i += 1) {
      const at = box.o + 16 + i * 4;
      const offset = readU32(bytes, at);
      writeU32(bytes, at, offset - removedBefore(offset));
    }
  });
  if (entryCount > 1) writeU32(bytes, stts.o, 24);

  let out = bytes;
  for (const cut of cuts.slice().sort((a, b) => b.o - a.o)) {
    const next = new Uint8Array(out.length - cut.n);
    next.set(out.subarray(0, cut.o), 0);
    next.set(out.subarray(cut.o + cut.n), cut.o);
    out = next;
  }
  return out.buffer;
}

function isFragmentedMp4(file: ArrayBuffer): boolean {
  const bytes = new Uint8Array(file);
  const four = (offset: number) => String.fromCharCode(
    bytes[offset] ?? 0,
    bytes[offset + 1] ?? 0,
    bytes[offset + 2] ?? 0,
    bytes[offset + 3] ?? 0,
  );
  if (bytes.length >= 24 && four(4) === 'ftyp') {
    const size = readU32(bytes, 0);
    const end = Math.min(bytes.length, size);
    for (let i = 16; i + 4 <= end; i += 4) {
      const brand = four(i);
      if (brand === 'iso5' || brand === 'iso6') return true;
    }
  }
  let offset = 0;
  while (offset + 8 <= bytes.length) {
    const size = readU32(bytes, offset);
    const type = four(offset + 4);
    if (size < 8 || offset + size > bytes.length) return false;
    if (type === 'moof') return true;
    offset += size;
  }
  return false;
}

async function repackRecordedVideo(blob: Blob): Promise<ArrayBuffer | null> {
  const {
    Input,
    ALL_FORMATS,
    BlobSource,
    Output,
    Mp4OutputFormat,
    BufferTarget,
    Conversion,
  } = await import('mediabunny');
  const input = new Input({
    formats: ALL_FORMATS,
    source: new BlobSource(blob),
  });
  try {
    const target = new BufferTarget();
    const output = new Output({
      format: new Mp4OutputFormat({ fastStart: 'in-memory' }),
      target,
    });
    const conversion = await Conversion.init({
      input,
      output,
      showWarnings: false,
      copy: { mode: 'forced' },
    });
    if (!conversion.isValid) return null;
    await conversion.execute();
    const file = target.buffer;
    if (!file || file.byteLength < 1000 || isFragmentedMp4(file)) return null;
    return file;
  } catch {
    return null;
  } finally {
    input.dispose();
  }
}

function sequenceHeaderLength(file: ArrayBuffer): number {
  const bytes = new Uint8Array(file);
  for (let i = 0; i + 8 < bytes.length; i += 1) {
    if (bytes[i] === 0x61 && bytes[i + 1] === 0x76 && bytes[i + 2] === 0x63 && bytes[i + 3] === 0x43) {
      return (bytes[i + 10] << 8) | bytes[i + 11];
    }
  }
  return 0;
}

async function whatsAppReadyVideo(blob: Blob): Promise<Blob | null> {
  const packed = await repackRecordedVideo(blob);
  if (packed) {
    const branded = whatsAppBrands(packed);
    if (!isFragmentedMp4(branded)) return new Blob([branded], { type: 'video/mp4' });
  }
  const {
    Input,
    ALL_FORMATS,
    BlobSource,
    Output,
    Mp4OutputFormat,
    BufferTarget,
    VideoSampleSink,
    AudioSampleSink,
    VideoSampleSource,
    AudioSampleSource,
    AudioSample,
    AudioBufferSource,
    Quality,
  } = await import('mediabunny');

  const input = new Input({
    formats: ALL_FORMATS,
    source: new BlobSource(blob),
  });
  let timer = 0;
  try {
    const videoTrack = await input.getPrimaryVideoTrack();
    if (!videoTrack) return null;
    const audioTrack = await input.getPrimaryAudioTrack();
    const duration = await videoTrack.computeDuration();
    const canHear = !!audioTrack && await audioTrack.canDecode();

    let best: ArrayBuffer | null = null;
    for (const attempt of WHATSAPP_VIDEO_ATTEMPTS) {
      const target = new BufferTarget();
      const output = new Output({
        format: new Mp4OutputFormat({ fastStart: 'in-memory' }),
        target,
      });
      const videoSource = new VideoSampleSource({
        ...attempt,
        quality: new Quality('high'),
        keyFrameInterval: 2,
        transform: { frameRate: 30 },
      });
      output.addVideoTrack(videoSource, { frameRate: 30 });
      const heardSource = canHear
        ? new AudioSampleSource({
          codec: 'aac',
          quality: new Quality('medium'),
          transform: { numberOfChannels: 2, sampleRate: 44100 },
        })
        : null;
      const silentSource = heardSource
        ? null
        : new AudioBufferSource({ codec: 'aac', quality: new Quality('low') });
      output.addAudioTrack(heardSource ?? silentSource!);
      try {
        await output.start();
        const encode = (async () => {
          for await (const sample of new VideoSampleSink(videoTrack).samples()) {
            try {
              await videoSource.add(sample);
            } finally {
              sample.close();
            }
          }
          if (heardSource && audioTrack) {
            let heardUntil = 0;
            for await (const sample of new AudioSampleSink(audioTrack).samples()) {
              try {
                heardUntil = Math.max(heardUntil, sample.timestamp + sample.duration);
                await heardSource.add(sample);
              } finally {
                sample.close();
              }
            }
            const sampleRate = 44100;
            let cursor = heardUntil;
            while (duration - cursor > 1 / 30) {
              const seconds = Math.min(1, duration - cursor);
              const length = Math.max(1, Math.round(seconds * sampleRate));
              const pieces = AudioSample.fromAudioBuffer(new AudioBuffer({
                length,
                numberOfChannels: 2,
                sampleRate,
              }), cursor);
              for (const piece of pieces) {
                await heardSource.add(piece);
                piece.close();
              }
              cursor += length / sampleRate;
            }
            return;
          }
          const sampleRate = 44100;
          let remaining = Math.max(duration, 0.2);
          while (remaining > 0) {
            const seconds = Math.min(1, remaining);
            await silentSource!.add(new AudioBuffer({
              length: Math.max(1, Math.ceil(seconds * sampleRate)),
              numberOfChannels: 2,
              sampleRate,
            }));
            remaining -= seconds;
          }
        })();
        const file = await Promise.race([
          encode.then(async () => {
            await output.finalize();
            return target.buffer;
          }),
          new Promise<ArrayBuffer | null>((_, reject) => {
            window.clearTimeout(timer);
            timer = window.setTimeout(() => reject(new Error('timeout')), 120_000);
          }),
        ]);
        if (!file || file.byteLength < 1000 || isFragmentedMp4(file)) continue;
        const branded = whatsAppBrands(file);
        if (isFragmentedMp4(branded)) continue;
        best = branded;
        if (sequenceHeaderLength(branded) >= 32) break;
      } catch {
        // This encoder could not finish the clip. The next attempt uses the other encoder.
      }
    }
    if (!best || isFragmentedMp4(best)) return null;
    return new Blob([best], { type: 'video/mp4' });
  } catch {
    return null;
  } finally {
    window.clearTimeout(timer);
    input.dispose();
  }
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

type ReadoutLayout = {
  titleSize: number;
  nameSize: number;
  countSize: number;
  labelSize: number;
  titleY: number;
  nameY: number;
  countY: number;
  labelY: number;
  radius: number;
  cy: number;
  personSize: number;
  personY: number;
  worldwideSize: number;
  worldwideY: number;
};

function cleanPersonName(value: string | undefined): string {
  return (value ?? '').replace(/[\u0000-\u001F\u007F]/g, '').replace(/\s+/g, ' ').trim().slice(0, 40);
}

// WhatsApp center-crops a portrait video and covers the lower edge, so the
// count stays in the middle band instead of on the bottom of the frame.
function readoutLayout(width: number, height: number, personName: string, showWorldwide: boolean): ReadoutLayout {
  const shortSide = Math.min(width, height);
  const labelSize = Math.max(18, Math.round(shortSide * 0.04));
  const countSize = Math.max(48, Math.round(shortSide * 0.12));
  const nameSize = Math.max(22, Math.round(shortSide * 0.05));
  const titleSize = Math.max(18, Math.round(shortSide * 0.038));
  const personSize = personName ? Math.max(18, Math.round(shortSide * 0.042)) : 0;
  const worldwideSize = showWorldwide ? Math.max(16, Math.round(shortSide * 0.032)) : 0;
  const labelY = Math.round(height * 0.66);
  const countY = labelY - labelSize - Math.round(shortSide * 0.02);
  const nameY = countY - Math.round(countSize * 1.05);
  const titleY = Math.round(height * 0.24);
  const personY = personName ? titleY + Math.round(titleSize * 1.45) : titleY;
  const worldwideY = showWorldwide
    ? (personName ? personY : titleY) + Math.round((personName ? personSize : titleSize) * 1.35)
    : personY;
  const gap = Math.round(shortSide * 0.06);
  let radius = Math.round(Math.min(width, shortSide) * 0.24);
  let cy = nameY - gap - radius;
  const headerBottom = showWorldwide
    ? worldwideY + Math.round(worldwideSize * 0.35)
    : personName
      ? personY + Math.round(personSize * 0.3)
      : titleY + titleSize;
  const minCircleTop = headerBottom + Math.round(shortSide * 0.03);
  if (cy - radius < minCircleTop) {
    radius = Math.max(48, Math.floor((nameY - gap - minCircleTop) / 2));
    cy = minCircleTop + radius;
  }
  return {
    titleSize,
    nameSize,
    countSize,
    labelSize,
    titleY,
    nameY,
    countY,
    labelY,
    radius,
    cy,
    personSize,
    personY,
    worldwideSize,
    worldwideY,
  };
}

const CENTRE_NAME = 'The Ramakrishna Centre of South Africa, Johannesburg';
const SITE_LABEL = 'ramakrishna-johannesburg.org.za';

function paintCentreName(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, backdrop = false) {
  const shortSide = Math.min(canvas.width, canvas.height);
  const size = Math.round(shortSide * 0.032);
  context.save();
  context.textAlign = 'center';
  context.textBaseline = 'alphabetic';
  let y = Math.round(Math.max(36, canvas.height * 0.075));
  if (backdrop) {
    const pad = Math.round(shortSide * 0.04);
    const lineHeight = Math.round(size * 1.4);
    const barHeight = pad * 2 + lineHeight;
    context.fillStyle = 'rgba(20, 14, 8, 0.78)';
    context.fillRect(0, 0, canvas.width, barHeight);
    y = pad + size;
  }
  paintFittedLine(context, canvas, CENTRE_NAME, y, size, '#fff7ed');
  context.restore();
}

function paintSiteLink(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  const shortSide = Math.min(canvas.width, canvas.height);
  const inset = Math.max(28, Math.round(shortSide * 0.045));
  context.save();
  context.textAlign = 'center';
  context.textBaseline = 'alphabetic';
  paintFittedLine(
    context,
    canvas,
    SITE_LABEL,
    canvas.height - inset,
    Math.round(shortSide * 0.03),
    '#fff7ed',
  );
  context.restore();
}

function paintFittedLine(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  text: string,
  y: number,
  size: number,
  color: string,
  weight = 600,
) {
  const maxWidth = canvas.width - 64;
  let fontSize = size;
  context.font = `${weight} ${fontSize}px ${CANVAS_FONT}`;
  while (fontSize > 14 && context.measureText(text).width > maxWidth) {
    fontSize -= 1;
    context.font = `${weight} ${fontSize}px ${CANVAS_FONT}`;
  }
  context.lineWidth = Math.max(3, Math.round(fontSize * 0.14));
  context.strokeStyle = 'rgba(0, 0, 0, 0.92)';
  context.fillStyle = color;
  context.strokeText(text, canvas.width / 2, y);
  context.fillText(text, canvas.width / 2, y);
}

function paintEndCard(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  frame: ChantVideoFrame,
  personTotal: number,
) {
  const width = canvas.width;
  const height = canvas.height;
  const caption = frameCaption(frame);
  context.save();
  context.textAlign = 'center';
  context.textBaseline = 'alphabetic';
  context.shadowColor = 'rgba(0,0,0,0.75)';
  context.shadowBlur = 12;
  context.shadowOffsetY = 2;
  context.fillStyle = '#140e08';
  context.fillRect(0, 0, width, height);
  paintFittedLine(context, canvas, CHANT_APP_NAME, height * 0.2, Math.round(width * 0.055), '#ffd166');
  if (caption.line) {
    paintFittedLine(context, canvas, caption.line, height * 0.28, Math.round(width * 0.045), '#fff7ed');
  }
  paintFittedLine(context, canvas, personTotal.toLocaleString(), height * 0.44, Math.round(width * 0.16), '#ffffff', 700);
  paintFittedLine(context, canvas, frame.chantName || 'Om', height * 0.52, Math.round(width * 0.05), '#fff7ed');
  if (caption.groupTitle) {
    paintFittedLine(context, canvas, `${caption.groupTitle} ${frame.chantName || 'Om'} ${caption.groupChantTotal.toLocaleString()} · all ${caption.groupTotal.toLocaleString()}`, height * 0.6, Math.round(width * 0.034), '#ffd166');
    paintFittedLine(context, canvas, 'Let us see if we can chant', height * 0.7, Math.round(width * 0.038), '#fff7ed');
    paintFittedLine(context, canvas, `${frame.chantName || 'Om'} ${groupChantGoal(caption.groupChantTotal)} times?`, height * 0.76, Math.round(width * 0.038), '#fff7ed');
  }
  paintFittedLine(context, canvas, 'Please subscribe to keep informed', height * 0.86, Math.round(width * 0.034), '#ffd166');
  paintFittedLine(context, canvas, 'of our new temple fundraising.', height * 0.91, Math.round(width * 0.034), '#ffd166');
  context.restore();
  paintCentreName(context, canvas);
  paintSiteLink(context, canvas);
  paintVideoBorder(context, canvas);
}

function paintCameraMessage(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  frame: ChantVideoFrame,
) {
  const caption = frameCaption(frame);
  const lines = caption.groupTitle
    ? [
        `Let us see if we can chant ${frame.chantName || 'Om'} ${groupChantGoal(caption.groupChantTotal)} times?`,
        'Please subscribe to keep informed',
        'of our new temple fundraising.',
        SITE_LABEL,
      ]
    : [
        CHANT_APP_NAME,
        'Please subscribe to keep informed',
        'of our new temple fundraising.',
        SITE_LABEL,
      ];
  const shortSide = Math.min(canvas.width, canvas.height);
  const size = Math.max(16, Math.round(shortSide * 0.034));
  const lineHeight = Math.round(size * 1.4);
  const pad = Math.round(shortSide * 0.04);
  const barHeight = pad * 2 + lineHeight * lines.length;
  const top = canvas.height - barHeight;
  context.save();
  context.fillStyle = 'rgba(20, 14, 8, 0.78)';
  context.fillRect(0, top, canvas.width, barHeight);
  context.textAlign = 'center';
  context.textBaseline = 'alphabetic';
  lines.forEach((line, index) => {
    paintFittedLine(
      context,
      canvas,
      line,
      top + pad + size + index * lineHeight,
      size,
      index === 0 ? '#ffd166' : '#fff7ed',
    );
  });
  context.restore();
}

function personLine(personName: string, groupTitle: string): string {
  return [personName, groupTitle].filter(Boolean).join(' · ');
}

function frameCaption(frame: ChantVideoFrame) {
  const groupTitle = cleanPersonName(frame.groupTitle).slice(0, 60);
  const groupTotal = Math.max(0, Math.round(frame.groupTotal || 0));
  const groupChantTotal = Math.max(0, Math.round(frame.groupChantTotal || 0));
  const globalChants = Math.max(0, Math.round(frame.globalChants || 0));
  const parts: string[] = [];
  if (groupTitle) parts.push(`${frame.chantName || 'Om'} ${groupChantTotal.toLocaleString()}`);
  if (groupTotal > 0) parts.push(`All ${groupTotal.toLocaleString()}`);
  if (globalChants > 0) parts.push(`Worldwide ${globalChants.toLocaleString()}`);
  return {
    line: personLine(cleanPersonName(frame.personName), groupTitle),
    globalChants,
    groupChantTotal,
    groupTitle,
    groupTotal,
    gold: parts.join(' · '),
  };
}

function paintReadout(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  chantName: string,
  chants: number,
  line: string,
  gold: string,
  centreBackdrop = false,
) {
  const layout = readoutLayout(canvas.width, canvas.height, line, gold.length > 0);
  context.save();
  context.textAlign = 'center';
  context.textBaseline = 'alphabetic';
  context.shadowColor = 'rgba(0,0,0,0.7)';
  context.shadowBlur = 12;
  context.shadowOffsetY = 2;
  context.strokeStyle = 'rgba(0, 0, 0, 0.92)';
  context.lineWidth = Math.max(3, Math.round(layout.titleSize * 0.16));
  context.lineJoin = 'round';
  context.fillStyle = '#ffd166';
  let titleSize = layout.titleSize;
  context.font = `600 ${titleSize}px ${CANVAS_FONT}`;
  while (titleSize > 14 && context.measureText(CHANT_APP_NAME).width > canvas.width - 64) {
    titleSize -= 1;
    context.font = `600 ${titleSize}px ${CANVAS_FONT}`;
  }
  context.strokeText(CHANT_APP_NAME, canvas.width / 2, layout.titleY);
  context.fillText(CHANT_APP_NAME, canvas.width / 2, layout.titleY);
  if (line) {
    let personSize = layout.personSize;
    context.font = `600 ${personSize}px ${CANVAS_FONT}`;
    while (personSize > 16 && context.measureText(line).width > canvas.width - 80) {
      personSize -= 2;
      context.font = `600 ${personSize}px ${CANVAS_FONT}`;
    }
    context.fillStyle = '#fff7ed';
    context.lineWidth = Math.max(3, Math.round(personSize * 0.16));
    context.strokeText(line, canvas.width / 2, layout.personY);
    context.fillText(line, canvas.width / 2, layout.personY);
  }
  if (gold) {
    let worldwideSize = layout.worldwideSize;
    context.font = `600 ${worldwideSize}px ${CANVAS_FONT}`;
    while (worldwideSize > 14 && context.measureText(gold).width > canvas.width - 80) {
      worldwideSize -= 1;
      context.font = `600 ${worldwideSize}px ${CANVAS_FONT}`;
    }
    context.fillStyle = '#ffd166';
    context.lineWidth = Math.max(3, Math.round(worldwideSize * 0.16));
    context.strokeText(gold, canvas.width / 2, layout.worldwideY);
    context.fillText(gold, canvas.width / 2, layout.worldwideY);
  }
  let nameSize = layout.nameSize;
  context.font = `600 ${nameSize}px ${CANVAS_FONT}`;
  while (nameSize > 18 && context.measureText(chantName).width > canvas.width - 80) {
    nameSize -= 2;
    context.font = `600 ${nameSize}px ${CANVAS_FONT}`;
  }
  context.fillStyle = '#fff7ed';
  context.lineWidth = Math.max(3, Math.round(nameSize * 0.16));
  context.strokeText(chantName, canvas.width / 2, layout.nameY);
  context.fillText(chantName, canvas.width / 2, layout.nameY);
  context.fillStyle = '#ffffff';
  context.font = `700 ${layout.countSize}px ${CANVAS_FONT}`;
  context.lineWidth = Math.max(4, Math.round(layout.countSize * 0.14));
  context.strokeText(chants.toLocaleString(), canvas.width / 2, layout.countY);
  context.fillText(chants.toLocaleString(), canvas.width / 2, layout.countY);
  context.font = `500 ${layout.labelSize}px ${CANVAS_FONT}`;
  context.fillStyle = '#fff7ed';
  context.lineWidth = Math.max(3, Math.round(layout.labelSize * 0.16));
  context.strokeText(chants === 1 ? 'chant' : 'chants', canvas.width / 2, layout.labelY);
  context.fillText(chants === 1 ? 'chant' : 'chants', canvas.width / 2, layout.labelY);
  context.restore();
  paintCentreName(context, canvas, centreBackdrop);
}

function evenSize(value: number): number {
  const even = Math.max(2, Math.round(value));
  return even - (even % 2);
}

function paintVideoBorder(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  const shortSide = Math.min(canvas.width, canvas.height);
  const inset = Math.max(8, Math.round(shortSide * 0.012));
  context.save();
  context.lineWidth = Math.max(6, Math.round(shortSide * 0.012));
  context.strokeStyle = '#ffd166';
  context.shadowColor = 'rgba(0, 0, 0, 0.9)';
  context.shadowBlur = 10;
  context.strokeRect(inset, inset, canvas.width - inset * 2, canvas.height - inset * 2);
  context.lineWidth = Math.max(2, Math.round(shortSide * 0.004));
  context.strokeStyle = '#fff7ed';
  context.shadowBlur = 0;
  context.strokeRect(inset + 8, inset + 8, canvas.width - (inset + 8) * 2, canvas.height - (inset + 8) * 2);
  context.restore();
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
    audioSrc: '/aum.mp3?v=2',
    imageScale: 1,
    personName: '',
    globalChants: 0,
    groupTitle: '',
    groupTotal: 0,
    groupChantTotal: 0,
    shareText: '',
  });
  const sessionCountRef = useRef(0);
  const personBaselineRef = useRef(0);
  const chantLimitRef = useRef<number | null>(null);
  const endingRef = useRef(false);
  const endHoldTimerRef = useRef<number | null>(null);
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
  const loadedAudioSrcRef = useRef('');
  const micSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const tanpuraBufferRef = useRef<AudioBuffer | null>(null);

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
    if (endHoldTimerRef.current != null) {
      window.clearTimeout(endHoldTimerRef.current);
      endHoldTimerRef.current = null;
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
    tanpuraBufferRef.current = null;
    chantBufferRef.current = null;
    chantDestRef.current = null;
    loadedAudioSrcRef.current = '';
    micSourceRef.current?.disconnect();
    micSourceRef.current = null;
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
    // Silence the mixed audio first. Some browsers will not finish the file
    // until the drone stops, and that wait showed up as a long "preparing".
    chantSourcesRef.current.forEach((source) => {
      try {
        source.stop();
      } catch {
        // The source already finished.
      }
    });
    chantSourcesRef.current = [];
    const context = audioContextRef.current;
    if (context && context.state === 'running') void context.suspend();
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
    endingRef.current = false;
    setSessionCount(0);
    setElapsedMs(0);
    setError(null);
    setNotice(null);
    setPhase('idle');
  }, [clearTimers, releasePlayback, stopTracks]);

  const syncFrame = useCallback((frame: ChantVideoFrame) => {
    frameRef.current = frame;
  }, []);

  const queueChantBuffer = useCallback(() => {
    const context = audioContextRef.current;
    const src = frameRef.current.audioSrc;
    if (!context || !src || loadedAudioSrcRef.current === src) return;
    loadedAudioSrcRef.current = src;
    chantBufferRef.current = null;
    const runAtRequest = runRef.current;
    void loadChantBuffer(src, context).then((buffer) => {
      if (runAtRequest !== runRef.current) return;
      if (audioContextRef.current !== context) return;
      if (frameRef.current.audioSrc !== src) return;
      chantBufferRef.current = buffer;
    });
  }, []);

  const noteChant = useCallback(() => {
    if (phaseRef.current !== 'recording' || endingRef.current) return;
    sessionCountRef.current += 1;
    setSessionCount(sessionCountRef.current);
    const limit = chantLimitRef.current;
    if (limit && sessionCountRef.current >= limit) {
      endingRef.current = true;
      if (endHoldTimerRef.current != null) window.clearTimeout(endHoldTimerRef.current);
      endHoldTimerRef.current = window.setTimeout(() => stopRecording(), END_CARD_MS);
    }
    queueChantBuffer();
    const context = audioContextRef.current;
    const destination = chantDestRef.current;
    const buffer = chantBufferRef.current;
    if (!context || !destination || !buffer) return;
    if (context.state === 'suspended') void context.resume();
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(destination);
    chantSourcesRef.current.push(source);
    const tanpuraBuffer = tanpuraBufferRef.current;
    let tanpura: AudioBufferSourceNode | null = null;
    if (tanpuraBuffer) {
      const gain = context.createGain();
      gain.gain.value = TANPURA_GAIN;
      gain.connect(destination);
      tanpura = context.createBufferSource();
      tanpura.buffer = tanpuraBuffer;
      tanpura.loop = true;
      tanpura.connect(gain);
      tanpura.onended = () => {
        if (!tanpura) return;
        chantSourcesRef.current = chantSourcesRef.current.filter((item) => item !== tanpura);
      };
      chantSourcesRef.current.push(tanpura);
    }
    source.onended = () => {
      chantSourcesRef.current = chantSourcesRef.current.filter((item) => item !== source);
      if (!tanpura) return;
      try {
        tanpura.stop();
      } catch {
        // The drone already finished with the chant.
      }
    };
    const startedAt = context.currentTime;
    try {
      source.start(startedAt);
      tanpura?.start(startedAt);
    } catch {
      // The context closed between the tap and playback.
    }
  }, [queueChantBuffer, stopRecording]);

  const setCanvasNode = useCallback((node: HTMLCanvasElement | null) => {
    canvasRef.current = node;
  }, []);

  const startRecording = useCallback(async (includeCamera = false, chantLimit: number | null = null) => {
    if (phaseRef.current === 'recording' || phaseRef.current === 'starting' || phaseRef.current === 'preparing') return;
    setError(null);
    setNotice(null);
    releasePlayback();
    sessionCountRef.current = 0;
    endingRef.current = false;
    personBaselineRef.current = Math.max(0, Math.round(frameRef.current.personTotal || 0));
    chantLimitRef.current = VIDEO_CHANT_LIMITS.includes(chantLimit ?? 0) ? chantLimit : null;
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
      const stream = includeCamera ? await openCamera() : null;
      if (runId !== runRef.current) {
        abandon(stream);
        return;
      }

      let sourceVideo: HTMLVideoElement | null = null;
      if (stream) {
        streamRef.current = stream;
        setNotice(null);
      } else if (includeCamera) {
        setNotice(NO_CAMERA_NOTICE);
      }
      // The microphone's echo cancellation strips the chant playing from the phone
      // speaker, so mix that chant's own audio into the recording.
      if (audioContextRef.current) {
        const destination = audioContextRef.current.createMediaStreamDestination();
        chantDestRef.current = destination;
        const micTrack = stream?.getAudioTracks()[0];
        if (micTrack) {
          try {
            const micSource = audioContextRef.current.createMediaStreamSource(new MediaStream([micTrack]));
            micSource.connect(destination);
            micSourceRef.current = micSource;
          } catch {
            // The recorder falls back to the microphone track below.
          }
        }
        void loadChantBuffer(TANPURA_SRC, audioContextRef.current).then((buffer) => {
          if (!buffer || runId !== runRef.current) return;
          if (!audioContextRef.current) return;
          tanpuraBufferRef.current = buffer;
        });
        const src = frameRef.current.audioSrc;
        if (src) {
          const buffer = await loadChantBuffer(src, audioContextRef.current);
          if (runId !== runRef.current) {
            abandon(stream);
            return;
          }
          if (buffer && audioContextRef.current) {
            chantBufferRef.current = buffer;
            loadedAudioSrcRef.current = src;
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
        const caption = frameCaption(frameRef.current);
        paintReadout(
          context,
          canvas,
          frameRef.current.chantName || 'Om',
          personBaselineRef.current + sessionCountRef.current,
          caption.line,
          caption.gold,
          true,
        );
        paintCameraMessage(context, canvas, frameRef.current);
        paintVideoBorder(context, canvas);
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
        const caption = frameCaption(frameRef.current);
        const readout = readoutLayout(width, height, caption.line, caption.gold.length > 0);
        const radius = readout.radius;
        const cy = readout.cy;
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

        paintReadout(
          context,
          canvas,
          frameRef.current.chantName || 'Om',
          personBaselineRef.current + chants,
          caption.line,
          caption.gold,
        );
        paintSiteLink(context, canvas);
        paintVideoBorder(context, canvas);
      };

      const draw = () => {
        if (!drawingRef.current || runId !== runRef.current) return;
        queueChantBuffer();
        if (endingRef.current) {
          paintEndCard(
            context,
            canvas,
            frameRef.current,
            personBaselineRef.current + sessionCountRef.current,
          );
        } else if (sourceVideo) {
          drawCamera(sourceVideo);
        } else {
          drawCard();
        }
        rafRef.current = requestAnimationFrame(draw);
      };
      draw();

      const mimeType = preferredVideoMime();
      const canvasStream = canvas.captureStream(30);
      const mixedAudio = chantDestRef.current?.stream.getAudioTracks() ?? [];
      const audioTracks = mixedAudio.length > 0 ? mixedAudio : (stream?.getAudioTracks() ?? []);
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
      const keptNotice = stream ? null : includeCamera ? NO_CAMERA_NOTICE : null;
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
        setNotice('Preparing the video so WhatsApp can play it.');
        setPhase('preparing');
        void (async () => {
          const ready = await whatsAppReadyVideo(blob);
          if (runId !== runRef.current) return;
          if (!ready) {
            setNotice(null);
            setError('WhatsApp Desktop cannot send that recording. Please record it once more.');
            setPhase('idle');
            return;
          }
          const readyType = 'video/mp4';
          const url = URL.createObjectURL(ready);
          const safeName = (frameRef.current.chantName || 'chant').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'chant';
          const name = `${safeName}-${new Date().toISOString().slice(0, 10)}.${extensionForMime(readyType)}`;
          playbackUrlRef.current = url;
          blobRef.current = ready;
          setFileName(name);
          setVideoUrl(url);
          setSessionCount(sessionCountRef.current);
          const file = new File([ready], name, { type: shareableVideoType(readyType) });
          let shareable = false;
          try {
            shareable = !!navigator.canShare?.({ files: [file] });
          } catch {
            shareable = false;
          }
          setCanShare(shareable);
          setNotice(keptNotice);
          setPhase('ready');
        })();
      };

      if (audioContextRef.current?.state === 'suspended') {
        void audioContextRef.current.resume();
      }
      recorderRef.current = recorder;
      recorder.start(250);
      timerRef.current = window.setInterval(() => {
        setElapsedMs(Math.min(MAX_RECORDING_MS, performance.now() - startedAt));
      }, 200);
      const recordingLimitMs = chantLimitRef.current
        ? Math.min(8 * 60_000, chantLimitRef.current * 4000 + END_CARD_MS)
        : MAX_RECORDING_MS;
      maxTimerRef.current = window.setTimeout(() => {
        if (runId !== runRef.current) return;
        stopRecording();
      }, recordingLimitMs);
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
  }, [clearTimers, closeChantAudio, queueChantBuffer, releasePlayback, stopRecording, stopTracks]);

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
    const type = shareableVideoType(blob.type || 'video/webm');
    const extension = type === 'video/mp4' ? 'mp4' : type === 'video/ogg' ? 'ogv' : type === 'video/mpeg' ? 'mpeg' : 'webm';
    const shareName = /\.(webm|mp4|ogv|mpeg|mpg)$/i.test(fileName)
      ? fileName.replace(/\.(webm|mp4|ogv|mpeg|mpg)$/i, `.${extension}`)
      : `${fileName}.${extension}`;
    const file = new File([blob], shareName, { type });
    const title = `${frameRef.current.chantName} chant`;
    const text = frameRef.current.shareText?.trim() || '';
    const cancelled = (shareError: unknown) => shareError instanceof DOMException && shareError.name === 'AbortError';
    setError(null);
    setNotice(null);

    try {
      if (typeof navigator.share === 'function' && navigator.canShare?.({ files: [file] })) {
        await navigator.share(text ? { files: [file], title, text } : { files: [file], title });
        return;
      }
    } catch (shareError) {
      if (cancelled(shareError)) return;
    }

    setNotice('The video and the message could not be shared together from this window. Press Download for the clip, and copy the message above.');
  }, [fileName]);

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
