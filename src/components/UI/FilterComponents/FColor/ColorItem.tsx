'use client'

import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"
import { changeFilterData } from "@/redux/features/filterData-slice"
import { changeFilterModal } from "@/redux/features/filterModal-slice"
interface ColorItemProps{
  [key: string]:string
}

//title - название цвета на руском 
//label - цвет для добавления в бъект фильтра
//color - hex код для отрисовки в листе
const ColorItem:React.FC<ColorItemProps> = ({title, label, color}) => {

  const dispatch = useDispatch<AppDispatch>()
  const isColor = useAppSelector(store => store.filterData.color)
  const changeColor = () => {
    dispatch(changeFilterModal(''))
    dispatch(changeFilterData({ key: 'color', value: label }))
  }
  return ( 
    <div 
      onClick={changeColor}
      className={`
        ${isColor === label ? 'border-purple-400' : 'dark:border-gray-300 border-gray-500'}
        flex 
        items-center 
        p-2 gap-2 
        cursor-pointer 
        hover:opacity-70 
        border rounded-lg 
      `}
    >
      <div className="w-5 h-5 rounded-md" style={{background: color}}></div>
      <div className="text-lg">{title}</div>
    </div>
  );
}
 
export default ColorItem;