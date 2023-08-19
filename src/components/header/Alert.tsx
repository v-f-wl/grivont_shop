'use client'
// 
// 
// 
// КОМПОНЕНТ В РАЗРАБОТКЕ
// 
// 
// 

import { useEffect, useRef, useState } from 'react';
import { HiOutlineBellAlert } from 'react-icons/hi2'
import Loading from '../UI/Loading';

interface AlertProps{
  openModal: (title: string) => void;
  modalValue: string
}

const Alert:React.FC<AlertProps> = ({openModal, modalValue}) => {
  const label: string = 'alert'
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [hasPush, setHasPush] = useState<Object[]>([])
  const [loadPush, serLoadPush] = useState<boolean>(true)
  const divRef = useRef<HTMLDivElement | null>(null)


  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element
      const elementWithId = document.getElementById('addproduct')
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])


  useEffect(() => {
    if(isOpen === false && modalValue === label){
      openModal('')
    }
  }, [isOpen])

  useEffect(() => {
    setIsOpen(modalValue === label)
  }, [modalValue]);

  const renderConponent = () => {
    if(loadPush === false && hasPush.length === 0){
      return <Loading/>

    }else if(loadPush === true && hasPush.length > 0){
      return <div className="">dfvdfv</div>
    }else{
      return (
        <div 
          className="
            mt-4 
            text-xl font-medium
            dark:text-purple-400 text-purple-500
            h-[25vh]
            flex 
            items-center 
            justify-center text-center
          "
        >
          Уведомлений пока нет
        </div>
      )
    }
  }
  return ( 
    <div 
      ref={divRef}
      className="md:relative"
    >
      <HiOutlineBellAlert 
        onClick={() => openModal(label)}
        className={`${isOpen && 'text-indigo-400'} hover:text-indigo-400 transition-colors`}
      />
      <div 
        className={`
          ${isOpen ? 'top-12' : '-top-12'}
          ${isOpen ? 'opacity-100' : 'opacity-0'}
          ${isOpen ? 'visible' : 'invisible'}
          absolute transition-all
          top-14
          md:top-12 overflow-y-scroll
          left-0 
          w-full
  
          md:-translate-x-1/2 
          md:w-[300px]
          min-h-[200px] 
          max-h-[400px] 
          dark:bg-gray-800 bg-gray-200
          p-6
          rounded-xl
        `}
      >
       <h3 className="">Уведомления</h3>
       <div className="h-full">{renderConponent()}</div>
      </div>
    </div>
  );
}
 
export default Alert;