import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../../utils/connectMongoDB";
import ProductModal from '../../../../models/Product'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()
  if(req.method === 'POST'){
    try {
      const doc = new ProductModal({
        category: req.body.category,
        categoryLink: req.body.categoryLink,
        userRef: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        imageSrc: req.body.imageData,
        priceOfProduct: req.body.price,
        countOfProducts: req.body.count,
        mainCategoryLink: req.body.mainCategoryLink,
        mainCategory: req.body.mainCategory,
        color: req.body.color
      })
      const product = await doc.save()
      res.status(200).json({
        product
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Не удалось создать продукт' })
    }
  }else{
    return res.status(500).json({ message: "Запрос не является POST" })
  }
}
