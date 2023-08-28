const OrderNumber = ({orderNumber} : {orderNumber: string}) => {
  return ( 
    <div className="text-2xl md:text-3xl font-bold">
      <span>Заказ номер - </span><span className="text-purple-400">{orderNumber}</span>
    </div>
  )
}
 
export default OrderNumber;