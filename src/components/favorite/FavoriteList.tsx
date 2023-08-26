'use client'

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import { ProductDataType } from "../../../utils/types";
import CProduct from "../UI/CProduct";
import Filter from "../UI/Filter";
import CColor from "../UI/FilterComponents/CColor";
import CCategory from "../UI/FilterComponents/CCategory";
import CPrice from "../UI/FilterComponents/CPrice";
import { useAppSelector } from "@/redux/store";

const FavoriteList = () => {
  const [favoriteItem, setFavoriteItem] = useState<ProductDataType []>([])
  const [loaded, setLoaded] = useState<boolean>(false)
  const queryParams = useAppSelector(store => store.filterData)
  const userId = Cookies.get('id')

  // ПОЛУЧЕНИЯ ДАННЫХ О ТОВАРАХ ДОБАВЛЕННЫЕ В ИЗБРАННОЕ
  useEffect(() => {
    const queryParamsReq = {
      userId,
      color: queryParams.color,
      mainCategory: queryParams.mainCategory,
      subCategory: queryParams.subCategory,
      maxPrice: queryParams.maxPrice,
      inStock: queryParams.inStock,
    };
    setLoaded(false)
    if(userId !== undefined){
        axios.get('/api/favorite/getFavoriteItem/', { params: queryParamsReq })
        .then(res => {
          setFavoriteItem(res.data)
          setLoaded(true)
        })
        .catch(error => console.log(error))
    }
  },[userId, queryParams])

  return ( 
    <div className="">
      <div className="mt-3 md:mt-6">
        <Filter isLoaded={loaded} >
          <CColor/>
          <CCategory/>
          <CPrice/>
        </Filter>
      </div>
      <CProduct productList={favoriteItem} emptyTitle="У вас пока нет товаров в избранном" isLoaded={loaded}/>
    </div>
  );
}
 
export default FavoriteList;