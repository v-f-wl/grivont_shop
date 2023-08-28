'use client'
import { useRef, useState } from 'react';

import { HiOutlineXMark } from 'react-icons/hi2'

interface InfoCardProps{
  titleValue: string,
  descriptionValue: string,
  descriptionPrev: string,
}
const InfoCard:React.FC<InfoCardProps> = ({ descriptionPrev, descriptionValue, titleValue}) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const modalRef = useRef<HTMLDivElement | null>(null)

  // ОТВЕЧАЕТ ЗА АЗКРЫТИЕ МОДАЛЬНОГО ОКНА
  const closeModal = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
    if(modalRef.current === event.target){
      setOpenModal(false)
    }
  }

  return (  
    // ЗАДНИЙ ФОН МОДАЛЬНОГО ОКНА ПРИ ОТКРЫТИИ
    <div className="w-full p-3 md:p-4 dark:bg-gray-700 bg-gray-100 rounded-lg dark:text-gray-100 text-gray-900">
      {/* ОТКРЫТОЕ МОДАЛЬНОЕ ОКНО */}
      <div 
        // ref ДЛЯ ОТСЛЕЖИВАНИЯ НАЖАТИЯ ВСЕ МОДАЛЬНОГО ОКНА
        ref={modalRef}
        onClick={(event) => closeModal(event)}
        className={`${openModal ? 'block' : 'hidden'} fixed inset-0 bg-gray-800 z-50 bg-opacity-40 flex items-center justify-center`}>
        <div className="relative w-screen h-screen overflow-y-scroll md:w-2/3 md:h-3/4 dark:bg-gray-700 bg-white md:rounded-xl p-8">
          {/* ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА */}
          <div 
            onClick={() => setOpenModal(false)}
            className="absolute top-4 right-4 cursor-pointer"
          >
            <HiOutlineXMark size={28}/>
          </div>
          <h3 className="text-3xl font-bold">
            {titleValue}
          </h3>
          <div className="mt-8 text-lg md:text-xl">{descriptionValue}</div>
        </div>
      </div>

      {/* ПРЕВЬЮ НА ГЛАВНОЙ СТРАНИЦЕ */}
      <h3 className="text-lg md:text-xl lg:text-2xl font-medium">{titleValue}</h3>
      <div className="mt-3 md:mt-8 lg:h-[80px] text-xs md:text-md lg:text-lg">{descriptionPrev}</div>
      <div 
        onClick={() => setOpenModal(true)}
        className="mt-2 md:mt-3 lg:mt-6 inline-flex py-1 px-3  text-xs md:text-base border dark:border-white border-purple-500 rounded-full cursor-pointer"
      >
          Читать
      </div>
    </div>
  );
}
 
export default InfoCard;