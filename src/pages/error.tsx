import 'tailwindcss/tailwind.css';
import '../app/globals.css'
import { Roboto_Mono } from 'next/font/google'
const RobotoMono = Roboto_Mono({ subsets: ['latin'] })
import Head from 'next/head';
import Container from "@/components/UI/Container";
import HeaderContainer from '@/components/header/HeaderContainer';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const LeftMenu = dynamic(() => import('@/components/UI/LeftMenu'), { ssr: false });

export default function soon(){
  return ( 
    <div className={RobotoMono.className}>
      <div 
        className="
          relative
          h-screen 
        bg-gray-900 
          overflow-y-scroll 
        "
      >
        <Head>
          <title>Grivont - Profile</title>
        </Head>
        <Container>
          <LeftMenu/>
          <HeaderContainer/>
          <div 
            className="h-screen flex flex-col items-center justify-center gap-6"
          >
            <h2 className="font-bold text-center text-4xl md:text-5xl text-gray-400">
              Страница не найдена 
            </h2>
            <Link className='underline text-purple-500' href='/'>Вернуться на главную страницу</Link>
          </div>
        </Container>
      </div>
    </div>
  );
}
 