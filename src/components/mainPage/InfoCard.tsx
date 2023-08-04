'use client'
import { useRef, useState } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2'

interface InfoCardProps{
  titleValue: string,
  descriptionValue: string,
  idValue: string,
}
const InfoCard:React.FC<InfoCardProps> = ({idValue, descriptionValue, titleValue}) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeModal = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
    if(modalRef.current === event.target){
      console.log(true)
    }
  }
  return (  
    <div className="w-full p-4 bg-gray-700 rounded-xl">
      <div 
        ref={modalRef}
        onClick={(event) => closeModal(event)}
        className={`${openModal ? 'block' : 'hidden'} absolute inset-0 bg-gray-800 z-50 bg-opacity-40 flex items-center justify-center`}>
        <div className="relative w-2/3 h-3/4 bg-gray-700 rounded-xl p-8">
          <div 
            onClick={() => setOpenModal(false)}
            className="absolute top-4 right-4 cursor-pointer"
          >
            <HiOutlineXMark size={28}/>
          </div>
          <h3 className="text-3xl font-bold">
            {titleValue}
          </h3>
          <div className="mt-8 text-xl">{descriptionValue}</div>
        </div>
      </div>
      <h3 className="text-2xl font-medium text-gray-300">{titleValue}</h3>
      <div className="mt-8 h-[90px] text-indigo-300">{descriptionValue}</div>
      <div 
        onClick={() => setOpenModal(true)}
        className="mt-8 inline-flex py-2 px-4 border rounded-full cursor-pointer"
      >
          Читать
      </div>
    </div>
  );
}
 
export default InfoCard;