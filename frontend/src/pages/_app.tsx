import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import ScrollToTop from '../components/Mixins/ScrollToTop';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport' content='width=device-width, initial-scale=1" />
        <meta name="theme-color' content='#000000" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <ScrollToTop />

      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp
