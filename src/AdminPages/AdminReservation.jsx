import { useState,useRef, useEffect } from "react";
import dayjs from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MyCalendar from "../components/MyCalendar";
import CustomButton from "../components/CustomButton";
import CloseIcon from '@mui/icons-material/Close';


export default function AdminReservation(){
    const calendarRef = useRef(null);
    const [currentMonth, setCurrentMonth] = useState("");
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // 初始檢查視窗寬度


    // 監聽視窗大小變化
    useEffect(() => {

      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768); // 每次resize都檢查視窗寬度
      };
  
      // 當視窗尺寸變動時，更新狀態
      window.addEventListener('resize', handleResize);
  
      
      // 清理事件監聽
      return () => window.removeEventListener('resize', handleResize);

    }, []);


    const [selectedDates, setSelectedDates] = useState([]);

    // ✅ 選擇日期時，新增到 selectedDates 陣列，並讓日期變成 disabled
    const handleDateChange = (newDate) => {
        if (!newDate) return;

        const formattedDate = newDate.format("YYYY-MM-DD");

        setSelectedDates((prevDates) =>
        prevDates.includes(formattedDate)
            ? prevDates.filter((date) => date !== formattedDate) // 取消選取
            : [...prevDates, formattedDate] // 加入選取
        );
    };

    // ✅ 禁用已選擇的日期，防止重複選取
    const disableSelectedDates = (date) => {
        return selectedDates.includes(date.format("YYYY-MM-DD"));
    };

    // ✅ 點擊 "移除" 按鈕時，把日期從 selectedDates 陣列移除
    const removeDate = (dateToRemove) => {
        setSelectedDates((prevDates) =>
        prevDates.filter((date) => date !== dateToRemove)
        );
    };

    const tomorrow = dayjs().add(1, "day").startOf("day"); // 取得明天 00:00

    const shouldDisableDate = (date) => {
        return date.isBefore(tomorrow, "day"); // 🔹 禁用今天 & 以前的日期
    };

    return (<div>
                <div className="my-custom-header d-flex justify-content-between mb-6">
                    <span className="text-primary-02 fw-bold fs-5">{currentMonth}</span>
                    <div>
                        <CustomButton
                            className="btn btn-primary text-white py-2 px-3 me-4"
                            onClick={() => calendarRef.current.getApi().today()}
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
                <div className="row mb-4 g-4">
                    {isMobile?<p className="col-12 fw-bold ">選擇最後預約日期：</p>:<></>}
                    <div className="col-lg-6 col-md-5 col-9">
                        <div className="w-100">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="選擇最後預約日期"
                                    value={selectedDate}
                                    onChange={(newDate) => setSelectedDate(newDate)}
                                    disablePast  // 禁用過去的日期
                                    sx={{ width: '100%' }}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-3 d-flex justify-content-center">
                        <CustomButton type="btn" className={`btn ${isMobile? 'btn-outline-primary  btn-lg' :'btn-primary text-white'} `}>{isMobile?"送出":"確定開放預約日期"}</CustomButton>
                    </div>
                    {isMobile?
                        <div>
                            <div className="col-12 fw-bold">
                                選擇躺平日：
                            </div>
                            <div className="col-12 pt-4">
                                <div className="w-100">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="選擇躺平日(多選)"
                                            onChange={handleDateChange}
                                            shouldDisableDate={(date) => shouldDisableDate(date) || disableSelectedDates(date)}
                                            sx={{ width: '100%'}}
                                        />
                                    </LocalizationProvider>
                                </div>
                                {selectedDates.length > 0 ? (
                                    <div className="col-12 bg-white mt-4 p-4">
                                        <div className="fw-bold p-2">已選擇日期：</div>
                                        <div className="w-100">
                                            {selectedDates.map((date) => (
                                                <div key={date} className="border p-3 border-primary my-2 d-flex align-items-center justify-content-between text-primary">
                                                    {date} 
                                                    <button className="btn btn-sm border-0 text-primary" onClick={()=>removeDate(date)}>
                                                        <CloseIcon></CloseIcon>
                                                    </button>
                                                </div>
                                        ))}
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                        :
                        <></>
                    }
                    <div className="col-lg-3 col-md-3 col-12 d-block d-sm-flex justify-content-end">
                        <CustomButton type="btn" className={`btn  ${isMobile?'w-100 btn-primary text-white btn-lg':'btn-outline-primary'}`}>送出躺平日</CustomButton>
                    </div>
                </div>
                {isMobile?<></>:
                    <div className="pb-8">
                        <MyCalendar ref={calendarRef} onDateChange={setCurrentMonth} />
                    </div>
                }
    </div>
        
    );
}