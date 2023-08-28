'use client'
import NumberInput from "@/components/productCreate/NumberInput";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiCheck } from "react-icons/hi2";


const CountModal = ({isOpen, productId} : {isOpen : boolean, productId: string | string[] |undefined}) => {
  const [requestSended, setRequestSended] = useState(false)
  const [responsError, setResponsError] = useState(false)
  const [newCount, setNewCount] = useState(0)
  const { id } = useRouter().query
  const changeValueComponent = (label: string, value: number) => {
    setNewCount(prev => value)
  }

  const changeCountRequest = () => {
    setRequestSended(true)
    if(requestSended === true || id === undefined){
      return
    }else{
      axios.patch('/api/product/changeCountOfProduct', {productId, count: newCount})
        .then(() => setRequestSended(false))
        .then(() => {
          const currentURL = window.location.href;
          const newURL = currentURL
          window.location.href = newURL;

        })
        .catch(error => {
          setResponsError(true)
          console.log(error)
          setRequestSended(false)
        })
    }
  }

  return ( 
    <div 
      className={`
        ${isOpen ? 'h-auto' : 'h-0'}
        overflow-hidden transition-all
        flex items-center gap-4
      `}
    >
      <NumberInput
        changePrice={changeValueComponent} 
        handleError={responsError} 
        placeholderValue='Новое колличество'
        context='' 
        label={'count'}
      />
      <div 
        onClick={changeCountRequest}
        className="border border-purple-400 rounded-lg py-[10px] md:py-3 lg:py-[18px] px-3 mt-4 text-lg cursor-pointer"
      >
        {requestSended ? 
          (
            <AiOutlineLoading3Quarters size={24} className="mx-3 animate-spin"/>
          ) 
          : 
          <HiCheck size={24}/>
        }
      </div>
    </div>
  );
}
 
export default CountModal;