import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const FormInput = ({ register, errors, id, labelText, type = "text", rules = {} }) => {
    return (
        <div className="form-floating mb-3">
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

export default function Register() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        defaultValues: {
            LineID: "" // 設置默認值
        }
    });

    const navigate = useNavigate();
    const password = watch("password");

    const handleRegister = async (data) => {
        try {
            console.log(data);
            const { confirmPassword, ...modifiedData } = data;
            const finalData = {
                ...modifiedData, user: "user", LineID: data.LineID || "" };// 確保 LineID 有值 
            // console.log(finalData)
            // 設定隨機延遲時間
            const randomDelay = Math.floor((Math.random() * 10000) % 1000);
                console.log('randomDelay:', randomDelay);
                //延遲送出需求
                setTimeout(() => {
        (async () => {
            try {
                if (finalData.LineID === "") {
                    finalData.LineID = "沒有填";
                }
                const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/register`, finalData);
                console.log(finalData)
                console.log("註冊成功", res);
                Swal.fire({
                    title: "註冊成功！",
                    text: `歡迎 ${res.data.user.name}！請登入您的帳號`,
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                });
                navigate("/login");
            } catch (error) {
                console.error("請求錯誤", error);
                Swal.fire({
                    title: "註冊失敗",
                    text: error.response?.data?.message || "發生錯誤，請稍後再試",
                    icon: "error",
                    confirmButtonText: "確定",
                });
            }
        })();
    }, randomDelay);

}
        catch (error) {
    console.log(error)
}
    };


const validationRules = {
    email: {
        required: "信箱為必填",
        pattern: {
            value: /^[a-zA-Z0-9_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "請輸入有效的電子郵件地址",
        },
    },
    password: {
        required: "密碼為必填",
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
            message: "密碼至少8字元,內含至少一個英文字母、一個數字和一個特殊字元。",
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
    <div className="d-flex flex-column min-vh-100">
        <div className="flex-grow-1">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h1 className="text-center mb-4">會員註冊</h1>
                        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit(handleRegister)}>
                            <FormInput
                                id="email"
                                type="email"
                                labelText="Email"
                                register={register}
                                errors={errors}
                                rules={validationRules.email}
                            />

                            <FormInput
                                id="password"
                                type="password"
                                labelText="密碼"
                                register={register}
                                errors={errors}
                                rules={validationRules.password}
                            />

                            <FormInput
                                id="confirmPassword"
                                type="password"
                                labelText="確認密碼"
                                register={register}
                                errors={errors}
                                rules={validationRules.confirmPassword}
                            />

                            <FormInput
                                id="name"
                                type="text"
                                labelText="姓名"
                                register={register}
                                errors={errors}
                                rules={validationRules.name}
                            />

                            <FormInput
                                id="phone"
                                type="tel"
                                labelText="電話"
                                register={register}
                                errors={errors}
                                rules={validationRules.phone}
                            />

                            <FormInput
                                id="birthday"
                                type="date"
                                labelText="生日"
                                register={register}
                                errors={errors}
                                rules={validationRules.birthday}
                            />

                            <FormInput
                                id="LineID"
                                type="text"
                                labelText="LINE ID（選填）"
                                register={register}
                                errors={errors}
                                rules={{ required: false }} // 確保是選填
                            />

                            <button type="submit" className="btn btn-primary">
                                註冊
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}