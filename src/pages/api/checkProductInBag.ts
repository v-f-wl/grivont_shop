import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../utils/connectMongoDB";
import BasketModal from '../../../models/Basket'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

interface RequestBody {
  userId: string;
  productId: string;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()
  if(req.method === 'POST'){
    try {
      const { userId, productId }: RequestBody = req.body
      if(userId === undefined || productId === undefined){
        res.status(500).json({
          message: "Неправильные данные"
        })
      }
      const basket = await BasketModal.findOne({ userRef: userId})
      if(basket === null){
        res.status(200).json({ result: false })
      }
      const { collectionBag } = basket

      if(collectionBag.indexOf(productId) > -1){
        res.status(200).json({ result: true })
      }else{
        res.status(200).json({ result: false })
      }
      
    }
    catch (error) {
      res.status(500).json({ message: "Произошла ошибка" })
    }
  }else{
    return res.status(500).json({ message: "Запрос не является POST" })
  }
} 
