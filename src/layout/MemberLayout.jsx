import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from "react";
import AlertModal from "../components/AlertModal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "../slice/userSlice";
import { login } from "../slice/authSlice";

const API_URL = "https://web-project-api-zo40.onrender.com";

export default function MemberLayout() {
  //指定頁面
  const navigate = useNavigate()
  //讀取狀態
  const dispatch = useDispatch()
  const isLogin = useSelector(state => state.auth.isLoggedIn);
  const [alertState,setAlertState] = useState({show:false,message:"",success:true})

  //開啟提示訊息框
  const showAlert = (message,success)=>{
    setAlertState({show:true,"message":message,"success":success})
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
      dispatch(setUserData(res.data.user))
      // 更新 Redux 登入狀態
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
            showAlert('登入異常,即將為您跳轉到登入頁面',false)
        },1000)
        // alert('登入異常,為您跳轉到登入頁面')
        setTimeout(()=>{
            navigate('/login')
        },3000)
    }
  },[isLogin])



  return (
    <>
      {<AlertModal show={alertState.show} onClose={() => setAlertState({...alertState,show:false})} success={alertState.success}>
        {alertState.message}
      </AlertModal>}
      <nav className="navbar navbar-expand-lg bg-light py-2">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          {/* 左側 Logo */}
          <div className="d-flex align-items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="me-2"
              style={{ height: "40px" }}
            />
          </div>

          {/* 漢堡選單按鈕（平板以下顯示） */}
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

          {/* 右側內容（平板以下可摺疊） */}
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <div
              className="d-flex align-items-center fw-medium fs-4"
              style={{ gap: "24px" }}
            >
              <span className="me-3" style={{ color: "#BF9958" }}>
                您好，Jacky 會員
              </span>

              <Link
                to="/member/reservation"
                className="btn btn-sm text-light fw-medium fs-4"
                style={{ backgroundColor: "#BF9958" }}
              >
                前往預約 →
              </Link>

              <Link to="/member/center/data">
                <img
                  src="/profile.jpg" // 替換成會員頭像的圖片路徑
                  alt="會員頭像"
                  className="ms-3 rounded-circle"
                  style={{ width: "36px", height: "36px", objectFit: "cover" }}
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 內容區域 */}
      <Outlet />
    </>
  );
}
