'use client'
import Link from 'next/link'
import { useEffect } from 'react';


interface ProductCardProps{
  link: string,
  title: string,
  description?: string,
  imageSrc: string,
  price: number,
  count: number,
}
const ProductCard:React.FC<ProductCardProps> = ({
  link,
  title,
  imageSrc,
  description,
  price,
  count
}) => {
  return (
    <div className={` ${count === 0 && 'opacity-50'} w-full flex flex-col lg:p-2 gap-2 relative`}>
      <div 
        className="
          absolute 
          py-0.5
          md:py-1
          px-2
          rounded-full
          top-2 right-2
          md:top-4 
          md:right-4 
          bg-purple-400 text-white
          text-xs
          md:text-sm
        "
      >
        {price} p
      </div>
      <div className="w-full aspect-square  rounded-lg bg-gray-700 overflow-hidden">
        <img 
          src={imageSrc || 'https://i.pinimg.com/564x/d5/44/76/d5447631608c69c3452d486193a79de8.jpg'}
          alt="" 
          className="w-full h-full object-cover object-center" 
        />
      </div>
      <h3 className="text-base md:text-lg font-medium clamped-text">{title}</h3>
      <div className="text-xs md:text-sm clamped-text-2 dark:text-gray-200 text-gray-600">{description}</div>
      <div className="flex items-center gap-6 justify-self-end">
        <Link href={`/productpage/?id=${link}`} className="border text-xs md:text-base md:border-2 w-full text-center border-purple-400 dark:border-white rounded-full py-1 px-3 hover:border-indigo-400 hover:text-indigo-400 transition-all cursor-pointer">Подробнее</Link>
      </div>
    </div>
  );
}
 
export default ProductCard;