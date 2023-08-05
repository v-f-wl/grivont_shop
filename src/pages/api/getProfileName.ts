import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../utils/connectMongoDB";
import UserModal from '../../../models/User'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

interface RequestBody {
  userId: string;
  title: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET'){
    try {
      await connectDB()
      const user = await UserModal.findById({_id: req.query.id})
      res.json({
        fullName: user.fullName,
        imageSrc: user.img,
        nickname: user.nickname,
        subscribers: user.subscribers,
        subscriptions: user.subscriptions
      })
    } catch (error) {
      res.status(500).json({ message: 'Пользователь не найден' })
    }
  }else{
    return res.status(500).json({ message: "Запрос не является GET" })
  }
}