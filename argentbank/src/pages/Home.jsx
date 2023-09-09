import Banner from '../containers/Banner';
import Features from '../containers/Features';
import Header from '../containers/Header';
import { useSelector} from 'react-redux';

function Home() {
  const token = useSelector((state) => state.user.isLoggedIn);
  console.log(token)
  return (
    <>
    <Header isLoggedIn={token}  />
    <main>
      <Banner />
      <Features />
    </main>
    </>
  );
}

export default Home