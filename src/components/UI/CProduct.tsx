
import { ProductDataType } from '../../../utils/types';
import EmptyPage from './EmptyPage';
import Loading from './Loading';
import ProductCard from './ProductCard';
type MyComponentProps = {
  productList: ProductDataType[],
  isLoaded: boolean,
  emptyTitle: string
};

const CProduct:React.FC<MyComponentProps> = ({productList, isLoaded, emptyTitle}) => {
  return ( 
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-8 mt-6 mb:mt-8 mb-2 md:mb-4">
      <Loading isLoaded={isLoaded}/>
        {productList.length > 0 && isLoaded ? 
          (
            productList.map(item => ( 
                <ProductCard 
                  key={item._id} 
                  link={item._id}
                  title={item.title}
                  count={item.countOfProducts}
                  description={item.description}
                  imageSrc={item.imageSrc[0].data.url}
                  price={item.priceOfProduct}
                />
            )
          )
          ) : (
            <EmptyPage title={emptyTitle} isLoaded={isLoaded}/>
          )}
    </div>
  );
}
 
export default CProduct;