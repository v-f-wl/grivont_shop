'use client'

import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { resetFilterData } from "@/redux/features/filterData-slice";
import { changeFilterModal } from "@/redux/features/filterModal-slice";

const ColorResetBtn = () => {
  const dispatch = useDispatch<AppDispatch>()
  const isColor = useAppSelector(state => state.filterData.color)
  
  const resetColor = () => {
    if(isColor !== 'undefined'){
      dispatch(resetFilterData('color'))
    }
    dispatch(changeFilterModal(''))
  }
  return ( 
    <div 
      onClick={resetColor}
      className='
        absolute z-10 top-4 right-3 border 
        border-purple-400 rounded-full 
        text-sm py-1 px-2 
      '
    >
      Сбросить
    </div>
  );
}
 
export default ColorResetBtn;