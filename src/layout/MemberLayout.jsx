import { Link, Outlet } from "react-router-dom";

export default function MemberLayout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/member/reservation">
                    預約
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/member/center">
                    會員中心
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet></Outlet>
    </>
  );
}