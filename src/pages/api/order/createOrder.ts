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
  if (req.method === 'PATCH') {
    try {
      const { userId } = req.query;
      const dataValue = req.body;
      const user = await UserModal.findById({ _id: userId });
      const { orderHistory } = user;
      orderHistory.push(dataValue);
      await user.save();

      for (let item of dataValue.items) {
        const prod = await ProductModal.findById(item.productId);

        let { countOfProducts } = prod;
        if (countOfProducts < item.count) {
          return res.status(500).json({
            messege: 'Недостаточно позиций товара'
          });
        }
        countOfProducts = countOfProducts - item.count;
        prod.countOfProducts = countOfProducts;
        await prod.save();
      }

      const basket = await UserModal.findById(userId);
      basket.cart = [];
      await basket.save();

      return res.status(200).json({
        arr: basket.collectionBag,
        message: true
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Не удалось оформить заказ' });
    }
  } else {
    return res.status(405).json({ message: 'Метод не разрешен' });
  }
}
