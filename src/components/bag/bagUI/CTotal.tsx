import { useState } from "react";

type CountInfo = {
  totalPrice: number,
  totalCount: number
}
interface CTotalProps{
  reqSended: boolean,
  sendRequest: () => void,
  countInfo:CountInfo,
  reqError: boolean,
  isLoaded: boolean
}
const CTotal:React.FC<CTotalProps> = ({reqSended, sendRequest,countInfo, reqError, isLoaded}) => {
  const [orderModal, setOrderModal] = useState(false)
  return (  
    <div 
      className={`${isLoaded ? 'block' : 'hidden'} w-full lg:w-auto relative rounded-xl dark:bg-gray-600 bg-gray-100 p-2 md:p-3 lg:p-6 text-2xl font-bold`}
    >
      {/* LOADER КОТОРОЫЙ ПОЯВЛЯЕТСЯ ПРИ ОТПРАВКИ ЗАПРОСА */}
      <div className={`${reqSended ? 'block' : 'hidden'} absolute inset-0 z-30 rounded-xl bg-gray-700`}></div>


      {/* ОКНО ПОДТВЕРЖДЕНИЯ ЗАКАЗА */}
      <div 
        className={`${orderModal ? 'block' : 'hidden'} z-20 absolute p-4 dark:bg-gray-700 bg-gray-200 rounded-xl inset-0 flex flex-col items-center justify-center gap-4 text-gray-800 dark:text-white`}
      >
        <h2 className="">Вы уверены?</h2>
        <div className="flex items-center gap-6 text-base md:text-lg font-normal">
          <div 
            onClick={sendRequest}
            className="hover:underline transition-all"
          >
            Да
          </div>
          <div 
            onClick={() => setOrderModal(false)}
            className="hover:underline transition-all text-gray-400"
          >
            Нет
          </div>
        </div>
      </div>


      {/* ОКНО ИТОГОВОЙ ЦЕНЫ */}
      <span className="dark:text-white text-gray-900 text-sm md:text-base lg:text-lg">
        Итого: {countInfo.totalPrice} руб.
      </span>
      <div 
        // ПРОВЕРКА НА ТО - НЕ РАВНЯЕТСЯ ЛИ КОРЗИНА ПУСТОЙ
        onClick={() => {if(countInfo.totalPrice > 0) setOrderModal(true)}}
        className={`
          ${countInfo.totalPrice === 0 && 'opacity-50'}
          ${countInfo.totalPrice > 0 && 'hover:opacity-70'} 
          transition-all
          mt-3 md:mt-5 lg:mt-10
          flex 
          items-center 
          justify-center 
          p-0.5 md:p-1 lg:p-2
          text-white 
          bg-purple-400 
          rounded-full
          text-sm md:text-base lg:text-lg
        `}
        >
          {countInfo.totalPrice > 0 ? 'Заказать' : 'Товаров нет'}
      </div>
    {/* ОШИБКА ПРИ ОТПРАВКИ ДАННЫХ НА СЕРВЕР  */}
    <div className={`${reqError ? 'block' : 'hidden'} mt-4 text-red-400 text-sm text-light text-center`}>Что-то пошло не так</div>
    </div>
  );
}
 
export default CTotal;