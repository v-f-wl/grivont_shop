import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../utils/connectMongoDB";
import PostModal from '../../../models/Post'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  try {
    const { id } = req.query
      PostModal.findOneAndDelete(
        {
          _id: id
        }
      )
      .then( (doc) => {
        if(!doc){
          return res.status(404).json({
            message: "Статья не найдена"
          })
        }
  
        res.json({
          message: 'Succec'
        })
      })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Что-то пошло не так ыы'
    });
  }
}
