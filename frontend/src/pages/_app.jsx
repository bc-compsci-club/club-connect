import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { DefaultSeo } from 'next-seo';
import { ToastContainer } from 'react-toastify';
import ReactGA from 'react-ga';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'typeface-nunito';
import 'typeface-raleway';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { Header, Footer, HamburgerMenu } from 'components/common';
import { HamburgerMenuProvider } from 'components/common/HamburgerMenu/HamburgerMenuContext';
import { LoadingEventPage } from 'components/events/[...id]';
import { logInAction } from 'actions/userLoggedIn';
import wrapper from 'store';
import { getUserIsLoggedIn, refreshUserData, setLoggedOut } from 'utils/auth';
import { getItemJson, setItemJson } from 'utils/localStorageJsonUtils';
import { windowSupported } from 'utils/checkSupport';
import { toastErrorCenter } from 'utils/generalUtils';
import 'styles/index.scss';
import 'styles/overrides.scss';
import siteImage from 'assets/banner-default.png';

export const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT;
export const SITE_NAME_BASE = 'Brooklyn College Computer Science Club';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loadingViewActive, setLoadingViewActive] = useState(false);
  const [width, setWidth] = useState(windowSupported() ? window.innerWidth : 0);

  useEffect(async () => {
    // Safety check to log out the user if the user data doesn't exist
    if (getUserIsLoggedIn() && getItemJson('loggedInUserData') === undefined) {
      toastErrorCenter(
        'Your local member data was not found. Please log in again.'
      );
      await setLoggedOut(dispatch, router);
      router.reload();
      return;
    }

    // Initialize localStorage on first visit
    if (!getItemJson('initialSetupDone')) {
      setItemJson('userLoggedIn', false);
      setItemJson('initialSetupDone', true);
    }

    // Refresh user data on page load
    if (getUserIsLoggedIn()) {
      await refreshUserData();
      dispatch(logInAction());
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

  const siteTitle = `${SITE_NAME_BASE} – Brooklyn College's Premier Computer Science Community`;
  const siteDescription =
    'The Brooklyn College Computer Science Club is Brooklyn College’s premier student-led, community-first computer science community.';

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta name="theme-color" content="#f8c560" />
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

      <DefaultSeo
        title={SITE_NAME_BASE}
        description={siteDescription}
        openGraph={{
          site_name: SITE_NAME_BASE,
          title: siteTitle,
          description: siteDescription,
          images: [{ url: siteImage }],
          type: 'website',
          url: 'https://bccompsci.club',
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />

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
