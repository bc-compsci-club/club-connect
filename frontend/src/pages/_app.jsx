import { useEffect, useState } from 'react';
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
import { useRouter } from 'next/router';

export const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT;

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  const [width, setWidth] = useState(windowSupported() ? window.innerWidth : 0);

  useEffect(() => {
    // Window resize
    window.addEventListener('resize', () => setWidth(window.innerWidth));

    // Route change
    NProgress.configure({
      minimum: 0.2,
      trickleSpeed: 200
    });

    const handleRouteChangeStart = (url) => {
      ReactGA.pageview(url);
      NProgress.start();
      console.log(`Route change started! New route: ${url}`);
    };

    // Route change
    const handleRouteChangeComplete = (url) => {
      NProgress.done();
      console.log(`Route changed successfully!`);
    };

    ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID);
    ReactGA.pageview(router.asPath);

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      window.removeEventListener('resize', () => setWidth(window.innerWidth));
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  return (
    <>
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
