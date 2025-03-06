import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../slice/authSlice";
import { setUserData } from '../slice/userSlice';
import CustomButton from "../components/CustomButton";

const API_URL = "https://web-project-api-zo40.onrender.com";
// 自定義輸入元件
const FormInput = ({ register, errors, id, labelText, type = "text", rules = {} }) => {
  return (
    <div className="form-floating">
      <input
        type={type}
        {...register(id, rules)}
        className={`form-control ${errors[id] ? "is-invalid" : ""}`}
        placeholder={labelText}
      />
      <label>{labelText}</label>
      {errors[id] && <div className="invalid-feedback">{errors[id].message}</div>}
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

  const handleLogin = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/login`, {
        email: data.email,
        password: data.password,
      });
      // 儲存 Token
      document.cookie = `token=${res.data.token}; path=/;`;
      axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
      
      dispatch(setUserData(res.data.user))

      // 更新 Redux 登入狀態
      dispatch(login());

      navigate(res.data.user.user === "admin" ? "/admin/reservation" : "/member/center/data");
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-5">請先登入</h1>
      <form className="d-flex flex-column gap-3" onSubmit={handleSubmit(handleLogin)}>
        <FormInput id="email" type="email" labelText="Email address" register={register} errors={errors} />
        <FormInput id="password" type="password" labelText="Password" register={register} errors={errors} />
        <CustomButton type="submit" className="btn btn-primary">登入</CustomButton>
      </form>

      {/* 顯示當前登入狀態 */}
      {/* <AuthStatus /> */}
    </div>
  );
}