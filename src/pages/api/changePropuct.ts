import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../utils/connectMongoDB";
import PostModal from '../../../models/Product'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'PATCH'){
    try {
      await connectDB()
      const products = await PostModal.find();

      for (const product of products) {
        product.mainCategory = 'Одежда'; // Замените yourFieldName на имя поля, которое вы хотите обновить
        product.mainCategoryLink = 'Clothing'; // Замените yourFieldName на имя поля, которое вы хотите обновить
        await product.save(); // Сохранить изменения
      }

      res.json({
        success: true,
      })
    } 
    catch (error) {
      res.status(500).json({ message: 'Не получилось изменить лайк' })
    }
  }else{
    return res.status(500).json({ message: "Запрос не является PATCH" })
  }
}