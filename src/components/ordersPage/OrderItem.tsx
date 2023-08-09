const OrderItem = () => {


  const ItemsButton = ({title} : {title: string}) => {
    return (
      <div className="py-2 px-2 md:px-4  text-md border rounded-full cursor-pointer">{title}</div>
    ) 
  }

  return ( 
    <div className="p-4 bg-gray-600 rounded-xl">
      <div className="text-3xl font-bold"><span>Заказ номер - </span><span className="text-purple-400">{2233422}</span></div>
      <span className="block ">Создан: {`23 июля 2022`}</span>

      <div className="mt-3 py-2 text-gray-300 text-lg grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="">Общая стоимость: {234} руб.</div>
        <div className="">Колличество товаров: {234}</div>
        <div className="">Статус: {'Не подтверждено'}</div>
      </div>
      <div className="flex flex-wrap items-center mt-6">
        <ItemsButton title='Просмотреть товары'/>
      </div>
    </div>
  );
}
 
export default OrderItem;