import CategoryContainer from "./CategoryContainer";
import InfoContainer from "./InfoContainer";
import ProductContainer from "./ProductContainer";

const MainContainer = () => {
  return ( 
    <div className="mt-[120px]">
      <CategoryContainer/>
      <InfoContainer/>
      <ProductContainer hasItems={true} label="popular" title="Популярные объявления"/>
      <ProductContainer hasItems={true} label="mark" title="В избранном"/>
      <ProductContainer hasItems={true} label="events" title="События"/>
    </div>
  );
}
 
export default MainContainer;