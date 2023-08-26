'use client'
import Loading from "@/components/UI/Loading";
import CategoryItem from "./CategoryItem";
import axios from "axios";
import { useEffect, useState } from "react";

interface CategoryData{
  [key: string]: string
}

const RenderCategory = () => {
  const [categoryData, setCategoryData] = useState<CategoryData[]>([])

  useEffect(() => {
    axios.get('/api/category/getCategory')
    .then(res => {
      setCategoryData(res.data)
    })
    .catch(error => console.log(error))
  }, [])

  return (  
    <div className="mt-4 flex items-start gap-6 w-full overflow-x-scroll">
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