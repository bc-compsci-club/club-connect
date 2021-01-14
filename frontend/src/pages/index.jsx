import Head from 'next/head';

import WelcomeSection from 'components/index/WelcomeSection';
import DescriptionSection from 'components/index/DescriptionSection';
import HighlightsSection from 'components/index/HighlightsSection';
import Ending from 'components/common/Ending';

const Home = (props) => {
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

      <WelcomeSection width={props.width} />
      <DescriptionSection width={props.width} />
      <HighlightsSection />
      <Ending width={props.width} />
    </>
  );
};

export default Home;
