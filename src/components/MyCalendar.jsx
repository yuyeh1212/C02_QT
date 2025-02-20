import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { forwardRef, useEffect, useState, useImperativeHandle, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL

const MyCalendar = forwardRef(({ onDateChange ,handleCalendar,windowSize,getCalendarInfo}, ref) => {

    const [selectedEventId, setSelectedEventId] = useState(null);
    const [eventDate,setEventDate] = useState([])
    const [events, setEvents] = useState([
    //   { id: "1", title: "10:30~14:30", date: "2025-02-19", backgroundColor: "#F7F0EA", textColor: "#6E5E57", classNames: ['custom-event'] },
    //   { id: "2", title: "14:30~18:30", date: "2025-02-19", backgroundColor: "#F7F0EA", textColor: "#6E5E57", classNames: ['custom-event'] },
    //   { id: "3", title: "18:30~22:30", date: "2025-02-19", backgroundColor: "#F7F0EA", textColor: "#6E5E57", classNames: ['custom-event'] },
    //   { id: "4", title: "10:30~14:30", date:"2025-02-20", backgroundColor: "#F7F0EA", textColor: "#6E5E57",classNames: ['custom-event'] },
    //   { id: "5", title: "14:30~18:30", date:"2025-02-20", backgroundColor: "#F7F0EA", textColor: "#6E5E57",classNames: ['custom-event'] },
    //   { id: "6", title: "18:30~22:30", date:"2025-02-20", backgroundColor: "#F7F0EA", textColor: "#6E5E57",classNames: ['custom-event'] },
    ]);
    //在API中抓日期
    useEffect(()=>{
        (async()=>{
            try {
                const res = await axios.get(`${API_URL}scheduleConfig`)
                const reservedTimeSlots = res.data[0].reservedTimeSlots
                const newEvents = reservedTimeSlots.map(({ date, timeSlot }) => ({
                    id: date + timeSlot,
                    title: timeSlot,
                    date: date,
                    backgroundColor: "#F7F0EA",
                    textColor: "#6E5E57",
                    classNames: ["custom-event"],
                  }));
                setEvents(newEvents)
                setEventDate(reservedTimeSlots)
            } catch (error) {
                console.log(error);
            }
        })()
    },[])

    // 將 FullCalendar API 傳遞出去，讓外層能控制
    useImperativeHandle(ref, () => ({
        getApi: () => calendarRef.current?.getApi(),
    }));
    const calendarRef = useRef(null);

    const handleDatesSet = (info) => {
        onDateChange(info.view.title);
        if( eventDate.length !== 0){
            getCalendarInfo(info,eventDate);
        }
    };

    const handleEventClick = (info) => {
        handleCalendar(info)
        // 取消先前選中的事件樣式
        if (selectedEventId) {
            const prevEvent = info.view.calendar.getEventById(selectedEventId);
            if (prevEvent) {
                prevEvent.setProp("backgroundColor", "#F7F0EA"); // 恢復原始背景顏色
                prevEvent.setProp("textColor", "#6E5E57"); // 恢復原始文字顏色
                prevEvent.setProp("classNames", ['custom-event']); // 恢復原始樣式
            }
        }

        // 設定當前點擊的事件為選中狀態
        info.event.setProp("backgroundColor", "#9D7A3F"); // 選中後的背景顏色
        info.event.setProp("textColor", "#FFFFFF"); // 選中後的文字顏色
        info.event.setProp("classNames", ['custom-event', 'selected-event']); // 設置選中狀態的樣式

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
