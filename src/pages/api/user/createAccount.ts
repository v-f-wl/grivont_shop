import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../../utils/connectMongoDB";
import UserModal from '../../../../models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

interface RequestBody {
  nickname: string;
  fullName: string;
  password: string;
}

interface UserDocument {
  _id: string;
  nickname: string;
  fullName: string;
  passwordHash: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  if (req.method === 'POST') {
    try {
      const { nickname, fullName, password }: RequestBody = req.body
      const salt = await bcrypt.genSalt(3)
      const hash = await bcrypt.hash(password, salt)

      const doc = new UserModal({
        nickname,
        fullName,
        passwordHash: hash,
      })
      const user: UserDocument = await doc.save()
      const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;

      if (!jwtSecret) {
        throw new Error('JWT secret is not defined');
      }
      const token = jwt.sign(
        {
          _id: user._id,
        },
        jwtSecret,
        {
          expiresIn: '2d',
        }
      )
      const { passwordHash, ...userData } = user

      res.status(200).json({
        ...userData,
        token,
      });
    } catch (error) {
      res.status(500).json({ message: 'Проблемы с ником' })
    }
  } else {
    return res.status(500).json({ message: 'Запрос не имеет метода POST' })
  }
}