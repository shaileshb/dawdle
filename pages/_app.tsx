import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
 
  return <>
  <Script id="google-analytics" strategy="afterInteractive">
    {`
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-TJTG53N');
    `}
  </Script>
  <noscript dangerouslySetInnerHTML= {{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TJTG53N"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}/>
  <Component {...pageProps} />
  </>
}
