import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../utils/connectMongoDB";
import UserModal from '../../../models/User'
import BasketModal from '../../../models/Basket'
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

      const basket = await BasketModal.findOne({userRef: userId})
      basket.collectionBag = []
      await basket.save()

      res.status(200).json({
        arr: basket.collectionBag,
        message: true
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Не удалось офомить заказ' })
    }
  } else {
    return res.status(500).json({ message: 'Запрос не имеет метода POST' })
  }
}