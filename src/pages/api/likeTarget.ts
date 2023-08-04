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
    const { userId, postId } = req.body
    const updatedPost = await PostModal.findById({_id: postId})

    const { likeCollection } = updatedPost;

    const userIndex = likeCollection.indexOf(userId)

    if (userIndex === -1) {
      likeCollection.push(userId);
    } else {
      likeCollection.splice(userIndex, 1);
    }
    await updatedPost.save()

    res.json({
      success: true,
      updatedPost,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Что-то пошло не так'
    });
  }
}