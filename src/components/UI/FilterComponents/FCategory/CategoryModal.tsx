'use client'
import { useState } from "react";
import { categoryMappings, mainCategory } from "../../../../../utils/categoryMappings";
import CModal from "../CModal";
import ModalTitle from "../ModalTitle";
import CategorySelect from "./CategorySelect";
import { categories } from "../../../../../utils/category";
import ResetButton from "../ResetButton";
import ApplyBtn from "../ApplyBtn";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { changeFilterData } from "@/redux/features/filterData-slice";
import { changeFilterModal } from "@/redux/features/filterModal-slice";

interface CategoryData{
  [key:string]: string
}
const CategoryModal = () => {
  const [categoryData, setCategoryData] = useState<CategoryData>({
    mainCategory: '',
    subCategory: ''
  })
  const dispatch = useDispatch<AppDispatch>()


  const changeCategortyValue = (label: string, value: string) => {
    setCategoryData(prev => {
      const obj = {...prev}
      obj[label] = value
      return obj
    })
  }

  const applyFilter = () => {
    if(categoryData.subCategory !== ''){
      dispatch(changeFilterData({key: 'subCategory', value: categoryMappings[categoryData.subCategory]}))
    }else{
      dispatch(changeFilterData({key: 'mainCategory', value: categoryMappings[categoryData.mainCategory]}))
    }
    dispatch(changeFilterModal(''))
  }
  
  const resetFilter = () => {
    dispatch(changeFilterData({key: 'subCategory', value: 'undefined'}))
    dispatch(changeFilterData({key: 'mainCategory', value: 'undefined'}))
    dispatch(changeFilterModal(''))
  }

  return ( 
    <CModal label="category">
      <ModalTitle title="Выбрать категорию"/>
      <CategorySelect 
        dataList={mainCategory}
        mute={false}
        label='mainCategory'
        placeholder='Категория'
        changeValue={changeCategortyValue}
        value={categoryData.mainCategory}
      />
      <CategorySelect 
        dataList={categories[categoryData.mainCategory] || null}
        mute={categoryData.mainCategory === ''}
        label='subCategory'
        placeholder='Подкатегория'
        changeValue={changeCategortyValue}
        value={categoryData.subCategory}
      />
      <div className="mt-auto">
        <ApplyBtn clickBtn={applyFilter}/>
        <ResetButton clickBtn={resetFilter}/>
      </div>
    </CModal>
  );
}
 
export default CategoryModal;