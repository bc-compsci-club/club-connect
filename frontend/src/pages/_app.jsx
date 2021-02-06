import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import ReactGA from 'react-ga';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'typeface-nunito';
import 'typeface-raleway';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'nprogress/nprogress.css';

import Header from 'components/common/Header';
import HamburgerMenu from '../components/common/HamburgerMenu';
import { HamburgerMenuProvider } from 'components/common/HamburgerMenu/HamburgerMenuContext';
import Footer from 'components/common/Footer';
import { LoadingEventPage } from 'components/events/[...id]';
import wrapper from 'store';
import { logInAction } from 'actions/userLoggedIn';
import { getItemJson, setItemJson } from 'utils/localStorageJsonUtils';
import { windowSupported } from 'utils/checkSupport';
import 'styles/index.scss';
import 'styles/overrides.scss';
import { getUserIsLoggedIn, refreshUserData } from 'utils/auth';

export const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT;
export const SITE_TITLE_BASE = 'Brooklyn College Computer Science Club';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isDropdownOpen = useSelector((state) => state.isDropdownOpen);

  const [loadingViewActive, setLoadingViewActive] = useState(false);
  const [width, setWidth] = useState(windowSupported() ? window.innerWidth : 0);

  useEffect(() => {
    // Initialize localStorage on first visit
    if (!getItemJson('initialSetupDone')) {
      setItemJson('userLoggedIn', false);
      setItemJson('initialSetupDone', true);
    }

    if (getUserIsLoggedIn()) {
      refreshUserData().then(() => dispatch(logInAction()));
    }

    // Window resize
    window.addEventListener('resize', () => setWidth(window.innerWidth));

    const handleRouteChangeStart = (url) => {
      const urlStart = url.substring(0, 8);
      const urlSplit = url.split('/');
      if (
        urlStart === '/events/' &&
        urlSplit.length > 2 &&
        urlSplit[2] !== undefined &&
        urlSplit[2] !== 'request' &&
        urlSplit[2] !== 'create' &&
        urlSplit[2] !== 'edit'
      ) {
        window.scroll({
          top: 0,
          left: 0,
        });
        setLoadingViewActive(true);
      }
    };

    const handleRouteChangeComplete = (url) => {
      setLoadingViewActive(false);
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
        {windowSupported() &&
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

      {loadingViewActive ? (
        // Only activates for the event loading page for now
        <LoadingEventPage />
      ) : (
        <Component width={width} {...pageProps} />
      )}
      <ToastContainer />

      <Footer width={width} />
    </>
  );
};

export default wrapper.withRedux(MyApp);
