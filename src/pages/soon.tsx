import 'tailwindcss/tailwind.css';
import '../app/globals.css'
import { Roboto_Mono } from 'next/font/google'
const RobotoMono = Roboto_Mono({ subsets: ['latin'] })
import Head from 'next/head';
import Container from "@/components/UI/Container";
import HeaderContainer from '@/components/header/HeaderContainer';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import FilterProduct from '@/components/UI/FilterProduct';

const LeftMenu = dynamic(() => import('@/components/UI/LeftMenu'), { ssr: false });

export default function soon(){
  return ( 
    <div className={RobotoMono.className}>
      <Head>
        <title>Grivont - Скоро</title>
        <link rel="icon" href="/favicon/favicon.ico"/>
      </Head>
      <div 
        className="
          relative
          h-screen 
          overflow-y-scroll 
        "
      >
        <div className="dark:bg-gray-900 bg-white h-screen">
          <Container>
          <LeftMenu/>
          <HeaderContainer/>
            <div 
              className="h-screen flex flex-col gap-6 items-center justify-center"
            >
              <h2 className="font-bold text-center text-4xl md:text-5xl dark:text-gray-200 text-gray-900">
                Страница в разработке 
              </h2>
              <Link className='underline text-purple-500 mx-auto' href='/'>Вернуться на главную страницу</Link>
            </div>

          </Container>
        </div>
      </div>
    </div>
  );
}
 