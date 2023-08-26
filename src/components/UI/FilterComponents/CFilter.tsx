import { ReactNode } from "react";

interface CFilterProps{
  children: ReactNode,
  isLoaded: boolean
}
const CFilter:React.FC<CFilterProps> = ({children, isLoaded}) => {
  return ( 
    <div 
      className={
        `${isLoaded ? 'opacity-100' : 'opacity-0'} 
        ${isLoaded ? 'visible' : 'invisible'}
        flex
        relative items-center 
        gap-3 md:gap-14 text-sm 
        md:text-xl font-light 
        select-none  z-20
      `}
    >
      {children}
    </div>
   );
}
 
export default CFilter;