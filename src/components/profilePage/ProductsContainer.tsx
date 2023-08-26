import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import CProduct from "../UI/CProduct";
import { ProductDataType } from "../../../utils/types";


interface AdsContainerProps{
  idUser: string | undefined
}

const ProductsContainer:React.FC<AdsContainerProps> = ({idUser}) => {
  const [loaded, setLoaded] = useState<boolean>(false)
  const [productData, setProductData] = useState<ProductDataType[]>([])
  const router = useRouter()
  const userId = router.query.id

  // ПОЛУЧЕНИЕ ДАННЫХ О ПРОДУКТАХ ПОЛЬЗОВАТЕЛЯ
  useEffect(() => {
    if(userId !== undefined){
      axios.get(`/api/product/getProductsOfPerson/?id=${userId}`)
      .then((res) => {
        setLoaded(true)
        setProductData(res.data.reverse())
      })
      .catch(() => {
        setLoaded(true)
      })
    }
  }, [userId])

  return (  
    <CProduct productList={productData} emptyTitle="У вас пока нет товаров" isLoaded={loaded}/>
  );
}
 
export default ProductsContainer;