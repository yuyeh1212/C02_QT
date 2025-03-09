import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slice/authSlice";
import { setUserData } from '../slice/userSlice';
import { setLoading } from "../slice/loadingSlice";
import CustomButton from "../components/CustomButton";
import AlertModal from "../components/AlertModal";
import Loading from "../components/Loading";
const API_URL = import.meta.env.VITE_BASE_URL;
// 自定義輸入元件
const FormInput = ({ register, errors, id, labelText, type = "text", rules = {} }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="form-floating">
      <input
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        {...register(id, rules)}
        className={`form-control ${errors[id] ? "is-invalid" : ""}`}
        placeholder={labelText}
      />
      <label>{labelText}</label>
      {/* 眼睛按鈕 */}
      {type === "password" && (
        <button
          type="button"
          className="btn position-absolute end-0 top-50 translate-middle-y me-2"
          onClick={() => setShowPassword(!showPassword)}
          style={{ background: "none", border: "none" }}
        >
          <i className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}></i>
        </button>
      )}
    </div>
  );
};


export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch(); // 用來更新 Redux 狀態
  const [alertState,setAlertState] = useState({show:false,message:"",success:true});
  const isLoading = useSelector((state)=> state.loading.isLoading)

  const showAlert = (message,success)=>{
      setAlertState({show:true,"message":message,"success":success})
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
      showAlert(`登入成功！歡迎 ${res.data.user.name}！`,true);

      setTimeout(() => {
        navigate(res.data.user.user === "admin" ? "/admin/reservation" : "/member/center/data");
      }, 2000);

    } catch (error) {
      console.error("請求錯誤", error);
      // Replace SweetAlert with AlertModal for error
      showAlert(error.response?.data?.message||"登入失敗，發生錯誤，請稍後再試",false);
    }finally{
      dispatch(setLoading(false))
  }
  };

  return (<>
      <div className="bg-neutral-100 pt-6 pb-10 ">
        <div className="row justify-content-center">
          <div className="col-9 col-md-6 bg-white py-10">
            <h5 className="mb-5 text-center">會員登入</h5>
            <form className="row bg-white gy-4 p-6" onSubmit={handleSubmit(handleLogin)}>
              <div className="col-12">
                <FormInput id="email" type="email" labelText="Email address" register={register} errors={errors} />
              </div>
              <div className="col-12">
                <FormInput id="password" type="password" labelText="Password" register={register} errors={errors} />
              </div>
              <div className="col-12 d-flex justify-content-center pt-6">
                <CustomButton type="submit" className="btn btn-primary text-white w-50 fs-4">登入</CustomButton>
              </div>
            </form>
            {/* Loading 畫面 */}
            {isLoading && <Loading></Loading>}
            {/* Add AlertModal component */}
            {<AlertModal show={alertState.show} onClose={() => setAlertState({...alertState,show:false})} success={alertState.success}>{alertState.message}</AlertModal>}    
          </div>
        </div>
      </div>
    </>
  );
}