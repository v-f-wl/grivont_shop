import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../../utils/connectMongoDB";
import UserModal from '../../../../models/User'
import jwt, { JwtPayload } from 'jsonwebtoken';

interface MyJwtPayload extends JwtPayload {
  _id: string;
}

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

interface RequestBody {
  userId: string;
  token: string;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()
  if (req.method === 'POST') {
    try {
      const { userId, token }: RequestBody = req.body
      const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;

      if (!jwtSecret) {
        throw new Error('JWT secret is not defined');
      }
      const decoded = jwt.verify(token, jwtSecret) as MyJwtPayload
      if(decoded._id === userId){
        const user = await UserModal.findOne({ _id: userId})
        const {passwordHash, ...newObj } = user._doc
        res.status(200).json({
          user: newObj,
          message: true
        })
      }else{
        res.status(200).json({ message: 'Не сходятся данные' })
      }
    }
    catch (error) {
      res.status(500).json({ message: "Ошибка данных" })
    }
  } else {
    return res.status(500).json({ message: "Запрос не является POST" })
  }
}