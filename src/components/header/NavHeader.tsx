'use client'
import { useState } from 'react';

import Alert from './Alert';
import AddProduct from './AddProduct';
import ThemeToggle from '../themeProvider/ThemeToggle';

const NavHeader = () => {
  const [modalCategory, setModalCategory] = useState<string>('')

  //СЛУЖИТ ДЛЯ ПЕРЕКЛЮЧЕНИЯ МЕЖДУ ОКНАМИ 
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
    </div>
  );
}
 
export default NavHeader;