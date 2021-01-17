import { useEffect, useState } from 'react';
import Head from 'next/head';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'typeface-nunito';
import 'typeface-raleway';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HamburgerMenu from '../components/common/HamburgerMenu';
import { HamburgerMenuProvider } from '../components/common/HamburgerMenu/HamburgerMenuContext';
import { windowSupported } from 'utils/checkSupport';
import '../styles/index.scss';
import '../styles/overrides.scss';

const MyApp = ({ Component, pageProps }) => {
  const [width, setWidth] = useState(windowSupported() ? window.innerWidth : 0);

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));

    return () => {
      window.removeEventListener('resize', () => setWidth(window.innerWidth));
    };
  }, []);

  return (
    <>
      <Head>
        <title>
          Brooklyn College Computer Science Club | Brooklyn College's Premier
          Computer Science Community
        </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <HamburgerMenuProvider>
        <HamburgerMenu />
        <Header />
      </HamburgerMenuProvider>

      <Component width={width} {...pageProps} />

      <Footer width={width} />
    </>
  );
};

export default MyApp;
