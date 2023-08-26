import 'tailwindcss/tailwind.css';
import '../app/globals.css'
import { Roboto_Mono } from 'next/font/google'
import Head from 'next/head';
import Container from "@/components/UI/Container";
import CHeader from '@/components/header/CHeader';
import CCategory from '@/components/category/CCategoryPage';
import dynamic from 'next/dynamic';
import { ReduxProvider } from '@/redux/provider';
const LeftMenu = dynamic(() => import('@/components/UI/LeftMenu'), { ssr: false });

const RobotoMono = Roboto_Mono({ subsets: ['latin'] })

export default function Favorite(){
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
            <title>Grivont - Category</title>
          </Head>
          <Container>
            <LeftMenu/>
            <CHeader/>
            <CCategory/>
          </Container>
        </div>
      </div>
    </ReduxProvider>
  );
}