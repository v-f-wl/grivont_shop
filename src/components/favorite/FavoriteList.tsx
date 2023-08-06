'use client'
import { useEffect, useState } from "react";
import FavoriteCard from "../UI/FavoriteCard";
import Cookies from "js-cookie";
import axios from "axios";
import Loading from "../UI/Loading";

const FavoriteList = () => {
  const [favoriteItem, setFavoriteItem] = useState<string[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)
  const userId = Cookies.get('id')

  useEffect(() => {
    if(userId !== undefined){
      axios.get(`/api/getFavoriteItem/?userId=${userId}`)
      .then(res => {
        setFavoriteItem(res.data)
        setLoaded(true)
      })
      .catch(error => console.log(error))
    }
  },[userId])
  return ( 
    <div className="">
      {loaded ? 
        (
          <div className="grid grid-cols-3 gap-10">
            {favoriteItem.length > 0 ? 
              (
                favoriteItem.map(item => (
                  <FavoriteCard key={item} id={item}/>
                ))
              ) 
              : 
              (
                <div className="col-span-3 mt-8 text-center text-3xl font-bold">
                  У вас пока нет товаров в закладках
                </div>
              )
            }
          </div>
        ) 
        : 
        (
          <div className="h-[30vh]">
            <Loading/>
          </div>
        )
      }
    </div>
  );
}
 
export default FavoriteList;