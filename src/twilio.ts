import twilio from 'twilio';
import 'dotenv/config';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function sendWhatsAppMessage(message: string, mediaUrl?: string) {
  const options: any = {
    from: process.env.TWILIO_PHONE_NUMBER!,
    to: process.env.MUMMY_PHONE_NUMBER!,
  };

  if (message && message.trim() !== "") {
    options.body = message;
  }

  if (mediaUrl) {
    options.mediaUrl = [mediaUrl];
  }

  await client.messages.create(options);
}