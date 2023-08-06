'use client'
import { useEffect, useState } from "react";
import BagItem from "./BagItem";
import Cookies from "js-cookie";
import axios from "axios";
import EmptyPage from "../UI/EmptyPage";

const BagList = () => {
  const [bagData, setBagData] = useState<string[]>([])

  const userId = Cookies.get('id')

  useEffect(() => {
    if(userId !== undefined){
      axios.get(`/api/getBagItems/?userId=${userId}`)
      .then(res => {
        setBagData(res.data)
      })
      .catch(error => console.log(error))
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
          <EmptyPage title="Корзина пустая"/>
        )
      }
      <div className="rounded-xl bg-gray-600 right-0 p-6 text-2xl font-bold">
        Итого:
      </div>
    </div>
  );
}
 
export default BagList;