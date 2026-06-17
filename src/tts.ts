import { SarvamAIClient } from "sarvamai";
import * as fs from "fs";
import 'dotenv/config';

const client = new SarvamAIClient({ 
  apiSubscriptionKey: process.env.SARVAM_API_KEY || "" 
});

export async function generateSpeech(text: string) {
  try {
    const response = await client.textToSpeech.convert({
      text: text,
      target_language_code: "hi-IN",
      model: "bulbul:v3",
      speaker: "shubh" 
    });

    if (response.audios && response.audios.length > 0) {
      const audioBase64 = response.audios[0];
      
      const audioBuffer = Buffer.from(audioBase64, 'base64');
      
      fs.writeFileSync('mummy_alert.wav', audioBuffer);
      console.log("Audio alert saved as mummy_alert.wav!");
    } else {
      console.error("No audio data found in the response:", response);
    }
  } catch (error) {
    console.error("Error generating speech:", error);
  }
}