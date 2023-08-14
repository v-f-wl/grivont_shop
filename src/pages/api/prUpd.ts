import connectDB from "../../../utils/connectMongoDB";
import ProductModal from '../../../models/Product';
import { NextApiRequest, NextApiResponse } from "next";
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  
  if (req.method === 'PATCH') {
    try {
      // Обновляем поле countOfProducts для всех документов
      const updateResult = await ProductModal.updateMany({}, { countOfProducts: 99 });

      if (updateResult
        ) {
        return res.status(200).json({ message: 'Поле countOfProducts успешно обновлено' });
      } else {
        return res.status(500).json({ message: 'Не удалось обновить поле countOfProducts' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Произошла ошибка' });
    }
  } else {
    return res.status(500).json({ message: "Запрос не является PATCH" });
  }
}