import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../utils/connectMongoDB";
import UserModal from '../../../models/User'
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
      console.log(orderHistory)
      orderHistory.push(dataValue)
      
      console.log(orderHistory, orderHistory[0].items)
      await user.save()
      console.log('dfvdf')

      res.status(200).json({
        user
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Не удалось офомить заказ' })
    }
  } else {
    return res.status(500).json({ message: 'Запрос не имеет метода POST' })
  }
}