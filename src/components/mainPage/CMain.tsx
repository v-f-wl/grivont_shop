import CWraper from "../UI/CWraper";
import CCategory from "./CCategory";
import CEvents from "./CEvents";
import CFavorive from "./CFavorive";
import CInfo from "./CInfo";
import CPopular from "./CPopular";

const CMain = () => {
  return ( 
    <CWraper>
      <CCategory/>
      <CInfo/>
      <CPopular/>
      <CFavorive/>
      <CEvents/>
    </CWraper>
  );
}
 
export default CMain;