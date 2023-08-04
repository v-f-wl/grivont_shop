'use client'

import { useEffect, useState } from "react";
import AboutProduct from "./AboutProduct";
import ImageProduct from "./ImageProduct";
import Loading from "../UI/Loading";
import { useRouter } from "next/router";
import axios from "axios";

const ProductContainer = () => {
  const[isLoaded, setIsLoaded] = useState<string>('none')
  const router = useRouter()
  const id = router.query.id
  useEffect(() => {
    if(id !== undefined){
      axios.get(`/api/getOneProduct/?id=${id}`)
      .then(res => console.log(res.data))
    }
    const updateStateWithTimeout = () => {
      setTimeout(() => {
        setIsLoaded('load');
      }, 1000);
    };
    updateStateWithTimeout();
  }, [id]);

  const renderComponent = () => {
    switch(isLoaded){
      case 'none':
        return <Loading/>
      case 'load':
        return (
          <div className="flex flex-col gap-8">
            <ImageProduct/>
            <AboutProduct/>
          </div>
        )
      default:
        return <div className="">Ошибка</div>
    }
  }

  return ( 
    <div className="mt-[120px] min-h-[30vh]">
      {renderComponent()}
    </div>
  );
}
 
export default ProductContainer;