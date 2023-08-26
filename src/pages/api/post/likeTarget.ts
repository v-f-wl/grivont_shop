import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../../utils/connectMongoDB";
import PostModal from '../../../../models/Post'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'PATCH'){
    try {
      await connectDB()
      const { userId, postId } = req.body
      const updatedPost = await PostModal.findById({_id: postId})
  
      const { likeCollection } = updatedPost
  
      const userIndex = likeCollection.indexOf(userId)
  
      if (userIndex === -1) {
        likeCollection.push(userId)
      } else {
        likeCollection.splice(userIndex, 1)
      }
      await updatedPost.save()
  
      res.json({
        success: true,
        updatedPost,
      })
    } 
    catch (error) {
      res.status(500).json({ message: 'Не получилось изменить лайк' })
    }
  }else{
    return res.status(500).json({ message: "Запрос не является PATCH" })
  }
}