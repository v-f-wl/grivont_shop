'use client'
import Loading from "@/components/UI/Loading";
import ProductCardWithId from "@/components/UI/ProductCardWithId";
import CRender from "./CRender";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const RenderPopular = () => {

  const [productId, setProductId] = useState<string[]>([])
  const userId = Cookies.get('id')

  useEffect(() => {
    if(userId !== undefined){
      axios.get('/api/category/getPopular')
      .then(response => {
        setProductId(response.data)
      })
      .catch(error => console.log('Error fetching popular products:', error));
    }
  }, [userId])

  return (  
    <CRender>
      {productId.length > 0 ?
        (
          productId.map(item => (
            <ProductCardWithId
              productId={item}
              key={item}
            />
          )
        ))
        : 
          <Loading/>
      }
    </CRender>
  );
}
 
export default RenderPopular;