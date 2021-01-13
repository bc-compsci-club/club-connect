import Head from 'next/head';
import Home from './Home/Home';

const Index = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta
          property="og:title"
          content="Brooklyn College Computer Science Club"
          key="title"
        />
        <meta
          name="description"
          content="The official website for the Brooklyn College Computer Science Club."
          key="description"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bccompsci.club" />
        <meta
          property="og:image"
          content="https://bccompsci.club/inspiration.jpg"
        />
      </Head>

      <main>
        <Home />
      </main>
    </>
  );
};

export default Index;
