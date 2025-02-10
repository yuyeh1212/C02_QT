import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/reservation">
                    預約管理
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/admin/orders">
                    訂單明細
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