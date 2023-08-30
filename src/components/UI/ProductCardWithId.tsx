'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CardIdLoading from "./productCard/CardIdLoading";

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
  countOfProducts: number,
  imageSrc: ImageObj[],
}

const initialState: ProductDataTypes = {
  _id: '',
  title: '',
  description: '',
  priceOfProduct: '',
  countOfProducts: 0,
  imageSrc: [{data: {url : 'sdfsdf'}}]
}

const ProductCardWithId:React.FC<PopularCardProps> = ({productId}) => {
  const [productData, setProductData] = useState<ProductDataTypes>(initialState)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    if(productId !== undefined || productId !== null){
      axios.get(`/api/product/getOneProduct/?id=${productId}`)
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
    <div className={`${error ? 'hidden' : 'flex'} ${productData.countOfProducts === 0 && 'opacity-30'} w-full flex-col md:p-2 gap-2 relative`}>
      {loaded ? (
        <>
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
            {productData.priceOfProduct} p
          </div>
          <div className="w-full h-auto aspect-square rounded-lg dark:bg-gray-400 bg-gray-200 overflow-hidden">
                <img 
                  src={productData.imageSrc[0].data.url}
                  alt="" 
                  className="w-full h-full object-cover aspect-square overflow-hidden object-center" 
                />
          </div>
          <h3 className="text-base md:text-lg  font-medium h-[28px] clamped-text">{productData.title}</h3>
          <div className="font-light text-xs md:text-sm clamped-text-3 text-gray-800 dark:text-gray-300">{productData.description}</div>
          <div onClick={() => router.push(`/productpage/?id=${productData._id}`)} className="mt-2 flex items-center gap-6 justify-self-end">
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
        </>
      )
      : 
      <CardIdLoading/>
    }
    </div>
  );
}
 
export default ProductCardWithId;