'use client'
import { useEffect, useState } from "react";
import axios from "axios";

import CategoryItem from "./CategoryItem";
import Title from "./Title";
import Loading from "../UI/Loading";

interface CategoryData{
  [key: string]: string
}

const CategoryContainer = () => {
  const [categoryData, setCategoryData] = useState<CategoryData[]>([])

  // ПОЛУЧЕНИЕ ДАННЫХ ОБ ИМЕЮЩИХСЯ КАТЕГОРИЯХ
  useEffect(() => {
    axios.get('/api/category/getCategory')
    .then(res => {
      setCategoryData(res.data)
    })
    .catch(error => console.log(error))
  }, [])

  
  return (  
    <div className="mt-10">
      <Title titleValue="Категории"/>
      <div className="mt-4 flex items-start gap-6 w-full overflow-x-scroll">
        {/* РЕНДЕР КАТЕГОРИЙ */}
        {categoryData.length > 0 ? categoryData.map(item => (
          <CategoryItem key={item.link} idLink={item.link} titleValue={item.title} imgSrc={item.image}/>
        ))
          :
        (
        // Loader ДО ПОЛУЧЕНИЯ ДАННЫХ С СЕРВЕРА 
          <div className="w-full">
            <Loading/>
          </div>
        )
        }
      </div>
    </div>
  );
}
 
export default CategoryContainer;