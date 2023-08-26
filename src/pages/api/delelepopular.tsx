import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../utils/connectMongoDB";
import MetricModal from '../../../models/Metrica'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'PATCH'){
    try {
      await connectDB()
      const { id } = req.query
      const updatedPost = await MetricModal.findById({_id: '64cec23fd4054e4f808f0d37'})
  
      updatedPost.popularProducts = [] 
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