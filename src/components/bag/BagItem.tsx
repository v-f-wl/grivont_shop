'use client'
import axios from 'axios';
import { error } from 'console';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HiXMark } from 'react-icons/hi2'

interface BagItemProps{
  id: string
  userId: string | undefined
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
  imageSrc: []
}
const BagItem:React.FC<BagItemProps> = ({id, userId}) => {
  const [deleted, setDeleted] = useState<boolean>(false)
  const [productData, setProductData] = useState<ProductDataTypes>(initialState)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const deleteProduct = () => {
    if(id !== undefined && userId !== undefined && deleted === false){
      axios.patch('/api/deleteBagItem', {userId, productId: id})
      .then((res) => {
        console.log(res.data)
        setDeleted(true)
      })
      .catch(() => console.log('что-то пошло не так'))
    }
  }
  useEffect(() => {
    if(id !== undefined){
      axios.get(`/api/getOneProduct/?id=${id}`)
      .then(res => {
        setProductData(res.data)
        console.log(res.data)
        setIsLoaded(true)
      })
      .catch(() => 
        setDeleted(true)
      )
    }
  },[id])


  return (  
    <div className={`${deleted && 'opacity-30'} relative rounded-xl bg-gray-700 p-4 flex items-center gap-4 w-full`}>
      <Link 
        className='absolute z-10 inset-0' 
        href={`/productpage/?id=${productData._id}`}
      >
      </Link>
      <div className="min-w-[150px] h-[150px] rounded-xl overflow-hidden">
        {isLoaded ? 
          (
            <img 
              src={productData.imageSrc[0].data.url}
              className="w-full h-full object-cover" alt="img" 
            />
          ) 
          : 
          (
            <div className="w-full h-full bg-gray-800 animate-pulse"></div>
          )
        }
      </div>
      <div className="w-full pr-10">
        {isLoaded ? 
          (
            <h3 className="clamped-text text-purple-600 text-2xl font-bold">{productData.title}</h3>
          ) 
          : 
          (
            <div className="w-2/3 h-[25px] bg-gray-800 animate-pulse rounded-xl"></div>
          )
        }
        {isLoaded ? 
          (
            <div className="mt-4 clamped-text-3 text-sm font-light text-gray-300">
              {productData.description}
            </div>
          ) 
          : 
          (
            <div className="mt-4 w-3/4 h-[50px] bg-gray-800 animate-pulse rounded-xl"></div>
          )
        }
        <div className="mt-6 flex items-center gap-4">
          {isLoaded ? 
            <div className="text-xl text-bold">{productData.priceOfProduct} p.</div>
            : 
            (
              <div className="w-[80px] h-[30px] bg-gray-800 animate-pulse rounded-xl"></div>
            )
          }
          {isLoaded ? 
            (
              <div 
                onClick={deleteProduct}
                className="flex gap-2 items-center border py-1 px-2 text-sm rounded-full cursor-pointer relative z-20"
              >
                <HiXMark size={14}/>
                <span className="">Удалить</span>
              </div>
            )
            : 
            (
              <div className="w-[80px] h-[30px] bg-gray-800 animate-pulse rounded-xl"></div>
            )
          }
        </div>
      </div>
    </div>
  );
}
 
export default BagItem;