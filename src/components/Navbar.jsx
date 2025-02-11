import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white px-lg-12 px-3 py-2" style={{border: "1px solid red"}}>
      <div className="container-fluid d-flex align-items-center justify-content-between" style={{border: "1px solid black"}}>
        {/* LOGO */}
        <NavLink className="navbar-brand" to="/">
          <img src="/logo.png" alt="Brand Logo" className="img-fluid" style={{ height: "56px" }} />
        </NavLink>
       
        {/* 漢堡選單按鈕 (手機版) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar 內容區塊 */}
        <div className="collapse navbar-collapse " id="navbarNav">
         
         {/* <div className="container-fluid pxl-3 pxr-3 pxt-2 pxb-2 px-md-12 d-flex align-items-center justify-content-between" id="navbarNav"> */}


          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              {/* <NavLink className="nav-link" to="/">首頁</NavLink> */}
            </li>
          </ul>

          {/* 右側按鈕區塊 */}
          <div className="d-flex align-items-center">
            {/* 前往預約 */}
            <NavLink className="btn text-white fw-bold d-flex align-items-center justify-content-center me-3"
              to="/booking"
              style={{
                backgroundColor: "#BF9958",
                width: "148px",
                height: "40px",
                borderRadius: "0",
                padding: "0 16px",
                flexShrink: 0
              }}>
              <span className="text-nowrap" style={{ fontSize: "20px", fontWeight: "bold", textAlign: "center" }}>前往預約</span>
              <span className="ms-2 d-flex align-items-center justify-content-center" style={{ width: "24px", height: "24px", fontSize: "24px" }}>
                ➝
              </span>
            </NavLink>

            {/* 會員中心 */}
            <NavLink className="d-flex align-items-center text-decoration-none" to="/member">
              <div className="rounded-circle overflow-hidden me-2" style={{ width: "36px", height: "36px" }}>
                <img src="/profile.jpg" alt="會員頭像" className="img-fluid" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <span className="fw-medium text-nowrap" style={{ fontSize: "20px", color: "#6E5E57" }}>會員中心</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
