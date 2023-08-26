'use client'
import Arrow from "./Arrow";

import { AppDispatch } from "@/redux/store"
import { changeFilterModal } from "@/redux/features/filterModal-slice"; 
import { useDispatch } from "react-redux"

interface FilterTitleProps{
  title: string,
  label: string
}
const FIlterTitle:React.FC<FilterTitleProps> = ({title, label}) => {
  const dispatch = useDispatch<AppDispatch>()
  return ( 
    <div 
      onClick={() => dispatch(changeFilterModal(label))}
      className="flex items-center gap-1 md:gap-2 cursor-pointer"
    >
      <Arrow label={title} /> {title}
    </div>
  );
}
 
export default FIlterTitle;