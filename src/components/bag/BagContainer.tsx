'use client'
import BagList from "./BagList";
import Title from "../UI/Title";

const BagContainer = () => {
  return ( 
    <div className="mt-[120px] text-gray-100">
      <Title title="Корзина"/>
      <div className="mt-8 mb-4">
        <BagList/>
      </div>
    </div>
  );
}
 
export default BagContainer;