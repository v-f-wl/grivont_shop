'use client'
import Alert from './Alert';
import AddProduct from './AddProduct';
import { useState } from 'react';
import ThemeToggle from '../themeProvider/ThemeToggle';

const NavHeader = () => {
  const [modalCategory, setModalCategory] = useState<string>('')

  const changeModal = (title: string) => {
    if(modalCategory === title){
      setModalCategory('')
    }else{
      setModalCategory(title)
    }
  }
  return ( 
    <div className="mr-8 lg:mr-24 flex items-center justify-end flex-grow gap-4 lg:gap-10 text-3xl relative">
      <AddProduct openModal={changeModal} modalValue={modalCategory}/>
      <Alert openModal={changeModal} modalValue={modalCategory}/>
      <ThemeToggle/>
      {/* <Link href={`/chatpage`} className="hover:text-indigo-400 transition-colors">
        <HiOutlineChatBubbleOvalLeft/>
      </Link> */}
    </div>
  );
}
 
export default NavHeader;