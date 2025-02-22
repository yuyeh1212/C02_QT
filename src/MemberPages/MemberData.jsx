import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css";
import $ from "jquery";
import "bootstrap-datepicker";

export default function MemberData() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    email: "",
    phone: "",
    lineID: "",
  });

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

  return (
    <section className="container py-9 px-md-9 px-4">
      <form className="row g-3 ">
        <h2 className="fs-7 font-semibold">會員資料</h2>
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
                class="bi bi-calendar3"
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
              setFormData((prev) => ({ ...prev, email: e.target.value }))
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
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
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
            value={formData.lineID}
            disabled={!isEditing}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, lineID: e.target.value }))
            }
          />
        </div>
        <div className="col-12 d-flex justify-content-center">
          <button
            type="button"
            className="btn mt-6 px-5 py-4 btn-primary text-white"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? "儲存 →" : "編輯資料 →"}
          </button>
        </div>
      </form>
    </section>
  );
}