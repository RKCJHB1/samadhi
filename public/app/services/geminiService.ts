import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// --- Helpers ---

const base64ToBytes = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

// Exported so App can decode stored buffers
export const decodeAudioData = (data: ArrayBuffer): AudioBuffer => {
  // Use OfflineAudioContext to avoid hitting browser AudioContext limits (usually 6)
  // We only need the context to create the buffer container, not for playback.
  const sampleRate = 24000;
  const ctx = new OfflineAudioContext(1, 1, sampleRate);
  
  const numChannels = 1;
  
  // Ensure we are working with 16-bit chunks
  const dataInt16 = new Int16Array(data);
  const frameCount = dataInt16.length / numChannels;
  
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  
  return buffer;
}

// --- Services ---

export interface GeneratedAudio {
  buffer: AudioBuffer;
  rawData: ArrayBuffer;
}

export const generateSpeechAudio = async (chunkId: number, text: string): Promise<GeneratedAudio | null> => {
  try {
    const makeRequest = async () => {
       return await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: ["AUDIO" as any], 
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Puck' }, 
            },
          },
        },
      });
    };

    let response;
    try {
      response = await makeRequest();
    } catch (e) {
      console.warn("Retrying Gemini Audio...", e);
      response = await makeRequest();
    }

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    
    if (base64Audio) {
      const bytes = base64ToBytes(base64Audio);
      const rawData = bytes.buffer;
      const buffer = decodeAudioData(rawData);
      return { buffer, rawData };
    }
    return null;
  } catch (error) {
    console.error("Error generating speech:", error);
    return null;
  }
};
