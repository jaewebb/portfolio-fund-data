import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import theme from '@/app/theme'
import '@/app/globals.css'

const roboto = Roboto({
  display: 'swap',
  subsets: ['latin',],
  variable: '--font-roboto',
  weight: ['300', '400', '500', '700',],
})

export const metadata: Metadata = {
  title: 'Fund Data',
  description: 'A portfolio project using React, Next.js, MUI, SWR, and TwelveData\'s fund data',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${roboto.variable} antialiased`}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouterCacheProvider>
            {children}
          </AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
