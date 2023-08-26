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
    try {
      const userId= req.query.userId
      if(userId === undefined || userId === null){
        return res.status(200).json({ message: "UserId не определен" })
      }
      let basket = await UserModel.findById(userId )
      if(basket === undefined){
        return res.status(200).json([])
      }
      const collection = basket.cart
      const basketItems = []
      for(const item of collection){
        console.log(collection[item])
        const product = await ProductModel.findOne({ _id: item.productId})
        const obj = {...product._doc, productCount: item.count}
        basketItems.push(obj)
      }

      return res.status(200).json(basketItems);
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
