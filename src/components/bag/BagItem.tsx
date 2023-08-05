'use client'
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HiXMark } from 'react-icons/hi2'

interface BagItemProps{
  id: string
  userId: string | undefined
}

interface ProductDataTypes{
  _id: string,
  title: string,
  description: string,
  priceOfProduct: string,
}

const initialState: ProductDataTypes = {
  _id: '',
  title: '',
  description: '',
  priceOfProduct: '',
}
const BagItem:React.FC<BagItemProps> = ({id, userId}) => {
  const [deleted, setDeleted] = useState<boolean>(false)
  const [productData, setProductData] = useState<ProductDataTypes>(initialState)

  useEffect(() => {
    if(id !== undefined){
      axios.get(`/api/getOneProduct/?id=${id}`)
      .then(res => {
        setProductData(res.data)
      })
    }
  },[id])

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

  return (  
    <div className={`${deleted && 'opacity-30'} relative rounded-xl bg-gray-700 p-4 flex items-center gap-4`}>
      <Link 
        className='absolute z-10 inset-0' 
        href={`/productpage/?id=${productData._id}`}
      >
      </Link>
      <div className="min-w-[150px] h-[150px] rounded-xl overflow-hidden">
        <img 
          src="https://i.pinimg.com/564x/f3/ab/6a/f3ab6a3d7b11543b9a64ad0d5ce7126e.jpg"
          className="w-full h-full object-cover" alt="img" 
        />
      </div>
      <div className="w-auto">
        <h3 className="clamped-text text-purple-600 text-2xl font-bold">{productData.title}</h3>
        <div className="mt-4 clamped-text-3 text-sm font-light text-gray-300">
          {productData.description}
        </div>
        <div className="mt-6 flex items-center gap-4">
          <div className="text-xl text-bold">{productData.priceOfProduct} p.</div>
          <div 
            onClick={deleteProduct}
            className="flex gap-2 items-center border py-1 px-2 text-sm rounded-full cursor-pointer relative z-20"
          >
            <HiXMark size={14}/>
            <span className="">Удалить</span>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default BagItem;