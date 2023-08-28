import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../../utils/connectMongoDB";
import UserModel from '../../../../models/User'
import ProductModel from '../../../../models/Product'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()
  if (req.method === 'GET') {
    const filter: any = {}
    const {userId, color, subCategory, mainCategory, maxPrice, maxCount} = req.query
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

    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
      const { favorites } = user;
      // Получите список избранных товаров пользователя
      const products = await ProductModel.find({
        _id: { $in: favorites }, 
        ...filter, 
      });
    
      if(maxCount && maxCount !== undefined){
        const firstNProducts = products.slice(0, parseInt(maxCount as string))
        console.log('f',firstNProducts)
        res.status(200).json(firstNProducts)
      }else{
        res.status(200).json(products)
      }
    }
    catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Не удалось добавить в корзину"
      })
    }
  }else{
    return res.status(500).json({ message: "Запрос не является GET" })
  }
} 
