import { Link, Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function HomeLayout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  首頁
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  註冊
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  登入頁面
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}