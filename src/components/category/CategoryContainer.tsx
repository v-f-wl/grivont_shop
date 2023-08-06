'use client'
import { useEffect, useState } from "react";
import ProductCard from "../UI/ProductCard";
import { useRouter } from "next/router";
import axios from "axios";
import { reverseCategoryMappings } from "../../../utils/categoryMappings";
import Loading from "../UI/Loading";
import EmptyPage from "../UI/EmptyPage";

type ImageData = {url: string}

interface ImageObj{
  data: ImageData 
}
interface ProductDataType{
  _id: string,
  title: string,
  priceOfProduct: number,
  imageSrc: ImageObj[],
  description: string,
}

const CategoryContainer = () => {
  const [productData, setProductData] = useState<ProductDataType[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)
  const router = useRouter()
  const categoryLink = typeof router.query.id === 'string' ? router.query.id : undefined
  useEffect(() => {
    if(categoryLink !== undefined){
      axios.get(`/api/getProductOfOneCategory/?id=${categoryLink}`)
      .then(res => {
        setProductData(res.data)
        setLoaded(true)
      }
      )
      .catch(() => console.log('error'))
    }
  }, [categoryLink])

  return (  
    <div className="mt-[120px]">
      <h2 className="font-bold text-4xl">
        {categoryLink !== undefined ? reverseCategoryMappings[categoryLink] : 'Категория'}
      </h2>
      <div className="mt-8">
        {loaded ? (
          <div className="">
            {productData.length > 0 ? 
              (
                <div className="grid grid-cols-3 gap-8">
                  {productData.map(item => (
                    <ProductCard 
                    key={item._id} 
                    link={item._id}
                    title={item.title}
                    description={item.description}
                    imageSrc={item.imageSrc[0].data.url}
                    price={item.priceOfProduct}
                  />
                  ))}
                </div>
              ) 
              : 
              (
               <EmptyPage title="Товары данной категории отсутсвуют"/>
              )
            }
          </div>
        ) : (<Loading/>)}
      </div>
    </div>
  );
}
 
export default CategoryContainer;