import axios from 'axios';

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-1.5-pro-latest';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// Enhanced system prompt for structured, organized responses
const SYSTEM_PROMPT = `You are an AI-powered outfit recommendation assistant. Given the user's gender, activity, and current weather, suggest a specific outfit including items such as tops, bottoms, shoes, and accessories.\n\nFormat your response exactly like this example:\n\nBased on today's weather (28°C, overcast clouds), here are some outfit recommendations:\n\nSport Outfit\nFor physical activity, I've selected breathable, moisture-wicking athletic wear that allows for freedom of movement. Athletic clothing helps regulate body temperature during exercise. As a male, I've selected items that are typically more suitable for men's fashion.\nItems:\n- Sneakers\n- Athletic Shorts\n- Athletic T-Shirt\n- Athletic Socks\n- Athletic Headband\n- Moisture-Wicking Shirt\n\nAlways use this structure: a summary line, an outfit title, a reasoning paragraph, and a bulleted list of items. Respond in a friendly, helpful manner and make sure your recommendations are appropriate for the activity and weather.`;

export async function getGeminiResponse(userMessage: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is missing.');
  }

  const requestBody = {
    contents: [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT + '\n' + userMessage }] }
    ]
  };

  const params = { key: GEMINI_API_KEY };

  try {
    const response = await axios.post(GEMINI_API_URL, requestBody, { params });
    const result = response.data;
    return result?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.error?.message || error.message || 'Gemini API error');
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}
