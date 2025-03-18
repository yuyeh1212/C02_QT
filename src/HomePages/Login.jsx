import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slice/authSlice";
import { setUserData } from '../slice/userSlice';
import { setLoading } from "../slice/loadingSlice";
import CustomButton from "../components/CustomButton";
import AlertModal from "../components/AlertModal";
import Loading from "../components/Loading";
import PropTypes from 'prop-types';
const API_URL = import.meta.env.VITE_BASE_URL;

const FormInput = ({ register, errors, id, labelText, type = "text", rules = {}, LabelHolder}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
			<label htmlFor="basic-url" className="form-label">
				{labelText}
			</label>
			<div className="input-group mb-0">
				<input
					type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
					{...register(id, rules)}
					className={`form-control 
             ${errors[id] ? 'is-invalid' : ''}`}
					placeholder={LabelHolder}
					aria-label="Recipient's username"
					aria-describedby="basic-addon2"
				/>
				{errors[id] && <div className="invalid-feedback">{errors[id].message}</div>}
				{/* 眼睛按鈕 */}
				{type === 'password' && (
					<button
						type="button"
						className="btn position-absolute end-0 top-50 translate-middle-y me-2"
						onClick={() => setShowPassword(!showPassword)}
						style={{ background: 'none', border: 'none' }}
					>
						<i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
					</button>
				)}
			</div>
		</div>
  );
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch(); // 用來更新 Redux 狀態
  const [alertState, setAlertState] = useState({
    show: false,
    status: true,
    message: "",
    redirectTo: null,  // 設定跳轉的路徑
  });
  const isLoading = useSelector((state)=> state.loading.isLoading)

  //開啟提示訊息框
  const showAlert = (message,status,redirectTo)=>{
    setAlertState({show:true,"message":message,"status":status,'redirectTo':redirectTo})
  }

  const setCookie = (name, value, hours) => {
    const date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000); // 當前時間 + hours 小時
    document.cookie = `${name}=${value}; path=/; expires=${date.toUTCString()};`;
  };

  const handleLogin = async (data) => {
    dispatch(setLoading(true));
    try {
      const res = await axios.post(`${API_URL}/login`, {
        email: data.email,
        password: data.password,
      });
      
      // 設置 1 小時後過期的 Token
      setCookie("token", res.data.token, 1);

      // 設置 axios 預設 Authorization
      axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
      
      dispatch(setUserData(res.data.user))
      // 更新 Redux 登入狀態
      dispatch(login());
      showAlert(`登入成功！歡迎 ${res.data.user.name}！`,true,res.data.user.user === "admin" ? "/admin/reservation" : "/member/reservation");

    } catch (error) {
      showAlert(error.response?.data?.message||"登入失敗，發生錯誤，請稍後再試",false);
    }finally{
      dispatch(setLoading(false))
    }
  };

  const validationRules = {
		email: {
			required: '信箱為必填',
		},
		password: {
			required: '密碼為必填',
		},
	};

  return (<>
      <div className="bg-neutral-100 pt-8 pb-10 ">
        <div className="row justify-content-center">
          <div className="col-11 col-sm-10 col-md-8 col-lg-6 bg-white py-10">
            <h5 className="mb-5 text-center">會員登入</h5>
            <form className="row bg-white gy-4 p-6" onSubmit={handleSubmit(handleLogin)}>
              <div className="col-12">
                <FormInput 
                  id="email" 
                  type="email" 
                  labelText="Email" 
                  LabelHolder="請輸入信箱"
                  register={register} 
                  errors={errors} 
                  rules={validationRules.email}
                />
              </div>
              <div className="col-12">
                <FormInput 
                  id="password" 
                  type="password" 
                  labelText="Password"
                  LabelHolder="請輸入密碼" 
                  register={register} 
                  errors={errors} 
                  rules={validationRules.password}
                />
              </div>
              <div className="col-12 d-flex justify-content-center fs-3">
                <span>還沒有帳號嗎？</span>
                <Link to='/register' className="text-primary fw-bold">
                  點擊註冊
                </Link>
              </div>
              <div className="col-12 d-flex justify-content-center pt-6">
                <CustomButton type="submit" className="btn btn-primary text-white w-50 fs-4">登入</CustomButton>
              </div>
            </form>
            {/* Loading 畫面 */}
            {isLoading && <Loading></Loading>}
            {/* Add AlertModal component */}
            {<AlertModal show={alertState.show}
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
          </div>
        </div>
      </div>
    </>
  );
}
FormInput.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  type: PropTypes.string,
  rules: PropTypes.object,
  LabelHolder: PropTypes.string,
};