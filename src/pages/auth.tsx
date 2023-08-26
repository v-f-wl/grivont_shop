import 'tailwindcss/tailwind.css';
import '../app/globals.css'
import { Roboto_Mono } from 'next/font/google'
import Head from 'next/head';
import Container from "@/components/UI/Container";
import AuthContainer from '@/components/authPage/AuthContainer';
import { ReduxProvider } from '@/redux/provider';


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
            <AuthContainer/>
          </Container>
        </div>
      </div>
    </ReduxProvider>
  );
}