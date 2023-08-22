
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../../utils/connectMongoDB";
import ProductModal from '../../../../models/Product'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    try {
      await connectDB();

      const filters: any = {}; // Используем any для фильтров
      // Проверяем наличие параметров в запросе и добавляем фильтры при необходимости
      if (req.query.subCategory !== 'undefined') {
        filters.categoryLink = req.query.subCategory as string;
      }else if(req.query.mainCategory !== 'undefined'){
        filters.categoryLink = req.query.mainCategory as string;
      }

      if (req.query.color !== 'undefined') {
        filters.color = req.query.color as string;
      }

      if(req.query.maxPrice !== "undefined"){
        filters.priceOfProduct = {
          $lte: parseInt(req.query.maxPrice as string, 10),
        };
      }
      if(req.query.inStock !== "undefined"){
        filters.countOfProducts = {
          $gte: 1
        };
      }
      const products = await ProductModal.find(filters);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Карточка товара не найдена' })
    }
  }else{
    return res.status(500).json({ message: "Запрос не является GET" })
  }
}
