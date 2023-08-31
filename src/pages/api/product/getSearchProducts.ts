
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../../utils/connectMongoDB";
import ProductModel from '../../../../models/Product'
/**get
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    try {
      await connectDB()
      const search = typeof req.query.search === 'string' ? req.query.search : '';
      const newSearch = search.slice(0, -1)
      const regex = new RegExp(newSearch, 'i')
      const products = await ProductModel.find({ title: regex })
      res.json(products)
    } catch (error) {
      res.status(500).json({ message: 'Карточка товара не найдена' })
    }
  }else{
    return res.status(500).json({ message: "Запрос не является GET" })
  }
}
