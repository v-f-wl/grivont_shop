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
  await connectDB();
  try {
    const posts = await PostModal.find({userRef: req.query.id})
    res.json({
      posts
    });
  } catch (error) {
    res.status(500).json({
      message: 'Что-то пошло не так'
    });
  }
}