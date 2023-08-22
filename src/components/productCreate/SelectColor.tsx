'use client'
import { useEffect, useState } from "react";

import { colorsPallet, colorsPalletReverce} from "../../../utils/colors";
import { HiMiniChevronDown, HiMiniChevronUp } from "react-icons/hi2";
import SelectItem from "./SelectItem";


interface SelectColor{
  changeColor: (label: string, value: string) => void;
  handleError: boolean
}
const SelectColor:React.FC<SelectColor> = ({changeColor, handleError}) => {
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [openMainModal, setOpenMainModal] = useState<boolean>(false)

  useEffect(() => {
    changeColor('color', colorsPalletReverce[selectedColor])
  },[selectedColor])
  
  const selectColor = (value: string) => {
    setSelectedColor(value)
  } 

  const renderColorCategory = () => {
    const components = []
    for(const item in colorsPallet){
      components.push(<SelectItem key={item} value={colorsPallet[item].value} color={colorsPallet[item].color} selectedCity={selectedColor} handleChange={selectColor}/>)
    }
    return components
  }

  const toggleColorMenu = () => {
    setOpenMainModal(prev => !prev)
  }
  return ( 
    <div className="mt-4 flex flex-col gap-8">

      {/* КНИПКА ОТКРЫТИЯ ОСНОВНОГО МЕНЮ */}
      <div 
        onClick={toggleColorMenu}
        className={`
          ${handleError && selectedColor === '' ? 'border-red-400' : 'border-purple-400'}
          border 
          p-4 
          rounded-xl relative 
          z-[34]
          
          dark:bg-gray-900 bg-white
          border-purple-400
          capitalize
        `}
      >
        {selectedColor.length > 0 ? selectedColor : 'Выбрать категорию'}

        {/* СТРЕЛОЧКА ПОКАЗЫВАЮЩАЯ ОТКРЫТИЕ ИЛИ ЗАКРЫТИЯ ОСНОВНОГО МЕНЮ */}
        <div
          className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
        >
          {openMainModal ? <HiMiniChevronUp size={26}/> : <HiMiniChevronDown size={26}/>}
        </div>
        {/* БЛОК ОСНОВНОГО МЕНЮ */}
        <div 
        className={`
          ${openMainModal ? 'top-20' : 'top-0'}
          ${openMainModal ? '' : 'invisible'}
          ${openMainModal ? 'opacity-100' : 'opacity-0'}
          left-0
          absolute 
          w-full 
          p-4
          border
          dark:bg-gray-900 bg-white
          border-purple-400
          transition-all 
          flex 
          flex-col 
          gap-2
          rounded-xl 
          z-30
          capitalize
        `}
      >
        <div className="max-h-[250px] overflow-y-scroll">
          {renderColorCategory()}
        </div>
        </div>
      </div>
    </div>
  );
}
 
export default SelectColor;