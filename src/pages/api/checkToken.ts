import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../utils/connectMongoDB";
import UserModal from '../../../models/User'
import jwt from 'jsonwebtoken'

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

      const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)
      if(decoded._id === userId){
        const user = await UserModal.findOne({ _id: userId})
        const {passwordHash, ...newObj } = user._doc
        res.json({
          user: newObj,
          message: true
        })
      }else{
        res.json({
          message: false
        })
      }
    }
    catch (error) {
      console.log(error)
      res.status(500).json({
        valid: "false"
      })
    }
  } else {
    return res.status(500).json({
      valid: "false"
    })
  }
}