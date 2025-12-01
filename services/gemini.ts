import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateInvitationMessage = async (
  groom: string,
  bride: string,
  tone: 'formal' | 'casual' | 'islamic' | 'poetic'
): Promise<string> => {
  try {
    const prompt = `
      Buatkan kata-kata mutiara atau pesan pembuka untuk undangan pernikahan yang menarik, singkat (maksimal 50 kata), dan menyentuh hati.
      
      Detail Pasangan:
      - Pria: ${groom}
      - Wanita: ${bride}
      
      Gaya Bahasa: ${tone} (Gunakan Bahasa Indonesia yang baik).
      
      Hanya berikan teks pesannya saja tanpa tanda kutip atau pembuka "Berikut adalah...".
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || "Mohon maaf, terjadi kesalahan saat membuat pesan.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Gagal menghubungkan ke AI. Silakan coba tulis manual.";
  }
};