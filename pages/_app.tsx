import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <link rel="shortcut icon" href="/Favicon-michi.png" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
