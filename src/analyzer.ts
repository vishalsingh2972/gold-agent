import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import 'dotenv/config';

export async function getGoldAdvice(price: number) {
  const prompt = `
    The current 24K gold price is ₹${price} per 10g.
    Write a 1-sentence message for an Indian mother in Hinglish:
    "Maa, gold price is ₹${price}. It is a good time to buy today."
    Keep it caring and under 20 words.
  `;

  const { text } = await generateText({
    model: google('gemini-2.5-flash'),
    prompt: prompt,
  });
  return text;
}