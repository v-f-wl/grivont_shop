import { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';
import ProductModel from '../../../../models/Product'

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
  if (req.method === 'DELETE') {
    try {
        const { productId, imgId } = req.query
        if(!productId  || !imgId){
          res.status(404).json({ message: 'Проблема с входными данными' })
        }
        if (typeof imgId === 'string') {
          const uploadedImage = await cloudinary.uploader.destroy(imgId)
          if(uploadedImage.result !== 'ok'){
            res.status(505).json({ message: 'Проблема с удалением изображения'})
          }
        }
        const deleteProduct = await ProductModel.findOneAndDelete(
          {
            _id: productId
          }
        )
        if(!deleteProduct){
          res.status(505).json({ message: 'Проблема с удалением поста'})
        }

        res.json({ message: 'Succec' })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Что-то пошло не так',
        error: error
      });
    }
  }
}
