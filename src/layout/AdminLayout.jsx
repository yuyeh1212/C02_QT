import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {

  const navigate = useNavigate();
  
  const user = useSelector((state)=>{
    return state.userData.user;
  })

  useEffect(()=>{
    if(user!=='admin'){
      console.log(user)
      //跳轉回登入頁
      // navigate('/login');
    }
  },[user])

  return (
    <div className="bg-neutral-100">
      <div className="container">
        <nav className="d-flex nav justify-content-center pt-4 mb-4 gap-md-7 gap-4">
          <div className="nav-item ">
            <NavLink 
              to='/admin/reservation'
              className={({ isActive }) => 
                isActive 
                  ? "nav-link text-center text-dark-grey border-bottom border-2 border-primary fw-bold fs-3 fs-md-5 px-md-4 py-3 px-8" 
                  : "nav-link text-center text-primary-02 fw-bold fs-3 fs-md-5 px-md-4 py-3 px-8"
              }
            >
              預約管理
            </NavLink>
          </div>

          <div className="nav-item ">
            <NavLink 
              to='/admin/orders'
              className={({ isActive }) => 
                isActive 
                  ? "nav-link text-center text-dark-grey border-bottom border-2 border-primary fw-bold fs-3 fs-md-5 px-md-4 py-3 px-8" 
                  : "nav-link text-center text-primary-02 fw-bold fs-3 fs-md-5 px-md-4 py-3 px-8"
              }
            >
              訂單明細
            </NavLink>
          </div>
        </nav>
        <Outlet></Outlet>
      </div>
    </div>
  );
}