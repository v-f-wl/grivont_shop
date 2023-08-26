
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../../utils/connectMongoDB";
import ProductModal from '../../../../models/Product'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    try {
      await connectDB()
      const id = req.query.id
      const product = await ProductModal.findById({_id: id})
      res.json(product)
    } catch (error) {
      res.status(500).json({ message: 'Карточка товара не найдена' })
    }
  }else{
    return res.status(500).json({ message: "Запрос не является GET" })
  }
}
