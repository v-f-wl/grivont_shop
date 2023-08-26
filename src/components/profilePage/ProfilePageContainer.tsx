'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRouter as useRouterLink } from "next/navigation";

import Cookies from "js-cookie";
import { useAppSelector } from "@/redux/store";

import PostContainer from "./PostContainer";
import ProductsContainer from "./ProductsContainer";
import PageNavigation from "./PageNavigation";
import ProfileAvatar from "./ProfileAvatar";
import Loading from "../UI/Loading";
import EventsPage from "./EventsPage";


import { AppDispatch } from "@/redux/store"
import { changeValue } from "@/redux/features/isPerson-slice"
import { useDispatch } from "react-redux"


interface ButtonProps{
  title: string,
  mute?: boolean
}
const ProfilePageContainer = () => {
  const router = useRouter()
  const info = useAppSelector((state) => state.profileSwitch.value)
  const [isPerson, setIsPerson] = useState<boolean>(false)
  const storeId = Cookies.get('id')
  const queryId = router.query.id 
  const routerExit = useRouterLink()
  const dispatch = useDispatch<AppDispatch>()


  // ОПРЕДЕЛЯЕТ ЯВЛЯЕТСЯ ЛИ СТРАНИЦА  СТРАНИЦЕЙ АВТОРА 
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
        return <ProductsContainer idUser={'sdv'}/>
      case 'page2': 
        return <PostContainer/>
      case 'page3': 
        return <EventsPage/>
      default:
        return null
    }
  }

  const Button:React.FC<ButtonProps> = ({title, mute}) =>{
    return (
      <div className={`${mute && 'opacity-50'} py-1 px-2 md:py-2 md:px-4 text-sm md:text-base border border-purple-400 rounded-full cursor-pointer`}>
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
      <div className="flex gap-4 opacity-30">
        <Button title="Сообщения" mute={true}/>
        {/* <Button title="Подписаться"/> */}
      </div>
    )
  }

  // ФУНКЦИЯ ВЫХОДА СО СТРАНИЦЫ
  const exit = () => {
    Cookies.set('id', '')
    Cookies.set('token', '')
    routerExit.push('/auth')
  }

  return (
    <div className="mt-[80px] md:mt-[120px] mb-4">
      <div className={`flex ${isPerson ? 'flex-row' : 'flex-col'} md:flex-row items-start gap-2 lg:gap-8 justify-between mt-2 lg:mr-8`}>
          <ProfileAvatar/>
        <div>
          {isPerson ?
            (<UserFunction/>)
            :
            (<CreatorFunction/>)
          }
        </div>
      </div>
      <div className="mt-5 lg:mt-12">
        <PageNavigation/>
      </div>
      <div className="mt-8 ">
        {renderPage()}
      </div>
    </div>
  );
}
 
export default ProfilePageContainer;