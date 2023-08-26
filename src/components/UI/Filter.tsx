import { BlockLike } from "typescript";
import CFilter from "./FilterComponents/CFilter";
import FIlterLabel from "./FilterComponents/FIlterLabel";
import { ReactNode } from "react";

interface FilterProps{
  children: ReactNode,
  isLoaded: boolean
}

const Filter:React.FC<FilterProps> = ({children, isLoaded}) => {
  return (  
    <CFilter isLoaded={isLoaded}>
      <FIlterLabel/>
      {children}
    </CFilter>
  );
}
 
export default Filter;