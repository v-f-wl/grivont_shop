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
  if (req.method === 'POST') {
    try {
      const doc = new PostModal({
        title: req.body.postText,
        userRef: req.body.userId
      })
      const post = await doc.save()

      res.json({
        post
      });
    } catch (error) {
      res.status(500).json({
        message: 'Что-то пошло не так ыы'
      });
    }
  } else {
    return res.status(500).json({
      message: 'Что-то пошло не так ааа'
    });
  }
}