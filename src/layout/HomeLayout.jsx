import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ScrollToTop from '../components/ScrollToTop';
export default function HomeLayout() {
  return (
    <>
      <ScrollToTop/>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}
