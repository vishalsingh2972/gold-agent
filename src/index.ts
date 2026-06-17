import { fetchGoldPrice } from './fetcher';
import { getGoldAdvice } from './analyzer';
import { generateSpeech } from './tts';

async function run() {
  console.log("Starting Agent Pipeline...");
  
  const price = await fetchGoldPrice();
  
  if (price) {
    console.log(`Analyzing price: ₹${price}/10g`);
    const advice = await getGoldAdvice(price);
    
    console.log("AI Advice:", advice);
    
    console.log("Generating audio...");
    await generateSpeech(advice);
    
    console.log("Pipeline complete! Check mummy_alert.wav");
  } else {
    console.error("Failed to fetch gold price.");
  }
}

run();