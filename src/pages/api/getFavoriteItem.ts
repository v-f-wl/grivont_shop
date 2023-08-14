import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../utils/connectMongoDB";
import UserModel from '../../../models/User'
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
      let user = await UserModel.findById(userId)
      if( user === null){
        return res.status(505).json([])
      }
      return res.status(200).json(user.favorites);
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
