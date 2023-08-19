import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../../utils/connectMongoDB";
import UserModal from '../../../../models/User'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()
  if (req.method === 'GET') {
    try {
      const { userId, productId } = req.query
      if (userId === undefined || productId === undefined) {
        return res.status(400).json({
          message: "Неправильные данные"
        })
      }
      const user = await UserModal.findById(userId)

      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' })
      }

      const { cart } = user

      for (const item in cart) {
        if (cart[item].productId === productId) {
          return res.status(200).json({ result: true })
        }
      }
      return res.status(200).json({ result: false })

    } catch (error) {
      return res.status(500).json({ message: "Произошла ошибка" })
    }
  } else {
    return res.status(400).json({ message: "Запрос не является GET" })
  }
}
