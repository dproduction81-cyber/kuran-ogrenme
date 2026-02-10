
import { GoogleGenAI, Modality } from "@google/genai";

// Initialize the GoogleGenAI client using the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getVerseExplanation = async (verse: string, userName: string = "") => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Sen bir Kur'an ve Arapça öğretmenisin. Bu harfi veya ayeti ${userName ? userName + " ismindeki" : "bir"} 7 yaşındaki bir çocuğun anlayabileceği, pedagojik olarak doğru, sevgi dolu ve cesaret verici bir dille açıkla. Harflerin telaffuz özelliklerine (kalınlık, pelteklik gibi) ve ayetlerin temel ahlaki mesajına odaklan. Açıklama içinde ${userName} ismini kullanarak ona özel bir teşvik cümlesi kur. Açıklamayı Türkçe yap: "${verse}"`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Eyvah! Yapay Zeka öğretmenimiz şu an biraz dinleniyor. Lütfen daha sonra tekrar dene!";
  }
};

export const speakText = async (text: string): Promise<Uint8Array | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Arapça Kur'an telaffuzu kurallarına uygun olarak oku: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return decode(base64Audio);
    }
    return null;
  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
};

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
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
