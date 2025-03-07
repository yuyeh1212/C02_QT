import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
// Import AlertModal component
import AlertModal from "../components/AlertModal";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../slice/loadingSlice";
// Adjust path as needed
const API_URL = "https://web-project-api-zo40.onrender.com";

const FormInput = ({ register, errors, id, labelText, type = "text", rules = {}, LabelHolder }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div >
            <label htmlFor="basic-url" className="form-label">{labelText}</label>
            <div className="input-group mb-0">
                <input
                    type={type === "password" ? (showPassword ? "text" : "password") : type}
                    {...register(id, rules)}
                    className={`form-control 
             ${errors[id] ? "is-invalid" : ""}`}
                    placeholder={LabelHolder}
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2" />
                {errors[id] && <div className="invalid-feedback">{errors[id].message}</div>}
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
        </div>
    );
};

export default function Register() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    const navigate = useNavigate();
    const password = watch("password");
    const dispatch = useDispatch()
    const [alertState,setAlertState] = useState({show:false,message:"",success:true});
    const isLoading = useSelector((state)=> state.loading.isLoading)

    const showAlert = (message,success)=>{
        setAlertState({show:true,"message":message,"success":success})
    }

    const handleRegister = async (data) => {
        dispatch(setLoading(true)); // 開始 loading
        try {
            const { confirmPassword, ...modifiedData } = data;
            const finalData = {
                ...modifiedData,
                user: "user",
                LineID: data.LineID
            };

            // 設定隨機延遲時間
            const randomDelay = Math.floor(Math.random() * 1000);
            console.log("randomDelay:", randomDelay);

            // 使用 Promise 延遲請求
            await new Promise((resolve) => setTimeout(resolve, randomDelay));

            const res = await axios.post(`${API_URL}/register`, finalData);

            // Replace SweetAlert with AlertModal
           
            showAlert(`註冊成功！歡迎 ${res.data.user.name}！請登入您的帳號`,true);
            

            // Navigate after user confirms
            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            console.error("請求錯誤", error);
            // Replace SweetAlert with AlertModal for error
            showAlert(error.response?.data?.message||"註冊失敗，發生錯誤，請稍後再試",false);
        } finally{
            dispatch(setLoading(false))
        }
    };

    const validationRules = {
        email: {
            required: "信箱為必填",
            pattern: {
                value: /^[a-zA-Z0-9._]{5,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "請輸入有效的電子郵件地址",
            },
        },
        password: {
            required: "密碼為必填",
            pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
                message: "密碼至少8字元，內含至少一個英文字母、一個數字和一個特殊字元。",
            },
        },
        confirmPassword: {
            required: "請確認密碼",
            validate: (value) => value === password || "密碼和確認密碼不一致",
        },
        name: {
            required: "姓名為必填",
        },
        phone: {
            required: "電話為必填",
            pattern: {
                value: /^\d{10}$/,
                message: "電話必須為10碼數字",
            },
        },
        birthday: {
            required: "請選擇生日",
            pattern: {
                value: /^\d{4}-\d{2}-\d{2}$/,
                message: "請使用YYYY-MM-DD格式",
            },
        },
        LineID: {
            required: false,
        },
    };

    return (
        <div className="d-flex flex-column min-vh-100 mb-10">
            {/* Loading 畫面 */}
            {isLoading && <Loading></Loading>}
            {/* Add AlertModal component */}
            {<AlertModal show={alertState.show} onClose={() => setAlertState({...alertState,show:false})} success={alertState.success}>{alertState.message}</AlertModal>}

            <div className="flex-grow-1">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <h5 className="text-center mb-4">會員註冊</h5>
                            <form className="d-flex flex-column gap-3 " onSubmit={handleSubmit(handleRegister)}>
                                <FormInput id="email" type="email" labelText="Email" LabelHolder="請輸入信箱作為註冊帳號" register={register} errors={errors} rules={validationRules.email} />
                                <FormInput id="password" type="password" labelText="密碼" LabelHolder="請輸入註冊密碼" register={register} errors={errors} rules={validationRules.password} />
                                <FormInput id="confirmPassword" type="password" labelText="確認密碼" LabelHolder="請確認註冊密碼" register={register} errors={errors} rules={validationRules.confirmPassword} />
                                <FormInput id="name" type="text" labelText="姓名" LabelHolder="請輸入姓名" register={register} errors={errors} rules={validationRules.name} />
                                <FormInput id="phone" type="tel" labelText="電話" LabelHolder="請輸入註冊電話" register={register} errors={errors} rules={validationRules.phone} />
                                <FormInput id="birthday" type="date" labelText="生日" LabelHolder="請輸入生日" register={register} errors={errors} rules={validationRules.birthday} />
                                <FormInput id="LineID" type="text" labelText="LINE ID" LabelHolder="請輸入LineID,僅供聯繫使用" register={register} errors={errors} rules={validationRules.LineID} />

                                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                    {isLoading ? "註冊中..." : "註冊"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}