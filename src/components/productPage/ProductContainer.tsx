'use client'

import { useEffect, useState } from "react";
import AboutProduct from "./AboutProduct";
import ImageProduct from "./ImageProduct";
import Loading from "../UI/Loading";
import { useRouter } from "next/router";
import axios from "axios";
import { HiArrowSmallLeft } from "react-icons/hi2";

type ImageData = {url: string}

interface ImageObj{
  data: ImageData 
}

interface initialStateProps {
  _id: string,
  title: string,
  basePlace: string,
  category: string,
  userRef: string,
  description: string,
  imageSrc: ImageObj[],
  priceOfProduct: number
}

const initialState: initialStateProps = {
  _id: '',
  title: '',
  basePlace: '',
  category: '',
  userRef: '',
  description: '',
  imageSrc: [],
  priceOfProduct: 0
}


const ProductContainer = () => {
  const[isLoaded, setIsLoaded] = useState<string>('none')
  const [productData, setProductData] = useState<initialStateProps>(initialState)
  const router = useRouter()
  const id = router.query.id
  useEffect(() => {
    if(id !== undefined){
      axios.get(`/api/getOneProduct/?id=${id}`)
      .then(res => {
        setProductData(res.data)
        setIsLoaded('load');
      })
      .catch(error => console.log(error))
    }
  }, [id]);

  const renderComponent = () => {
    switch(isLoaded){
      case 'none':
        return <Loading/>
      case 'load':
        return (
          <div className="flex flex-col  gap-8">
            <div 
              onClick={() => window.history.back()} 
              className="
                flex items-center gap-2 justify-center
                w-auto
                max-w-[100px]
                py-1 px-1
                md:py-2
                md:px-3
                border border-purple-400 rounded-full
                cursor-pointer
              "
            >
              <HiArrowSmallLeft size={18}/>
              Назад
            </div>
            <ImageProduct
                productId={productData._id}
                productTitle={productData.title}
                userRef={productData.userRef}
                city={productData.basePlace}
                price={productData.priceOfProduct}
                category={productData.category}
                imageUrl={productData.imageSrc[0].data.url}
              />
            <AboutProduct
              description={productData.description}
            />
          </div>
        )
      default:
        return <div className="">Ошибка</div>
    }
  }

  return ( 
    <div className="mt-[80px] md:mt-[120px] min-h-[30vh]">
      {renderComponent()}
    </div>
  );
}
 
export default ProductContainer;