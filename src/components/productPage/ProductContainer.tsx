'use client'

import { useEffect, useState } from "react";
import AboutProduct from "./AboutProduct";
import ImageProduct from "./ImageProduct";
import Loading from "../UI/Loading";
import { useRouter } from "next/router";
import axios from "axios";

interface initialStateProps {
  _id: string,
  title: string,
  basePlace: string,
  description: string,
  priceOfProduct: number
}

const initialState: initialStateProps = {
  _id: '',
  title: '',
  basePlace: '',
  description: '',
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
    }
  }, [id]);

  const renderComponent = () => {
    switch(isLoaded){
      case 'none':
        return <Loading/>
      case 'load':
        return (
          <div className="flex flex-col gap-8">
            <ImageProduct
              productId={productData._id}
              productTitle={productData.title}
              city={productData.basePlace}
              price={productData.priceOfProduct}
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
    <div className="mt-[120px] min-h-[30vh]">
      {renderComponent()}
    </div>
  );
}
 
export default ProductContainer;