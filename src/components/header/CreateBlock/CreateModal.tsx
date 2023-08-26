'use client'
import { useAppSelector } from "@/redux/store";
import { ReactNode } from "react";

interface CreateModalProps{
  children: ReactNode
}
const CreateModal:React.FC<CreateModalProps> = ({children}) => {
  const modalLavbel = useAppSelector(store => store.createModal.openModal)
  return ( 
    <div 
        className={`
          ${modalLavbel === 'product' ? 'top-12' : '-top-12'}
          ${modalLavbel === 'product' ? 'opacity-100' : 'opacity-0'}
          ${modalLavbel === 'product' ? 'visible' : 'invisible'}
          absolute 
          top-14 md:top-12 left-0
          transition-all md:-translate-x-1/2 
          w-full md:w-[340px]
          dark:bg-gray-800 bg-gray-200 p-3 md:p-6
          select-none
          rounded-xl
        `}
      >
        {children}
    </div>
  );
}
 
export default CreateModal;