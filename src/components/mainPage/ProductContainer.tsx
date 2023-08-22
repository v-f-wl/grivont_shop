'use client'
import { useEffect, useState } from "react";

import axios from "axios";
import Cookies from "js-cookie";

import Title from "./Title";
import ProductCardWithId from "../UI/ProductCardWithId";
import ProductCard from "../UI/ProductCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ProductContainerProps{
  label: string,
  title: string,
  hasItems: boolean
}

type ImageData = {url: string}

interface ImageObj{
  data: ImageData 
}
// ИНТЕРФЕЙС КАРТОЧКИ ТОВАРА - КОТОРАЯ ПРИХОДИТ С СЕРВЕРА
interface ProductDataType{
  _id: string,
  title: string,
  priceOfProduct: number,
  countOfProducts: number,
  colorLink: string,
  imageSrc: ImageObj[],
  description: string,
}


const ProductContainer:React.FC<ProductContainerProps> = ({label, title, hasItems}) => {
  const [productId, setProductId] = useState<string[]>([])
  const [favorite, setFavorite] = useState<ProductDataType[]>([])
  const [loaded, setLoaded] = useState(false)
  const userId = Cookies.get('id')

  // ЗАПРОС ДЛЯ ПОПУЛЯРНЫХ ТОВАРОВ
  const fetchPopularProducts = () => {
    axios.get('/api/category/getPopular')
      .then(response => {
        setProductId(response.data)
        setLoaded(true)
      })
      .catch(error => console.log('Error fetching popular products:', error));
  };
  
  // ЗАПРОС ДЛЯ ТОВАРОВ В ИЗБРАННОМ
  const fetchFavoriteItems = () => {
    if (userId) {
      axios.get(`/api/favorite/getFavoriteItem/?userId=${userId}&maxCount=4`)
        .then(response => {
          setFavorite(response.data)
          setLoaded(true)
        })
        .catch(error => console.log('Error fetching favorite items:', error));
    }
  };
  
  // ОТСЛЕЖИВАЕТ КАКУЮ КАТЕГОРИЮ ТОВАРОВ СТОИТ ЗАГРУЗИТЬ
  useEffect(() => {
    if (label === 'popular') {
      fetchPopularProducts();
    } else if (label === 'mark') {
      fetchFavoriteItems();
    }
  }, [label, userId]);

  // РЕНДЕР ПОПУЛЯРНЫХ ПРОДУКТОВ
  const renderProduct = () => {
    const cardProduct: JSX.Element[]  = []
    for(const item of productId){
      cardProduct.push(
        <ProductCardWithId key={item} productId={item}/>
      )
    }
    return cardProduct
  }
  // РЕНДЕР ТОВАРОВ ИЗ ИЗБРАННОГО
  const renderFavorite = () => {
    const cardProduct: JSX.Element[]  = []
    for(const item of favorite){
      cardProduct.push(
        <ProductCard
          key={item._id}
          link={item._id}
          title={item.title}
          imageSrc={item.imageSrc[0].data.url}
          price={item.priceOfProduct}
          description={item.description}
          count={item.countOfProducts}
        />
      )
    }
    return cardProduct
  }

  return ( 
    <div className="mt-8 mb:mt-10 mb-2 md:mb-4">
      <div className="flex items-center">
        <Title titleValue={title}/>
      </div>

      {loaded ? 
      (
        <>
        {/* ЕСЛИ КОНТЕЙНЕР ПОПУЛЯРНОЕ */}
        {label === 'popular' && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start justify-between gap-4 md:gap-14">
            {renderProduct()}
          </div>
        )}
        {/* ЕСЛИ КОНТЕЙНЕР ИЗБРАННОЕ */}
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
        </>
      )
      :
      (
        <div className="my-4 flex items-center justify-center gap-3 text-xl font-medium">
          <AiOutlineLoading3Quarters size={18} className='animate-spin'/> Загрузка...
        </div>
      )
      }
    </div>
  );
}
 
export default ProductContainer;