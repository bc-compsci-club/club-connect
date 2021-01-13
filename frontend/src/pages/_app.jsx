import Head from 'next/head';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'typeface-nunito';
import 'typeface-raleway';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import NavbarHamburgerMenu from '../components/NavbarHamburgerMenu/NavbarHamburgerMenu';
import { NavbarHamburgerMenuProvider } from '../components/NavbarHamburgerMenu/NavbarHamburgerMenuContext';
import '../../styles/index.scss';
import '../../styles/overrides.scss';

const MyApp = ({ Component, pageProps }) => (
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

    <NavbarHamburgerMenuProvider>
      <NavbarHamburgerMenu />
      <Header />
    </NavbarHamburgerMenuProvider>

    <main>
      <Component {...pageProps} />
    </main>

    <Footer />
  </>
);

export default MyApp;
