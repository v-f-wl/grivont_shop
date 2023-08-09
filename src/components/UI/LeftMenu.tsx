'use client'
import Link from "next/link";
import React, { useState } from "react";
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
  HiOutlineTruck
} from 'react-icons/hi2'

const LeftMenu: React.FC = () => {
  const [mobileBurger, setMobileBurger] = useState<boolean>(false) 
  const userID = Cookies.get('id')
  const linkStyle = 'text-xl lg:text-4xl flex gap-3 text-gray-100 hover:text-purple-700 transition  justify-center items-center cursor-pointer'
  return ( 
    <div 
      className={`
        left-menu
        lg:hover:shadow-lg lg:hover:shadow-indigo-500/50 
        py-4 px-1
        lg:py-6 lg:px-4
        fixed z-40 left-0 top-0
        ${mobileBurger ? 'w-full' : 'w-50px'}
        ${mobileBurger ? 'bg-slate-900' : ''}

        lg:absolute lg:top-3 lg:left-3 lg:bottom-3 
        lg:w-[76px] 

        lg:bg-gray-700 
        lg:rounded-xl 

        transition-all duration-300
        flex flex-col gap-6 items-center
      `}
    >
      <div 
        onClick={() => setMobileBurger(prev => !prev)}
        className="flex items-center gap-4"
      >
        <BiHive size={48} className="text-purple-700 transition-all lg:hover:rotate-90 cursor-pointer mr-1"/>
        <span className={`${mobileBurger ? 'block' : 'hidden'} left-menu__name left-menu__name--logo text-2xl font-bold`}>Grivont</span>
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
          top-[40px]
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
          gap-5
          items-center

          lg:gap-6 
          lg:items-start 
        `}
      >
        <Link href='/' className={linkStyle}>
          <HiOutlineHome/>
          <span className="left-menu__name">Главная страница</span>
        </Link>
        <Link href={`/profilepage/?id=${userID}`} className={linkStyle}>
          <HiOutlineUser/>
          <span className="left-menu__name">Мой профиль</span>
        </Link>
        <Link href='/userbag' className={linkStyle}>
          <HiOutlineShoppingBag/>
          <span className="left-menu__name">Корзина</span>
        </Link>
        <Link href='/favorite' className={linkStyle}>
          <HiOutlineBookmark/>
          <span className="left-menu__name">Избранное</span>
        </Link>
        <Link href='/orderspage' className={linkStyle}>
          <HiOutlineTruck/>
          <span className="left-menu__name">Мои заказы</span>
        </Link>
        <Link href='/soon' className={linkStyle}>
          <HiOutlineCalendarDays/>
          <span className="left-menu__name">События</span>
        </Link>
        <div className="w-full max-w-[280px] border-t-2 border-purple-400 p-1 lg:w-full lg:max-w-[full]"></div>
        <Link href='/servicespage' className={linkStyle}>
          <HiOutlineCursorArrowRipple/>
          <span className="left-menu__name">Сервисы</span>
        </Link>
        <Link href='/soon' className={linkStyle}>
          <HiOutlineCog8Tooth/>
          <span className="left-menu__name">Настройки</span>
        </Link>
      </nav>
    </div>
  );
}
 
export default LeftMenu;