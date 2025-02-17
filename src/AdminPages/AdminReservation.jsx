import { useState,useRef } from "react";
import dayjs from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MyCalendar from "../components/MyCalendar";
import CustomButton from "../components/CustomButton";



export default function AdminReservation(){
    const calendarRef = useRef(null);
    const [currentMonth, setCurrentMonth] = useState("");
    const [selectedDate, setSelectedDate] = useState(dayjs());
    // const [selectedDates, setSelectedDates] = useState([]);

    // // ✅ 選擇日期時，新增到 selectedDates 陣列，並讓日期變成 disabled
    // const handleDateChange = (newDate) => {
    //     if (!newDate) return;

    //     const formattedDate = newDate.format("YYYY-MM-DD");

    //     setSelectedDates((prevDates) =>
    //     prevDates.includes(formattedDate)
    //         ? prevDates.filter((date) => date !== formattedDate) // 取消選取
    //         : [...prevDates, formattedDate] // 加入選取
    //     );
    // };

    // // ✅ 禁用已選擇的日期，防止重複選取
    // const disableSelectedDates = (date) => {
    //     return selectedDates.includes(date.format("YYYY-MM-DD"));
    // };

    // // ✅ 點擊 "移除" 按鈕時，把日期從 selectedDates 陣列移除
    // const removeDate = (dateToRemove) => {
    //     setSelectedDates((prevDates) =>
    //     prevDates.filter((date) => date !== dateToRemove)
    //     );
    // };

    // const tomorrow = dayjs().add(1, "day").startOf("day"); // 取得明天 00:00

    // const shouldDisableDate = (date) => {
    //     return date.isBefore(tomorrow, "day"); // 🔹 禁用今天 & 以前的日期
    // };

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
                <div className="row mb-4">
                    <div className="col-6">
                        <div className="w-100">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="選擇日期"
                                    value={selectedDate}
                                    onChange={(newDate) => setSelectedDate(newDate)}
                                    disablePast  // 禁用過去的日期
                                    sx={{ width: '100%' }}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className="col-3 d-flex justify-content-center">
                        <CustomButton type="btn" className="btn btn-primary text-white">確定開放預約日期</CustomButton>
                    </div>
                    <div className="col-3 d-flex justify-content-end">
                        <CustomButton type="btn" className="btn btn-outline-primary">確定躺平日</CustomButton>
                    </div>
                </div>
                <div className="pb-8">
                    <MyCalendar ref={calendarRef} onDateChange={setCurrentMonth} />
                </div>
    </div>
        // <LocalizationProvider dateAdapter={AdapterDayjs}>
        //     <DatePicker
        //         label="選擇多個日期"
        //         onChange={handleDateChange}
        //         shouldDisableDate={(date) => shouldDisableDate(date) || disableSelectedDates(date)}// 🚀 禁用已選日期
        //     />
        //     <div>
        //         <h3>已選擇日期：</h3>
        //         {selectedDates.length > 0 ? (
        //         <ul>
        //             {selectedDates.map((date) => (
        //             <li key={date} style={{ display: "flex", alignItems: "center" }}>
        //                 {date} 
        //                 <Button
        //                 variant="outlined"
        //                 size="small"
        //                 style={{ marginLeft: "10px" }}
        //                 onClick={() => removeDate(date)}
        //                 >
        //                 移除
        //                 </Button>
        //             </li>
        //             ))}
        //         </ul>
        //         ) : (
        //         <p>尚未選擇日期</p>
        //         )}
        //     </div>
        // </LocalizationProvider>
    );
}