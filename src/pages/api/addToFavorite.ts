import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../utils/connectMongoDB";
import FavoriteModel from '../../../models/Favorite'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

interface RequestBody {
  userId: string;
  productId: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()
  if(req.method === 'POST'){
    try {
      const { userId, productId }: RequestBody = req.body
  
      let basket = await FavoriteModel.findOne({ userRef: userId });
  
      if (!basket) {
        basket = await FavoriteModel.create({ userRef: userId });
      }
  
      basket.collectionFavotite.push(productId);
      await basket.save();
      return res.status(200).json(basket);
    }catch (error) {
      res.status(500).json({ message: "Не удалось добавить в корзину" })
    }
  }else{
    return res.status(500).json({ message: "Запрос не является POST" })
  }
} 
