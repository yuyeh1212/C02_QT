import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {

  const navigate = useNavigate();
  
  const user = useSelector((state)=>{
    return state.user.user;
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
        <nav className="row nav justify-content-center pt-4 mb-4">
          <div className="nav-item col-sm-6 col-md-4 col-lg-2">
            <NavLink 
              to='/admin/reservation'
              className={({ isActive }) => 
                isActive 
                  ? "nav-link text-center text-dark-grey border-bottom border-2 border-primary fw-bold" 
                  : "nav-link text-center text-primary-02"
              }
            >
              預約管理
            </NavLink>
          </div>

          <div className="nav-item col-sm-6 col-md-4 col-lg-2">
            <NavLink 
              to='/admin/orders'
              className={({ isActive }) => 
                isActive 
                  ? "nav-link text-center text-dark-grey border-bottom border-2 border-primary fw-bold" 
                  : "nav-link text-center text-primary-02"
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