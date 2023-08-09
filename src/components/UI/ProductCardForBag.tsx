'use client'

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface ProductCardForBagProps{
  productId: string,
  imageSrc: string,
  productTitle: string,
  productDescription: string,
  productPrice: number,
  wasDeleted: (value: number) => void,
  userId: string | undefined,
  orderLoading: boolean

}
const ProductCardForBag:React.FC<ProductCardForBagProps> = ({
  productId,
  imageSrc,
  productTitle,
  productDescription,
  productPrice,
  wasDeleted,
  userId,
  orderLoading
}) => {
  const [isDeleted, setIsDeleted] = useState<boolean>(false)
  const [loadDelete, setLoadDelete] = useState<boolean>(false)



  const deletProduct = () => {
    setLoadDelete(true)
    if(isDeleted === false && userId !== undefined){
      axios.patch('/api/deleteBagItem', {userId, productId: productId}).
      then(() => {
        setIsDeleted(prev => !prev)
        wasDeleted(productPrice)
        setLoadDelete(false)
      })
    }else{
      setLoadDelete(false)
    }
  }
  return ( 
    <div 
      className={`
        ${isDeleted && 'opacity-30'} 
        ${orderLoading && 'opacity-30'} 
        relative 
        flex flex-col md:flex-row
        gap-8 
        items-start
        rounded-xl 
        bg-gray-700 
        p-4
      `}
    >
      <div className={`${orderLoading ? 'block' : 'hidden'} absolute inset-0 bg-purple-400 rounded-xl flex items-center justify-center`}>
        <AiOutlineLoading3Quarters className='animate-spin' size={38}/>
      </div>
      <div className="w-full aspect-square md:max-w-[200px] md:h-[200px] rounded-xl overflow-hidden">
        <img 
          src={imageSrc} 
          alt="img" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="w-auto flex flex-col gap-4 ">
        <h2 className="clamped-text font-bold text-2xl">{productTitle}</h2>
        <div className="text-sm text-gray-200 clamped-text-3">{productDescription}</div>
        <div className="text-xl font-medium">{productPrice} руб.</div>
        <div className="flex gap-9 items-center">
          <Link 
            href={`/productpage/?id=${productId}`} 
            className="border rounded-full py-1 px-3 hover:border-purple-400 hover:text-purple-400 transition-all">
            О товаре 
          </Link>
          {loadDelete ? 
            (
              <div className="px-5 animate-spin">
                <AiOutlineLoading3Quarters/>
              </div>
            ) 
            : 
            (
            <div 
              onClick={deletProduct}
              className={`
                ${!isDeleted && 'cursor-pointer'}
                ${!isDeleted && 'hover:opacity-40'}
                transition-colors duration-300 underline
              `}
            >
              {isDeleted ? 'Удалено' : 'Удалить'}
            </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
 
export default ProductCardForBag;