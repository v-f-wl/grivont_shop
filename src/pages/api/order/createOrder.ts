import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../../utils/connectMongoDB";
import UserModal from '../../../../models/User'
import ProductModal from '../../../../models/Product'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  if (req.method === 'POST') {
    try {
      const { userId } = req.query
      const dataValue = req.body
      const user = await UserModal.findById({_id: userId})
      const { orderHistory } = user
      orderHistory.push(dataValue)
      await user.save()

      for(let item of dataValue.items){

        const prod = await ProductModal.findById(item.productId)

        let { countOfProducts } = prod
        if(countOfProducts < item.count){
          res.status(500).json({
            messege: 'Недостаточно позиций товра'
          })
        }
        countOfProducts = countOfProducts - item.count
        prod.countOfProducts = countOfProducts;
        await prod.save()

      }
      const basket = await UserModal.findById(userId)
      basket.cart = []
      await basket.save()

      res.status(200).json({
        arr: basket.collectionBag,
        message: true
      });
      res.status(200).json({
        er: 'sdvs'
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Не удалось офомить заказ' })
    }
  } else {
    return res.status(500).json({ message: 'Запрос не имеет метода POST' })
  }
}