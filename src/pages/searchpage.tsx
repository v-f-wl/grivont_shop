import 'tailwindcss/tailwind.css';
import '../app/globals.css'
import { Roboto_Mono } from 'next/font/google'
import Head from 'next/head';
import Container from "@/components/UI/Container";
import { ReduxProvider } from '@/redux/provider';
import LeftMenu from '@/components/UI/LeftMenu';
import CHeader from '@/components/header/CHeader';
import CSearchPage from '@/components/searchPage/CSearchPage';


const RobotoMono = Roboto_Mono({ subsets: ['latin'] })
export default function Favorite(){
  return ( 
    <ReduxProvider>
      <div className={RobotoMono.className}>
        <Head>
          <title>Grivont - Profile</title>
        </Head>
        <div 
          className='
          relative
          h-screen 
          dark:bg-gray-900 bg-white
          overflow-y-scroll 
          '
          >
          <Container>
            <LeftMenu/>
            <CHeader/>
            <CSearchPage/>
          </Container>
        </div>
      </div>
    </ReduxProvider>
  );
}