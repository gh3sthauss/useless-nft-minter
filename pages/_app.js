import { noSSR } from 'next/dynamic'
import ReactNoSsr from 'react-no-ssr'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <ReactNoSsr> <Component {...pageProps} /></ReactNoSsr>
   
}

export default MyApp
