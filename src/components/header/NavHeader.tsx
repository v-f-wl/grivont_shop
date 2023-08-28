'use client'
import { useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { changeModal } from '@/redux/features/createModalOpen-slice';

import Alert from './Alert';
import AddProduct from './CreateBlock/CreateBlock';
import ThemeToggle from '../themeProvider/ThemeToggle';

const NavHeader = () => {
  const blockRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useDispatch<AppDispatch>()

  const handleClickOutside = (e: MouseEvent) => {
    if (blockRef.current && e.target instanceof Node && !blockRef.current.contains(e.target)) {
      dispatch(changeModal(''))
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  })
  return ( 
    <div 
      ref={blockRef}
      className="mr-8 lg:mr-24 z-20 flex items-center justify-end flex-grow gap-4 lg:gap-10 text-xl md:text-2xl lg:text-3xl relative"
    >
      <AddProduct/>
      <Alert/>
      <ThemeToggle/>
    </div>
  );
}
 
export default NavHeader;