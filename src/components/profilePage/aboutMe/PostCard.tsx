'use client'

import { useEffect, useState } from 'react'

import axios from 'axios'
import Cookies from 'js-cookie'

import { 
  HiOutlineHeart, 
  HiOutlineEllipsisVertical,
  HiOutlineChatBubbleBottomCenterText 
} from 'react-icons/hi2'

import { AppDispatch, useAppSelector } from '@/redux/store'
import { useDispatch } from 'react-redux'
import { changeMenu } from "@/redux/features/wallsCard-slice"

interface PostCardProps{
  id: string,
  title: string,
  time: string,
  name: string,
  isUser: boolean,
  likeCollection: string[],
  commentCollection: Object[],
}

const PostCard:React.FC<PostCardProps> = (
  {
    id,
    title, 
    time, 
    name,
    likeCollection, 
    commentCollection,
    isUser
  }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [likeCount, setLikeCount] = useState<number>(likeCollection.length)

  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)
  const [postDeleted, setPostDeleted] = useState<boolean>(false)

  const isOpenMenu = useAppSelector((state) => state.cardMenu.value)
  const createData = new Date(time)
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const userId = Cookies.get('id')

  const dispatch = useDispatch<AppDispatch>()

  // ПРОВЕРКА НА ТО, ПОСТАВИЛ ЛИ ПОЛЬЗОВАТЕЛЬ ЛАЙК
  useEffect(() => {
    if(userId !== undefined){
      if(likeCollection.indexOf(userId) > -1){
        setIsLiked(true)
      }
    }
  },[likeCollection, userId])

  // ОТКРЫТИЕ МЕНЮ У ОДНОГО ПОСТА
  useEffect(() => {
    setMenuIsOpen(isOpenMenu === id)
  },[isOpenMenu, id])

  // ОТКРЫТИЕ МЕНЮ У ОДНОГО ПОСТА
  const openMenu = () => {
    if(isOpenMenu === id){
      dispatch(changeMenu(''))
    }else{
      dispatch(changeMenu(id))
    }
  }

  // ДОБАВЛЕНИЕ/УДАЛЕНИЕ ЛАЙКА
  const targetLike = () => {
    const data = {userId, postId: id}
    axios.patch('/api/post/likeTarget', data)
    .then(() => {
      setIsLiked(prev => prev = !prev)
      if(isLiked === false){
        setLikeCount(prev => prev = prev + 1)
        setIsLiked(true)
      }else{
        setLikeCount(prev => prev = prev - 1)
        setIsLiked(false)
      }
    })
    
  }

  // УДАЛЕНИЕ ПОСТА
  const deletePost = () => {
    axios.delete(`/api/post/deletePost/?id=${id}`)
    .then(() => {
      setPostDeleted(true)
    })
  }

  // ПРЕОБРАЗОВАНИЕ ДАТЫ
  const dateString = createData.toLocaleDateString('ru-RU', options);

  return ( 
    <div 
      className={`
        ${postDeleted && 'hidden'}
        dark:bg-gray-800 bg-gray-100 p-3 md:p-8 rounded-xl flex flex-col gap-2 md:gap-4 z-0 relative
      `}
    >

      {/* МЕНЮ ДЛЯ ПОЛЬЗОВАТЕЛЯТЬ ДЛЯ УДАЛЕНИЯ ПОСТА */}
      <div className={`${isUser ? 'block' : 'hidden'} absolute top-3 md:top-8 right-3 md:right-4`}>
        <div 
          onClick={openMenu}
          className={` text-gray-500 cursor-pointer`}
        >
          <HiOutlineEllipsisVertical size={24}/>
        </div>
        <div 
          className={`
            ${menuIsOpen ? 'block' : 'hidden'}
            absolute 
            top-12 
            w-[200px]
            right-4 
            rounded-xl 
            dark:bg-gray-700 bg-gray-300
          `}
        >
          <ul className="p-2 flex flex-col gap-2">
            <li 
              onClick={() => deletePost()}
              className='p-2 md:p-3 lg:p-4 rounded-xl border border-purple-400 cursor-pointer'
            >
              Удалить
            </li>
          </ul>
        </div>
      </div>


      {/* БЛОК ИМЕНИ И ДАТЫ */}
      <div className="">
        <div className="text-md dark:font-normal font-medium md:text-xl">{name}</div>
        <div className="text-sm md:text-base font-light text-gray-400">{dateString}</div>
      </div>


      {/* ТЕКСТ ПОСТА */}
      <div className="text-md md:text-xl font-medium dark:text-indigo-300 text-gray-600 pr-4 whitespace-normal  break-words">
        {title}
      </div>


      {/* КНОПКА ЛАЙКА И КОМЕНТАРИЕВ */}
      <div className="mt-2 md:mt-4 flex gap-3 md:gap-6 text-md md:text-xl">
        <div 
          onClick={() => targetLike()}
          className={`${isLiked && 'border-red-400'} flex gap-2 items-center border-2 dark:border-white border-purple-400 rounded-full py-1 md:py-2 px-2 md:px-3 cursor-pointer`}
        >
          <HiOutlineHeart/>
          <span>{likeCount}</span>
        </div>
        <div className="flex gap-2 items-center border-2 dark:border-white border-purple-400 rounded-full py-1 md:py-2 px-2 md:px-3 opacity-40">
          <HiOutlineChatBubbleBottomCenterText/>
          <span>{commentCollection.length}</span>
        </div>
      </div>
    </div>
  );
}
 
export default PostCard;