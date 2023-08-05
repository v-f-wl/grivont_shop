import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../utils/connectMongoDB";
import BasketModel from '../../../models/Basket'
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
  
      let basket = await BasketModel.findOne({ userRef: userId });
  
      if (!basket) {
        basket = await BasketModel.create({ userRef: userId });
      }
  
      basket.collectionBag.push(productId);
      await basket.save();
      return res.status(200).json(basket);
    }catch (error) {
      res.status(500).json({ message: "Не удалось добавить в корзину" })
    }
  }else{
    return res.status(500).json({ message: "Запрос не является POST" })
  }
} 
