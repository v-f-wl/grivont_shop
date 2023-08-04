'use client'
import Link from "next/link";
import React from "react";
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
  HiOutlineCursorArrowRipple
} from 'react-icons/hi2'

const LeftMenu: React.FC = () => {
  const userID = Cookies.get('id')
  const linkStyle = 'text-4xl flex gap-3 text-gray-100 hover:text-purple-700 transition  justify-center items-center cursor-pointer'
  return ( 
    <div 
      className=" hover:shadow-md hover:shadow-indigo-500/50 
        left-menu
        py-6
        px-4
        absolute 
        z-40
        top-3 
        left-3 
        bottom-3 
        lg:w-[76px] 
        bg-gray-700 
        rounded-xl 
        transition-all duration-300
        flex flex-col gap-6 items-center
      "
    >
      <div className="">
        <BiHive size={48} className="text-purple-700 transition-all hover:rotate-90 cursor-pointer mr-1"/>
      </div>
      <nav className="mt-10 flex flex-col gap-6 items-start">
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
        <Link href='/soon' className={linkStyle}>
          <HiOutlineCalendarDays/>
          <span className="left-menu__name">События</span>
        </Link>
        <div className="border-t-2 border-purple-400 p-1 w-full"></div>
        <Link href='/soon' className={linkStyle}>
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