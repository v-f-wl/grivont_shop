import { ReactNode, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Cookies from "js-cookie";
import axios from 'axios';

import { 
  HiOutlineSquaresPlus,
   HiOutlineTag, 
   HiOutlineCalendarDays, 
   HiOutlineXMark, 
   HiOutlineHashtag  
} from 'react-icons/hi2'

import Loading from '../UI/Loading';


interface AddProductProps{
  openModal: (title: string) => void;
  modalValue: string
}

interface ItemContainerProps {
  children: ReactNode,
  link: string,
  mute?: boolean,
  handleFunction?:() => void
}


const AddProduct: React.FC<AddProductProps> = ({openModal, modalValue}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [sendPost, setSendPost] = useState<boolean>(false)
  const [openPost, setOpenPost] = useState<boolean>(false)
  const [postText, setPostText] = useState<string>('')

  const label: string = 'product'
  const userId = Cookies.get('id')
  const divRef = useRef<HTMLDivElement | null>(null)

  // В СЛУЧАЕ НАЖАТИЯ ВНЕ AddProduct - ЗАКРЫВАЕТ МЕНЮ
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element
      const elementWithId = document.getElementById('addproduct')
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  // ОТВЕЧАЕТ ЗА ЗАКРЫТИЕ МЕНЮ НА УРОВНЕ КОМПОНЕНТА NavHeader
  useEffect(() => {
    if(isOpen === false && modalValue === label){
      openModal('')
    }
  }, [isOpen])


  // В КОМПОНЕНТЕ isOpen(setIsOpen) ОТВЕЧАЕТ ЗА ОТКРЫТИЕ МЕНЮ В ЦЕЛОМ 
  // openPost(setOpenPost) ОТВЕЧАЕТ ЗА ОТКРЫТИЕ ОКНА СОЗДАНИЕ ПОСТА
  // modalValue ПРИХОДИТ ИЗ КОМПОНЕНТА NavHeader И НЕОБХОДИМО ДЛЯ ТОГО 
  // ЧТОБЫ ТАКЖЕ УПРАВЛЯТЬ КОМПОНЕНТОВ Alert 
  useEffect(() => {
    setIsOpen(modalValue === label)
    setOpenPost(modalValue === 'post')
  }, [modalValue])


  // ВЫЗЫВАЕТ ФУНКЦИЮ ИЗ NavHeader ДЛЯ ПЕРЕКЛЮЧЕНИЯ ОКНА
  const postModal = () => {
    openModal('post')
  }
  
  // ОТПРАВЛЯЕТ ДАННЫЕ НА СЕРВЕР ДЛЯ СОЗДАНИЯ ПОСТА
  const createPost = () => {
    setSendPost(true)
    if(postText.trim().length < 5){
      setSendPost(false)
      return false
    }else(
      axios.post('/api/post/createPost', {userId, postText})
      .then((res) => {
        setSendPost(false)
        setPostText('')
        openModal(label)
      })
      .catch(() => {
        setSendPost(false)
      })
    )
  }

  // ЭЛЕМЕНТЫ МЕНЮ
  const ItemContainer:React.FC<ItemContainerProps> = ({children, link, mute, handleFunction}) => {
    return (
      <Link href={link}
        onClick={handleFunction}
        className={`
          ${mute && 'opacity-20'}
          ${mute ? '' : 'dark:hover:border-purple-400 hover:border-purple-500'}
          ${mute ? '' : 'cursor-pointer'}
          flex 
          gap-4 
          items-center 
          border 
          p-4 
          rounded-xl  transition-all
        `}
      >
        {children}
      </Link>
    )
  }
  // ЗАГОЛОВОК ДЛЯ ЭЛЕМЕНТОВ МЕНЮ
  const LadelTitle = ({title} : {title: string}) => {
    return <span className="">{title}</span>
  }

  return (  
    <div 
      // ДЛЯ ОТСЛЕЖИВАНИЯ НАЖАТИЯ ВСЕ БЛОКА 
      ref={divRef}
      className="md:relative" id='addproduct'>
      {/* ГЛАВНАЯ ИКОНКА, КОТОРАЯ ОТКРЫВАЕТ ЛИБО ЗАКРЫВАЕТ МЕНЮ */}
      <HiOutlineSquaresPlus
        onClick={() => openModal(label)}
        className={`${isOpen && 'text-indigo-400'} hover:text-indigo-400 transition-colors`}
      />
      {/* БЛОК С ЭЛЕМЕНТАМИ МЕНЮ */}
      <div 
        className={`
          ${isOpen ? 'top-12' : '-top-12'}
          ${isOpen ? 'opacity-100' : 'opacity-0'}
          ${isOpen ? 'visible' : 'invisible'}
          absolute transition-all
          top-14
          md:top-12
          left-0
          md:-translate-x-1/2 
          w-full
          md:w-[340px]
          dark:bg-gray-800 bg-gray-200 p-3 md:p-6
          rounded-xl
        `}
      >
        <h3 className="">Добавить</h3>
        <div className="mt-6 flex flex-col gap-4 text-base">
          <ItemContainer link='/productcreate'>
            <HiOutlineTag size={26}/>
            <LadelTitle title="Добавить Товар"/>
          </ItemContainer>
          <ItemContainer handleFunction={postModal} link=''>
            <HiOutlineHashtag size={26}/>
            <LadelTitle title="Добавить Пост"/>
          </ItemContainer>
          <ItemContainer mute={true} link=''>
            <HiOutlineCalendarDays size={26}/>
            <LadelTitle title="Добавить Событие"/>
          </ItemContainer>
        </div>
      </div>

      {/* бЛОК ПО СОЗДАНИЮ ПОСТОВ */}
      <div 
        className={`
          ${openPost ? 'top-12' : '-top-12'}
          ${openPost ? 'opacity-100' : 'opacity-0'}
          ${openPost ? 'visible' : 'invisible'}
          absolute transition-all
          top-14
          md:top-12
          left-0
          md:left-0 
          md:-translate-x-1/2 
          w-full
          md:w-[400px]
          dark:bg-gray-800 bg-gray-200 p-3 md:p-6
          rounded-xl
        `}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base">Создать пост</h2>
          <div 
            onClick={() => openModal(label)}
            className="cursor-pointer"
          >
            <HiOutlineXMark size={20}/>
          </div>
        </div>

        {sendPost ? 
        // ЕСЛИ БЫЛИ ОТПРАВЛЕНЫ ДАННЫЕ ПОСТА НА СЕРВЕР ПОКАЗЫВАЕТСЫ Load
          (
            <Loading/>
          )
          :
        // БЛОК ДЛЯ ВВОДА ТЕКСТА ПОСТА И КНОПКА ОТПРАВКИ
          (
            <>
              <textarea 
                onChange={(e) => setPostText(e.target.value)}
                className='
                  w-full 
                  mt-4 md:mt-8
                  border 
                  h-[80px] resize-none  outline-none
                  border-purple-400 bg-inherit
                  rounded-xl  p-2
                dark:text-white text-gray-900
                  text-lg
                '
                placeholder='Введите текст'
              >
              </textarea>
              <div 
                onClick={() => createPost()}
                className="
                  mt-2 md:mt-4
                  text-base 
                  flex 
                  border dark:border-white border-purple-400
                  items-center 
                  justify-center 
                  p-2 
                  rounded-xl 
                  cursor-pointer hover:opacity-40 transition-all
                "
              >
                Отправить
              </div>
            </>
          )
        }
      </div>

    </div>
  );
}
 
export default AddProduct;