import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(filePath: string) {
  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: "raw",
  });
  return result.secure_url;
}