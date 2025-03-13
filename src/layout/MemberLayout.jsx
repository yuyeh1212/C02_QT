import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from "react";
import AlertModal from "../components/AlertModal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "../slice/userSlice";
import { login } from "../slice/authSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_BASE_URL;

export default function MemberLayout() {
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
            showAlert('您尚未登入,即將為您跳轉到登入頁面','unauthorized')
        },1000)
        // alert('登入異常,為您跳轉到登入頁面')
        setTimeout(()=>{
            navigate('/login')
        },3000)
    }
  },[isLogin])



  return (
    <>
      {<AlertModal show={alertState.show} onClose={() => setAlertState({...alertState,show:false})} status={alertState.status}>
        {alertState.message}
      </AlertModal>}
      <Header></Header>
      {/* 內容區域 */}
      <Outlet />
      <Footer></Footer>
    </>
  );
}
