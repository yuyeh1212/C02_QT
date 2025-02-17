import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MyCalendar from "../components/MyCalendar";
import { useRef, useState } from "react";
import CustomButton from "../components/CustomButton";

export default function Reservation() {
    const calendarRef = useRef(null);
    const [currentMonth, setCurrentMonth] = useState("");

    return (
        <div className="bg-neutral-100 vh-100" style={{ paddingTop: 48, paddingBottom: 48 }}>
            <div className="container">
                <div>
                    <h2 className="fs-md-6 fw-semibold mb-4">預約時段</h2>
                    <div className="my-custom-header d-flex justify-content-between mb-6">
                        <span className="text-primary-02 fw-bold fs-5">{currentMonth}</span>
                        <div>
                            <CustomButton
                                type="button"  // 確保它是非提交按鈕
                                className="btn btn-primary text-white py-2 px-3 me-4"
                                onClick={() => calendarRef.current.getApi().today()}  // 點擊時調用 API
                            >
                                今天
                            </CustomButton>
                            <KeyboardArrowLeftIcon
                                className="text-primary-02"
                                onClick={() => calendarRef.current.getApi().prev()}
                                style={{ cursor: 'pointer' }}
                            />
                            <KeyboardArrowRightIcon
                                className="text-primary-02"
                                onClick={() => calendarRef.current.getApi().next()}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 bg-white p-4" style={{ paddingBottom: 48 }}>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="date" className="form-label fw-bold">
                                    想預約的日期和時段：
                                </label>
                                <input type="text" className="form-control" id="date" placeholder="點擊日歷選擇預約時段" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="place" className="form-label fw-bold">
                                    手部＆足部：
                                </label>
                                <select className="form-select" id="place" defaultValue="">
                                    <option value="" disabled>
                                        請選擇手部或足部
                                    </option>
                                    <option value="手部">手部</option>
                                    <option value="足部">足部</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="removeTheArmor" className="form-label fw-bold">
                                    是否需要卸甲：
                                </label>
                                <select className="form-select" id="removeTheArmor" defaultValue="">
                                    <option value="" disabled>
                                        請選擇是否需要卸甲
                                    </option>
                                    <option value="true">是</option>
                                    <option value="false">否</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="extensionOfTheArmor" className="form-label fw-bold">
                                    是否需要延甲：
                                </label>
                                <select className="form-select" id="extensionOfTheArmor" defaultValue="">
                                    <option disabled value="">
                                        請選擇是否需要延甲
                                    </option>
                                    <option value="true">是</option>
                                    <option value="false">否</option>
                                </select>
                            </div>
                            <CustomButton
                                type="submit"  // 這樣當按鈕被點擊時會提交表單
                                className="btn btn-primary text-white fs-5 align-items-center justify-content-center d-flex w-100"
                            >
                                預約
                                <ArrowForwardIcon className="text-white ms-2" />
                            </CustomButton>
                        </form>
                    </div>
                    <div className="col-9 bg-neutral-100 ps-4">
                        <div className="bg-white">
                            <MyCalendar ref={calendarRef} onDateChange={setCurrentMonth} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
