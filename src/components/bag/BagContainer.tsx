'use client'
import { useState, useEffect } from "react";
import BagList from "./BagList";
import Loading from "../UI/Loading";
import EmptyPage from "../UI/EmptyPage";
import Title from "../UI/Title";

const BagContainer = () => {
  const[isEmpty, setIsEmpty] = useState<string>('none')

  useEffect(() => {
    const updateStateWithTimeout = () => {
      setTimeout(() => {
        setIsEmpty('list')
      }, 1000)
    }
    updateStateWithTimeout()
  }, [])

  const renderComponent = () => {
    switch(isEmpty){
      case 'none':
        return <Loading/>
      case 'empty':
        return <EmptyPage title="Ваша корзина пуста"/>
      case 'list':
        return <BagList/>
    }
  }

  return ( 
    <div className="mt-[120px] text-gray-100">
      <Title title="Корзина"/>
      <div className="mt-8 mb-4">
        {renderComponent()}
      </div>
    </div>
  );
}
 
export default BagContainer;