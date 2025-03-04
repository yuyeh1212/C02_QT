import { useState,useRef, useEffect } from "react";
import dayjs from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CustomButton from "../components/CustomButton";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import MyAdminCalendar from "../components/MyAdminCalendar";

const API_URL = "https://web-project-api-zo40.onrender.com";
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXIiOiJhZG1pbiJ9.jxYxlyf8yETl-iO2wKZT2zrBCMCL3NYOsaDMEytW0c8";


export default function AdminReservation(){
    const calendarRef = useRef(null);
    const [currentMonth, setCurrentMonth] = useState("");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // 初始檢查視窗寬度
    const [unavailableDates, setUnavailableDates] = useState([]);
    const [reservedTimeSlots, setReservedTimeSlots] = useState([]);
    const [lastBookableDate, setLastBookableDate] = useState('');
    const [selectLastDate, setSelectLastDate] = useState(dayjs())
    const [currentMonthEvent,setCurrentMonthEvent] = useState([])
    const [monthEventState,setMonthEventState] = useState([])
    const [currentTime,setCurrentTime] = useState([])


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


    useEffect(()=>{
        document.cookie = `token=${token};`;
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        getCalendar();
    },[])

    const getCalendar = async()=>{
        try {
            const res = await axios.get(`${API_URL}/scheduleConfig`);
            setUnavailableDates(res.data[0].unavailableTimeSlots|| []);
            setLastBookableDate(res.data[0].lastBookableDate|| getLastDayOfMonth());
            setSelectLastDate(dayjs(res.data[0].lastBookableDate||getLastDayOfMonth()));
            setReservedTimeSlots(res.data[0].reservedTimeSlots|| []);
        } catch (error) {
            console.log(error)
        }
    }

    const getLastDayOfMonth = () => {
        const today = new Date();
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return lastDay.toISOString().split("T")[0];
    };
    

    const handleDateChange = (newDate) => {
        if (!newDate) return;
    
        const formattedDate = newDate.format("YYYY-MM-DD");
    
        setUnavailableDates((prevDates) => {
            const updatedDates = prevDates.includes(formattedDate)
                ? prevDates.filter((date) => date !== formattedDate) // 取消選取
                : [...prevDates, formattedDate]; // 加入選取
    
            // 排序日期
            return updatedDates.sort((a, b) => new Date(a) - new Date(b));
        });
    };

    const disableSelectedDates = (date) => {
        return unavailableDates.includes(date.format("YYYY-MM-DD"));
    };

    const removeDate = (dateToRemove) => {
        setUnavailableDates((prevDates) =>
        prevDates.filter((date) => date !== dateToRemove)
        );
    };

    const tomorrow = dayjs().add(1, "day").startOf("day"); // 取得明天 00:00

    const shouldDisableDate = (date) => {
        return date.isBefore(tomorrow, "day"); // 🔹 禁用今天 & 以前的日期
    };

    const handleUpdateRest = async()=>{
        try {
            const res = await axios.patch(`${API_URL}/scheduleConfig`,{
                unavailableTimeSlots: unavailableDates
            })
            getCalendar();
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateLast = async()=>{
        try {
            const res = await axios.patch(`${API_URL}/scheduleConfig`,{
                lastBookableDate: selectLastDate.format("YYYY-MM-DD")
            })
            getCalendar();
        } catch (error) {
            console.log(error)
        }
    }
      

    const getCalendarInfo = (info,eventDate)=>{
        const viewtitle = info.view.title
        filterEventsByMonth(viewtitle,eventDate)
    }
    //篩選當月活動
    const filterEventsByMonth = (viewTitle,eventDate) => {
        const monthYear = viewTitle.split('年');
        const year = monthYear[0];
        let month = monthYear[1].replace('月', '');
        if (Number(month) < 10){
            month = `0${month}`
        }
        const date = `${year}-${month}`

        const newEvent = [...new Set(eventDate.map((item)=>item.date))]
        .filter((item)=>item.startsWith(date))
        setCurrentMonthEvent(newEvent)
        const eventTime = eventDate.filter((item)=>item.date.startsWith(date))
        setMonthEventState(eventTime)
        setCurrentTime([])
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
                                    value={selectLastDate}
                                    onChange={(newDate) => setSelectLastDate(newDate)}
                                    disablePast  // 禁用過去的日期
                                    sx={{ width: '100%' }}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-3 d-flex justify-content-center">
                        <CustomButton type="btn" className={`btn ${isMobile? 'btn-outline-primary  btn-lg' :'btn-primary text-white'} `}
                        onClick={(e)=>handleUpdateLast(e)}
                        >{isMobile?"送出":"確定開放預約日期"}</CustomButton>
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
                                {unavailableDates.length > 0 ? (
                                    <div className="col-12 bg-white mt-4 p-4">
                                        <div className="fw-bold p-2">已選擇日期：</div>
                                        <div className="w-100">
                                            {unavailableDates.map((date) => (
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
                        <CustomButton type="btn" className={`btn  ${isMobile?'w-100 btn-primary text-white btn-lg':'btn-outline-primary'}`} onClick={handleUpdateRest}>送出躺平日</CustomButton>
                    </div>
                </div>
                {isMobile?<></>:
                    <div className="pb-8">
                         <MyAdminCalendar 
                            ref={calendarRef} 
                            onDateChange={setCurrentMonth}  
                            getCalendarInfo={getCalendarInfo}
                            unavailableDates={unavailableDates}
                            reservedTimeSlots={reservedTimeSlots}
                            lastBookableDate={lastBookableDate}
                            setUnavailableDates={setUnavailableDates}
                         />
                    </div>
                }
    </div>
        
    );
}