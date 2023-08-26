'use client'
import { ReactNode } from "react";
import { useAppSelector } from "@/redux/store"

interface CreatePostContainetProps{
  children: ReactNode
}

const CreatePostContainet: React.FC<CreatePostContainetProps> = ({children}) => {
  const modalLavbel = useAppSelector(store => store.createModal.openModal)
  return ( 
    <div 
      className={`
        ${modalLavbel === 'post' ? 'top-12' : '-top-12'}
        ${modalLavbel === 'post' ? 'opacity-100' : 'opacity-0'}
        ${modalLavbel === 'post' ? 'visible' : 'invisible'}
        absolute transition-all
        md:top-12
        left-0
        md:left-0 
        md:-translate-x-1/2 
        w-full
        md:w-[400px] z-[55]
        dark:bg-gray-800 bg-gray-200 p-3 md:p-6
        rounded-xl
      `}
    >
      {children}
    </div>
  );
}
 
export default CreatePostContainet;