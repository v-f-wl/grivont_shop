'use client'
import { useEffect, useState } from "react";
import BagItem from "./BagItem";
import Cookies from "js-cookie";
import axios from "axios";

const BagList = () => {
  const [bagData, setBagData] = useState<string[]>([])

  const userId = Cookies.get('id')

  useEffect(() => {
    if(userId !== undefined){
      axios.get(`/api/getBagItems/?userId=${userId}`)
      .then(res => {
        setBagData(res.data)
      })
    }
  }, [userId])
  return (  
    <div className="relative grid grid-cols-profile gap-12 items-start">
      {bagData.length > 0 ? 
        (
          <div className="flex flex-col gap-6">
          {bagData.map(item => (
            <BagItem
              key={item}
              userId={userId}
              id={item}
            />
          ))}
          </div>
        ) 
        : 
        (
          <div className="text-3xl font-medium text-center mt-4">Корзина пустая</div>
        )
      }
      <div className="rounded-xl bg-gray-600 right-0 h-[300px] p-6 ">
        Итоговое окно
      </div>
    </div>
  );
}
 
export default BagList;