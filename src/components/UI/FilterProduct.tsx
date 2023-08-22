'use client'

import { useMemo, useState } from "react";

import { HiAdjustmentsHorizontal, HiMiniChevronDown, HiMiniChevronUp } from "react-icons/hi2";

import { colorsPallet } from "../../../utils/colors";
import { categoryMappings, categories } from "../../../utils/categoryMappings";
import NumericInput from "../productCreate/NumberInput";


interface FilterProductProps{
  isLoading: boolean,
  handleChange: (label: string, value: string) => void,
  withCategory: boolean
}



// КОМПОНЕНТ ДЛЯ ФИЛЬРА ТОВАРОВ 
const FilterProduct:React.FC<FilterProductProps> = ({
  isLoading,
  handleChange,
  withCategory
}) => {
  const [openModal, setOpenModal] = useState('')
  const [openModalCategory, setOpenModalCategory] = useState('')

  const [inStock, setInStock] = useState(false)

  const [selectedColor, setSelectedColor] = useState('')
  const [mainCategory, setMainCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [priceQuery, setPriceQuery] = useState<number>()

  const styleForCaregoryMenu = 'overflow-y-scroll absolute top-10 left-0 md:left-1/2 md:-translate-x-1/2 w-[300px] px-4 dark:bg-gray-700 bg-gray-200 z-[22] rounded-xl transition-all duration-300 flex flex-col gap-3'

  const openColorModal = () => {
    if(!isLoading) return
    setOpenModal(prev => prev === 'color' ? '' : 'color')
  }

  const openCategoryModal = () => {
    if(!isLoading) return
    setOpenModal(prev => prev === 'category' ? '' : 'category')
  }

  const openCategoryMenu = (label:string) => {
    if(!isLoading) return
    setOpenModalCategory(prev => prev === label ? '' : label)
  }

  const selectColor = (value: string) => {
    setSelectedColor(value)
    handleChange('color', value)
    setOpenModal('')
  }

  const resetColorValue = () => {
    setSelectedColor('')
    handleChange('color', 'undefined')
    setOpenModal('')
  }
  
  const selectMainCategory =(value: string) => {
    setSubCategory('')
    setMainCategory(value)
    setOpenModalCategory('')
  }
  
  const selectSubCategory = (value: string) => {
    setSubCategory(value)
    setOpenModalCategory('')
  }

  const sendResultCategory = () => {
    if(!subCategory){
      handleChange('mainCategory', categoryMappings[mainCategory])
      handleChange('subCategory', 'undefined') 
    }else{
      handleChange('subCategory', categoryMappings[subCategory])
    }
    setOpenModal('')
  }

  const resetCategoryValue = () => {
    setMainCategory('')
    setSubCategory('')
    setOpenModal('')
    handleChange('subCategory', 'undefined')
    handleChange('mainCategory', 'undefined')
  }

  const openPriceModal = () => {
    if(!isLoading) return
    setOpenModal(prev => prev === 'price' ? '' : 'price')
  }
  const getPriceValue = (label: string, value: number) => {
    setPriceQuery(value)
  }
  const changePriceValue = () => {
    if(priceQuery) handleChange('maxPrice', priceQuery.toString())
    setOpenModal('')
  }

  const resetPriceValue = () => {
    handleChange('maxPrice', 'undefined')
    setPriceQuery(0)
    setOpenModal('')
  }

  const inStockQuery = () => {
    if(!isLoading) return
    if(!inStock){
      setInStock(true)
      handleChange('inStock', 'yes')
    }else{
      setInStock(false)
      handleChange('inStock', 'undefined')

    }
  }
  const arrowComponent =(value: boolean) => {
    if(value){
      return <HiMiniChevronUp className='text-sm md:text-2xl'/>
    }
    return <HiMiniChevronDown/>
  }

  const renderColorItems = useMemo(() => {
    const arrOfComponents = []
    for(const item in colorsPallet ){
      arrOfComponents.push(
      <div 
        onClick={() => selectColor(item)}
        key={item} 
        className="flex items-center gap-2 cursor-pointer hover:opacity-70"
      >
        <div className="w-5 h-5 rounded-md" style={{background: colorsPallet[item].color}}></div>
        <div className="">{colorsPallet[item].value}</div>
      </div>
    )
    }
    return arrOfComponents
  }, [])

  const renderMainCategory = useMemo(() => {
    const arrOfCategory = []
    for(let item in categories){
      arrOfCategory.push(
        <div 
          key={item}
          onClick={() => selectMainCategory(item)}
          className=" border border-purple-400 py-1 px-2 rounded-xl"
        >
          {item}
        </div>
      )
    }
    return arrOfCategory
  },[])

  const renderSubCategory = useMemo(() => {
    if(!mainCategory){
      return
    }
    const arrComponents = []
    for(let item of categories[mainCategory]){
      arrComponents.push(
        <div 
          key={item}
          onClick={() => selectSubCategory(item)}
          className="border border-purple-400 py-1 px-2 rounded-xl"
        >
          {item}
        </div>
      )
    }
    return arrComponents
  }, [mainCategory])

  return ( 
    <div className="relative flex items-center gap-3 md:gap-14 text-sm md:text-xl font-light select-none relative z-20">
      {/* ЗАГОЛОВЕ - ФИЛЬТ */}
      <div className="hidden md:flex items-center gap-1 text-purple-400">
        <HiAdjustmentsHorizontal size={24}/>
        Фильтр
      </div>


      {/* ФИЛЬТР ЦВЕТА */}
      <div 
        className="md:relative"
        >

        {/* КНОПКА ОТКРЫТИЯ ОКНА СМЕНЫ ЦВЕТА */}
        <div 
          onClick={openColorModal}
          className="flex items-center gap-1 md:gap-2"
        >
          {arrowComponent(openModal === 'color')}
          <span>
            {selectedColor !== '' ? colorsPallet[selectedColor].value : 'Цвет'}
          </span>
        </div>

        {/* МОДАЛЬНОЕ ОКНО СМЕНЫ ЦВЕТА */}
        <div 
          className={`
            ${openModal === 'color' ? 'h-[350px]' : 'h-0'} 
            ${openModal === 'color' ? 'py-4' : 'py-0'} 
            overflow-y-scroll
            absolute top-10 left-0 
            w-[250px] px-4
            dark:bg-gray-700 bg-gray-200 z-[21]
            rounded-xl transition-all duration-300 flex flex-col gap-3
          `}
        >
          
          {/* КНОПКА СБРОСА ЗНАЧЕНИЯ ЦВЕТА */}
          <div 
            onClick={resetColorValue}
            className='
              absolute z-10 top-3 right-3 border 
              border-purple-400 rounded-full 
              text-sm py-1 px-2 
            '
          >
            Сбросить
          </div>

          {/* СПИСОК ЦВЕТОВ */}
          {renderColorItems}
        </div>
      </div>
      

      {/* ФИЛЬТР ВЫБОРА КАТЕГОРИИ */}
      <div 
        className={`${withCategory ? 'block' : 'hidden'} md:relative`}
        >
        <div 
          onClick={openCategoryModal}
          className="flex items-center gap-1 md:gap-2"
        >
          {arrowComponent(openModal === 'category')}
          <span>Категория</span>
        </div>


        {/* МОДАЛЬНОЕ ОКНО ВЫБОРА КАТЕГОРИИ */}
        <div 
          className={`
            ${openModal === 'category' ? 'h-[350px]' : 'h-0'} 
            ${openModal === 'category' ? 'py-4' : 'py-0'} 
            ${styleForCaregoryMenu}
        `}
      >
        <h2 className="text-lg font-medium">Категория</h2>
        <div 
          className={`${mainCategory && 'border-purple-400'} border py-1 px-3 rounded-xl relative`}
          >
          <div 
            onClick={() => openCategoryMenu('main')}
            className="flex items-center justify-between"
          >
            <span> {mainCategory ? mainCategory : 'Выбрать'}</span>
            {arrowComponent(false)}
          </div>
          <div 
            className={`
              ${openModalCategory === 'main' ? 'h-auto' : 'h-0'} 
              ${openModalCategory === 'main' ? 'py-2' : 'py-0'} 
              overflow-y-scroll
              absolute top-10 left-1/2 -translate-x-1/2
              w-[300px] px-4 
              dark:bg-gray-700 bg-gray-200 z-[22]
              rounded-xl transition-all duration-300 flex flex-col gap-3
            `}
          >
            {renderMainCategory}
          </div>
        </div>


        {/* ОКНО ВЫБОРА ПОДКАТЕГОРИИ */}
        <h2 className="text-lg font-medium">Подкатегория</h2>
        <div 
          className={`${subCategory && 'border-purple-400'} border py-1 px-3 rounded-xl relative`}
          >
          <div 
            onClick={() => openCategoryMenu('subCategory')}
            className="flex items-center justify-between"
          >
            <span className="clamped-text"> {subCategory.length > 0 ? subCategory : 'Выбрать'}</span>
            {arrowComponent(false)}
          </div>
          <div 
          className={`
            ${openModalCategory === 'subCategory' ? 'h-[120px]' : 'h-0'} 
            ${openModalCategory === 'subCategory' ? 'py-2' : 'py-0'}
            overflow-y-scroll
            absolute top-10 left-1/2 -translate-x-1/2
            w-[300px] px-4 
            dark:bg-gray-700 bg-gray-200 z-[22]
            rounded-xl transition-all duration-300 flex flex-col gap-3
      `}
          >
            {renderSubCategory}
          </div>
        </div>
        <div className="flex-1"></div>

        {/* КОНТЕЙНЕР ДЛЯ КНОПОК ПРИМЕНИТЬ И СБРОСИТЬ */}
        <div className="flex items-center gap-4 pt-3 border-t dark:border-white border-gray-700">
          <div 
            onClick={sendResultCategory}
            className={`
              ${mainCategory ? 'opacity-100' : 'opacity-50'} 
              ${mainCategory && 'cursor-pointer'} 
              border border-purple-400 
              rounded-xl 
              py-1 px-2 
              font-medium
            `}
          >
            Применить
          </div>
          <div 
            onClick={resetCategoryValue}
            className={`
              ${mainCategory ? 'opacity-100' : 'opacity-50'} 
              ${mainCategory && 'cursor-pointer'} 
              text-base font-medium underline 
              py-2
            `}
          >
            Сбросить
          </div>
        </div>
        </div>
      </div>


      {/* ФИЛЬТР ЦЕНЫ */}
      <div className="md:relative">
        <div 
          onClick={openPriceModal}
          className="flex items-center gap-1 md:gap-2"
        >
          {arrowComponent(openModal === 'price')}
          <span>Цена</span>
        </div>
        <div 
          className={`
            ${openModal === 'price' ? 'h-' : 'h-0'} 
            ${openModal === 'price' ? 'py-4' : 'py-0'} 
            absolute top-10 left-0 md:right-0 px-4 w-[250px] overflow-hidden dark:bg-gray-700 bg-gray-200 z-[22] rounded-xl transition-all duration-300 flex flex-col gap-3
          `}
        >
          <h2 className="">До:</h2>
          <NumericInput changePrice={getPriceValue} handleError={false} placeholderValue="Введите цену" label="price" context=""/>
          <div 
            onClick={changePriceValue}
            className="mt-2 border py-1 text-center rounded-xl border-purple-400 text-lg font-medium cursor-pointer"
          >
            Применить
          </div>
          <div 
            onClick={resetPriceValue}
            className="py-1 text-base underline text-center cursor-pointer"
          >
            Сбросить
          </div>
        </div>
      </div>



      <div 
        onClick={inStockQuery}
        className={`
          ${inStock && 'text-purple-400'} 
          cursor-pointer transition-colors
        `}
      >
        В наличии
      </div>
    </div>
  );
}
 
export default FilterProduct;