import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from "../../../../utils/connectMongoDB";
import UserModal from '../../../../models/User'
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
  
      const productsInFavorite = await UserModal.findById(userId)
  
      if (!productsInFavorite) {
        return res.status(505).json({ message: 'Пользователь не найден' });
      }
  
      const { favorites } = productsInFavorite
      const index = favorites.indexOf(productId);
      console.log(index)
  
      if (index !== -1) {
        favorites.splice(index, 1);
        await productsInFavorite.save(); 
  
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
