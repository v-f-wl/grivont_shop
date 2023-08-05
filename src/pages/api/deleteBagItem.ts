import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../utils/connectMongoDB";
import BagModal from '../../../models/Basket'
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  if(req.method === 'PATCH'){
    try {
      const { userId, productId } = req.body;
  
      const productsInBag = await BagModal.findOne({ userRef: userId });
  
      if (!productsInBag) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
  
      const { collectionBag } = productsInBag;
      const index = collectionBag.indexOf(productId);
  
      if (index !== -1) {
        collectionBag.splice(index, 1);
        await productsInBag.save(); 
  
        return res.json({ message: 'Элемент удален' });
      } else {
        return res.status(404).json({ message: 'Элемент не найден' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Не получилось удалить товар из корзины' });
    }
  }else{
    return res.status(500).json({ message: "Запрос не является DELETE" })
  }
}
