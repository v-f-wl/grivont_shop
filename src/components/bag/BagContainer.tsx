'use client'
import BagList from "./BagList";
import Title from "../UI/Title";

// КЛИЕНТСКИЙ КОНТЕЦНЕР КОРЗИНЫ
const BagContainer = () => {
  return ( 
    <div className="mt-[80px] md:mt-[120px] text-gray-100">
      <Title title="Корзина"/>
      <div className="mt-6 md:mt-12 mb-4">
        <BagList/>
      </div>
    </div>
  );
}
 
export default BagContainer;