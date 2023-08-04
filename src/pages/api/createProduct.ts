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
    const doc = new ProductModal({
      category: req.body.category,
      userRef: req.body.userId,
      title: req.body.title,
      description: req.body.description,
      basePlace: req.body.city,
      priceOfProduct: req.body.price,
    })
    const product = await doc.save()
    res.json({
      product
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Что-то пошло не так ыы'
    });
  }
}
