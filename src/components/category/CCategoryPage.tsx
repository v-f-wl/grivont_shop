'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { reverseCategoryMappings } from "../../../utils/categoryMappings"; // ОБЪЕКТ С КАТЕГОРИЯМИ
import { ProductDataType } from "../../../utils/types";

import FilterProduct from "../UI/FilterProduct";
import CWraper from "../UI/CWraper";
import Title from "../UI/Title";
import CProduct from "../UI/CProduct";
import Filter from "../UI/Filter";
import CColor from "../UI/FilterComponents/CColor";
import CPrice from "../UI/FilterComponents/CPrice";
import { useAppSelector } from "@/redux/store";


interface CategoryParams{
  [key: string]: string
}
const CCategoryPage = () => {
  const [productData, setProductData] = useState<ProductDataType[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)
  const router = useRouter()
  const categoryLink = typeof router.query.id === 'string' ? router.query.id : undefined
  const queryParams = useAppSelector(store => store.filterData)
  // ОТПРАВКА ЗАПРОСА НА СЕРВЕР ДЛЯ ПОЛУЧЕНИЯ ТОВАРОВ ОДНОЙ КАТЕГОРИИ
  useEffect(() => {
    if(categoryLink !== undefined){
      setLoaded(false)
      const queryParamsReq = {
        color: queryParams.color,
        mainCategory: queryParams.mainCategory,
        subCategory: queryParams.subCategory,
        maxPrice: queryParams.maxPrice,
        inStock: queryParams.inStock,
      };
      axios.get(`/api/product/getProductOfOneCategory/`, { params: queryParamsReq })
      .then(res => {
        setProductData(res.data)
        setLoaded(true)
      }
      )
      .catch(() => console.log('error'))
    }
  }, [categoryLink, queryParams])


  return (  
    <CWraper>
      {/* ЗАГОЛОВОК КАТЕГОРИ */}
      <Title title={categoryLink !== undefined ? reverseCategoryMappings[categoryLink] : 'Категория'}/>

      {/* ФИЛЬТР ТОВАРОВ */}
      <div className="mt-3 md:mt-6">
        <Filter isLoaded={loaded} >
          <CColor/>
          <CPrice/>
        </Filter>
      </div>
      
      {/* КОНТЕЙНЕР В КОТОРОМ ПРОИСХОДИТ РЕНДЕР ТОВАРОВ */}
      <CProduct 
        productList={productData} 
        isLoaded={loaded}
        emptyTitle='Товары данной категории отсутсвуют'
      />
    </CWraper>
  );
}
 
export default CCategoryPage;