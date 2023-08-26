import FIlterTitle from "./FIlterTitle";
import PriceModal from "./FPrice/PriceModal";
import FilterWrapper from "./FilterWrapper";

const CPrice = () => {
  return (  
    <FilterWrapper>
      <FIlterTitle title="Цена" label="price"/>
      <PriceModal/>
    </FilterWrapper>
  );
}
 
export default CPrice;