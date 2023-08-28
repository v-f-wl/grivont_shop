const OrderInfo = ({totalPrice, totalCount} : {totalPrice: number, totalCount: number}) => {
  return ( 
    <div className="mt-2 md:mt-3 py-1 md:py-2 dark:text-gray-100 text-gray-800 text-lg grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4">
      <div className="">Общая стоимость: {totalPrice} руб.</div>
      <div className="">Колличество позиций: {totalCount}</div>
      <div className="">Статус: {'Не подтверждено'}</div>
    </div>
  )
}
 
export default OrderInfo;