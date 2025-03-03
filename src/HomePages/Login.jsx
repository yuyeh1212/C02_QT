import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slice/authSlice";
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
// const AuthStatus=()=>{
//   const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated);
//   return (
//     <div className="mt-3">
//       <h2>使用者狀態：</h2>
//       <p>{isAuthenticated ? "✅ 已登入" : "❌ 未登入"}</p>
//     </div>
//   );
// };

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
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, {
        email: data.email,
        password: data.password,
      });

      // 儲存 Token
      document.cookie = `token=${res.data.token}; path=/;`;
      axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 更新 Redux 登入狀態
dispatch(login());
      // 登入成功，跳轉頁面
      await Swal.fire({
        title: "登入成功！",
        text: `歡迎 ${res.data.user.name}！`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(res.data.user.user === "admin" ? "/admin" : "/orders");
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: "登入失敗",
        text: error.response?.data?.message || "請稍後再試",
        icon: "error",
        confirmButtonText: "確定",
      });
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-5">請先登入</h1>
      <form className="d-flex flex-column gap-3" onSubmit={handleSubmit(handleLogin)}>
        <FormInput id="email" type="email" labelText="Email address" register={register} errors={errors} />
        <FormInput id="password" type="password" labelText="Password" register={register} errors={errors} />
        <button type="submit" className="btn btn-primary">登入</button>
      </form>

      {/* 顯示當前登入狀態 */}
      {/* <AuthStatus /> */}
    </div>
  );
}
