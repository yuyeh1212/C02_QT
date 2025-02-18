import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MyCalendar from "../components/MyCalendar";
import { useRef, useState ,useEffect} from "react";
import CustomButton from "../components/CustomButton";

export default function Reservation() {
    const calendarRef = useRef(null);
    const [currentMonth, setCurrentMonth] = useState("");
    const [windowSize, setWindowSize] = useState(
        window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
          setWindowSize(
            window.innerWidth
          );
        };
    
        // 註冊 resize 事件
        window.addEventListener('resize', handleResize);
    
        // 清除事件監聽器，防止記憶體洩漏
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
        <div className="bg-neutral-100" style={{ paddingTop: 48, paddingBottom: 48 }}>
            <div className="container">
                <div>
                    <h2 className="fs-5 fs-md-6 fw-semibold mb-md-4 text-center text-lg-start">預約時段</h2>
                    <div className="my-custom-header d-flex justify-content-between mb-lg-6 py-4 py-lg-0">
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
                <div className="row ">
                    <div className={`col-lg-3 ${windowSize<768?'':'bg-white'} p-4`} style={{ paddingBottom: 48 }}>
                        <form id='makeAnAppointment'>
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
                                className="btn btn-primary text-white fs-5 align-items-center justify-content-center d-lg-flex w-100 d-none"
                            >
                                預約
                                <ArrowForwardIcon className="text-white ms-2" />
                            </CustomButton>
                        </form>
                    </div>
                    <div className={`col-lg-9 ps-lg-4 pb-4 pb-lg-0 ${windowSize<992 ?windowSize<768?"":'bg-white':"bg-neutral-100"}`}>
                        <div className="bg-white d-none d-md-block">
                            <MyCalendar ref={calendarRef} onDateChange={setCurrentMonth} />
                        </div>
                        <div className="row d-md-none">
                            <div className="col-4">
                            <CustomButton
                            type="button"
                            className="btn btn-outline-success-200 px-2 py-1 w-100"
                            >
                                2/13(三)
                            </CustomButton>
                            </div>
                            <div className="col-4">
                            <CustomButton
                            type="button"
                            className="btn btn-outline-success-200 px-2 py-1 w-100"
                            >
                                2/13(三)
                            </CustomButton>
                            </div>
                            <div className="col-4">
                            <CustomButton
                            type="button"
                            className="btn btn-outline-success-200 px-2 py-1 w-100"
                            >
                                2/13(三)
                            </CustomButton>
                            </div>
                        </div>
                        <hr className="border-secondary-50 d-md-none"/>
                        <div className="row d-md-none">
                            <div className="col-4">
                            <CustomButton
                            type="button"
                            className="btn btn-outline-success-200 px-2 py-1 w-100"
                            >
                                10:30-14:30
                            </CustomButton>
                            </div>
                            <div className="col-4">
                            <CustomButton
                            type="button"
                            className="btn btn-outline-success-200 px-2 py-1 w-100"
                            >
                                14:30-18:30
                            </CustomButton>
                            </div>
                            <div className="col-4">
                            <CustomButton
                            type="button"
                            className="btn btn-outline-success-200 px-2 py-1 w-100"
                            >
                                18:30-22:30
                            </CustomButton>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center d-lg-none">
                        <CustomButton
                                type="submit"  // 這樣當按鈕被點擊時會提交表單
                                className="btn btn-primary text-white fs-3 fs-md-4 align-items-center justify-content-center d-flex w-25 mt-4 px-3 py-2"
                                form='makeAnAppointment'
                            >
                                預約
                                <ArrowForwardIcon className="text-white ms-2" />
                            </CustomButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
