import { Outlet, NavLink } from "react-router-dom";

const MemberProfile = () => {
  return (
    <div className="container">
      {/* 按鈕區域 */}
      <div
        className="d-flex justify-content-center mt-4 fs-5 fw-bold"
        style={{ gap: "36px" }}
      >
        <NavLink
          to="/member/center/data"
          className="nav-link-custom"
          style={({ isActive }) => ({
            borderBottom: isActive ? "2px solid #6E5E57" : "none",
            paddingBottom: "4px", // 增加一些間距讓底線不會太貼近文字
            color: isActive ? "#6E5E57" : "black",
          })}
        >
          會員資料
        </NavLink>
        <NavLink
          to="/member/center/orders"
          className="nav-link-custom"
          style={({ isActive }) => ({
            borderBottom: isActive ? "2px solid #6E5E57" : "none",
            paddingBottom: "4px",
            color: isActive ? "#6E5E57" : "black",
          })}
        >
          訂單明細
        </NavLink>
      </div>

      {/* 內容區域 */}
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MemberProfile;
