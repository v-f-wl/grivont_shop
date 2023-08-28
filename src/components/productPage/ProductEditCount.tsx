'use client'

import { useState } from "react";
import PEditButton from "./productUI/PEditButton";
import CountModal from "./productUI/CountModal";
import axios from "axios";
import { useRouter } from "next/router";

const ProductEditCount = ({isAuthtor, imageId} : {isAuthtor: boolean | null, imageId: string }) => {
  const [openModal, setOpenModal] = useState(false)
  const [requestSended, setRequestSrnded] = useState(false)
  const router  = useRouter()
  const { id } = router.query


  const targetCountModal = () => {
    setOpenModal(prev => !prev)
  }

  const deleteProduct = () => {
    if(id === undefined || imageId === undefined){
      return
    }
    setRequestSrnded(true)
    axios.delete(`/api/product/deleteProduct/?productId=${id}&imgId=${imageId}`)
      .then(() => {
        router.push('/')
      })
      .catch(error => {
        alert('Что-то пошло не так')
        setRequestSrnded(false)
      })
  }
  return (  
    <div className={`${isAuthtor ? 'flex' : 'hidden'} flex-col gap-4 mt-8`}>
      <div className="flex flex-col gap-2">
        <PEditButton title="Изменить Количество" clickBtn={targetCountModal}/>
        <CountModal isOpen={openModal} productId={id}/>
      </div>
      <PEditButton title="Удалить" clickBtn={deleteProduct} loading={requestSended}/>
    </div>
  );
}
 
export default ProductEditCount;