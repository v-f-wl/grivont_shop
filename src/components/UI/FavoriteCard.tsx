'use client'
import axios from 'axios';
import Link from 'next/link'
import { useEffect, useState } from 'react';


interface ProductCardProps{
  id: string,
}
type ImageData = {url: string}

interface ImageObj{
  data: ImageData 
}
interface CardDataValue{
  title: string,
  description: string,
  priceOfProduct: number,
  imageSrc: ImageObj[],
}

const initialState: CardDataValue = {
  title: '',
  description: '',
  priceOfProduct: 0,
  imageSrc: []
}

const FavoriteCard:React.FC<ProductCardProps> = ({
  id
}) => {

  const [isLoad, setIsLoad] = useState<boolean>(false)
  const [cardData, setCardData] = useState<CardDataValue>(initialState)

  useEffect(() => {
    axios.get(`/api/getOneProduct/?id=${id}`)
    .then(res => {
      setCardData(res.data)
      setIsLoad(true)
    })
  }, [id])
  return (
    <div className="w-full flex flex-col gap-4 relative">
      {isLoad ? 
        (
          <div 
            className="
              absolute 
              py-1
              px-2
              rounded-full
              top-4 
              right-4 
              bg-purple-400 
              text-sm
            "
          >
          {cardData.priceOfProduct}  p
          </div>
        ) 
        : 
        (

          <div 
            className="
              absolute 
              w-[70px]
              h-[25px]
              py-1
              px-2
              rounded-full
              top-4 
              right-4 
              bg-purple-400 
              text-sm animate-pulse
            "
          >
          </div>
        )
      }
      <div className="w-full max-h-[220px] rounded-xl bg-gray-700 overflow-hidden">
        <img 
          src={cardData.imageSrc[0].data.url}
          alt="" 
          className="w-full h-full object-cover" 
        />
      </div>
      {isLoad ? 
        (
          <h3 className="text-xl font-medium clamped-text">
            {cardData.title}
          </h3>
        ) 
        : 
        (

          <div className="w-3/4 h-[25px] bg-gray-400 rounded-xl animate-pulse"></div>
        )
      }
      {isLoad ? 
        (
          <div className="font-light text-sm clamped-text-3 text-purple-300">
            {cardData.description}
          </div>
        ) 
        : 
        (

          <div className="w-full h-[40px] bg-gray-400 rounded-xl animate-pulse"></div>
        )
      }
      <div className="flex items-center gap-6 justify-self-end">
        <Link href={`/productpage/?id=${id}`} className="border rounded-full py-2 px-4 hover:border-indigo-400 hover:text-indigo-400 transition-all cursor-pointer">Подробнее</Link>
      </div>
    </div>
  );
}
 
export default FavoriteCard