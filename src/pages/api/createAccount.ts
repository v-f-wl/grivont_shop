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
      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.NEXT_PUBLIC_JWT_SECRET,
        {
          expiresIn: '2d',
        }
      )
      const { passwordHash, ...userData } = user
      console.log(user)

      res.json({
        ...userData,
        token,
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: 'Что-то пошло не так ыы'
      });
    }
  } else {
    return res.status(500).json({
      message: 'Что-то пошло не так ааа'
    });
  }
}