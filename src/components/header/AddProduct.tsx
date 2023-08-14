import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { HiOutlineSquaresPlus, HiOutlineTag, HiOutlineCalendarDays, HiOutlineXMark, HiOutlineHashtag  } from 'react-icons/hi2'
import Cookies from "js-cookie";
import axios from 'axios';
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
  const label: string = 'product'
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [sendPost, setSendPost] = useState<boolean>(false)
  const [openPost, setOpenPost] = useState<boolean>(false)
  const [postText, setPostText] = useState<string>('')
  const userId = Cookies.get('id')

  useEffect(() => {
    setIsOpen(modalValue === label)
    setOpenPost(modalValue === 'post')
  }, [modalValue])

  const postModal = () => {
    openModal('post')
  }

  const createPost = () => {
    setSendPost(true)
    if(postText.trim().length < 5){
      setSendPost(false)
      return false
    }else(
      axios.post('/api/createPost', {userId, postText})
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
  const ItemContainer:React.FC<ItemContainerProps> = ({children, link, mute, handleFunction}) => {
    return (
      <Link href={link}
        onClick={handleFunction}
        className={`
          ${mute && 'opacity-20'}
          ${mute ? '' : 'hover:border-purple-400'}
          ${mute ? '' : 'cursor-pointer'}
          flex 
          gap-4 
          items-center 
          border 
          border-gray-800 
          p-4 
          rounded-xl  transition-all
        `}
      >
        {children}
      </Link>
    )
  }
  const LadelTitle = ({title} : {title: string}) => {
    return <span className="">{title}</span>
  }

  return (  
    <div className="md:relative">
      <HiOutlineSquaresPlus
        onClick={() => openModal(label)}
        className={`${isOpen && 'text-indigo-400'} hover:text-indiыgo-400 transition-colors`}
      />
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
          bg-gray-800 p-3 md:p-6
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
          bg-gray-800 p-3 md:p-6
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
          (
            <Loading/>
          )
          :
          (
            <>
              <textarea 
                onChange={(e) => setPostText(e.target.value)}
                className='
                  w-full 
                  mt-4 md:mt-8
                  border 
                  h-[80px] resize-none  transition-all duration-300 outline-none
                  border-purple-400 
                  capitalize 
                  rounded-xl 
                  bg-inherit p-2
                  text-purple-200 
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
                  border 
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