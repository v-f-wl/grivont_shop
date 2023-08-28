'use client'
import Link from "next/link";
import { colorsPallet } from "../../../../utils/colors";
import { useEffect, useState } from "react";
import axios from "axios";

interface PInfoListProps{
  category: string,
  userId: string,
  colorInfo: string,
  countOfProducts: number
}
const PInfoList: React.FC<PInfoListProps> = ({
  category,
  userId,
  colorInfo,
  countOfProducts
}) => {
  const [authtorNick, setAuthtorNick] = useState('')
  useEffect(() => {
    const fetchAuthorNick = async () => {
      if (userId !== undefined) {
        try {
          const profileNameResponse = await axios.get(`/api/user/getProfileName/?id=${userId}&onlyNick=true`);
          setAuthtorNick(profileNameResponse.data.nickname);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchAuthorNick();
  }, [userId]);

  return (  
    <div className="mt-2 md:mt-4 lg:mt-8 inline-flex flex-col gap-1 md:gap-2 dark:text-gray-300 text-gray-700 text-sm md:text-base font-light">
      <div>
        <span className='text-purple-400'>Категория: </span><span className="capitalize">{category}</span>
      </div>
      <Link href={`/profilepage/?id=${userId}`}>
        <span className='text-purple-400'>Автор: </span><span className="capitalize underline">@{authtorNick || "Загрузка..."}</span>
      </Link>
      <div>
        <span className='text-purple-400'>Цвет: </span><span className="capitalize">{colorInfo ? colorsPallet[colorInfo].value : '-'}</span>
      </div>
      <div>
        <span className='text-purple-400'>В наличии: </span><span className="capitalize">{countOfProducts}</span>
      </div>
    </div>
  );
}
 
export default PInfoList;