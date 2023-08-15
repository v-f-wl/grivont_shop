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


  const fetchPopularProducts = () => {
    axios.get('/api/category/getPopular')
      .then(response => setProductId(response.data))
      .catch(error => console.log('Error fetching popular products:', error));
  };
  
  const fetchFavoriteItems = () => {
    if (userId) {
      axios.get(`/api/favorite/getFavoriteItem/?userId=${userId}`)
        .then(response => setFavorite(response.data))
        .catch(error => console.log('Error fetching favorite items:', error));
    }
  };
  
  useEffect(() => {
    if (label === 'popular') {
      fetchPopularProducts();
    } else if (label === 'mark') {
      fetchFavoriteItems();
    }
  }, [label, userId]);

  const renderProduct = () => {
    const cardProduct: JSX.Element[]  = []
    for(const item of productId){
      cardProduct.push(<ProductCardWithId key={item} productId={item}/>)
    }
    return cardProduct
  }
  
  const renderFavorite = () => {
    const cardProduct: JSX.Element[]  = []
    const index = Math.min(4, favorite.length)
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
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start justify-between gap-4 md:gap-14">
          {renderProduct()}
        </div>
      )}
      {label === 'mark' && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start justify-between gap-4 md:gap-14">
          {favorite.length > 0 ? 
            (
              renderFavorite()
            ) 
            : 
            (
              <div className="h-[80px] col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center font-medium text-xl">У вас нет товаров в избранном</div>
            )
          }
        </div>
      )}
    </div>
  );
}
 
export default ProductContainer;