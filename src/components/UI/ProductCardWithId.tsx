'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PopularCardProps{
  productId: string
}

type ImageData = {url: string}

interface ImageObj{
  data: ImageData 
}

interface ProductDataTypes{
  _id: string,
  title: string,
  description: string,
  priceOfProduct: string,
  imageSrc: ImageObj[],
}

const initialState: ProductDataTypes = {
  _id: '',
  title: '',
  description: '',
  priceOfProduct: '',
  imageSrc: [{data: {url : 'sdfsdf'}}]
}

const ProductCardWithId:React.FC<PopularCardProps> = ({productId}) => {
  const [productData, setProductData] = useState<ProductDataTypes>(initialState)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    if(productId !== undefined || productId !== null){
      axios.get(`/api/getOneProduct/?id=${productId}`)
      .then(res => {
          if(res.data !== null){
            setProductData(res.data)
          }else{
            setError(true)
          }
          setLoaded(true)
        }
      )
      .catch(error => console.log(error))
    }
  },[productId])
  return ( 
    <div className={`${error ? 'hidden' : 'flex'} w-full flex-col gap-4 relative`}>
      {loaded && (
        <div 
          className="
            absolute 
            py-1
            px-2
            rounded-full
            top-4 
            right-4 
            bg-purple-400 
            text-sm text-white
          "
        >
          {productData.priceOfProduct} p
        </div>
      )}
      <div className="w-full h-full aspect-square rounded-xl dark:bg-gray-400 bg-gray-200 overflow-hidden">
        {loaded ? 
          (
            <img 
              src={productData.imageSrc[0].data.url}
              alt="" 
              className="w-full h-full object-cover object-center" 
            />
          ) 
          : 
          (
            <div className="w-full h-full dark:bg-gray-400 bg-gray-200 animate-pulse"></div>
          )
        }
      </div>
      {loaded ? 
          (
            <h3 className="text-xl h-[40px] font-medium clamped-text">{productData.title}</h3>
          ) 
          : 
          (
            <div className="w-full h-[40px] dark:bg-gray-400 bg-gray-200 animate-pulse rounded-xl"></div>
          )
      }
      {loaded ? 
          (
            <div className="font-light text-sm clamped-text-3 text-gray-800 dark:text-gray-100">{productData.description}</div>
          ) 
          : 
          (
            <div className="w-full h-[40px] dark:bg-gray-400 bg-gray-200 animate-pulse rounded-xl"></div>
          )
      }
      {loaded ? 
          (
            <div onClick={() => router.push(`/productpage/?id=${productData._id}`)} className="flex items-center gap-6 justify-self-end">
              <div className="border-2 border-purple-400 dark:border-white rounded-full py-2 px-4 hover:border-indigo-400 hover:text-indigo-400 transition-all dark:text-white text-gray-900 cursor-pointer">Подробнее</div>
            </div>
          ) 
          : 
          (null)
      }
    </div>
  );
}
 
export default ProductCardWithId;