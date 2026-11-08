import { GoogleGenAI } from '@google/genai';

interface VercelRequest {
  method?: string;
  body?: unknown;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: Record<string, unknown>) => void;
  setHeader?: (name: string, value: string | string[]) => void;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader?.('Allow', ['POST']);
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server' });
    return;
  }

  try {
    const parsedBody =
      typeof req.body === 'string' && req.body.trim()
        ? JSON.parse(req.body)
        : (req.body as Record<string, unknown> | undefined);

    const prompt = typeof parsedBody?.prompt === 'string' ? parsedBody.prompt.trim() : '';
    if (!prompt) {
      res.status(400).json({ error: 'Missing or invalid "prompt" in request body' });
      return;
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.status(200).json({ text: response.text ?? '' });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to generate content from Gemini';
    res.status(500).json({ error: message });
  }
}
