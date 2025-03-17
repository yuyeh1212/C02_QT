import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../slice/userSlice";
import { setLoading } from "../slice/loadingSlice";
import AlertModal from "../components/AlertModal";
import Loading from "../components/Loading";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css";
import CustomButton from "../components/CustomButton";

const API_URL = import.meta.env.VITE_BASE_URL;

export default function MemberData() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state)=> state.loading.isLoading)
  // 用 Redux 會員資料初始化 formData
  const [formData, setFormData] = useState({
    id:"",
    name: "",
    birthday: "",
    email: "",
    phone: "",
    LineID: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", success:true });
  const [errors, setErrors] = useState({ email: "", phone: "", LineID: "" });

  const userData = useSelector(state => state.userData);


  useEffect(()=>{
    if(userData){
      setFormData((prevFormData) => ({
        ...prevFormData,
        'id':userData.id,
        'name':userData.name,
        'birthday': userData.birthday,
        'email': userData.email,
        'phone': userData.phone,
        'LineID': userData.LineID
      }))
    }
  },[userData])

  const showAlert = (message, status) => {
    setAlert({ show: true, message, status });
  };

  // 驗證函式
  const validateForm = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email 為必填";
    } else if (!/^[a-zA-Z0-9._]{5,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)) {
      newErrors.email = "Email 格式不正確";
    }

    if (!formData.phone) {
      newErrors.phone = "電話號碼為必填";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "電話號碼需為 10 碼數字";
    }

    if (!formData.LineID) {
      newErrors.LineID = "LINE ID 為必填";
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.LineID)) {
      newErrors.LineID = "LINE ID 只能包含英文字母、數字、底線 (_) 或連字號 (-)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // 回傳是否驗證成功
  };

  const handleSave = async () => {
    if (!validateForm()) return; // 若驗證失敗則不繼續
    
    dispatch(setLoading(true))
    try {
      await axios.patch(`${API_URL}/members/update`, formData);
      setIsEditing(false);
      dispatch(setUserData(formData)); // 更新 Redux Store
      showAlert("更新成功！", true);
    } catch {
      showAlert("更新失敗，請重試！", false);
    } finally {
      dispatch(setLoading(false))
    }
  };

  return (
    <section className="container">
      {isLoading && <Loading />}
      {<AlertModal show={alert.show} onClose={() => setAlert({...alert,show:false})} status={alert.status}>
        {alert.message}
      </AlertModal>}
      <div className="row d-flex justify-content-center">
        <div className="col-9 col-lg-6">
          <form className="row  g-3 bg-white p-6 ">
            <h2 className="h5 font-semibold">會員資料</h2>
            <div className="col-12 col-md-6">
              <label htmlFor="inputName" className="form-label">
                姓名
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                value={formData.name}
                disabled
              />
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="birthday" className="form-label">
                生日
              </label>
              <input
                type="text"
                className="form-control"
                id="birthday"
                value={formData.birthday}
                disabled
              />
            </div>
            <div className="col-12">
              <label htmlFor="inputEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                value={formData.email}
                disabled={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="inputPhone" className="form-label">
                電話
              </label>
              <input
                type="tel"
                className="form-control"
                value={formData.phone}
                disabled={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              {errors.phone && <p className="error-text">{errors.phone}</p>}
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="inputLineID" className="form-label">
                Line ID
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLineID"
                value={formData.LineID}
                disabled={!isEditing}
                onChange={(e) =>
                  setFormData({ ...formData, LineID: e.target.value })
                }
              />
              {errors.LineID && <p className="error-text">{errors.LineID}</p>}
            </div>
            <div className="col-12 d-flex justify-content-center"></div>
          </form>
        </div>
        <div className="col-12 d-flex justify-content-center pt-6">
          <CustomButton
            type="submit"  // 這樣當按鈕被點擊時會提交表單
            className="btn px-5 py-4 btn-primary text-white"
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            disabled={isLoading}
          >
          {isLoading ? "處理中..." : isEditing ? "儲存" : "編輯資料"}
          </CustomButton>
        </div>
      </div>
    </section>
  );
}
