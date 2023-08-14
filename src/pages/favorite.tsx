import 'tailwindcss/tailwind.css';
import '../app/globals.css'
import { Roboto_Mono } from 'next/font/google'
import Head from 'next/head';
import Container from "@/components/UI/Container";
// import LeftMenu from '@/components/UI/LeftMenu';
import HeaderContainer from '@/components/header/HeaderContainer';
import FavoriveContainer from '@/components/favorite/FavoriveContainer';

import dynamic from 'next/dynamic';
const LeftMenu = dynamic(() => import('@/components/UI/LeftMenu'), { ssr: false });
const RobotoMono = Roboto_Mono({ subsets: ['latin'] })

export default function Favorite(){
  return ( 
    <div className={RobotoMono.className}>
      <div 
        className='
          relative
          h-full 
          dark:bg-gray-900 bg-white 
        '
      >
        <Head>
          <title>Grivont - Favorite</title>
        </Head>
        <Container>
          <LeftMenu/>
          <HeaderContainer/>
          <FavoriveContainer/>
        </Container>
      </div>
    </div>
  );
}