'use client'
import BagList from "./BagList";
import Title from "../UI/Title";
import CWraper from "../UI/CWraper";

// КЛИЕНТСКИЙ КОНТЕЦНЕР КОРЗИНЫ
const CBag = () => {
  return ( 
    <CWraper>
      <Title title="Корзина"/>
      <div className="mt-3 md:mt-6 lg:mt-12 mb-4">
        <BagList/>
      </div>
    </CWraper>
  );
}
 
export default CBag;