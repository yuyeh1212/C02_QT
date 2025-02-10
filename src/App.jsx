import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Member from './pages/Member';
import Admin from './pages/Admin';
import Reservation from './pages/Reservation';
import NotFound from './pages/Notfound';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/member' element={<Member/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/reservation' element={<Reservation/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
