'use client'
import { useEffect, useState } from "react";
import { HiMiniChevronDown, HiMiniChevronUp } from "react-icons/hi2";
import { categories } from "../../../utils/category"
import SelectItem from "./SelectItem";

interface SelectCategory{
  changeCategory: (label: string, value: string) => void;
  handleError: boolean
}
const SelectCategory:React.FC<SelectCategory> = ({changeCategory, handleError}) => {
  const [mainCategory, setMainCategory] = useState<string>('')
  const [subCategory, setSubCategory] = useState<string>('')
  const [openMainModal, setOpenMainModal] = useState<boolean>(false)
  const [openSubModal, setOpenSubModal] = useState<boolean>(false)

  
  // ОБНОВЛЕНИЕ ДАННЫХ РОДИТЕЛЬСКОГО КОМПОНЕНТА CreateContainer ПРИ ВЫБОРЕ ПОДКАТЕГОРИИ
  useEffect(() => {
    changeCategory('category', subCategory)
  },[subCategory])

  const openMainDropdown = () =>{
    setOpenSubModal(false)
    setOpenMainModal(prev => prev = !prev)
  }

  const openSubDropdown = () =>{
    setOpenMainModal(false)
    setOpenSubModal(prev => prev = !prev)
  }

  const changeMainCategory = (value: string) => {
    setMainCategory(value)
  }
  
  const changeSubCategory = (value: string) => {
    setSubCategory(value)
  }

  const renderMainCategory = () => {
    const components = []
    for(const item in categories){
      components.push(<SelectItem key={item} value={item} selectedCity={mainCategory} handleChange={changeMainCategory}/>)
    }
    return components
  }

  const renderSubCategory = () => {
    const components = []

    for(const item of categories[mainCategory]){
      components.push(<SelectItem key={item} value={item} selectedCity={mainCategory} handleChange={changeSubCategory}/>)
    }
    return components
  }
  return ( 
    <div className="mt-4 flex flex-col gap-8">

      {/* КНИПКА ОТКРЫТИЯ ОСНОВНОГО МЕНЮ */}
      <div 
        onClick={openMainDropdown}
        className={`
          ${handleError && mainCategory === '' ? 'border-red-400' : 'border-purple-400'}
          border 
          p-4 
          rounded-xl relative 
          z-[34]
          
          dark:bg-gray-900 bg-white
          border-purple-400
          capitalize
        `}
      >
        {mainCategory.length > 0 ? mainCategory : 'Выбрать категорию'}
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
        <div className="">
          {renderMainCategory()}
        </div>
        </div>
      </div>

      {/* ПРОВЕРКА НА ТО, ЧТО ОСНОВНАЯ КАТЕГОРИЯ ВЫБРАНА */}
      {mainCategory.length > 0 && (
        // КНОПКА ОТКРЫТИЯ ДОП МЕНЮ
        <div 
          onClick={openSubDropdown}
          className={`
            ${handleError && subCategory === '' ? 'border-red-400' : 'border-purple-400'} 
            border 
            p-4
            rounded-xl 
            relative 
            z-[25]
            dark:bg-gray-900 bg-white
            capitalize
          `}
        >
          {subCategory.length > 0 ? subCategory : 'Выбрать подкатегорию'}
        {/* СТРЕЛОЧКА ПОКАЗЫВАЮЩАЯ ОТКРЫТИЕ ИЛИ ЗАКРЫТИЯ ДОП МЕНЮ */}
        <div
          className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
        >
          {openSubModal ? <HiMiniChevronUp size={26}/> : <HiMiniChevronDown size={26}/>}
        </div>
        {/* БЛОК ДОП МЕНЮ */}
        <div 
        className={`
          ${openSubModal ? 'top-20' : 'top-0'}
          ${openSubModal ? '' : 'invisible'}
          ${openSubModal ? 'opacity-100' : 'opacity-0'}
          left-0
          absolute 
          w-full 
          border
          max-h-[210px] overflow-y-scroll
          p-4
          dark:bg-gray-900 bg-white
          border-purple-400
          transition-all 
          flex 
          flex-col 
          gap-2
          rounded-xl 
          z-20
          capitalize
        `}
      >
        <div className="">
          {renderSubCategory()}
        </div>
        </div>
      </div>
      )}
    </div>
  );
}
 
export default SelectCategory;