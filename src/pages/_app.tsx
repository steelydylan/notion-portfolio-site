import 'tailwindcss/tailwind.css'

import { Footer } from '../components/footer'
import { Header } from '../components/header'
import { useRouter } from 'next/dist/client/router'
import { GlobalStyle } from '../components/global-style'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return (
    <>
      {router.pathname !== '/embed' && <Header />}
      <Component {...pageProps} />
      {router.pathname !== '/embed' && <Footer />}
      <GlobalStyle />
    </>
  )
}
