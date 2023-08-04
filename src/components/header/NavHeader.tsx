'use client'
import Link from 'next/link';
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2'
import Alert from './Alert';
import AddProduct from './AddProduct';
import { useEffect, useState } from 'react';
import axios from 'axios';

const NavHeader = () => {
  const [modalCategory, setModalCategory] = useState<string>('')

  useEffect(() => {
  }, []);
  const changeModal = (title: string) => {
    if(modalCategory === title){
      setModalCategory('')
    }else{
      setModalCategory(title)
    }
  }
  return ( 
    <div className="mr-24 flex justify-end flex-grow gap-10 text-3xl">
      <AddProduct openModal={changeModal} modalValue={modalCategory}/>
      <Alert openModal={changeModal} modalValue={modalCategory}/>
      <Link href={`/chatpage`} className="hover:text-indigo-400 transition-colors">
        <HiOutlineChatBubbleOvalLeft/>
      </Link>
    </div>
  );
}
 
export default NavHeader;