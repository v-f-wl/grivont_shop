import CategoryContainer from "./CategoryContainer";
import EventsContainer from "./EventsContainer";
import InfoContainer from "./InfoContainer";
import ProductContainer from "./ProductContainer";

const MainContainer = () => {
  return ( 
    <div className="mt-[120px]">
      <CategoryContainer/>
      <InfoContainer/>
      <ProductContainer hasItems={true} label="popular" title="Популярные товары"/>
      <ProductContainer hasItems={true} label="mark" title="В избранном"/>
      <EventsContainer/>
    </div>
  );
}
 
export default MainContainer;