import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../../utils/connectMongoDB";
import ProductModal from '../../../../models/Product'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

interface RequestBody {
  productId: string;
  count: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()
  if(req.method === 'PATCH'){
    try {
      const { productId, count }: RequestBody = req.body
      if(productId === undefined || count === undefined){
        res.status(500).json({
          message: "Неправильные данные"
        })
      }
      const product = await ProductModal.findById(productId)
      if(product === null){
        res.status(200).json({ result: false })
      }
      product.countOfProducts = count
      await product.save()
      res.status(200).json({ result: true })
    }
    catch (error) {
      res.status(500).json({ message: "Произошла ошибка" })
    }
  }else{
    return res.status(500).json({ message: "Запрос не является POST" })
  }
} 
