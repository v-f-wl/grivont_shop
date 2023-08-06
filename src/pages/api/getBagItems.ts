import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../utils/connectMongoDB";
import BasketModel from '../../../models/Basket'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()
  if (req.method === 'GET') {
    try {
      const userId= req.query.userId
      if(userId === undefined || userId === null){
        return res.status(200).json({ message: "UserId не определен" })
      }
      let basket = await BasketModel.findOne({ userRef: userId });
      if(basket === undefined){
        return res.status(200).json([])
      }
      return res.status(200).json(basket.collectionBag);
    }
    catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Не удалось добавить в корзину"
      })
    }
  }else{
    return res.status(500).json({ message: "Запрос не является GET" })
  }
} 
