import 'tailwindcss/tailwind.css';
import '../app/globals.css'
import { Roboto_Mono } from 'next/font/google'
import Head from 'next/head';
import Container from "@/components/UI/Container";
// import LeftMenu from '@/components/UI/LeftMenu';
import HeaderContainer from '@/components/header/HeaderContainer';
import ProductContainer from '@/components/productPage/ProductContainer';
import dynamic from 'next/dynamic';
const LeftMenu = dynamic(() => import('@/components/UI/LeftMenu'), { ssr: false });

const RobotoMono = Roboto_Mono({ subsets: ['latin'] })

export default function ProfilePage(){
  return ( 
    <div className={RobotoMono.className}>
      <div 
        className='
          relative
          h-screen 
        dark:bg-gray-900 bg-white
          overflow-y-scroll 
        '
      >
        <Head>
          <title>Grivont - Профиль</title>
          <link rel="icon" href="/favicon/favicon.ico"/>
        </Head>
        <Container>
          <LeftMenu/>
          <HeaderContainer/>
          <ProductContainer/>
        </Container>
      </div>
    </div>
  );
}