import { Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import AlertModal from '../components/AlertModal';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUserData } from '../slice/userSlice';
import { login } from '../slice/authSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
const API_URL = import.meta.env.VITE_BASE_URL;

export default function MemberLayout() {
  //指定頁面
  const navigate = useNavigate();
  //讀取狀態
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLoggedIn);
  const [alertState, setAlertState] = useState({
    show: false,
    status: true,
    message: '',
    redirectTo: null, // 設定跳轉的路徑
  });

  //開啟提示訊息框
  const showAlert = (message, status, redirectTo) => {
    setAlertState({ show: true, message: message, status: status, redirectTo: redirectTo });
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const stableDispatch = useMemo(() => dispatch, [dispatch]); // 讓 dispatch 穩定

  const loginCheck = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/login/check`);
      stableDispatch(setUserData(res.data.user));
      stableDispatch(login());
    } catch (error) {
      console.error('登入檢查失敗:', error);
    }
  }, [stableDispatch]); // 依賴穩定的 dispatch

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      loginCheck();
    }

    if (isLogin === false && !token) {
      showAlert('您尚未登入，即將為您跳轉到登入頁面', 'unauthorized', '/login');
    }
  }, [isLogin, loginCheck]); // 依賴 isLogin 和 loginCheck

  return (
    <>
    <ScrollToTop/>
      {
        <AlertModal
          show={alertState.show}
          onClose={() => {
            setAlertState({ ...alertState, show: false });
            if (alertState.redirectTo) {
              navigate(alertState.redirectTo); // 使用 navigate 跳轉頁面
            }
          }}
          status={alertState.status}
          redirectTo={alertState.redirectTo} // 傳遞 redirectTo 屬性
        >
          {alertState.message}
        </AlertModal>
      }
      <Header></Header>
      {/* 內容區域 */}
      <Outlet />
      <Footer></Footer>
    </>
  );
}
