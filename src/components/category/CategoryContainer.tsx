'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { reverseCategoryMappings } from "../../../utils/categoryMappings"; // ОБЪЕКТ С КАТЕГОРИЯМИ

import ProductCard from "../UI/ProductCard";
import Loading from "../UI/Loading";
import EmptyPage from "../UI/EmptyPage";
import FilterProduct from "../UI/FilterProduct";


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

const CategoryContainer = () => {
  const [productData, setProductData] = useState<ProductDataType[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)
  const [queryCategory, setQueryCategory] = useState<CategoryParams>({})
  const router = useRouter()
  const categoryLink = typeof router.query.id === 'string' ? router.query.id : undefined

  // ОТПРАВКА ЗАПРОСА НА СЕРВЕР ДЛЯ ПОЛУЧЕНИЯ ТОВАРОВ ОДНОЙ КАТЕГОРИИ
  useEffect(() => {
    if(categoryLink !== undefined){
      setLoaded(false)
      axios.get(`/api/product/getProductOfOneCategory/?subCategory=${categoryLink}&color=${queryCategory.color}&maxPrice=${queryCategory.maxPrice}&inStock=${queryCategory.inStock}`)
      .then(res => {
        setProductData(res.data)
        setLoaded(true)
      }
      )
      .catch(() => console.log('error'))
    }
  }, [categoryLink, queryCategory])

  const changeFilter = (label: string, value: string) => {
    setQueryCategory(prev => {
      const obj = {...prev}
      obj[label] = value
      return obj
    })
  }


  return (  
    <div className="mt-[80px] md:mt-[120px]">


      {/* ЗАГОЛОВОК КАТЕГОРИ */}
      <h2 className="font-bold text-2xl md:text-4xl">
        {categoryLink !== undefined ? reverseCategoryMappings[categoryLink] : 'Категория'}
      </h2>


      {/* ФИЛЬТР ТОВАРОВ */}
      <div className="mt-3 md:mt-6">
        <FilterProduct isLoading={loaded && productData.length > 0} handleChange={changeFilter} withCategory={false}/>
      </div>
      <div className="mt-6 mb:mt-8 mb-2 md:mb-4">


        {/* LOADER ДО ПОЛУЧЕНИЯ ДАННЫХ О ТОВАРАХ */}
        {loaded ? (
          <div className="">
            {productData.length > 0 ? 


              // ЕСЛИ ТОВАРЫ ИМЕЮТСЯ ПРОИСХОДИТ РЕНДЕР
              (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-2 md:gap-8">
                  {productData.map(item => (
                    <ProductCard 
                      key={item._id} 
                      link={item._id}
                      title={item.title}
                      count={item.countOfProducts}
                      description={item.description}
                      imageSrc={item.imageSrc[0].data.url}
                      price={item.priceOfProduct}
                  />
                  ))}
                </div>
              ) 
              : 


              // ЕСЛИ ТОВАРОВ НЕТ
              (
               <EmptyPage title="Товары данной категории отсутсвуют"/>
              )
            }
          </div>
        ) 
        : 

        // LOADER ДО ПОЛУЧЕНИЯ ДАННЫХ С СЕРВЕРА
        (<Loading/>)}
      </div>
    </div>
  );
}
 
export default CategoryContainer;