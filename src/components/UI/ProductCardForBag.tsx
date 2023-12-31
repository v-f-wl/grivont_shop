'use client'

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { HiMinusSmall, HiPlusSmall } from "react-icons/hi2";

interface ProductCardForBagProps{
  productId: string,
  imageSrc: string,
  productTitle: string,
  productPrice: number,
  countOfProducts: number,
  countInBag: number,
  userId: string | undefined,
  orderLoading: boolean,

  updateCount: (productId: string, value: number) => void,
  deletProduct: (id: string) => void
}
const ProductCardForBag:React.FC<ProductCardForBagProps> = ({
  productId,
  imageSrc,
  productTitle,
  countOfProducts,
  countInBag,
  productPrice,
  updateCount,
  deletProduct: updateData,
  userId,
  orderLoading
}) => {
  const [loadDelete, setLoadDelete] = useState<boolean>(false)
  const [countData, setCountData] = useState<number>(1)
  const [muteProduct, setMuteProduct] = useState(false)

  useEffect(() => {
    if(countOfProducts === 0){
      setMuteProduct(true)
      setCountData(0)
    }
  },[countInBag, countOfProducts])

  useEffect(() => {
    updateCount(productId, countData)
  }, [countData])
  const CategoryTitle = ({title} : {title: string}) => (
    <span className="font-medium text-purple-400">{title}</span>
  )

  const deletProduct = () => {
    setLoadDelete(true)
    if(userId !== undefined){
      axios.patch('/api/bag/deleteBagItem', {userId, productId: productId}).
      then(() => {
        setLoadDelete(false)
        updateData(productId)
      })
    }else{
      setLoadDelete(false)
    }
  }

  const changeCount = (label: string) => {
    if(countData === 0){
      return
    }
    if((label === 'minus' && countData === 1) || (label === 'plus' && countData === countOfProducts)){
      return
    }

    if(label === 'minus'){
      setCountData(prev => --prev) 
    }
    if(label === 'plus'){
      setCountData(prev => ++prev)

    }
  }
  return ( 
    <div 
      className={`
        ${muteProduct && 'opacity-20'} 
        ${orderLoading && 'opacity-30'} 
        relative 
        flex flex-col md:flex-row
        gap-3 md:gap-5 lg:gap-8 
        items-start
        rounded-xl 
        dark:bg-gray-700 bg-gray-100
        dark:text-white text-black
        md:p-4 p-2
      `}
    >
      <div className={`${orderLoading ? 'block' : 'hidden'} absolute inset-0 bg-purple-400 rounded-xl flex items-center justify-center`}>
        <AiOutlineLoading3Quarters className='animate-spin' size={38}/>
      </div>
      <div className="w-full aspect-square md:w-[200px] h-full md:h-[200px] rounded-xl overflow-hidden">
        <img 
          src={imageSrc} 
          alt="img" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="w-auto flex flex-col gap-2 md:gap-4 flex-1 ">
        <h2 className="h-[64px] clamped-text-2 text-lg lg:text-2xl">{productTitle}</h2>
        <div className="flex flex-col gap-1 md:gap-2 text-xs md:text-base lg:text-md">
          <div className="font-medium"><CategoryTitle title="Цена"/>  {productPrice} руб.</div>
          <div className="font-medium"><CategoryTitle title="В наличии"/> {countOfProducts}</div>
          <div className="flex items-center gap-2">
            <div 
              onClick={() => changeCount('minus')}
              className={`${muteProduct ? 'cursor-default' : 'cursor-pointer'} bg-purple-400 text-white p-1 rounded-full text-base md:text-xl lg:text-2xl`}
            >
              <HiMinusSmall/>
            </div>
            <div className="p-2 text-base md:text-xl lg:text-3xl font-medium">
              {countData}
            </div>
            <div 
              onClick={() => changeCount('plus')}
              className={`${muteProduct ? 'cursor-default' : 'cursor-pointer'} bg-purple-400 text-white p-1 rounded-full text-base md:text-xl lg:text-2xl`}
            >
              <HiPlusSmall/>
            </div>
          </div>
        </div>
        <div className="flex gap-9 items-center">
          <Link 
            href={`/productpage/?id=${productId}`} 
            className="border dark:border-white border-gray-900 rounded-full py-1 px-3 hover:border-purple-400 hover:text-purple-400 transition-all text-base md:text-lg">
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
                transition-colors duration-300 underline text-base md:text-lg
              `}
            >
              Удалить
            </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
 
export default ProductCardForBag;