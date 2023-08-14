import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../../utils/connectMongoDB";
import ProductModal from '../../../../models/Product'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET'){
    try {
      await connectDB()
      const { id } = req.query
      const products = await ProductModal.find({ userRef: id }).exec()
      res.json(products)
    } 
    catch (error) {
      res.status(500).json({ message: 'Товары пользователя не найдены' })
    }
  }else{
    return res.status(500).json({ message: "Запрос не является GET" })
  }
}
