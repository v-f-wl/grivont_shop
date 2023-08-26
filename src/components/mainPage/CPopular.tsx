import Title from "../UI/Title";
import RenderPopular from "./renderProductCard/RenderPopular";


const ProductContainer = () => {
  

  return ( 
    <div className="mt-8 mb:mt-10 mb-2 md:mb-4 flex flex-col gap-4">
      <Title title='Популярные товары'/>
      <RenderPopular/>
    </div>
  );
}
 
export default ProductContainer;