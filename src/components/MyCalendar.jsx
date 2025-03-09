import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { forwardRef, useEffect, useState, useImperativeHandle, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading } from "../slice/loadingSlice";

const API_URL = import.meta.env.VITE_BASE_URL;

const MyCalendar = forwardRef(({ onDateChange ,handleCalendar,getCalendarInfo}, ref) => {

    const [selectedEventId, setSelectedEventId] = useState(null);
    const [calendarInfo,setCalendarInfo] = useState(null)
    const [events, setEvents] = useState([]);
    const dispatch = useDispatch();
    //在API中抓日期
    const fetchCalendarData = async()=>{
        
        try {
            const res = await axios.get(`${API_URL}/scheduleConfig`)
            const config = res.data[0]
            const generateCalendarEvents = (config) => {
                const fixedSlots = [
                    { title: "10:30～14:30", start: "10:30:00", end: "14:30:00" },
                    { title: "14:30～18:30", start: "14:30:00", end: "18:30:00" },
                    { title: "18:30～22:30", start: "18:30:00", end: "22:30:00" },
                ];
    
                let slots = [];
                const today = new Date();1
                today.setHours(0, 0, 0, 0);
                const endDate = new Date(config.lastBookableDate);
    
                while (today <= endDate) {
                    const dateStr = today.toISOString().split("T")[0];
    
                    // 跳過不可預約的日期
                    if (config.unavailableTimeSlots.includes(dateStr)) {
                        today.setDate(today.getDate() + 1);
                        continue;
                    }
    
                    // 逐個檢查固定時段
                    fixedSlots.forEach((slot) => {
                        const isReserved = config.reservedTimeSlots.some(
                            (reserved) => reserved.date === dateStr && reserved.timeSlot === slot.title
                        );
                        if (!isReserved) {
                            slots.push({
                                title: slot.title,
                                // start: `${dateStr}T${slot.start}`,
                                // end: `${dateStr}T${slot.end}`,
                                date: dateStr,
                                backgroundColor: "#F7F0EA",
                                textColor: "#6E5E57",
                                classNames: ["custom-events"],
                                id: `${dateStr}-${slot.title}`
                                    .replace(/[:～]/g, "0")
                                    .replace(/-/g, "1"),
                            });
                        }
                    });
                    
                    today.setDate(today.getDate() + 1);
                }
                setEvents(slots);
            };
            generateCalendarEvents(config);
        } catch (error) {
            console.log(error);
        }finally{
            setTimeout(()=>{
                dispatch(setLoading(false))
            },500
            )
        }
    }
    
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
    };    


    useEffect(()=>{
        const token = getCookie("token");
        if (token) {
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        }
        fetchCalendarData()
    },[])

    // 將 FullCalendar API 傳遞出去，讓外層能控制
    useImperativeHandle(ref, () => ({
        getApi: () => calendarRef.current?.getApi(),
        refreshCalendar: fetchCalendarData,
    }));

    const calendarRef = useRef(null);

    useEffect(()=>{
        if( events.length !== 0){
            getCalendarInfo(calendarInfo,events);
        }
    },[events])

    const handleDatesSet = (info) => {
        dispatch(setLoading(true))
        onDateChange(info.view.title);
        setCalendarInfo(info)
        if( events.length !== 0){
            getCalendarInfo(info,events);
        }
        setTimeout(()=>{
            dispatch(setLoading(false))
        },500)
    };

    const handleEventClick = (info) => {
        handleCalendar(info)
        getCalendarInfo(info,events);
        // 取消先前選中的事件樣式
        if (selectedEventId) {
            const prevEvent = info.view.calendar.getEventById(selectedEventId);
            if (prevEvent) {
                prevEvent.setProp("backgroundColor", "#F7F0EA"); // 恢復原始背景顏色
                prevEvent.setProp("textColor", "#6E5E57"); // 恢復原始文字顏色
                prevEvent.setProp("classNames", ['custom-events']); // 恢復原始樣式
            }
        }

        // 設定當前點擊的事件為選中狀態
        info.event.setProp("backgroundColor", "#9D7A3F"); // 選中後的背景顏色
        info.event.setProp("textColor", "#FFFFFF"); // 選中後的文字顏色
        info.event.setProp("classNames", ['custom-events', 'selected-event']); // 設置選中狀態的樣式

        // 更新選中的事件 ID
        setSelectedEventId(info.event.id);
    };

    return (
        <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={handleEventClick}
            headerToolbar={false}
            contentHeight="auto"
            eventClassNames="custom-event"
            datesSet={handleDatesSet}
            locale="zh-tw"
        />
    );
});

MyCalendar.propTypes = {
    onDateChange: PropTypes.func.isRequired,
};

MyCalendar.displayName = "MyCalendar";

export default MyCalendar;
