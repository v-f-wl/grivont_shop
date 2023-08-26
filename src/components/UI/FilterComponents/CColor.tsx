import ColorModal from "./FColor/ColorModal";
import FIlterTitle from "./FIlterTitle";
import FilterWrapper from "./FilterWrapper";

const CColor = () => {
  return ( 
    <FilterWrapper>
      <FIlterTitle title="Цвет" label='color'/>
      <ColorModal/>
    </FilterWrapper>
  );
}
 
export default CColor;