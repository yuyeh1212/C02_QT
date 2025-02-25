import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from 'sweetalert2';

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

      // 登入成功，跳轉頁面
      // alert(`登入成功，歡迎 ${res.data.user.name}！`);
      await Swal.fire({
        title: "登入成功！",
        text: `歡迎 ${res.data.user.name}！`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate(res.data.user.user === "admin" ? "/admin" : "/orders");
    } catch (error) {
      // alert(error.response?.data?.message || "登入失敗，請稍後再試");
      Swal.fire({
        title: "登入失敗",
        text: error.response?.data?.message || "請稍後再試",
        icon: "error",
        confirmButtonText: "確定",
      });
    }
  };

  const emailRules = {
    required: { value: true, message: "Email 為必填" },
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "Email 格式錯誤",
    },
  };

  const passwordRules = {
    required: "密碼為必填",
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
      message: "密碼至少 8 碼，需包含大小寫字母、數字和特殊符號",
    },
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="mb-5">請先登入</h1>
      <form className="d-flex flex-column gap-3" onSubmit={handleSubmit(handleLogin)}>
        <FormInput
          id="email"
          type="email"
          labelText="Email address"
          register={register}
          errors={errors}
          rules={emailRules}
        />

        <FormInput
          id="password"
          type="password"
          labelText="Password"
          register={register}
          errors={errors}
          rules={passwordRules}
        />

        <button type="submit" className="btn btn-primary">
          登入
        </button>
      </form>
    </div>
  );
}