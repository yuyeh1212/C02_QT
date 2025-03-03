import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../slice/userSlice";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css";
import $ from "jquery";
import "bootstrap-datepicker";
import { useNavigate } from "react-router-dom";

const API_URL = "https://web-project-api-zo40.onrender.com";
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InF0MTIzMjMyMyIsInVzZXIiOiJ1c2VyIiwiaWF0IjoxNzQxMDE4NzY5LCJleHAiOjE3NDEwMjIzNjl9.luCpcxxXMnZ23XO6rTZ2ZkQ0IUjOsVV1y_wJ5muJ9Ak';

export default function MemberData() {
  const dispatch = useDispatch();


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

  const navigate = useNavigate()

  useEffect(() => {
    $("#datepicker")
      .datepicker({
        format: "yyyy/mm/dd", // 設定日期格式
        autoclose: true, // 選擇日期後自動關閉
        todayHighlight: true, // 突出顯示今天
        language: "zh-TW", // 可選，設定語言
      })
      .on("changeDate", (e) => {
        setFormData((prev) => ({
          ...prev,
          birthday: $("#datepicker").val(),
        }));
      });
  }, []);

  useEffect(()=>{
    document.cookie = `token=${token};`;
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    (async()=>{
        try {
            const res = await axios.get(`${API_URL}/login/check`)
            const userState = res.data.user
            console.log(userState);
            setFormData({...setFormData,
                'id':userState.id,
                'name':userState.name,
                'birthday': userState.birthday,
                'email': userState.email,
                'phone': userState.phone,
                'LineID': userState.LineID}
            )
        } catch (error) {
            console.log(error)
            alert('登入異常,為您跳轉到登入頁面')
            setTimeout(()=>{
                navigate('/login')
            },2000)
        }
    })()
},[])

  const handleSave = () => {
    axios
      .patch(
        `${API_URL}/members/update`,
        {
          id: formData.id,
          email: formData.email,
          phone: formData.phone,
          LineID: formData.LineID,
        }
      )
      .then((res) => {
        console.log("更新成功:", res.data);
        setIsEditing(false);

        // 更新 Redux Store
        dispatch(setUserData(formData));
      })
      .catch((err) => {
        console.error("更新失敗:", err);
      });
  };

  return (
    <section className="container">
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
              <label htmlFor="datepicker" className="form-label">
                生日
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="datepicker"
                  value={formData.birthday}
                  disabled
                />
                <span className="input-group-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-calendar3"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z" />
                    <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                  </svg>
                </span>
              </div>
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
            </div>
            <div className="col-12 d-flex justify-content-center"></div>
          </form>
        </div>
        <div className="col-12 d-flex justify-content-center pt-6">
          <button
            type="button"
            className="btn px-5 py-4 btn-primary text-white"
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? "儲存" : "編輯資料"}
          </button>
        </div>
      </div>
    </section>
  );
}
