'use client'
import { ReactNode } from "react";
import { useAppSelector } from "@/redux/store"

const CModal = ({children, label} : {children: ReactNode, label: string}) => {
  const storeValue = useAppSelector(store => store.filterModal.openModal)

  return (  
    <div 
      className={`
        ${ label === storeValue ? 'h-[300px] md:h-[350px]' : 'h-0'} 
        ${ label === storeValue ? 'py-4' : 'py-0'} 
        overflow-y-scroll
        absolute top-10 left-0 
        w-[300px] px-4
        dark:bg-gray-700 bg-gray-200 z-[25]
        rounded-xl transition-all duration-300 flex flex-col gap-3
      `}
    >
      {children}
    </div>
  );
}
 
export default CModal;