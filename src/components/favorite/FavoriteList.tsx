'use client'

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import Loading from "../UI/Loading";
import ProductCardWithId from "../UI/ProductCardWithId";


const FavoriteList = () => {
  const [favoriteItem, setFavoriteItem] = useState<string[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)
  const userId = Cookies.get('id')

  // ПОЛУЧЕНИЯ ДАННЫХ О ТОВАРАХ ДОБАВЛЕННЫЕ В ИЗБРАННОЕ
  useEffect(() => {
    if(userId !== undefined){
      axios.get(`/api/favorite/getFavoriteItem/?userId=${userId}`)
        .then(res => {
          setFavoriteItem(res.data)
          setLoaded(true)
        })
        .catch(error => console.log(error))
    }
  },[userId])

  return ( 
    <div className="">
      {/* LOADER ЗАГРУЗКИ ДАННЫХ */}
      {loaded ? 
        (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start justify-between gap-4 md:gap-14">
            {favoriteItem.length > 0 ? 
            // ТОВАРЫ ИМЕЮТСЯ ПРОИСХОДИТ РЕНДЕР
              (
                favoriteItem.map(item => (
                  <ProductCardWithId key={item} productId={item}/>
                ))
              ) 
              : 
            // ТОВАРОВ НЕТ В ИЗБРАННОМ 
              (
                <div className="col-span-3 mt-8 text-center text-3xl font-bold">
                  У вас пока нет товаров в закладках
                </div>
              )
            }
          </div>
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