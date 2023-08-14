'use client'

import { useEffect, useState } from "react";
import AboutProduct from "./AboutProduct";
import ImageProduct from "./ImageProduct";
import Loading from "../UI/Loading";
import { useRouter } from "next/router";
import axios from "axios";

type ImageData = {url: string, id: string}

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
  priceOfProduct: number,
  countOfProducts: number,
}

const initialState: initialStateProps = {
  _id: '',
  title: '',
  basePlace: '',
  category: '',
  userRef: '',
  description: '',
  imageSrc: [],
  priceOfProduct: 0,
  countOfProducts: 0,
}


const ProductContainer = () => {
  const[isLoaded, setIsLoaded] = useState<string>('none')
  const [productData, setProductData] = useState<initialStateProps>(initialState)
  const router = useRouter()
  const id = router.query.id


  useEffect(() => {
  const fetchProductData = async () => {
    if (id !== undefined) {
      try {
        const response = await axios.get(`/api/getOneProduct/?id=${id}`);
        if (!response.data) {
          router.push('/error');
        } else {
          setProductData(response.data);
          setIsLoaded('load');
        }
      } catch (error) {
        router.push('/error');
      }
    }
  };

  fetchProductData();
}, [id])

  const renderComponent = () => {
    switch(isLoaded){
      case 'none':
        return <Loading/>
      case 'load':
        return (
          <div className="flex flex-col  gap-8">
            <ImageProduct
                productId={productData._id}
                productTitle={productData.title}
                userRef={productData.userRef}
                city={productData.basePlace}
                price={productData.priceOfProduct}
                category={productData.category}
                imageUrl={productData.imageSrc[0].data.url}
                imgId={productData.imageSrc[0].data.id}
                countOfProducts={productData.countOfProducts}
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