'use client'

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


interface UserDataValue{
  fullName: string,
  imageSrc?: string,
  nickname: string,
  subscribers: Object[],
  subscriptions: Object[]
}

const InitialState: UserDataValue ={
  fullName: '',
  imageSrc: '',
  nickname: '',
  subscribers: [],
  subscriptions: []
}
const ProfileAvatar = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [userData, settUserData] = useState<UserDataValue>(InitialState)
  const router = useRouter()
  const id = router.query.id

  useEffect(() => {
    if(id !== undefined){
      axios.get(`/api/getProfileName/?id=${id}`)
      .then(res => {
        settUserData(res.data)
        setIsLoaded(true)
      })
    }
  },[id])

  return ( 
    <div className="">
      {isLoaded ? 
        (
          <div className='flex flex-col gap-5'>
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-full overflow-hidden">
              <img 
                className="w-full h-full object-cover"
                src={userData.imageSrc !== ''  ? userData.imageSrc : 'https://i.pinimg.com/564x/e0/23/84/e0238444ff148e53cb7bdfe8b4efd4e7.jpg'}  alt="img" />
            </div>
            <h2 className="font-bold text-4xl text-gray-100">
              {userData.fullName}
            </h2>
          </div>
          <div className="text-lg font-medium">
            @{userData.nickname}
          </div>
          <div className="flex items-center gap-6">
            <div className="">
              {userData.subscribers.length} подписчики
            </div>
            <div className="">
            {userData.subscriptions.length} подписки
            </div>
          </div>
          </div>

        )
        :
        (
          <div className='flex flex-col gap-5'>
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-gray-500 animate-pulse overflow-hidden">
            </div>
            <h2 className="font-bold w-[270px] h-[34px] rounded-xl bg-gray-500 animate-pulse">
            </h2>
          </div>
          <div className="w-[100px] h-[26px]  rounded-xl bg-gray-500 animate-pulse">
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-[40px] h-[30px] rounded-xl bg-gray-500 animate-pulse"></span> подписчики
            </div>
            <div className="flex items-center gap-2">
              <span className="w-[40px] h-[30px] rounded-xl bg-gray-500 animate-pulse"></span> подписки
            </div>
          </div>
          </div>
        )
      }
    </div>
  );
}
 
export default ProfileAvatar;