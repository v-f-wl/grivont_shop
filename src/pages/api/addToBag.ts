import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../utils/connectMongoDB";
import UserModel from '../../../models/User'
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
  
      let basket = await UserModel.findById(userId);
      if (!basket) {
        res.status(500).json({ message: "Пользователь не найден" })
      }
      basket.cart.push({
        count: 1,
        productId
      });
      await basket.save();
      return res.status(200).json(basket);
    }catch (error) {
      res.status(500).json({ message: "Не удалось добавить в корзину" })
    }
  }else{
    return res.status(500).json({ message: "Запрос не является POST" })
  }
} 
