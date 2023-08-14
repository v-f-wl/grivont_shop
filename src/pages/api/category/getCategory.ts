import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../../utils/connectMongoDB";
import MetricaModel from '../../../../models/Metrica'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()
  if (req.method === 'GET'){
    try {
      const posts = await MetricaModel.findById({_id: '64cec23fd4054e4f808f0d37'})
      const { productCategories } = posts
      res.json(productCategories)
    } catch (error) {
      res.status(500).json({ message: 'Пост не найден' })
    }
  }else{
    return res.status(500).json({ message: "Запрос не является GET" })
  }
}