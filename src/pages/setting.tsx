import 'tailwindcss/tailwind.css';
import '../app/globals.css'
import { Roboto_Mono } from 'next/font/google'
import Head from 'next/head';
import Container from "@/components/UI/Container";

import CHeader from '@/components/header/CHeader';
import { ReduxProvider } from '@/redux/provider';

import dynamic from 'next/dynamic';
const LeftMenu = dynamic(() => import('@/components/UI/LeftMenu'), { ssr: false });

const RobotoMono = Roboto_Mono({ subsets: ['latin'] })

export default function ProfilePage(){
  return ( 
    <ReduxProvider>
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
            <title>Grivont - Profile</title>
          </Head>
          <Container>
            <LeftMenu/>
            <CHeader/>
            
          </Container>
        </div>
      </div>
    </ReduxProvider>
  );
}