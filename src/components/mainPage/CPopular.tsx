import Title from "../UI/Title";
import RenderPopular from "./renderProductCard/RenderPopular";


const ProductContainer = () => {
  return ( 
    <div className="mt-4 md:mt-6 lg:mt-10 mb-2 md:mb-4 flex flex-col gap-2 md:gap-4">
      <Title title='Популярные товары'/>
      <RenderPopular/>
    </div>
  );
}
 
export default ProductContainer;