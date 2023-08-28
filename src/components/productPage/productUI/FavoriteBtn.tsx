'use client'
import axios from "axios";
import { useEffect, useState } from "react";

const FavoriteBtn = ({userId, productId} : {userId: string | string[] | undefined, productId: string}) => {
  const [loading, setLoading] = useState(false)
  const [inFavorite, setInFavorite] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (productId !== undefined && userId !== undefined) {
        try {
          const favoriteResponse = await axios.get(`/api/favorite/checkProductInFavorite/?userId=${userId}&productId=${productId}`);
          setInFavorite(favoriteResponse.data.result);
          setLoading(true);
        } catch (error) {
          console.log(error)
        }
      }
    };

    fetchData();
  }, [productId, userId]);

  const changeFavorite = async () => {
    if (productId !== undefined && userId !== undefined && loading) {
      setLoading(false)
      try {
        if (!inFavorite) {
          await axios.post('/api/favorite/addToFavorite', { userId, productId });
        } else {
          await axios.patch('/api/favorite/deleteFavoriteItem', { userId, productId });
        }
        setInFavorite(!inFavorite);
        setLoading(true)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (  
    <>
    {loading ?
    (
      <div 
        onClick={changeFavorite}
        className={`
          md:py-2 py-1 px-3 md:px-4 
          border border-purple-400
          rounded-full 
          dark:text-white text-gray-900
          text-bold text-sm
          md:text-xl
          cursor-pointer hover:opacity-80 transition-all
        `}
      >
        {inFavorite ? 'Удалить из закладок' : 'Добавить в закладки'}
      </div>
    )
    :
    (
      <div 
        className="
          md:py-2 py-1 px-3 md:px-4 
          border border-purple-400
          rounded-full 
          dark:text-white text-gray-900 
          text-bold text-sm
          md:text-xl
          cursor-pointer hover:opacity-60 transition-all
          opacity-60
        "
      >
        Загрузка...
      </div>
    )
    }
    </>
  );
}
 
export default FavoriteBtn;