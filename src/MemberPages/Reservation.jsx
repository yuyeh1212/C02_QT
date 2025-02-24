import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MyCalendar from "../components/MyCalendar";
import { useRef, useState ,useEffect} from "react";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import Radio from "../components/Radio";

const API_URL = 'https://web-project-api-zo40.onrender.com';
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Impvay5qb2suODc1QGdtYWlsLmNvbSIsInVzZXIiOiJ1c2VyIn0._nSIpeAtPpj-jr1UqcnZpLb1v7QH5tCG884MMND5SzM';

export default function Reservation() {
    const calendarRef = useRef(null);
    const dateInputRef = useRef(null)
    const [currentMonth, setCurrentMonth] = useState("");
    const [currentMonthEvent,setCurrentMonthEvent] = useState([])
    const [monthEventState,setMonthEventState] = useState([])
    const [currentTime,setCurrentTime] = useState([])
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [appointmentState,setAppointmentState] = useState({
        "id": "",
        "name": "",
        "birthday": "",
        "email": "",
        "phone": "",
        "date": "",
        "timeSlot": "",
        "bodyPart": "",
        "nailRemoval": "",
        "nailExtension": ""
    })
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
    
    //頁面載入讀取日歷資訊
    
    const handleSubmit =async()=>{
        try {
            await axios.post(`${API_URL}appointment`,{appointmentState})
        } catch (error) {
            console.log(error.response);
        }
    }

    const handleInputChange =(e)=>{
        const id = e.target.id
        const value = e.target.value
        setAppointmentState({...appointmentState,[id] : value})
    }

    const handleCalendar = (info,mobileInfo,e)=>{
        if(info){
            const date = info.event.startStr
            const time = info.event.title
            dateInputRef.current.value = `${date} 時: ${time}`
            setAppointmentState({...appointmentState,date : date,timeSlot:time})
            return
        }
        const date = mobileInfo.date
        const time = mobileInfo.title
        dateInputRef.current.value = `${date} 時: ${time}`
        setAppointmentState({...appointmentState,date : date,timeSlot:time})
    }
    //取得日歷的狀態以及活動資料
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
    //篩選當日時段
    const filterEventTime  = (date)=>{
        console.log(date);
        const newCurrentTime = monthEventState.filter((item)=>item.date ===date)
        setCurrentTime(newCurrentTime)
    }
    //格式化日期>按鈕版本
    const formatDate = (dateStr) => {
        // currentMonthEvent.map
        const date = new Date(dateStr);  // 轉換為 Date 物件
        
        const day = date.getDate();  // 獲取日期
        const month = date.getMonth() + 1;  // 獲取月份，注意月份是從 0 開始的，所以要 +1
        const weekDay = date.toLocaleDateString('zh-TW', { weekday: 'short' });  // 獲取星期幾，使用繁體中文格式
    
        return `${month}/${day}(${weekDay.replace('週',"")})`;
      };
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
                <div className="row flex-lg-row-reverse">
                    <div className={`col-lg-9 ps-lg-4 pb-4 pb-lg-0 ${windowSize<992 ?windowSize<768?"":'bg-white':"bg-neutral-100"}`}>
                        <div className="bg-white d-none d-lg-block">
                            <MyCalendar ref={calendarRef} onDateChange={setCurrentMonth} handleCalendar={handleCalendar} windowSize={windowSize} getCalendarInfo={getCalendarInfo} filterEventsByMonth={filterEventsByMonth}/>
                        </div>
                        
                        
                    </div>
                    <div className={`col-lg-3 ${windowSize<768?'':'bg-white'} p-4`} style={{ paddingBottom: 48 }}>
                        <form id='makeAnAppointment' onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="date" className="form-label fw-bold">
                                    選擇預約時段：：
                                </label>
                                <input type="text" className="form-control form-control-sm" id="date" placeholder="點擊日歷選擇預約時段" ref={dateInputRef}/>
                            </div>
                            {/*平板日歷*/}
                            <div className="mb-4 d-none d-md-block d-lg-none">
                            <MyCalendar ref={calendarRef} onDateChange={setCurrentMonth} handleCalendar={handleCalendar} windowSize={windowSize} getCalendarInfo={getCalendarInfo} filterEventsByMonth={filterEventsByMonth}/>
                            </div>
                            {/*手機板按鈕*/}
                            <div className={`${currentTime.length>0 ?'mb-4':'mb-6'}`}>
                                <div className="row g-2 d-md-none">
                                {currentMonthEvent.length > 0 ?(
                                    currentMonthEvent.map((item)=>{
                                        return(
                                            
                                            <div className="col-4" key={`${item}`}>
                                                <Radio 
                                                className="btn btn-outline-success-200 px-2 py-1 w-100"
                                                id={`radio-${item}`}
                                                onClick={()=>filterEventTime(item)}
                                                name="date"
                                                >
                                                {formatDate(item)}
                                                </Radio>
                                            </div>
                                        )
                                    })
                                ):(<p className="text-success-200 text-center">-本月份暫時沒有空檔-</p>)}
                                    </div>
                                    {currentTime.length > 0 &&<hr className="border-secondary-50 d-md-none"/>}
                                <div className="row gy-4 d-md-none">
                                        {currentTime?.map((item,index)=>{
                                            return(
                                        
                                        <div key={item.date+item.title}>
                                        <Radio
                                        className="btn btn-outline-success-200 px-2 py-1 w-100"
                                        id={index}
                                        onClick={(e)=>handleCalendar("",item)}
                                        name="time"
                                        
                                        >
                                            {item.title}
                                        </Radio>
                                    </div>
                                    )
                                    })}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="bodyPart" className="form-label fw-bold">
                                    手部＆足部：
                                </label>
                                <select className="form-select form-select-sm" id="bodyPart" defaultValue="" onChange={handleInputChange} >
                                    <option value="" disabled>
                                        請選擇手部或足部
                                    </option>
                                    <option value="手部">手部</option>
                                    <option value="足部">足部</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="nailRemoval" className="form-label fw-bold">
                                    是否需要卸甲：
                                </label>
                                <select className="form-select form-select-sm" id="nailRemoval" defaultValue="" onChange={handleInputChange}>
                                    <option value="" disabled>
                                        請選擇是否需要卸甲
                                    </option>
                                    <option value="true">是</option>
                                    <option value="false">否</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="nailExtension" className="form-label fw-bold">
                                    是否需要延甲：
                                </label>
                                <select className="form-select form-select-sm" id="nailExtension" defaultValue="" onChange={handleInputChange}>
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
                            <div className="d-flex justify-content-center d-lg-none">
                            <CustomButton
                                    type="submit"  // 這樣當按鈕被點擊時會提交表單
                                    className="btn btn-primary text-white fs-3 fs-md-4 align-items-center justify-content-center d-flex w-50 mt-4 px-3 py-2"
                                    form='makeAnAppointment'
                                >
                                    預約
                                    <ArrowForwardIcon className="text-white ms-2" />
                                </CustomButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
