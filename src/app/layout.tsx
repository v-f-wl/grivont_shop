import { ReduxProvider } from '@/redux/provider'
import './globals.css'
import type { Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/themeProvider/ThemProvider'
import Head from 'next/head'

const RobotoMono = Roboto_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Grivont',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon/favicon.ico"/>
      </Head>
      <body className={RobotoMono.className}>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <ReduxProvider>
            {children}
          </ReduxProvider>
      </ThemeProvider>
      </body>
    </html>
  )
}
