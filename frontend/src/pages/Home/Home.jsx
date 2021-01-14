import Welcome from './components/Welcome/Welcome';
import Description from './components/Description/Description';
import Highlights from './components/Highlights/Highlights';
import Ending from 'components/Ending/Ending';

const Home = (props) => {
  return (
    <>
      <Welcome width={props.width} />
      <Description width={props.width} />
      <Highlights />
      <Ending width={props.width} />
    </>
  );
};

export default Home;
