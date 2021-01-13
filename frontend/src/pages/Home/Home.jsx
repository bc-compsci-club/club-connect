import { useState, useEffect } from 'react';
import Welcome from './components/Welcome/Welcome';
import Description from './components/Description/Description';
import Highlights from './components/Highlights/Highlights';
import Ending from 'components/Ending/Ending';
import { windowSupported } from '../../utils/windowSupported';

const Home = () => {
  const [width, setWidth] = useState(windowSupported() ? window.innerWidth : 0);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    console.log(width);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  return (
    <>
      <Welcome width={width} />
      <Description width={width} />
      <Highlights />
      <Ending width={width} />
    </>
  );
};

export default Home;
