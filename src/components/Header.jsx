
import { useRef ,useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from "axios";
import { setLoading } from "../slice/loadingSlice";
import { logout } from "../slice/authSlice";
import { clearUserData } from "../slice/userSlice";
import Loading from "./Loading";
import AlertModal from "./AlertModal";
import { setUserData } from "../slice/userSlice";
import { login } from "../slice/authSlice";

const API_URL = import.meta.env.VITE_BASE_URL;

function Header (){
    const isLogin = useSelector(state => state.auth.isLoggedIn);
    const isLoading = useSelector(state=> state.loading.isLoading);
    const userData = useSelector(state => state.userData);
    const offcanvasRef = useRef(null);
    const offcanvasInstanceRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [alertState,setAlertState] = useState({show:false,message:"",success:true});

    

    useEffect(() => {
    if (offcanvasRef.current && bootstrap) {
        // Store the instance in a ref for later use
        offcanvasInstanceRef.current = new bootstrap.Offcanvas(offcanvasRef.current);
        return () => {
        if (offcanvasInstanceRef.current && offcanvasInstanceRef.current.dispose) {
            offcanvasInstanceRef.current.dispose();
        }
        };
    }
    }, []);
    
    const handleNavigate = (route) => {
        if (offcanvasInstanceRef.current) {
            offcanvasInstanceRef.current.hide();  // 關閉 offcanvas
            // 使用 setTimeout 延遲導航，確保動畫完成
            setTimeout(() => {
            navigate(route);
            }, 500);  // 假設 500ms 是關閉動畫的時間
        }
    };

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
    };

    const token = getCookie("token");

    if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    const clearCookie = (name) => {
        document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
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
        loginCheck();
    },[])

    const showAlert = (message,status)=>{
        setAlertState({show:true,"message":message,"status":status})
    }

    const handleLogout = async()=>{
        dispatch(setLoading(true));
        try {
            const res = await axios.post(`${API_URL}/logout`)
            showAlert('登出成功！',true);
            clearCookie("token"); 
            delete axios.defaults.headers.common.Authorization; 
            dispatch(logout());
            dispatch(clearUserData());
            setTimeout(()=>{
                navigate("/login");
            },2000)
        } catch (error) {
            showAlert('登出失敗，請稍後再試',false);
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    }

    return(<>
            {/* Loading 畫面 */}
            {isLoading && <Loading></Loading>}
            {/* Add AlertModal component */}
            {<AlertModal show={alertState.show} onClose={() => setAlertState({...alertState,show:false})} status={alertState.status}>{alertState.message}</AlertModal>}
        <nav className="navbar navbar-expand-md py-4 px-md-2  bg-white">
            <div className="container-fluid d-flex align-items-center justify-content-between flex-nowrap">
            {/* 左側 Logo */}
                <h1>
                    <Link to="/">
                        <div className="d-flex align-items-center">
                            <img
                            src='headerLogo.svg'
                            alt="Logo"
                            className='logo-img'
                            />
                        </div>
                    </Link>
                </h1>

                {/* 漢堡選單按鈕（平板以下顯示） */}
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                 {/* 右側內容（平板以下可摺疊） */}
                {
                    userData?.user !== 'user' ? 
                    <div
                        className="offcanvas offcanvas-end vw-100"
                        tabIndex="-1"
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        ref={offcanvasRef}
                    >
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                                <img 
                                src='headerLogo.svg'
                                alt="Logo"
                                className="me-2"
                                style={{ height: "40px" }}
                                />
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="offcanvas-body flex-row-reverse ">
                            <div
                                className="d-flex align-items-md-center fw-medium flex-column h-100 flex-md-row"
                                style={{ gap: "24px" }}
                            >
                                <div className="d-flex flex-column-reverse h-100 flex-md-row align-items-md-center justify-content-md-center">
                                    <button
                                        onClick={()=>{handleNavigate("/admin/reservation")}}
                                        className="mt-auto mt-md-0 btn btn-sm btn-primary text-light fw-medium fs-3 fs-lg-4 me-lg-15 me-md-3"
                                    >
                                        後台
                                    </button>
                                    <button
                                        className="p-0 border-0 bg-white icon"
                                        type="button"
                                        onClick={handleLogout}
                                    >
                                        <span className="text-primary-02 fw-medium fs-3 fs-lg-4">
                                        登出
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : 
                    <div
                        className="offcanvas offcanvas-end vw-100"
                        tabIndex="-1"
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        ref={offcanvasRef}
                    >
                    {isLogin?
                        <> 
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                                    <img
                                    src="headerLogo.svg"
                                    alt="Logo"
                                    className="me-2"
                                    />
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                ></button>
                            </div>

                            <div className="offcanvas-body flex-row-reverse ">
                            <div
                            className="d-flex align-items-md-center fw-medium flex-column h-100 flex-md-row"
                            style={{ gap: "24px" }}
                            >
                            {/* <span className="me-3 fs-5 fs-md-3 fs-lg-4 text-center text-primary">
                                您好，{userData?.name} 會員
                            </span> */}
                            <div className="d-flex flex-column-reverse h-100 flex-md-row align-items-md-center justify-content-md-center">
                                {userData.user === 'admin' ?'':
                                <button
                                    onClick={()=>{handleNavigate("/member/reservation")}}
                                    className="mt-auto mt-md-0 btn btn-sm btn-primary text-light fw-medium fs-3 fs-lg-4 me-lg-15 me-md-3"
                                    // style={{ backgroundColor: "#BF9958"}}
                                >
                                    前往預約 →
                                </button>}
                                
                                
                                <button
                                className="p-0 border-0 d-flex bg-white justify-content-center align-items-center icon me-lg-15 me-md-3"
                                type="button"
                                onClick={()=>{handleNavigate("/member/center/data")}}
                                >
                                    <i className="bi bi-person-circle me-3 mx-md-3 text-primary-02 " style={{fontSize:36}}></i>
                                    <span className="text-primary-02 fw-medium fs-3 fs-lg-4">
                                    會員中心
                                    </span>
                                </button>
                                <button
                                className="p-0 border-0 bg-white icon"
                                type="button"
                                onClick={handleLogout}
                                >
                                    <span className="text-primary-02 fw-medium fs-3 fs-lg-4">
                                    登出
                                    </span>
                                </button>
                            </div>
                            </div>
                            </div>
                        </>
                        :<>
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                                    <img
                                        src="headerLogo.svg"
                                        alt="Logo"
                                        style={{ height: "40px" }}
                                        />
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="offcanvas-body flex-row-reverse">
                            <div
                                className="d-flex align-items-md-center fw-medium fs-4 flex-column flex-md-row"
                                style={{ gap: "24px" }}
                                >
                                <button 
                                type="button"
                                className="btn btn-sm text-primary fw-medium fs-4 primary-btn"
                                onClick={()=>{handleNavigate('/login')}}
                                
                                >
                                登入
                                </button>
                                <button 
                                type="button"
                                className="btn btn-sm btn-primary text-light fw-medium fs-4"
                                onClick={()=>{handleNavigate('/register')}}
                                
                                >
                                註冊會員
                                </button>
                                </div>
                            </div>
                        </>
                    }
                </div>
                }
            </div>
        </nav>
    </>)
}

export default Header;