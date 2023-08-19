'use client'

import { useState } from "react"
import Link from "next/link"

import { format } from "date-fns" 
import ruLocale from 'date-fns/locale/ru'


import { HiXMark } from "react-icons/hi2"

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

interface OrderCardProps{
  title: string,
  imageSrc: string,
  productId: string
}

const OrderItem:React.FC<OrderItemProps> = ({
  orderNumber,
  totalPrice,
  timeCode,
  totalCount,
  orderItems
}) => {

  const [openModal, setOpenModal] = useState<boolean>(false)

  // ПРЕОБРАЗОВАНИЕ ДАТЫ
  function formatDateToDMY(inputDate: string): string {
    const date = new Date(inputDate);
    return format(date, 'dd MMMM yyyy',  { locale: ruLocale })
  }

  // КАРТОЧКА В МОДАЛЬНОМ ОКНЕ ЗАКАЗА
  const OrderCard:React.FC<OrderCardProps> = ({title, imageSrc, productId}) => {
    return (
      <div className="border p-4 border-gray-600 rounded-xl flex flex-col gap-4">
        <img src={imageSrc} alt="#" className="aspect-square object-cover object-center rounded-xl"/>
        <h3 className="clamped-text h-[42px]">{title}</h3>
        <Link
          href={`/productpage/?id=${productId}`}
          className="py-1 md:py-2 text-lg font-medium cursor-pointer border dark:border-white border-gray-600 rounded-full flex items-center justify-center"
        >
          О товаре
        </Link>
      </div>
    )
  }

  return ( 
    <div className="p-2 py-4 md:p-4 dark:bg-gray-600 bg-gray-100 rounded-xl">
      {/* НОМЕР ЗАКАЗА */}
      <div className="text-2xl md:text-3xl font-bold">
        <span>Заказ номер - </span><span className="text-purple-400">{orderNumber}</span>
      </div>
      {/* ДАТА ЗАКАЗА */}
      <span className="block text-sm md:text-base">Создан: {formatDateToDMY(timeCode)}</span>
      {/* ОСНОВНАЯ ИНФОРМАЦИЯ О ЗАКАЗЕ */}
      <div className="mt-2 md:mt-3 py-1 md:py-2 dark:text-gray-100 text-gray-800 text-lg grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4">
        <div className="">Общая стоимость: {totalPrice} руб.</div>
        <div className="">Колличество товаров: {totalCount}</div>
        <div className="">Статус: {'Не подтверждено'}</div>
      </div>
      {/* КНОПКА ОТКРЫТИЯ МОДАЛЬНОГО ОКНА С ДАННЫМИ О ТОВАРАХ */}
      <div className="flex flex-wrap items-center mt-4 md:mt-6">
        <div 
          onClick={() => setOpenModal(true)}
          className="py-2 px-4 md:px-4  text-md border dark:border-white border-black rounded-full cursor-pointer"
        >
          Просмотреть товары
        </div>
      </div>
      {/* МОДАЛЬНОЕ ОКНО С ДАННЫМИ О ТОВАРАХ */}
      <div className={`${openModal ? 'block' : 'hidden'} fixed inset-0 dark:bg-slate-900/70 bg-slate-600/70 z-50 flex items-center justify-center`}>
        <div className="w-full h-screen overflow-y-scroll lg:w-3/4 lg:h-3/4 dark:bg-gray-800 bg-white lg:rounded-xl p-4 lg:p-8 relative">
            <h3 className="text-2xl md:text-4xl font-medium">
              Товары в заказе
            </h3>
            {/* КНОПКА ЗАКРЫТИЯ МОДАЛЬНОГО ОКНА */}
            <div 
              onClick={() => setOpenModal(false)}
              className="absolute top-5 md:top-8 right-4 md:right-8 cursor-pointer"
            >
              <HiXMark size={32}/>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {orderItems.map(item => (
                <OrderCard 
                  key={item.productId}
                  productId={item.productId}
                  imageSrc={item.image}
                  title={item.title}
                />

              ))}
            </div>
        </div>
      </div>
    </div>
  );
}
 
export default OrderItem;