import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../../utils/connectMongoDB";
import UserModal from '../../../../models/User'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


interface CardData {
  count: number,
  productId: string
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  if(req.method === 'PATCH'){
    try {
      const { userId, productId } = req.body;
  
      const productsInBag = await UserModal.findById(userId)
  
      if (!productsInBag) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
      
      const cartValue: CardData[] = productsInBag.cart
      const filteredArr = cartValue.filter(item => item.productId !== productId);
      productsInBag.cart = filteredArr
      await productsInBag.save(); 
  
      return res.json({ message: 'Элемент удален' });
    } catch (error) {
      res.status(500).json({ message: 'Не получилось удалить товар из корзины' });
    }
  }else{
    return res.status(500).json({ message: "Запрос не является DELETE" })
  }
}
