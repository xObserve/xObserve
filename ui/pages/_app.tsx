import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import React, { useEffect } from 'react'
import FontFace from 'components/font-face'
import theme from 'theme'
import { createStandaloneToast } from '@chakra-ui/toast'
import CommonStyles from "src/theme/common.styles"
import NoSSR from 'react-no-ssr';
import dynamic from "next/dynamic"
import "src/theme/css/react-grid.css"
import "src/theme/css/echarts.css"
import BaiduMap from 'components/BaiduMap'



const { ToastContainer} = createStandaloneToast()




export let canvasCtx;
//@ts-ignore
const App =  dynamic(async () => ({ Component, pageProps }) => {
  canvasCtx = document.createElement('canvas').getContext('2d')!;

  return (
    <NoSSR>
      <Head>
        <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://static.cloudflareinsights.com' />
        <meta name='theme-color' content='#319795' />
        {process.env.NODE_ENV === 'production' && (
          <script
            async
            defer
            data-domain='chakra-ui.com'
            src='https://plausible.io/js/plausible.js'
          />
        )}
        <script src="https://api.map.baidu.com/api?v=3.0&ak=KOmVjPVUAey1G2E8zNhPiuQ6QiEmAwZu"></script>
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
      <FontFace />
      <CommonStyles />
      <ToastContainer />
      <BaiduMap ak="" />
    </NoSSR>
  )
}  , { ssr: false })

export default App
