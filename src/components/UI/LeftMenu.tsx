'use client'
import React, { Fragment, useState } from "react";
import { BiHive } from 'react-icons/bi'
import Cookies from "js-cookie";

import 
{ 
  HiOutlineHome, 
  HiOutlineUser, 
  HiOutlineShoppingBag, 
  HiOutlineBookmark, 
  HiOutlineCog8Tooth,
  HiOutlineCalendarDays,
  HiOutlineCursorArrowRipple,
  HiOutlineTruck,
  HiOutlineXMark
} from 'react-icons/hi2'
import { useRouter } from "next/navigation";

const LeftMenu: React.FC = () => {
  const [mobileBurger, setMobileBurger] = useState<boolean>(false) 
  const router = useRouter()
  const userID = Cookies.get('id')

  const linkStyle = 'text-xl p-2 lg:text-4xl flex w-full gap-3 text-gray-100 border border-gray-700 hover:border-purple-400/40 transition  justify-start rounded-xl items-center cursor-pointer font-light'
  const styleForComponent = `${mobileBurger ? 'w-full' : 'w-50px'} ${mobileBurger ? 'bg-slate-900' : ''} left-menu lg:hover:shadow-lg lg:hover:shadow-indigo-500/50  py-2 md:py-4 px-1 lg:py-6 lg:px-4 fixed z-40 left-0 top-0 lg:absolute lg:top-3 lg:left-3 lg:bottom-3  lg:w-[76px]  lg:bg-gray-700  lg:rounded-xl  transition-all duration-300 flex flex-col gap-6 items-center`

  const routes = [
    {
      icon: HiOutlineHome,
      href: '/',
      label:'Главная страница'
    },
    {
      icon: HiOutlineUser,
      href: `/profilepage/?id=${userID}`,
      label:'Мой профиль'
    },
    {
      icon: HiOutlineShoppingBag,
      href: '/userbag',
      label:'Корзина'
    },
    {
      icon: HiOutlineBookmark,
      href: '/favorite',
      label:'Избранное'
    },
    {
      icon: HiOutlineTruck,
      href: '/orderspage',
      label:'Мои заказы'
    },
    {
      icon: HiOutlineCalendarDays,
      href: '/soon',
      label:'События'
    },
    {
      icon: HiOutlineCursorArrowRipple,
      href: '/servicespage',
      label:'Сервисы'
    },
    {
      icon: HiOutlineCog8Tooth,
      href: '/soon',
      label:'Настройки'
    }
  ]
  return ( 
    <div 
      className={styleForComponent}>
      <div 
        onClick={() => setMobileBurger(prev => !prev)}
        className="flex items-center gap-4"
      >
        <BiHive size={48} className="text-purple-700 transition-all lg:hover:rotate-90 cursor-pointer mr-1"/>
        <span className={`${mobileBurger ? 'block' : 'hidden'} left-menu__name left-menu__name--logo text-2xl font-bold`}>Grivont</span>
      </div>
      <div 
        onClick={() => setMobileBurger(false)}
        className={`${mobileBurger ? 'block' : 'hidden'} absolute top-6 right-6 lg:hidden`}
      >
        <HiOutlineXMark size={24}/>
      </div>
      <nav 
        className={`
          ${mobileBurger ? 'opacity-100' : 'opacity-0'} 
          ${mobileBurger ? 'visible' : 'invisible'}
          ${mobileBurger ? 'bg-slate-900' : ''}
          ${mobileBurger ? 'bottom-0' : ''}  
          ${mobileBurger ? 'right-0' : ''}  
          ${mobileBurger ? 'left-0' : ''}  
          ${mobileBurger ? 'w-full' : ''}  
          ${mobileBurger ? 'h-screen' : ''}  
          lg:visible
          top-[23px]
          md:top-[40px]
          lg:opacity-100
          pt-5
          lg:pt-0
          transition-all
          z-30
          lg:bg-inherit
          absolute 
          lg:static
          mt-10 
          flex 
          flex-col 
          gap-4
          items-center
          lg:items-start 
        `}
      >
        {routes.map((item, index) => (
          <Fragment key={`${item.href}-${index}`} >
            <div onClick={() => router.push(item.href)} className={linkStyle}>
              <item.icon size={28}/>
              <span className="left-menu__name">{item.label}</span>
            </div>
            {item.label === 'События' && (
              <div className="w-full max-w-[280px] border-t-2 border-purple-400 p-1 lg:w-full lg:max-w-[full]"></div>
            )}
          </Fragment>
        ))}
      </nav>
    </div>
  );
}
 
export default LeftMenu;