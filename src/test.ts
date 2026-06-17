import { uploadToCloudinary } from './cloudinary';
import { sendWhatsAppMessage } from './twilio';

async function testPipeline() {
  try {
    console.log("Starting test...");
    
    const url = await uploadToCloudinary('mummy_alert.wav');
    console.log("File uploaded to:", url);
    
    await sendWhatsAppMessage("Testing: Gold price is currently low, Maa!", url);
    console.log("Test message sent successfully!");
    
  } catch (error) {
    console.error("Pipeline failed with error:", error);
  }
}

testPipeline();