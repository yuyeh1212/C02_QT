import { Outlet ,useLocation} from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ScrollToTop from '../components/ScrollToTop';
export default function HomeLayout() {
  // const {pathname} = useLocation()
  // console.log(pathname);
  return (
    <>
      <ScrollToTop/>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}
