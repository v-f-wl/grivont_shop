import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../utils/connectMongoDB";
import FavoriteModel from '../../../models/Favorite'
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
        return res.status(200).json([])
      }
      let basket = await FavoriteModel.findOne({ userRef: userId });
      if( basket === null){
        return res.status(200).json([])
      }
      return res.status(200).json(basket.collectionFavotite);
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
