'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import CardIdLoading from './productCard/CardIdLoading';


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
  const router = useRouter()
  return (
    <div className={`${count === 0 && 'opacity-30'} w-full flex-col md:p-2 gap-2 relative`}>
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
            bg-purple-400 
            text-xs
            md:text-sm 
            text-white
          "
        >
          {price} p
      </div>
      <div className="w-full h-auto aspect-square rounded-lg dark:bg-gray-400 bg-gray-200 overflow-hidden">
        <img 
          src={imageSrc}
          alt="" 
          className="w-full h-full object-cover aspect-square overflow-hidden object-center" 
        />
      </div>
      <h3 className="text-base md:text-lg  font-medium h-[28px] clamped-text">{title}</h3>
      <div className="font-light text-xs md:text-sm clamped-text-3 text-gray-800 dark:text-gray-300">{description}</div>
      <div onClick={() => router.push(`/productpage/?id=${link}`)} className="mt-2 flex items-center gap-6 justify-self-end">
        <div 
          className="
            border text-xs md:text-base
            md:border-2 
            w-full text-center
            border-purple-400 
            dark:border-white 
            rounded-full py-1 px-3 hover:border-indigo-400 
            hover:text-indigo-400 transition-all 
            dark:text-white text-gray-900 
            cursor-pointer">Подробнее</div>
      </div>
    </div>
  );
}
 
export default ProductCard;