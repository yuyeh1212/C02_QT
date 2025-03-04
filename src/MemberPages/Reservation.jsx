import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MyCalendar from "../components/MyCalendar";
import { useRef, useState ,useEffect} from "react";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import Radio from "../components/Radio";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../slice/loadingSlice";
import AlertModal from "../components/AlertModal";
import { Navigate, useNavigate } from "react-router-dom";


const API_URLL = 'https://web-project-api-zo40.onrender.com';
const API_URL = import.meta.env.VITE_API_URL;

//後台
// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Impvay5qb2suODc1QGdtYWlsLmNvbSIsInVzZXIiOiJ1c2VyIn0._nSIpeAtPpj-jr1UqcnZpLb1v7QH5tCG884MMND5SzM';
//會員
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Impvay5qb2suODc1QGdtYWlsLmNvbSIsInVzZXIiOiJ1c2VyIn0._nSIpeAtPpj-jr1UqcnZpLb1v7QH5tCG884MMND5SzM';

export default function Reservation() {
    const calendarRef = useRef(null);
    const dateInputRef = useRef(null)
    const [showModal, setShowModal] = useState(false);
    const [currentMonth, setCurrentMonth] = useState("");
    const [currentMonthEvent,setCurrentMonthEvent] = useState([])
    const [monthEventState,setMonthEventState] = useState([])
    const [currentTime,setCurrentTime] = useState([])
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [appointmentState,setAppointmentState] = useState({
        "name": "",
        "birthday": "",
        "email": "",
        "phone": "",
        "date": "",
        "timeSlot": "",
        "bodyPart": "",
        "nailRemoval": "",
        "nailExtension": "",
        "LineID":""
    })

    //hookForm
    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm(
        {
            defaultValues:appointmentState,
        }
    )
    console.log('errors',errors);

    const onSubmit = (data)=>{
        console.log(data)
    }
    //指定頁面
    const navigate = useNavigate()
    //讀取狀態
    const dispatch = useDispatch()
    const isLoading = useSelector((state)=> state.loading.isLoading)
    // 會員資料讀取
    useEffect(()=>{
        document.cookie = `token=${token};`;
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        (async()=>{
            try {
                const res = await axios.get(`${API_URLL}/login/check`)
                const userState = res.data.user
                console.log(userState);
                setAppointmentState({...appointmentState,
                    'name':userState.name,
                    'birthday': userState.birthday,
                    'email': userState.email,
                    'phone': userState.phone,
                    'LineID': userState.LineID}
                )
            } catch (error) {
                console.log(error.response.data);
                alert('登入異常,為您跳轉到登入頁面')
                setTimeout(()=>{
                    navigate('/login')
                },2000)
            }
        })()
    },[])



    //監聽視窗大小
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
    
    const pushHandleSubmit =async()=>{
        try {
            await axios.post(`${API_URL}appointment`,{appointmentState})
            setShowModal(true)
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
                        <form id='makeAnAppointment' onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label htmlFor="date" className="form-label fw-bold">
                                    選擇預約時段：：
                                </label>
                                <input type="text" 
                                className="form-control form-control-sm" 
                                id="date"  placeholder="點擊日歷選擇預約時段" 
                                ref={dateInputRef}
                                {...register('date',{
                                    required:{value:true,
                                        message:"必填 : 請確認預約時段"
                                    }
                                })}
                                />
                                {errors.date && <div className="text-danger text-center mt-2 fs-2" >
                                    {errors.date.message}
                                </div>}
                            </div>
                            {/*平板日歷*/}
                            <div className="mb-4 d-none d-md-block d-lg-none user-calendar" >
                            <MyCalendar ref={calendarRef} onDateChange={setCurrentMonth} handleCalendar={handleCalendar} windowSize={windowSize} getCalendarInfo={getCalendarInfo} filterEventsByMonth={filterEventsByMonth}/>
                            </div>
                            {/*手機板按鈕*/}
                            <div className={`d-block d-md-none ${currentTime.length>0 ?'mb-4':'mb-6'}`}>
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
                                <select className="form-select form-select-sm" 
                                id="bodyPart"
                                defaultValue=""
                                onChange={handleInputChange} 
                                {...register('bodyPart',{
                                    required:{value:true,
                                        message:"必填 : 請選擇施作部位"
                                    }
                                })}
                                >
                                    <option value="" disabled>
                                        請選擇手部或足部
                                    </option>
                                    <option value="手部">手部</option>
                                    <option value="足部">足部</option>
                                </select>
                                {errors.bodyPart && <div className="text-danger text-center mt-2 fs-2" >
                                    {errors.bodyPart.message}
                                </div>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="nailRemoval" className="form-label fw-bold">
                                    是否需要卸甲：
                                </label>
                                <select className="form-select form-select-sm" 
                                id="nailRemoval" 
                                defaultValue=""
                                onChange={handleInputChange}
                                {...register('nailRemoval',{
                                    required:{value:true,
                                        message:"必填 : 請選擇是否需要卸甲"
                                    }
                                })}
                                >
                                    <option value="" disabled>
                                        請選擇是否需要卸甲
                                    </option>
                                    <option value="true">是</option>
                                    <option value="false">否</option>
                                </select>
                                {errors.nailRemoval && <div className="text-danger text-center mt-2 fs-2" >
                                    {errors.nailRemoval.message}
                                </div>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="nailExtension" className="form-label fw-bold">
                                    是否需要延甲：
                                </label>
                                <select className="form-select form-select-sm"
                                id="nailExtension"
                                defaultValue=""
                                onChange={handleInputChange}
                                {...register('nailExtension',{
                                    required:{value:true,
                                        message:"必填 : 請選擇是否需要延甲"
                                    }
                                })}
                                >
                                    <option disabled value="">
                                        請選擇是否需要延甲
                                    </option>
                                    <option value="true">是</option>
                                    <option value="false">否</option>
                                </select>
                                {errors.nailExtension && <div className="text-danger text-center mt-2 fs-2" >
                                    {errors.nailExtension.message}
                                </div>}
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
            {isLoading && <Loading></Loading>}
            {<AlertModal show={showModal} onClose={() => setShowModal(false)} >恭喜預約成功！</AlertModal>}
        </div>
    );
}
