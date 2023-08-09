'use client'
import { useState } from "react";
import Title from "../UI/Title";
import Loading from "../UI/Loading";
import EmptyPage from "../UI/EmptyPage";
import OrderItem from "./OrderItem";

const initialState = {
  _id: ''
}

const OrderContainer = () => {
  const [loaded, setLoaded] = useState<boolean>(true)
  const [orderData, setOrderData] = useState<Object []>([{sdf: 'sd'}])

  const renderScreen = () => {
    if(orderData.length > 0){
      return (
        <div className="flex flex-col gap-8">
          <OrderItem/>
          <OrderItem/>
          <OrderItem/>
          <OrderItem/>
        </div>
    )
    }else{
      return <EmptyPage title="У вас пока нет заказов"/>
    }
  }
  return ( 
    <div className="mt-[80px] md:mt-[120px]">
      <Title title="Мои заказы"/>
      <div className="mt-12">
        {loaded ? 
          (renderScreen()) 
          : 
          (<Loading/>)
        }
      </div>
    </div>
  );
}
 
export default OrderContainer;