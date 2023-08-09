import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../utils/connectMongoDB";
import PostModal from '../../../models/Metrica'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'PATCH'){
    try {
      await connectDB()
      const { id } = req.body
      const updatedPost = await PostModal.findById({_id: '64cec23fd4054e4f808f0d37'})
  
      const { popularProducts } = updatedPost;
  
      const userIndex = popularProducts.push(id)
  
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