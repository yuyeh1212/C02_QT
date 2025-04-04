import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AlertModal from '../components/AlertModal';
import RegisterModal from '../components/RegisterModal';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../slice/loadingSlice';
import CustomButton from '../components/CustomButton';
const API_URL = import.meta.env.VITE_BASE_URL;
import PropTypes from 'prop-types';

const FormInput = ({ register, errors, id, labelText, type = 'text', rules = {}, LabelHolder }) => {
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

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });

  const navigate = useNavigate();
  const password = watch('password');
  const dispatch = useDispatch();
  const [alertState, setAlertState] = useState({
    show: false,
    status: true,
    message: '',
    redirectTo: null, // 設定跳轉的路徑
  });

  const [registerAlert, setRegisterAlertState] = useState({
    show: false,
  });


  const isLoading = useSelector((state) => state.loading.isLoading);

  const showRegisterAlert = () => {
    setRegisterAlertState({ show: true });
  };

  //開啟提示訊息框
  const showAlert = (message, status, redirectTo) => {
    setAlertState({ show: true, message: message, status: status, redirectTo: redirectTo });
  };

  const getMinBirthdate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 15); // 減去 15 年
    return today.toISOString().split('T')[0]; // 格式化為 YYYY-MM-DD
  };

  const getMaxBirthdate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 100); // 計算「今天 - 100 年」
    return today.toISOString().split('T')[0]; // 轉換為 YYYY-MM-DD 格式
  };

  useEffect(() => {
    showRegisterAlert();
  }, []);
  const handleRegister = async (data) => {
    dispatch(setLoading(true)); // 開始 loading
    try {
      const { ...modifiedData } = data;
      const finalData = {
        ...modifiedData,
        user: 'user',
        LineID: data.LineID,
      };

      // 設定隨機延遲時間
      const randomDelay = Math.floor(Math.random() * 1000);

      // 使用 Promise 延遲請求
      await new Promise((resolve) => setTimeout(resolve, randomDelay));

      await axios.post(`${API_URL}/register`, finalData);

      showAlert(`註冊成功！歡迎您的加入，請登入帳號開始體驗`, true, '/login');

    } catch (error) {
      showAlert(error.response?.data?.message || '註冊失敗，發生錯誤，請稍後再試', false);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const validationRules = {
    email: {
      required: '信箱為必填',
      pattern: {
        value: /^[a-zA-Z0-9._]{5,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: '請輸入有效的電子郵件地址',
      },
    },
    password: {
      required: '密碼為必填',
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
        message: '密碼至少8字元，內含至少一個英文字母、一個數字和一個特殊字元。',
      },
    },
    confirmPassword: {
      required: '請確認密碼',
      validate: (value) => value === password || '密碼和確認密碼不一致',
    },
    name: {
      required: '姓名為必填',
    },
    phone: {
      required: '電話為必填',
      pattern: {
        value: /^\d{10}$/,
        message: '電話必須為10碼數字',
      },
    },
    birthday: {
      required: '請選擇生日',
      pattern: {
        value: /^\d{4}-\d{2}-\d{2}$/,
        message: '請使用YYYY-MM-DD格式',
      },
      max: {
        value: getMinBirthdate(), // 設定最大日期為 15 年前
        message: '您必須年滿 15 歲才能註冊',
      },
      min: {
        value: getMaxBirthdate(), // 設定最小日期（今天 - 100 年）
        message: '生日不能超過 100 歲',
      },
    },
    LineID: {
      required: 'LINE ID 為必填',
      pattern: {
        value: /^[a-zA-Z0-9_-]+$/,
        message: 'LINE ID 只能包含英文字母、數字、底線 (_) 或連字號 (-)',
      },
    },
  };

  return (
    <div className="d-flex flex-column py-md-15 py-4 bg-neutral-100">
      {/* Loading 畫面 */}
      {isLoading && <Loading/>}
      {/* Add AlertModal component */}
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
      {
        <RegisterModal
          show={registerAlert.show}
          onClose={() => {
            setRegisterAlertState({ ...alertState, show: false });
          }}
          status={registerAlert.status}
        />
      }
      <div className="flex-grow-1">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-11 col-sm-10 col-md-8 col-lg-6">
              <h5 className="text-center mb-8">會員註冊</h5>
              <form
                id="registerForm"
                className="row gy-5 bg-white p-6"
                onSubmit={handleSubmit(handleRegister)}
              >
                <div className="col-12 ">
                  <FormInput
                    id="email"
                    type="email"
                    labelText="Email"
                    LabelHolder="請輸入信箱作為註冊帳號"
                    register={register}
                    errors={errors}
                    rules={validationRules.email}
                  />
                </div>
                <div className="col-12 col-xl-6">
                  <FormInput
                    id="password"
                    type="password"
                    labelText="密碼"
                    LabelHolder="請輸入註冊密碼"
                    register={register}
                    errors={errors}
                    rules={validationRules.password}
                  />
                </div>
                <div className="col-12 col-xl-6">
                  <FormInput
                    id="confirmPassword"
                    type="password"
                    labelText="確認密碼"
                    LabelHolder="請確認註冊密碼"
                    register={register}
                    errors={errors}
                    rules={validationRules.confirmPassword}
                  />
                </div>
                <div className="col-12 col-xl-6">
                  <FormInput
                    id="name"
                    type="text"
                    labelText="姓名"
                    LabelHolder="請輸入中文正楷姓名"
                    register={register}
                    errors={errors}
                    rules={validationRules.name}
                  />
                </div>
                <div className="col-12 col-xl-6">
                  <FormInput
                    id="birthday"
                    type="date"
                    labelText="生日"
                    LabelHolder="請輸入生日"
                    register={register}
                    errors={errors}
                    rules={validationRules.birthday}
                  />
                </div>
                <div className="col-12">
                  <FormInput
                    id="phone"
                    type="tel"
                    labelText="電話"
                    LabelHolder="請輸入註冊電話"
                    register={register}
                    errors={errors}
                    rules={validationRules.phone}
                  />
                </div>
                <div className="col-12">
                  <FormInput
                    id="LineID"
                    type="text"
                    labelText="LINE ID"
                    LabelHolder="請輸入LineID，方便後續傳送通知"
                    register={register}
                    errors={errors}
                    rules={validationRules.LineID}
                  />
                </div>
                <div className="col-12 d-flex justify-content-center fs-3">
                  <span>已經有帳號了？</span>
                  <Link to="/login" className="text-primary fw-bold">
                    點擊登入
                  </Link>
                </div>
                <div className="col-12 d-flex justify-content-center pt-1">
                  <CustomButton
                    type="submit" // 這樣當按鈕被點擊時會提交表單
                    className="btn px-5 py-4 btn-primary text-white w-50 fs-4"
                    disabled={isLoading}
                    form="registerForm"
                  >
                    {isLoading ? '註冊中...' : '註冊'}
                  </CustomButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
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
