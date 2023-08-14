'use client'
import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'


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
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [isDeleted, setIsDeleted] = useState(false)

  const deleteProduct = () => {
    setLoading(true)
    setTimeout(() => {setIsDeleted(true)}, 1000)
    return true
  }
  return (
    <div className={`${isDeleted && 'hidden'} ${count === 0 && 'opacity-50'} w-full flex flex-col p-2 gap-4 relative`}>
      <div className={`${openDeleteModal ? 'block' : 'hidden'} absolute z-40 bg-gray-700/80 inset-0 rounded-xl flex items-center justify-center gap-4`}>
        {loading ? 
          (
            <AiOutlineLoading3Quarters size={36} className='animate-spin'/>
          ) 
          : 
          (
            <Fragment>
              <div 
                onClick={() => deleteProduct()}
                className="py-2 px-4 border rounded-full cursor-pointer opacity-60 hover:opacity-100 transition-all"
              >
                Удалить
              </div>
              <div 
                onClick={() => setOpenDeleteModal(false)}
                className="p-2 border rounded-full cursor-pointer opacity-60 hover:opacity-100 transition-all"
              >
                  Не удалять
              </div>
            </Fragment>
          )
        }
      </div>
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
        {price} p
      </div>
      <div className="w-full aspect-square xl:max-h-[220px] rounded-xl bg-gray-700 overflow-hidden">
        <img 
          src={imageSrc || 'https://i.pinimg.com/564x/d5/44/76/d5447631608c69c3452d486193a79de8.jpg'}
          alt="" 
          className="w-full h-full object-cover" 
        />
      </div>
      <h3 className="text-xl font-medium clamped-text">{title}</h3>
      <div className="clamped-text-3 text-gray-300">{description}</div>
      <div className="flex items-center gap-6 justify-self-end">
        <Link href={`/productpage/?id=${link}`} className="border rounded-full py-2 px-4 hover:border-indigo-400 hover:text-indigo-400 transition-all cursor-pointer">Подробнее</Link>
      </div>
    </div>
  );
}
 
export default ProductCard;