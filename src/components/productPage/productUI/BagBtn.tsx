'use client'
import axios from "axios";
import { useEffect, useState } from "react";


interface BagBtnProps{
  userId: string | string[] | undefined, 
  productId: string,
  countOfProducts: number
}
const BagBtn:React.FC<BagBtnProps> = ({userId, productId, countOfProducts}) => {
  const [inBag, setInBag] = useState<boolean | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (productId !== undefined && userId !== undefined) {
        try {
          await axios.get(`/api/bag/checkProductInBag/?userId=${userId}&productId=${productId}`)
            .then(res => {
              setInBag(res.data.result);
            })
        } catch (error) {
          console.log(error)
        }
      }
    };
    fetchData();
  }, [productId, userId]);
  
  const addToBag = async () => {
    if (productId !== undefined && userId !== undefined && inBag !== null && countOfProducts > 0) {
      setInBag(null)
      try {
        await axios.post('/api/bag/addToBag', { userId, productId });
        setInBag(true);
      } catch (error) {
        setInBag(false)
      }
    }
  }


  const Button = () => {
    return (
      <div 
        onClick={() => addToBag()}
        className={`
          ${inBag || countOfProducts === 0 ? 'opacity-40' : ''}
          ${inBag || countOfProducts === 0 ? 'cursor-default' : 'cursor-pointer'}
          ${inBag || countOfProducts === 0 ? '' : 'hover:opacity-80'}
          ${inBag || countOfProducts === 0 ? 'bg-gray-600' : 'bg-purple-400'}
          md:py-2 py-1 px-3 md:px-4 
          rounded-full 
          text-white 
          text-bold text-sm
          md:text-xl 
          transition-all
        `}
      >
        {inBag ? 'В корзине' : countOfProducts === 0 ? 'Товара нет в наличии' : 'Добавить в корзину'}
      </div>
    )
  }

  return (  
    <>
      {inBag !== null ? <Button/>
        :
        (
          <div 
            className={`
              md:py-2 py-1 px-3 md:px-4 
              bg-purple-400 
              rounded-full 
              text-white 
              text-bold text-sm
              md:text-xl 
              opacity-60
            `}
          >
            Загрузка...
          </div>
        )
      }
    </>
  );
}
 
export default BagBtn;