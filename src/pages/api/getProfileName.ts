import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../utils/connectMongoDB";
import UserModal from '../../../models/User'
import { idText } from 'typescript';
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET'){
    try {
      await connectDB()
      const user = await UserModal.findById({_id: req.query.id})
      const onlyNick = req.query.onlyNick
      if(onlyNick !== undefined){
        res.json({
          nickname: user.nickname,
        })
      }else{
        res.json({
          fullName: user.fullName,
          imageSrc: user.img,
          nickname: user.nickname,
          subscribers: user.subscribers,
          subscriptions: user.subscriptions
        })
      }
    } catch (error) {
      res.status(500).json({ message: 'Пользователь не найден' })
    }
  }else{
    return res.status(500).json({ message: "Запрос не является GET" })
  }
}