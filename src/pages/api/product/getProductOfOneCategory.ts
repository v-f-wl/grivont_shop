
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
    const filter: any = {}; 
    const {userId, color, subCategory, mainCategory, maxPrice, inStock, maxCount} = req.query
    if (color && color !== 'undefined') {
      filter.color = color;
    }

    if (subCategory && subCategory !== 'undefined') {
      filter.categoryLink = subCategory;
    } else if (mainCategory && mainCategory !== 'undefined') {
      filter.mainCategoryLink = mainCategory;
    }

    if(maxPrice !== "undefined" && maxPrice){
      filter.priceOfProduct = {
        $lte: parseInt(maxPrice as string, 10),
      };
    }

    if (inStock && inStock !== undefined) {
      filter.countOfProducts = {
        $gte: 1,
      };
    }
    try {
      await connectDB();

      const products = await ProductModal.find(filter);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Карточка товара не найдена' })
    }
  }else{
    return res.status(500).json({ message: "Запрос не является GET" })
  }
}
