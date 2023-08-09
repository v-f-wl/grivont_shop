import 'tailwindcss/tailwind.css';
import '../app/globals.css'
import { Roboto_Mono } from 'next/font/google'
import Head from 'next/head';
import Container from "@/components/UI/Container";
import LeftMenu from '@/components/UI/LeftMenu';
import HeaderContainer from '@/components/header/HeaderContainer';
import OrderContainer from '@/components/ordersPage/OrderContainer';


const RobotoMono = Roboto_Mono({ subsets: ['latin'] })

export default function Favorite(){
  return ( 
    <div className={RobotoMono.className}>
      <div 
        className='
          relative
          h-screen 
        bg-gray-900 
          overflow-y-scroll 
        '
      >
        <Head>
          <title>Grivont - Favorite</title>
        </Head>
        <Container>
          <LeftMenu/>
          <HeaderContainer/>
          <OrderContainer/>
        </Container>
      </div>
    </div>
  );
}