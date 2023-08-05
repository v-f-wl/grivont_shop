'use client'
import { useEffect, useState } from "react";
import { HiMiniChevronDown, HiMiniChevronUp } from "react-icons/hi2";
import { categories } from "../../../utils/category"
import SelectItem from "./SelectItem";

const SelectCategory = () => {
  const [mainCategory, setMainCategory] = useState<string>('')
  const [subCategory, setSubCategory] = useState<string>('')
  const [openMainModal, setOpenMainModal] = useState<boolean>(false)
  const [openSubModal, setOpenSubModal] = useState<boolean>(false)

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
      <div 
        onClick={openMainDropdown}
        className="border p-4 border-purple-400 rounded-xl relative z-30 bg-gray-900 capitalize">
        {mainCategory.length > 0 ? mainCategory : 'Выбрать категорию'}
        <div
          className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
        >
          {openMainModal ? <HiMiniChevronUp size={26}/> : <HiMiniChevronDown size={26}/>}
        </div>
        <div 
        className={`
          ${openMainModal ? 'top-20' : 'top-0'}
          ${openMainModal ? '' : 'invisible'}
          ${openMainModal ? 'opacity-100' : 'opacity-0'}
          left-0
          absolute 
          w-full 
          p-4
          bg-gray-800  
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
          {renderMainCategory()}
        </div>
      </div>
      </div>
      {mainCategory.length > 0 && (
        <div 
        onClick={openSubDropdown}
        className="border p-4 border-purple-400 rounded-xl relative z-10 bg-gray-900 capitalize">
        {subCategory.length > 0 ? subCategory : 'Выбрать подкатегорию'}
        <div
          className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
        >
          {openSubModal ? <HiMiniChevronUp size={26}/> : <HiMiniChevronDown size={26}/>}
        </div>
        <div 
        className={`
          ${openSubModal ? 'top-20' : 'top-0'}
          ${openSubModal ? '' : 'invisible'}
          ${openSubModal ? 'opacity-100' : 'opacity-0'}
          left-0
          absolute 
          w-full 

          max-h-[210px] overflow-y-scroll
          p-4
          bg-gray-800  
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