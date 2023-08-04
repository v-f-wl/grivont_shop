import { useEffect, useState } from "react";
import ProductCard from "../UI/ProductCard";
import { useRouter } from "next/router";
import axios from "axios";
import Loading from "../UI/Loading";

interface AdsContainerProps{
  idUser: string | undefined
}

interface InitialStateProps{
  priceOfProduct: number,
  _id: string,
  basePlace:string,
  category:string,
  createdAt:string,
  description:string,
  imageSrc:string,
  title:string,
  userRef:string,
}


const AdsContainer:React.FC<AdsContainerProps> = ({idUser}) => {
  const [loaded, setLoaded] = useState<boolean>(false)
  const [productData, setProductData] = useState<InitialStateProps[]>([])
  const router = useRouter()
  const userId = router.query.id

  useEffect(() => {
    if(userId !== undefined){
      axios.get(`/api/getProductsOfPerson/?id=${userId}`)
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
    <div className="grid">
      {loaded ? 
        (
          <div className="grid grid-cols-3 gap-8">
            {productData.length > 0 ? (
              productData.map(item => (
                <ProductCard 
                  key={item._id} 
                  link={item._id}
                  title={item.title}
                  description={item.description}
                  imageSrc={item.imageSrc}
                  price={item.priceOfProduct}
                />
              ))

            ) : (
              <div className="mt-8 col-span-3 text-center text-2xl">У вас пока нет товаров</div>
            )}
          </div>
        ) 
        :
        (<div className="">
          <Loading/>
        </div>
        )
      }
    </div>
  );
}
 
export default AdsContainer;