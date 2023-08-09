'use client'
import { useState } from "react";
import { HiOutlineMinusSmall, HiPlusSmall } from "react-icons/hi2";

interface QuantitySelectorProps{
  deleted: boolean
}
const QuantitySelector:React.FC<QuantitySelectorProps> = ({deleted}) => {

  const [productCount, setProductCount] = useState<number>(1)
  
  const changeCountOfProduct = (modify: string) => {
    if(deleted === true) return
    if(modify === 'minus' && productCount === 1){
      setProductCount(prev => prev = --prev)
    }else if(modify === 'minus' && productCount > 1){
      setProductCount(prev => prev = --prev)
    }else{
      setProductCount(prev => prev = ++prev)
    }
  }
  
  return ( 
    <div className={`${deleted && 'hidden'} relative z-20 max-w-[120px] flex gap-2 items-center justify-between border rounded-full py-2 px-3`}>
      <HiOutlineMinusSmall onClick={() => changeCountOfProduct('minus')}/>
      <div className="inline-block max-w-[40px] overflow-x-hidden h-[20px]">{productCount}</div>
      <HiPlusSmall onClick={() => changeCountOfProduct('plus')}/>
    </div>
  );
}
 
export default QuantitySelector;