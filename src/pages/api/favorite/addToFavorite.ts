import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../../utils/connectMongoDB";
import UserModel from '../../../../models/User'
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
  
      let user = await UserModel.findById(userId);
  
      if (!user) {
        res.status(505).json({message: 'Пользователь не найден'})
      }
  
      user.favorites.push(productId);
      await user.save();
      return res.status(200).json(user);
    }catch (error) {
      res.status(500).json({ message: "Не удалось добавить в корзину" })
    }
  }else{
    return res.status(500).json({ message: "Запрос не является POST" })
  }
} 
