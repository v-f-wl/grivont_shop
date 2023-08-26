import 'tailwindcss/tailwind.css';
import '../app/globals.css'
import { Roboto_Mono } from 'next/font/google'

import Head from 'next/head';
import dynamic from 'next/dynamic';

import Container from "@/components/UI/Container";
import CHeader from '@/components/header/CHeader';
import ProfilePageContainer from '@/components/profilePage/ProfilePageContainer';
const LeftMenu = dynamic(() => import('@/components/UI/LeftMenu'), { ssr: false });

import { ReduxProvider } from '@/redux/provider';


const RobotoMono = Roboto_Mono({ subsets: ['latin'] })

export default function ProfilePage(){
  return ( 
    <ReduxProvider>
      <Head>
        <link rel="icon" href="/favicon/favicon.ico"/>
      </Head>
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
            <ProfilePageContainer/>
          </Container>
        </div>
      </div>
    </ReduxProvider>
  );
}