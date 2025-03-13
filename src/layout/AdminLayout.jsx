import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import AlertModal from "../components/AlertModal";
import axios from "axios";
import { setUserData } from "../slice/userSlice";
import { login } from "../slice/authSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_BASE_URL;

export default function AdminLayout() {

  //指定頁面
  const navigate = useNavigate()
  //讀取狀態
  const dispatch = useDispatch()
  const isLogin = useSelector(state => state.auth.isLoggedIn);
  const [alertState,setAlertState] = useState({show:false,message:"",success:true})

  //開啟提示訊息框
  const showAlert = (message,status)=>{
    setAlertState({show:true,"message":message,"status":status})
  }

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const loginCheck = async ()=>{
    try {
      const res = await axios.get(`${API_URL}/login/check`);
      // 更新 Redux 登入狀態
      dispatch(setUserData(res.data.user))
      dispatch(login());
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(()=>{
    const token = getCookie("token");
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    loginCheck()
    if(isLogin==false&& !token){
        setTimeout(()=>{
          showAlert('您尚未登入,即將為您跳轉到登入頁面','unauthorized')
        },1000)
        // alert('登入異常,為您跳轉到登入頁面')
        setTimeout(()=>{
            navigate('/login')
        },3000)
    }
  },[isLogin])

  return (
    <div className="bg-neutral-100">
      {<AlertModal show={alertState.show} onClose={() => setAlertState({...alertState,show:false})} status={alertState.status}>
        {alertState.message}
      </AlertModal>}
      <Header></Header>
      <div className="container">
        <nav className="d-flex nav justify-content-center pt-4 mb-4 gap-md-7 gap-4">
          <div className="nav-item ">
            <NavLink 
              to='/admin/reservation'
              className={({ isActive }) => 
                isActive 
                  ? "nav-link text-center text-dark-grey border-bottom border-2 border-primary fw-bold fs-5 px-md-4 py-3 px-8" 
                  : "nav-link text-center text-primary-02 fw-bold fs-5 px-md-4 py-3 px-8"
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
                  ? "nav-link text-center text-dark-grey border-bottom border-2 border-primary fw-bold fs-5 px-md-4 py-3 px-8" 
                  : "nav-link text-center text-primary-02 fw-bold fs-5 px-md-4 py-3 px-8"
              }
            >
              訂單明細
            </NavLink>
          </div>
        </nav>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
}