import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../utils/connectMongoDB";
import UserModal from '../../../models/User'
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
      const product = await UserModal.findById({_id: id})

      res.status(200).json(product.orderHistory)
    } catch (error) {
      res.status(500).json({ message: 'Карточка товара не найдена' })
    }
  }else{
    return res.status(500).json({ message: "Запрос не является GET" })
  }
}
