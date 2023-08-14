import { useEffect, useState } from "react";
import ProductCard from "../UI/ProductCard";
import { useRouter } from "next/router";
import axios from "axios";
import Loading from "../UI/Loading";


interface AdsContainerProps{
  idUser: string | undefined
}

type ImageData = {url: string}

interface ImageObj{
  data: ImageData 
}

interface InitialStateProps{
  priceOfProduct: number,
  countOfProducts: number,
  _id: string,
  basePlace:string,
  category:string,
  createdAt:string,
  imageSrc: ImageObj[],
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
    <div className="grid">
      {loaded ? 
        (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {productData.length > 0 ? (
              productData.map(item => (
                <ProductCard 
                  key={item._id} 
                  link={item._id}
                  title={item.title}
                  imageSrc={item.imageSrc[0].data.url}
                  price={item.priceOfProduct}
                  count={item.countOfProducts}
                />
              ))

            ) : (
              <div className="mt-8 md:cal-span-2 lg:col-span-3 text-center text-2xl">У вас пока нет товаров</div>
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