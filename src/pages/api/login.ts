import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../utils/connectMongoDB";
import UserModal from '../../../models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try{
        await connectDB()
        const user = await UserModal.findOne({ nickname: req.body.nickname})
        console.log(user, req.body.nickname)
        if(!user){
          return res.status(404).json({
            body: req.body,
            message: 'Пользователь не найден'
          })
        }
        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash)
        if(!isValidPassword){
          return res.status(409).json({
            message: 'Неверный логин или пароль'
          })
        }
        const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;

        if (!jwtSecret) {
          throw new Error('JWT secret is not defined');
        }
        const token = jwt.sign(
          {_id: user._id}, 
          jwtSecret,
          {expiresIn: '2d'}
        )
        const {passwordHash, ...userData} = user._doc
        return res.json({
          ...userData,
          token
        })
      }catch(error){
        res.status(500).json({ message: 'Не удалось авторизоваться' })
      }
  } else{
    return res.status(500).json({ message: "Запрос не является POST" })
  }
}