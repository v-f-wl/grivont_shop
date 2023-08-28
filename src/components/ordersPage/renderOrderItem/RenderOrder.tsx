'use client'
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import OrderItems from "../OrderItems"
import EmptyPage from "@/components/UI/EmptyPage"
import Loading from "@/components/UI/Loading"


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

const RenderOrder = () => {
  const [loaded, setLoaded] = useState(false)
  const [ordersData, setOrdersData] = useState<orderData[]>()
  const userId: string | undefined = Cookies.get('id')

  useEffect(() => {
    if(userId !== undefined){
      axios(`/api/order/getOrders/?id=${userId}`)
      .then(res => {
        setOrdersData(res.data.reverse())
        return
      })
      .then(() => setLoaded(true))
      .catch(()=> console.log('error'))
    }
  },[userId])

  return (  
    <div className="mt-3 md:mt-6 lg::mt-12  mb-4 flex flex-col gap-4 md:gap-6 lg:gap-8">
      <Loading isLoaded={loaded}/>

      {(ordersData !== undefined && ordersData.length > 0)   ? 
        (
          <>
            {ordersData.map(item => (
              <OrderItems
                key={(item._id).toString()}
                orderNumber={item.orderNumber}
                totalPrice={item.totalPrice}
                timeCode={item.timestamp}
                totalCount={item.totalCount}
                orderItems={item.items}
              />
              ))}
          </>
        ) : 
        (
          <EmptyPage title="У вас пока нет заказов"/>
        )
      }
    </div>
  );
}
 
export default RenderOrder;