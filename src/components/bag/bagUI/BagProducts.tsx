import EmptyPage from "@/components/UI/EmptyPage";
import ProductCardForBag from "@/components/UI/ProductCardForBag";


type ImageData = {url: string}

interface ImageObj{
  data: ImageData 
}

type BagData = {
  _id: string,
  title: string,
  description: string,
  imageSrc: ImageObj[],
  priceOfProduct: number,
  countOfProducts: number,
  productCount: number,
}
interface BagProductsProps{
  bagData: BagData[],
  userId: string | undefined,
  deleteProducts: (id: string) => void,
  countChange: (productId: string, value: number) => void,
  isLoaded: boolean
  reqSended: boolean
}


const BagProducts:React.FC<BagProductsProps> = ({bagData, userId, deleteProducts, countChange, isLoaded, reqSended}) => {
  return ( 
    <div className={`${isLoaded ? 'block' : 'hidden'} w-full`}>
      {bagData.length > 0 ? 
        (
        // РЕНДЕР ТОВАРОВ ПРИ ИХ НАЛИЧИИ
          <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-col gap-6">
            {bagData.map(item => (
              <ProductCardForBag
                key={item._id}
                productId={item._id}
                imageSrc={item.imageSrc[0].data.url}
                productTitle={item.title}
                productPrice={item.priceOfProduct}
                countOfProducts={item.countOfProducts}
                countInBag={item.productCount}
                userId={userId}
                deletProduct={deleteProducts}
                updateCount={countChange}
                orderLoading={reqSended}
              />
            ))}
          </div>
        ) 
        : 
        (
        // ПРИ ОТСУТСТВИИ ТОВАРОВ
        <div className="md:col-span-2 ">
          <EmptyPage title="Корзина пустая" isLoaded={isLoaded} />
        </div>
        )
      }
    </div>
  );
}
 
export default BagProducts;