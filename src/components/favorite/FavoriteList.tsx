'use client'

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import FilterProduct from "../UI/FilterProduct";
import ProductCard from "../UI/ProductCard";
import Loading from "../UI/Loading";
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

interface CategoryParams{
  [key: string]: string
}
const FavoriteList = () => {
  const [favoriteItem, setFavoriteItem] = useState<ProductDataType[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)
  const [categoryParams, setCategoryParams] = useState<CategoryParams>({})
  const userId = Cookies.get('id')

  // ПОЛУЧЕНИЯ ДАННЫХ О ТОВАРАХ ДОБАВЛЕННЫЕ В ИЗБРАННОЕ
  useEffect(() => {
    const queryParams = {
      userId,
      color: categoryParams.color,
      mainCategory: categoryParams.mainCategory,
      subCategory: categoryParams.subCategory,
      maxPrice: categoryParams.maxPrice,
      inStock: categoryParams.inStock,
    };
    setLoaded(false)
    if(userId !== undefined){
        axios.get('/api/favorite/getFavoriteItem/', { params: queryParams })
        .then(res => {
          setFavoriteItem(res.data)
          setLoaded(true)
        })
        .catch(error => console.log(error))
    }
  },[userId, categoryParams])

  const changeFilter = (label: string, value: string) => {
    setCategoryParams(prev => ({
      ...prev,
      [label]: value
    }))
    console.log(label, value)
  }
  return ( 
    <div className="">
      <div className="my-4">
        <FilterProduct isLoading={loaded} handleChange={changeFilter} withCategory={true}/>
      </div>
      {/* LOADER ЗАГРУЗКИ ДАННЫХ */}
      {loaded ? 
        (
          <>
            <div className="mt-4 min-h-[60vh] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start justify-between gap-4 md:gap-14">
              {favoriteItem.length > 0 ? 
              // ТОВАРЫ ИМЕЮТСЯ ПРОИСХОДИТ РЕНДЕР
                (
                  favoriteItem.map(item => (
                    <ProductCard
                      key={item._id}
                      link={item._id}
                      title={item.title}
                      imageSrc={item.imageSrc[0].data.url}
                      price={item.priceOfProduct}
                      description={item.description}
                      count={item.countOfProducts}
                    />
                  ))
                ) 
                : 
              // ТОВАРОВ НЕТ В ИЗБРАННОМ 
                (
                  <div className="min-h-[400px] col-span-3 mt-8 text-center text-2xl md;text-3xl font-bold">
                    У вас пока нет товаров в закладках
                  </div>
                )
              }
            </div>
          </>
        ) 
        : 
        (
        // ОКНО ЗАГРУЗКИ ДАННЫХ 
          <div className="h-[30vh]">
            <Loading/>
          </div>
        )
      }
    </div>
  );
}
 
export default FavoriteList;