import 'tailwindcss/tailwind.css';
import '../app/globals.css'
import { Roboto_Mono } from 'next/font/google'
import Head from 'next/head';
import Container from "@/components/UI/Container";
import LeftMenu from '@/components/UI/LeftMenu';
import HeaderContainer from '@/components/header/HeaderContainer';
import BagContainer from '@/components/bag/BagContainer';

const RobotoMono = Roboto_Mono({ subsets: ['latin'] })

export default function ProfilePage(){
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
          <title>Grivont - Bag</title>
        </Head>
        <Container>
          <LeftMenu/>
          <HeaderContainer/>
          <BagContainer/>
        </Container>
      </div>
    </div>
  );
}