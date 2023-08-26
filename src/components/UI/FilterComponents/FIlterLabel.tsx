import { HiAdjustmentsHorizontal } from "react-icons/hi2";

const FIlterLabel = () => {
  return ( 
    <div className="hidden md:flex items-center gap-1 text-purple-400">
      <HiAdjustmentsHorizontal size={24}/>
      Фильтр
    </div>
  )
}
 
export default FIlterLabel;