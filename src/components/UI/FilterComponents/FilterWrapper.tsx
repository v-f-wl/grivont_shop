import { ReactNode } from "react";

interface FilterWrapperProps{
  children: ReactNode
}
const FilterWrapper:React.FC<FilterWrapperProps> = ({children}) => {
  return ( 
    <div className="md:relative">
      {children}
    </div>
  );
}
 
export default FilterWrapper;