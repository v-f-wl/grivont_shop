import CategoryModal from "./FCategory/CategoryModal";
import FIlterTitle from "./FIlterTitle";
import FilterWrapper from "./FilterWrapper";

const CCategory = () => {
  return (  
    <FilterWrapper>
      <FIlterTitle title="Категория" label="category"/>
      <CategoryModal/>
    </FilterWrapper>
  );
}
 
export default CCategory;