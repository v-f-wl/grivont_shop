'use client'

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProfileName from "./profileAvatar/ProfileName";
import LoadingProfileName from "./profileAvatar/LoadingProfileName";


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

  // ПОЛУЧЕНИЕ ИМЯ АВТОРА
  useEffect(() => {
    if(id !== undefined){
      axios.get(`/api/user/getProfileName/?id=${id}`)
      .then(res => {
        settUserData(res.data)
        setIsLoaded(true)
      })
    }
  },[id])

  return ( 
    <div className="">
      {isLoaded ? 
        <ProfileName imageUrl={userData.imageSrc || ''}  fullName={userData.fullName} nickName={userData.nickname}/>
        :
        <LoadingProfileName/>
      }
    </div>
  );
}
 
export default ProfileAvatar;