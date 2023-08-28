'use client'

import { useState } from "react"
import OrderNumber from "./orderUI/OrderNumber"
import OrderCreateTime from "./orderUI/OrderCreateTime"
import COrderItem from "./orderUI/COrderItem"
import OrderInfo from "./orderUI/OrderInfo"
import BtnOpenModal from "./orderUI/BtnOpenModal"
import ProductModal from "./ProductModal"
import BtnCloseModal from "./orderUI/BtnCloseModal"
import RenderModalProsucts from "./renderOrderItem/RenderModalProsucts"

interface Items{
  productId: string,
  image: string,
  title: string
}

interface OrderItemProps{
  orderNumber: string,
  timeCode: string,
  totalPrice: number,
  totalCount: number,
  orderItems: Items[]
}

const OrderItem:React.FC<OrderItemProps> = ({
  orderNumber,
  totalPrice,
  timeCode,
  totalCount,
  orderItems
}) => {

  const [iSOpenModal, setIsOpenModal] = useState<boolean>(false)

  const openModal = () => {
    setIsOpenModal(true)
  }
  const closeModal = () => {
    setIsOpenModal(false)
  }
  return ( 
    <COrderItem>
      <OrderNumber orderNumber={orderNumber}/>
      <OrderCreateTime dataValue={timeCode}/>
      <OrderInfo totalPrice={totalPrice} totalCount={totalCount}/>
      <BtnOpenModal clickBtn={openModal}/>

      <ProductModal isOpen={iSOpenModal}>
        <BtnCloseModal clickBtn={closeModal}/>
        <RenderModalProsucts orderItems={orderItems}/>
      </ProductModal>
    </COrderItem>
  );
}
 
export default OrderItem;