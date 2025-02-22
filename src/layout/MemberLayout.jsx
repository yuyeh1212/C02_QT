import { Link, Outlet } from "react-router-dom";

export default function MemberLayout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light py-2">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          {/* 左側 Logo 與標語 */}
          <div className="d-flex align-items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="me-2"
              style={{ height: "40px" }}
            />
          </div>

          {/* 右側內容 */}
          <div className="d-flex align-items-center fw-medium fs-4" style={{ gap: "48px" }}>
            <span className="me-3" style={{ color: "#BF9958" }}>您好，Jacky 會員</span>

            <Link to="/member/reservation" className="btn btn-sm text-light fw-medium fs-4" 
              style={{ backgroundColor: "#BF9958" }}>
              前往預約 →
            </Link>

            <Link to="/member/center">
              <img
                src="/profile.jpg" // 替換成會員頭像的圖片路徑
                alt="會員頭像"
                className="ms-3 rounded-circle"
                style={{ width: "36px", height: "36px", objectFit: "cover" }}
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* 內容區域 */}
      <Outlet />
    </>
  );
}
