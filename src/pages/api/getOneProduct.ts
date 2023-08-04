
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../utils/connectMongoDB";
import ProductModal from '../../../models/Product'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  try {
    const { id } = req.query
    const product = await ProductModal.findOne({_id: id})

    res.json(product)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Что-то пошло не так ыы'
    });
  }
}
