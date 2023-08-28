import { HiXMark } from "react-icons/hi2";

const BtnCloseModal = ({clickBtn} : {clickBtn: () => void}) => {
  return ( 
    <div 
      onClick={clickBtn}
      className="absolute top-5 md:top-8 right-4 md:right-8 cursor-pointer"
      >
      <HiXMark size={32}/>
    </div>
  );
}
 
export default BtnCloseModal;