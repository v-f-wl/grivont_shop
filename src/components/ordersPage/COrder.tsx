import CWraper from "../UI/CWraper";
import Title from "../UI/Title";
import RenderOrder from "./renderOrderItem/RenderOrder";

const COrder = () => {

  return ( 
    <CWraper>
      <Title title="Мои заказы"/>
      <RenderOrder/>
    </CWraper>
  );
}
 
export default COrder;