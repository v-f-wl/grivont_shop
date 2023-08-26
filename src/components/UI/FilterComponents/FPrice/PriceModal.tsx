'use client'
import { useState } from "react";
import ApplyBtn from "../ApplyBtn";
import CModal from "../CModal";
import ModalTitle from "../ModalTitle";
import ResetButton from "../ResetButton";
import PriceInput from "./PriceInput";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { changeFilterData } from "@/redux/features/filterData-slice";
import { changeFilterModal } from "@/redux/features/filterModal-slice";

const PriceModal = () => {
  const [priceValue, setPriceValue] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const changePriceValue = (value: string) => {
    setPriceValue(value)
  }

  const applyFilter = () => {
    const price = priceValue.replace(/\s+/g, '')
    console.log(price.length)
    dispatch(changeFilterData({key: 'maxPrice', value: price}))
    dispatch(changeFilterModal(''))
  } 

  const resetFilter = () => {
    setPriceValue('')
    dispatch(changeFilterData({key: 'maxPrice', value: 'undefined'}))
    dispatch(changeFilterModal(''))
  }
  
  return (  
    <CModal label="price">
      <ModalTitle title="Введите цену"/>
      <PriceInput
        placeholder="Цена до"
        priceValue={priceValue}
        changeValue={changePriceValue}
      />
      <div className="mt-auto">
        <ApplyBtn clickBtn={applyFilter}/>
        <ResetButton clickBtn={resetFilter}/>
      </div>
    </CModal>
  );
}
 
export default PriceModal;