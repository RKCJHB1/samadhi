const SILENCE = 0.01;
const CROSSFADE_SECONDS = 0.04;

/** Drop the silent edges and overlap the join so a loop has no gap. */
export function seamlessTanpuraBuffer(context: BaseAudioContext, buffer: AudioBuffer): AudioBuffer {
  const channel = buffer.getChannelData(0);
  let start = 0;
  let end = channel.length - 1;
  while (start < end && Math.abs(channel[start]) < SILENCE) start += 1;
  while (end > start && Math.abs(channel[end]) < SILENCE) end -= 1;

  const span = end - start + 1;
  const fade = Math.min(Math.floor(buffer.sampleRate * CROSSFADE_SECONDS), Math.floor(span / 4));
  if (fade < 8) return buffer;

  const length = span - fade;
  const loop = context.createBuffer(buffer.numberOfChannels, length, buffer.sampleRate);
  for (let index = 0; index < buffer.numberOfChannels; index += 1) {
    const data = buffer.getChannelData(index);
    const mixed = new Float32Array(length);
    for (let i = 0; i < length; i += 1) mixed[i] = data[start + i];
    for (let i = 0; i < fade; i += 1) {
      const blend = i / fade;
      mixed[i] = mixed[i] * blend + data[start + length + i] * (1 - blend);
    }
    loop.copyToChannel(mixed, index);
  }
  return loop;
}
