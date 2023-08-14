import 'tailwindcss/tailwind.css';
import '../app/globals.css'
import { Roboto_Mono } from 'next/font/google'
import Head from 'next/head';
import Container from "@/components/UI/Container";
// import LeftMenu from '@/components/UI/LeftMenu';
import HeaderContainer from '@/components/header/HeaderContainer';
import BagContainer from '@/components/bag/BagContainer';
import dynamic from 'next/dynamic';
import { ReduxProvider } from '@/redux/provider';
const LeftMenu = dynamic(() => import('@/components/UI/LeftMenu'), { ssr: false });

const RobotoMono = Roboto_Mono({ subsets: ['latin'] })

export default function BagLayout() {
  return (
    <div lang="en" suppressHydrationWarning>
      <div className={RobotoMono.className}>
      <div className="dark:bg-gray-900 bg-white h-screen">
        <ReduxProvider>
          <Container>
          <LeftMenu/>
          <HeaderContainer/>
          <BagContainer/>
          </Container>
        </ReduxProvider>
      </div>
      </div>
    </div>
  )
}