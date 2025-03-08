
import { useRef ,useEffect} from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Header (){
    const isLogin = useSelector(state => state.auth.isLoggedIn);
    const userData = useSelector(state => state.userData);
    const offcanvasRef = useRef(null);
    const offcanvasInstanceRef = useRef(null);
    const navigate = useNavigate()
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
    return(<>
        <nav className="navbar navbar-expand-md py-2 px-md-12 px-3">
            <div className="container-fluid d-flex align-items-center justify-content-between">
            {/* 左側 Logo */}
                <h1>
                    <Link to="/">
                        <div className="d-flex align-items-center">
                            <img
                            src="/logo.png"
                            alt="Logo"
                            className="me-2"
                            style={{ height: "40px" }}
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
                            src="/logo.png"
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
                    <span className="me-3 fs-3 fs-lg-4" style={{ color: "#BF9958" }}>
                        您好，{userData?.name} 會員
                    </span>
                    <div className="d-flex flex-column-reverse h-100 flex-md-row align-items-md-center">
                        {userData.user === 'admin' ?'':
                        <button
                            onClick={()=>{handleNavigate("/member/reservation")}}
                            className="mt-auto mt-md-0 btn btn-sm btn-primary text-light fw-medium fs-3 fs-lg-4 me-lg-15 me-md-3"
                            // style={{ backgroundColor: "#BF9958"}}
                        >
                            前往預約 →
                        </button>}
                        
                        
                        <button
                        className="p-0 border-0 d-flex bg-white align-items-center icon"
                        type="button"
                        onClick={()=>{handleNavigate("/member/center/data")}}
                        >
                            <i className="bi bi-person-circle me-3 mx-md-3 text-primary-02 " style={{fontSize:36}}></i>
                            <span className="text-primary-02 fw-medium fs-3 fs-lg-4">
                            會員中心
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
                                src="/logo.png"
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
            </div>
        </nav>
    </>)
}

export default Header;