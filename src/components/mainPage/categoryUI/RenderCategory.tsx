'use client'
import { useEffect, useState } from "react";

import axios from "axios";

import Loading from "@/components/UI/Loading";
import CategoryItem from "./CategoryItem";

interface CategoryData{
  [key: string]: string
}

const RenderCategory = () => {
  const [categoryData, setCategoryData] = useState<CategoryData[]>([])
  
  useEffect(() => {    
    let data = sessionStorage.getItem('category')
    axios.get('/api/category/getCategory')
    .then(res => {
      setCategoryData(res.data)
      sessionStorage.setItem('category', JSON.stringify(res.data))
    })
    .catch(error => console.log(error))
  }, [])


  return (  
    <div className="mt-4 flex items-start gap-3 md:gap-5 lg:gap-6 w-full overflow-x-scroll">
      {/* РЕНДЕР КАТЕГОРИЙ */}
      {categoryData.length > 0 ? 
        categoryData.map(item => (
          <CategoryItem key={item.link} idLink={item.link} titleValue={item.title} imgSrc={item.image}/>
        ))
        :
        (
          <div className="w-full">
            <Loading/>
          </div>
        )
      }
    </div>
  );
}
 
export default RenderCategory;