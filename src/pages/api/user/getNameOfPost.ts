import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../../utils/connectMongoDB";
import UserModal from '../../../../models/User'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET'){
    try{
      await connectDB()
      const user = await UserModal.findOne({ _id: req.query.id})
      return res.json({ name: user.fullName })
    }catch(error){
      res.status(500).json({message: 'Не удалось найти пост'})
    }
  }else{
    return res.status(500).json({ message: "Запрос не является GET" })
  }
}