'use client'

import { useAppSelector } from "@/redux/store";
import AboutMe from "./AboutMe";
import AdsContainer from "./AdsContainer";
import Cookies from "js-cookie";
import PageNavigation from "./PageNavigation";
import ProfileAvatar from "./ProfileAvatar";
import Loading from "../UI/Loading";
import EventsPage from "./EventsPage";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRouter as useRouterLink } from "next/navigation";


import { AppDispatch } from "@/redux/store"
import { changeValue } from "@/redux/features/isPerson-slice"
import { useDispatch } from "react-redux"


interface ButtonProps{
  title: string
}
const ProfilePageContainer = () => {
  const router = useRouter()
  const info = useAppSelector((state) => state.profileSwitch.value)
  const [isPerson, setIsPerson] = useState<boolean>(false)
  const storeId = Cookies.get('id')
  const queryId = router.query.id 
  const routerExit = useRouterLink()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(()=>{
    if(queryId !== undefined && storeId !== undefined){
      const result: boolean = queryId === storeId
      setIsPerson(result)
      dispatch(changeValue(result))
    }

  },[queryId,storeId])

  const renderPage = () =>{
    switch(info){
      case undefined:
        return <Loading/>
      case 'page1': 
        return <AdsContainer idUser={'sdv'}/>
      case 'page2': 
        return <AboutMe/>
      case 'page3': 
        return <EventsPage/>
      default:
        return null
    }
  }

  const Button:React.FC<ButtonProps> = ({title}) =>{
    return (
      <div className="py-2 px-4 border border-purple-400 rounded-full cursor-pointer">
        {title}
      </div>
    )
  }
  const UserFunction = () => {
    return(
      <div 
        onClick={exit}
        className="">
        <Button title="Выход"/>
      </div>
    )
  }

  const CreatorFunction = () =>{
    return (
      <div className="">
        <Button title="Подписаться"/>
      </div>
    )
  }

  const exit = () => {
    Cookies.set('id', '')
    Cookies.set('token', '')
    routerExit.push('/auth')
  }
  return (
    <div className="mt-[120px] mb-4">
      <div className="flex items-start gap-8 justify-between mr-8">
          <ProfileAvatar/>
        <div className="">
          {isPerson ?
            (<UserFunction/>)
            :
            (<CreatorFunction/>)
          }
        </div>
      </div>
      <div className="mt-12">
        <PageNavigation/>
      </div>
      <div className="mt-8 ">
        {renderPage()}
      </div>
    </div>
  );
}
 
export default ProfilePageContainer;