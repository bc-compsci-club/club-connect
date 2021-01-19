import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import ReactGA from 'react-ga';
import NProgress from 'nprogress';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'typeface-nunito';
import 'typeface-raleway';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'nprogress/nprogress.css';

import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import HamburgerMenu from '../components/common/HamburgerMenu';
import { HamburgerMenuProvider } from 'components/common/HamburgerMenu/HamburgerMenuContext';
import { windowSupported } from 'utils/checkSupport';
import 'styles/index.scss';
import 'styles/overrides.scss';

export const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT;
export const SITE_TITLE_BASE = 'Brooklyn College Computer Science Club';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  const [width, setWidth] = useState(windowSupported() ? window.innerWidth : 0);

  useEffect(() => {
    // Window resize
    window.addEventListener('resize', () => setWidth(window.innerWidth));

    // Route change
    NProgress.configure({
      minimum: 0.2,
      trickleSpeed: 150,
    });

    const handleRouteChangeStart = (url) => {
      // Progress bar will show only on individual event pages for now
      // Add more to page allowlist later on when we add more dynamic pages
      const urlStart = url.substring(0, 8);
      const urlSplit = url.split('/');
      if (urlStart === '/events/' && urlSplit[2] !== undefined) {
        NProgress.start();
      }
    };

    const handleRouteChangeComplete = (url) => {
      NProgress.done();
      ReactGA.pageview(url);
    };

    // Initialize on first page load
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID);
    ReactGA.pageview(router.asPath);

    // Register route change event listeners
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      // Unregister event listeners
      window.removeEventListener('resize', () => setWidth(window.innerWidth));
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  return (
    <>
      <Head>
        <title>
          {SITE_TITLE_BASE} | Brooklyn College's Premier Computer Science
          Community
        </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* IE11 Custom Properties Polyfill Script */}
        {/* Will only load if IE11 is being used */}
        {typeof window !== 'undefined' &&
          window.MSInputMethodContext &&
          document.documentMode &&
          console.log('Polyfilling IE11 Custom Properties...') &&
          document.write(
            '<script src="https://cdn.jsdelivr.net/gh/nuxodin/ie11CustomProperties@4.1.0/ie11CustomProperties.min.js"></script>'
          )}
      </Head>

      <HamburgerMenuProvider>
        <HamburgerMenu />
        <Header />
      </HamburgerMenuProvider>

      <Component width={width} {...pageProps} />
      <ToastContainer />

      <Footer width={width} />
    </>
  );
};

export default MyApp;
