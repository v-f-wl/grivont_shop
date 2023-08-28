'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import Cookies from "js-cookie";

import Loading from "../UI/Loading";
import CTop from "./CTop";
import PImg from "./PImg";
import InfoList from "./InfoList";
import PTitle from "./productUI/PTitle";
import PInfoList from "./productUI/PInfoList";
import PPrice from "./productUI/PPrice";
import ProductEditCount from "./ProductEditCount";
import CDescription from "./CDescription";
import AddToCartBookmarkButtons from "./AddToCartBookmarkButtons";
import BagBtn from "./productUI/BagBtn";
import FavoriteBtn from "./productUI/FavoriteBtn";

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
  color: string,
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
  color: '',
  description: '',
  imageSrc: [],
  priceOfProduct: 0,
  countOfProducts: 0,
}


const ProductContainer = () => {
  const [isLoaded, setIsLoaded] = useState<string>('none')
  const [productData, setProductData] = useState<initialStateProps>(initialState)
  const [isPersonProduct, setIsPeronProduct] = useState<boolean | null>(null)
  const router = useRouter()
  const user = Cookies.get('id')
  const id = router.query.id


  useEffect(() => {
  const fetchProductData = async () => {
    if (id !== undefined && user !== undefined) {
      try {
        const response = await axios.get(`/api/product/getOneProduct/?id=${id}`);
        if (!response.data) {
          router.push('/error');
        } else {
          setProductData(response.data);
          setIsPeronProduct(user == response.data.userRef)
          document.title = `Grivont - ${response.data.title}`
          setIsLoaded('load');
        }
      } catch (error) {
        router.push('/error');
      }
    }
  };

  fetchProductData();
}, [id, user])

  const renderComponent = () => {
    switch(isLoaded){
      case 'none':
        return <Loading/>
      case 'load':
        return (
          <div className="flex flex-col gap-2 md:gap-4 lg:gap-8">
            <CTop>
              <PImg imageUrl={productData.imageSrc[0].data.url}/>
              <InfoList>
                <PTitle title={productData.title}/>
                <PInfoList
                  category={productData.category}
                  userId={productData.userRef}
                  colorInfo={productData.color}
                  countOfProducts={productData.countOfProducts}

                />
                <PPrice price={productData.priceOfProduct}/>
                <ProductEditCount
                  isAuthtor={isPersonProduct}
                  imageId={productData.imageSrc[0].data.id}
                />
                <AddToCartBookmarkButtons isAuthtor={!isPersonProduct}>
                  <BagBtn
                    countOfProducts={productData.countOfProducts}
                    userId={user}
                    productId={productData._id}
                  /> 
                  <FavoriteBtn
                    userId={user}
                    productId={productData._id}
                  />
                </AddToCartBookmarkButtons>
              </InfoList>
            </CTop>
            <CDescription description={productData.description}/>
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