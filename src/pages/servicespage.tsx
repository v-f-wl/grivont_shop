import 'tailwindcss/tailwind.css';
import '../app/globals.css'
import { Roboto_Mono } from 'next/font/google'
import Head from 'next/head';
import Container from "@/components/UI/Container";
import LeftMenu from '@/components/UI/LeftMenu';
import HeaderContainer from '@/components/header/HeaderContainer';
import { ReduxProvider } from '@/redux/provider';
import ServiceContainer from '@/components/servicesPage/ServiceContainer';

const RobotoMono = Roboto_Mono({ subsets: ['latin'] })

export default function ServicesPage(){
  return ( 
    <ReduxProvider>
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
            <title>Grivont - Profile</title>
          </Head>
          <Container>
            <LeftMenu/>
            <HeaderContainer/>
            <ServiceContainer/>
          </Container>
        </div>
      </div>
    </ReduxProvider>
  );
}