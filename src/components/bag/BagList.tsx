'use client'
import { useEffect, useState } from "react";
import BagItem from "./BagItem";
import Cookies from "js-cookie";
import axios from "axios";
import EmptyPage from "../UI/EmptyPage";
import Loading from "../UI/Loading";

const BagList = () => {
  const [bagData, setBagData] = useState<string[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)
  const [coutn, setCount] = useState<number>(0)

  const userId = Cookies.get('id')

  useEffect(() => {
    if(userId !== undefined){
      axios.get(`/api/getBagItems/?userId=${userId}`)
      .then(res => {
        setBagData(res.data)
        setLoaded(true)
      })
      .catch(error => console.log(error))
    }
  }, [userId])

  return (  
    <div className="relative grid grid-cols-profile gap-12 items-start">
      {loaded ? 
      (
        <div className="">
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
        </div>
      ) 
      : 
        (<Loading/>)
      }
      <div className="rounded-xl bg-gray-600 right-0 p-6 text-2xl font-bold">
        Итого: 23423 руб
      </div>
    </div>
  );
}
 
export default BagList;