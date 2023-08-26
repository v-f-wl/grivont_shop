import { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
  secure: true,
});

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
        const fileStr = req.body.data;
        const uploadedImage = await cloudinary.uploader.upload(fileStr, {
          upload_preset: 'dev_setups'
        })
        res.json({
          id: uploadedImage.public_id,
          url: uploadedImage.secure_url
        })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error uploading image',
        error: error
      });
    }
  }
}
