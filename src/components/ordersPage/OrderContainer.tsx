'use client'
import { useEffect, useState } from "react";
import Title from "../UI/Title";
import Loading from "../UI/Loading";
import EmptyPage from "../UI/EmptyPage";
import OrderItem from "./OrderItem";
import Cookies from "js-cookie";
import axios from "axios";

interface Items{
  productId: string,
  image: string,
  title: string
}

interface orderData{
  _id: string,
  orderNumber: string,
  totalPrice: number,
  totalCount: number,
  timestamp: string
  items: Items[]
}

const OrderContainer = () => {
  const [loaded, setLoaded] = useState<boolean>(false)
  const [ordersData, setOrdersData] = useState<orderData[]>()
  const userId: string | undefined = Cookies.get('id')

  useEffect(() => {
    if(userId !== undefined){
      axios(`/api/getOrders/?id=${userId}`)
      .then(res => {
        setOrdersData(res.data.reverse())
        return
      })
      .then(() => setLoaded(true))
      .catch(()=> console.log('error'))
    }
  },[userId])

  const renderScreen = () => {
    if(ordersData !== undefined && ordersData.length > 0){
      return (
        <div className="flex flex-col gap-8">
          {ordersData.map(item => (
            <OrderItem
              key={(item._id).toString()}
              orderNumber={item.orderNumber}
              totalPrice={item.totalPrice}
              timeCode={item.timestamp}
              totalCount={item.totalCount}
              orderItems={item.items}
            />
            ))}
        </div>
      )
    }else{
      return <EmptyPage title="У вас пока нет заказов"/>
    }
  }
  return ( 
    <div className="mt-[80px] md:mt-[120px]">
      <Title title="Мои заказы"/>
      <div className="mt-6 md:mt-12  mb-4">
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