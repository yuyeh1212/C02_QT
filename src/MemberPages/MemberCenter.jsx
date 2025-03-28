import { Outlet, NavLink } from 'react-router-dom';

const MemberProfile = () => {
  return (
    <div className="bg-neutral-100">
      <div className="container py-8">
        {/* 按鈕區域 */}
        <div className="d-flex justify-content-center py-4 fs-5 fw-bold" style={{ gap: '36px' }}>
          <NavLink
            to="/member/center/data"
            className={({ isActive }) =>
              isActive
                ? 'nav-link text-center text-dark-grey border-bottom border-2 border-primary fw-bold'
                : 'nav-link text-center text-primary-02'
            }
          >
            會員資料
          </NavLink>
          <NavLink
            to="/member/center/orders"
            className={({ isActive }) =>
              isActive
                ? 'nav-link text-center text-dark-grey border-bottom border-2 border-primary fw-bold'
                : 'nav-link text-center text-primary-02'
            }
          >
            訂單明細
          </NavLink>
        </div>

        {/* 內容區域 */}
        <div className="pt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
