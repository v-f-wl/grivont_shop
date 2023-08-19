'use client'
import React, { Fragment, useState } from "react";
import { useRouter } from "next/navigation";

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
  HiOutlineXMark,
  HiBars3BottomLeft
} from 'react-icons/hi2'


const LeftMenu: React.FC = () => {
  const [mobileBurger, setMobileBurger] = useState<boolean>(false) 
  const router = useRouter()
  const userID = Cookies.get('id')

  // СТИЛИ ДЛЯ ЭЛЕМЕНТОВ НАВИГАЦИИ НАПРОТИВ ИКОНКИ
  const linkStyle = `
    ${mobileBurger ? 'text-purple-500' : 'text-white'}  
    text-xl 
    p-2 
    lg:text-4xl 
    flex w-full 
    gap-3 
    dark:text-gray-100 
    text-purple-500  
    justify-start 
    rounded-xl 
    items-center
     cursor-pointer 
     font-light
    `

  // ГЛАВНЫЕ СТИЛИ ЛЕВОГО МЕНЮ
  const styleForComponent = `
    ${mobileBurger ? 'w-full' : 'w-50px'} 
    ${mobileBurger ? 'dark:bg-gray-700 bg-white' : ''} 
    left-menu 
    lg:hover:shadow-lg 
    lg:hover:shadow-indigo-500/50  
    py-2 md:py-4 px-1 lg:py-6 lg:px-4 
    fixed z-40 left-0 top-0 
    lg:absolute lg:top-3 lg:left-3 lg:bottom-3 
    lg:w-[76px]  
    dark:lg:bg-gray-700 
    lg:bg-purple-500  lg:rounded-xl   
    flex flex-col justify-center gap-6 items-center
    duration-300 
  `

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
    // ГЛАВНЫЙ КОНТЕЙНЕР МЕНЮ
    <div 
      className={styleForComponent}>


      {/* БУРГЕР МЕНЮ */}
      <div 
        onClick={() => setMobileBurger(prev => !prev)}
        className="flex lg:hidden items-center gap-4"
      >

        
        {/* ИКОНКА БУРГЕР МЕНЮ - ПРОПАДАЕТ ПРИ НАЖАТИИ */}
        <HiBars3BottomLeft 
          size={48} 
          className={`
            ${mobileBurger ? 'hidden' : 'block'}  
            lg:hidden 
          text-purple-500  
            cursor-pointer 
            lg:cursor-default
            mr-1
          `}
        />


        {/* ЛОГОТИП САЙТА - ПОЯВЛЯЕТСЯ ПРИ ОТКРТИИ МЕНЮ */}
        <span 
          className={`
          ${mobileBurger ? 'block' : 'hidden'} 
          left-menu__name
          left-menu__name--logo 
        text-purple-500 
          text-2xl 
          font-bold 
          leading-[48px]
        `}>
          Grivont
        </span>
      </div>


      {/* ЗАКРЫТИЕ БУРГЕР МЕРЮ */}
      <div 
        onClick={() => setMobileBurger(false)}
        className={`
          ${mobileBurger ? 'block' : 'hidden'} 
          absolute 
          top-6 right-6 
          lg:hidden
        `}
      >
        <HiOutlineXMark size={24}/>
      </div>


      {/* NAV БЛОК, СКРЫТ В МОБИЛЬНОЙ ВЕРСИИ - ОТКРЫВАЕТСЯ ПРИ НАЖАТИИ БУРГЕР ИКОНКИ, ОТКРЫТ В ДЕСКТОВ ВЕРСИИ */}
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
          ${mobileBurger ? 'bg-white' : ''}  
          lg:visible
          top-[23px] overflow-y-scroll
          lg:opacity-100
          pt-5
          lg:pt-0
          
          z-30
          dark:bg-gray-700 
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
            <div 
              onClick={() => router.push(item.href)} 
              className={linkStyle}
            >
              <item.icon size={28}/>
              <span 
                className="left-menu__name"
              >
                {item.label}
              </span>
            </div>
            {item.label === 'События' && (
              <div className="w-full max-w-[280px] border-t-2 border-purple-400  p-1 lg:w-full lg:max-w-[full]"></div>
            )}
          </Fragment>
        ))}
      </nav>
    </div>
  );
}
 
export default LeftMenu;