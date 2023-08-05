import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../utils/connectMongoDB";
import PostModal from '../../../models/Post'
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
  await connectDB()
  if (req.method === 'GET'){
    try {
      const posts = await PostModal.find({userRef: req.query.id})
      res.json({ posts })
    } catch (error) {
      res.status(500).json({ message: 'Пост не найден' })
    }
  }else{
    return res.status(500).json({ message: "Запрос не является GET" })
  }
}