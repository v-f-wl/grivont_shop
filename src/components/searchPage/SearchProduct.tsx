'use client'

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ProductDataType } from "../../../utils/types";
import Loading from "../UI/Loading";
import CProduct from "../UI/CProduct";

const SearchProduct = () => {
  const [ productsValue, setProductsValue ] = useState<ProductDataType[] | null>(null)
  const [ errorHandle, setErrorHandle ] = useState(false)
  const { search } = useRouter().query

  useEffect(() => {
    setProductsValue(null)
    if(search !== undefined){
      axios.get(`/api/product/getSearchProducts/?search=${search}`)
      .then(res => {
        setProductsValue(res.data)

      })
      .catch(() => {
        setErrorHandle(true)
      })
    }
  },[search])
  return ( 
    <div className="">
      <Loading isLoaded={productsValue !== null}/>
      {(productsValue !== null) &&
        (
          <CProduct productList={productsValue} isLoaded={productsValue !== null} emptyTitle="Товары не найдены"/>
        ) 
      }
    </div>
  );
}
 
export default SearchProduct;