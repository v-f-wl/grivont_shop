import { HiMiniChevronDown, HiMiniChevronUp } from "react-icons/hi2";

interface ArrowProps{
  label: string
}
const Arrow:React.FC<ArrowProps> = ({label}) => {
  const isOpen = false
  return ( 
    <div className="text-sm md:text-xl">
      {isOpen ? <HiMiniChevronUp /> : <HiMiniChevronDown/>}
    </div>
  );
}
 
export default Arrow;