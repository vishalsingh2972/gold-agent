# Gold-Agent 🤖📈

I automated myself out of my job as the family’s 24/7 Gold Price Help Desk. Now, an AI agent only bugs my mom when the price drops, saving her eyes—and saving me from explaining why it went up by 500 rupees.

### What it does:

It tracks the gold price daily and uses the Vercel AI SDK to connect with Gemini, which acts as a personal financial consultant that actually gets listened to. It figures out if it’s a "buy" or "wait" and then delivers the advice as a native Hindi WhatsApp voice note directly to my mom’s phone

### How it works:

* **The Brain:** Fetches prices and lets Gemini do the thinking.
* **The Voice:** Turns text into a friendly, natural-sounding voice clip using Sarvam AI's Bulbul V3 model.
* **The Magic:** Streams the audio to Cloudinary, converts it to a WhatsApp-native Opus/OGG format, and fires it over via Twilio.
* **No Mess:** Processes everything in memory—zero local files left behind.

### Getting Started:

1. `git clone` this repo.
2. Setup your `.env` with your API keys (Gemini, Twilio, Cloudinary).
3. `npm install` and `npx tsx src/index.ts`.

---

*If this project helped you learn how to build real-world AI Agents, please **give this repo a ⭐**!*

*And if your mom has started asking you for the daily gold price, do yourself a favor: clone this, deploy it, and let the AI handle the morning updates. It’s the perfect way to make sure she stays informed while you officially retire from your role as the family's 24/7 financial advisor. You’ll both thank me later! TOODLES*