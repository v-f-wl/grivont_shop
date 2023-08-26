'use client'
import Loading from "@/components/UI/Loading";
import CRender from "./CRender";
import { ProductDataType } from "../../../../utils/types";
import ProductCard from "@/components/UI/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";


const RenderFavorite = () => {
  const [favoriteList, setFavoriteList] = useState<ProductDataType[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const userId = Cookies.get('id')

  useEffect(() => {
    axios.get(`/api/favorite/getFavoriteItem/?userId=${userId}&maxCount=4`)
        .then(response => {
          setFavoriteList(response.data)
          setIsLoaded(true)
        })
        .catch(error => console.log('Error fetching favorite items:', error));
  }, [userId])

  return ( 
    <CRender>
      <Loading isLoaded={isLoaded}/>
      {(favoriteList.length > 0 && isLoaded) &&
        (
          favoriteList.map(item => (
            <ProductCard
              key={item._id}
              link={item._id}
              title={item.title}
              imageSrc={item.imageSrc[0].data.url}
              price={item.priceOfProduct}
              count={item.countOfProducts}
            />
            )
        ))
      }
    </CRender>
  );
}
 
export default RenderFavorite;