import * as fs from "fs";
import { fetchGoldPrice } from './fetcher';
import { getGoldAdvice } from './analyzer';
import { generateSpeech } from './tts';
import cron from 'node-cron';
import { sendWhatsAppMessage } from './twilio';
import { uploadToCloudinary } from './cloudinary';

const HISTORY_FILE = "history.json";

function updateHistory(price: number) {
  let history: { date: string, price: number }[] = [];
  if (fs.existsSync(HISTORY_FILE)) {
    const fileContent = fs.readFileSync(HISTORY_FILE, "utf-8").trim();
    if (fileContent.length > 0) {
      try { history = JSON.parse(fileContent); } catch (e) { history = []; }
    }
  }
  const today = new Date().toISOString().split('T')[0];
  if (history.length > 0 && history[history.length - 1].date === today) {
    history[history.length - 1].price = price;
  } else {
    history.push({ date: today, price });
  }
  if (history.length > 20) history.shift();
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
  return history;
}

async function runGoldAgent() {
  console.log(`[${new Date().toISOString()}] Starting Gold Agent...`);
  const currentPrice = await fetchGoldPrice();
  if (!currentPrice) return;

  const history = updateHistory(currentPrice);

  if (history.length >= 5) {
    const avgPrice = history.reduce((sum, entry) => sum + entry.price, 0) / history.length;

    if (currentPrice < avgPrice) {
      const advice = await getGoldAdvice(currentPrice);

      await generateSpeech(advice);

      try {
        console.log("Uploading and converting to OGG via Cloudinary...");
        const audioUrl = await uploadToCloudinary('mummy_alert.wav');
        console.log("Audio ready as voice note:", audioUrl);

        await sendWhatsAppMessage("", audioUrl);
        
        console.log("Voice note sent to WhatsApp successfully!");
      } catch (uploadError) {
        console.error("Cloudinary/Twilio Pipeline Failed:", uploadError);
      }
    } else {
      console.log(`Price stable/high (₹${currentPrice}). No alert needed.`);
    }
  } else {
    console.log(`Not enough data to analyze yet (${history.length}/5 days).`);
  }
}

runGoldAgent();
//cron.schedule('0 9 * * *', () => { runGoldAgent(); });

//test cron 20s timer
cron.schedule('*/20 * * * * *', () => { 
  console.log("Cron triggered! Running Gold Agent...");
  runGoldAgent(); 
});

console.log("Gold Agent initialized. Watching gold prices...");