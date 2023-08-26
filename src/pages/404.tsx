import 'tailwindcss/tailwind.css';
import '../app/globals.css'
import { Roboto_Mono } from 'next/font/google'
const RobotoMono = Roboto_Mono({ subsets: ['latin'] })
import Head from 'next/head';
import Container from "@/components/UI/Container";
import CHeader from '@/components/header/CHeader';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ReduxProvider } from '@/redux/provider';
const LeftMenu = dynamic(() => import('@/components/UI/LeftMenu'), { ssr: false });

export default function error(){
  return ( 
    <ReduxProvider>
      <div className={RobotoMono.className}>
        <div 
          className="
          relative
          h-screen 
          overflow-y-scroll 
          "
          >
          <Head>
            <title>Grivont - Скоро</title>
            <link rel="icon" href="/favicon/favicon.ico"/>
          </Head>
          <div className="dark:bg-gray-900 bg-white h-screen">
            <Container>
            <LeftMenu/>
            <CHeader/>
              <div 
                className="h-screen flex flex-col items-center justify-center gap-6"
                >
                <h2 className="font-bold text-5xl dark:text-gray-200 text-gray-900">
                  Страница не найдена 
                </h2>
                <Link className='underline text-purple-500' href='/'>Вернуться на главную страницу</Link>
              </div>

            </Container>
          </div>
        </div>
      </div>
    </ReduxProvider>
  );
}
 