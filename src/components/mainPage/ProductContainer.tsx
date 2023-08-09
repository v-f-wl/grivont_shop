'use client'
import { useEffect, useState } from "react";
import Title from "./Title";
import axios from "axios";
import Cookies from "js-cookie";
import ProductCardWithId from "../UI/ProductCardWithId";

interface ProductContainerProps{
  label: string,
  title: string,
  hasItems: boolean
}
const ProductContainer:React.FC<ProductContainerProps> = ({label, title, hasItems}) => {
  const [productId, setProductId] = useState<string[]>([])
  const [favorite, setFavorite] = useState<string[]>([])
  const userId = Cookies.get('id')
  useEffect(() => {
    if(label === 'popular'){
      axios.get('/api/getPopular')
      .then(res => setProductId(res.data))
    }else if(label === 'mark' && userId !== undefined){
      axios.get(`/api/getFavoriteItem/?userId=${userId}`)
      .then(res => {
        setFavorite(res.data)
      })
    }
  },[label, userId])

  const renderProduct = () => {
    const cardProduct: JSX.Element[]  = []
    for(const item of productId){
      cardProduct.push(<ProductCardWithId key={item} productId={item}/>)
    }
    return cardProduct
  }
  
  const renderFavorite = () => {
    const cardProduct: JSX.Element[]  = []
    const index = Math.min(3, favorite.length)
    for(let i = 0; i < index; i++){
      cardProduct.push(<ProductCardWithId key={favorite[i]} productId={favorite[i]}/>)
    }
    return cardProduct
  }

  return ( 
    <div className="mt-8 mb:mt-10 mb-2 md:mb-4">
      <div className="flex items-center">
        <Title titleValue={title}/>
      </div>
      {label === 'popular' && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-between gap-4 md:gap-14">
          {renderProduct()}
        </div>
      )}
      {label === 'mark' && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-between gap-4 md:gap-14">
          {favorite.length > 0 ? 
            (
              renderFavorite()
            ) 
            : 
            (
              <div className="h-[80px] md:col-span-2 lg:col-span-3 flex items-center justify-center font-medium text-xl">У вас нет товаров в избранном</div>
            )
          }
        </div>
      )}
    </div>
  );
}
 
export default ProductContainer;