
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../../utils/connectMongoDB";
import UserModal from '../../../../models/User'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()
  if(req.method === 'GET'){
    try {
      const { userId, productId } = req.query
      if(userId === undefined || productId === undefined){
        res.status(500).json({
          message: "Неправильные данные"
        })
      }
      const user = await UserModal.findById(userId)
      if(!user){

        res.status(505).json({ message: 'Пользователь не найден' })
      }
      const { favorites } = user

      if(favorites.indexOf(productId) > -1){
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
