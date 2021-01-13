import { Head } from "next/document";
import "../styles/globals.css";

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

      {/* IE11 Custom Properties Polyfill Script */}
      {/* Will only load if IE11 is being used */}
      <script>
        window.MSInputMethodContext && document.documentMode && document.write('
        <script src="https://cdn.jsdelivr.net/gh/nuxodin/ie11CustomProperties@4.1.0/ie11CustomProperties.min.js"></script>
        ');
      </script>
    </Head>
    <Component {...pageProps} />
  </>
);

export default MyApp;
