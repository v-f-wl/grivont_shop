'use client'
import { useEffect, useState } from 'react';
import { HiOutlineBellAlert } from 'react-icons/hi2'
import Loading from '../UI/Loading';

interface AlertProps{
  openModal: (title: string) => void;
  modalValue: string
}

const Alert:React.FC<AlertProps> = ({openModal, modalValue}) => {
  const label: string = 'alert'
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [hasPush, setHasPush] = useState<Object[]>([]);
  const [loadPush, serLoadPush] = useState<boolean>(false);

  useEffect(() => {
    const updateStateWithTimeout = () => {
      setTimeout(() => {
        serLoadPush(true);
      }, 3000);
    };
    updateStateWithTimeout();
  }, []);

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
            text-purple-400 
            h-[25vh]
            flex 
            items-center 
            justify-center 
          "
        >
          Уведомлений пока нет
        </div>
      )
    }
  }
  return ( 
    <div className="md:relative">
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
          md:top-12
          left-0 
          w-full
  
          md:-translate-x-1/2 
          md:w-[300px]
          min-h-[200px] 
          max-h-[400px] 
          bg-gray-800 p-6
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