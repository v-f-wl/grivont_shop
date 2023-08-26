import { AppDispatch, useAppSelector } from "@/redux/store"
import { changeModal } from "@/redux/features/createModalOpen-slice"
import { useDispatch } from "react-redux"

import { HiOutlineBellAlert } from 'react-icons/hi2'

const Alert = () => {
  const modalLavbel = useAppSelector(store => store.createModal.openModal)
  const dispatch = useDispatch<AppDispatch>()

  const openAlertModal = () => {
    dispatch(changeModal('alert'))
  }
  return ( 
    <div 
      className="md:relative"
    >
      <HiOutlineBellAlert 
        onClick={openAlertModal}
        className={`${modalLavbel === 'alert' && 'text-indigo-400'} hover:text-indigo-400 transition-colors`}
      />
      <div 
        className={`
          ${modalLavbel === 'alert' ? 'top-12' : '-top-12'}
          ${modalLavbel === 'alert' ? 'opacity-100' : 'opacity-0'}
          ${modalLavbel === 'alert' ? 'visible' : 'invisible'}
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
       <div className="h-full text-base text-center mt-10 text-purple-400">
          Уведомлений нет
       </div>
      </div>
    </div>
  );
}
 
export default Alert;