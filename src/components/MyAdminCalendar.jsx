import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { forwardRef, useEffect, useState, useImperativeHandle, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";


const MyAdminCalendar = forwardRef(({ onDateChange,getCalendarInfo,unavailableDates,reservedTimeSlots,lastBookableDate,setUnavailableDates}, ref) => {

    const [calendarInfo,setCalendarInfo] = useState(null)
    const [events, setEvents] = useState([]);
   
  
    // 將 FullCalendar API 傳遞出去，讓外層能控制
    useImperativeHandle(ref, () => ({
        getApi: () => calendarRef.current?.getApi(),
    }));

    const calendarRef = useRef(null);

    useEffect(()=>{
        if( events.length !== 0){
            getCalendarInfo(calendarInfo,events);
        }
    },[events])

    const handleDatesSet = (info) => {
        onDateChange(info.view.title);
        setCalendarInfo(info)
        if( events.length !== 0){
            getCalendarInfo(info,events);
        }
    };


    // 生成月曆事件
    const generateEvents = () => {
        let events = [
            ...unavailableDates.map((date) => ({
                title: "躺平日",
                date:date,
                backgroundColor: "red",
                allDay: true,
                extendedProps: { type: "unavailable" },
            })),
            ...reservedTimeSlots.map((slot) => ({
                title: slot.timeSlot,
                date: slot.date,
                backgroundColor: "blue",
                allDay: true,
                extendedProps: { type: "reserved" },
            })),
        ];

        const startDate = new Date();
        const endDate = new Date(lastBookableDate);
        while (startDate <= endDate) {
            const dateStr = startDate.toISOString().split("T")[0];
            if (!unavailableDates.includes(dateStr) && !reservedTimeSlots.some(slot => slot.date === dateStr)) {
                events.push({
                    title: "可躺平",
                    date: dateStr,
                    backgroundColor: "green",
                    allDay: true,
                    extendedProps: { type: "available" },
                });
            }
            startDate.setDate(startDate.getDate() + 1);
        }
        return events;
    };

    const handleEventClick = (info) => {
        const event = info.event;

        if (event.extendedProps.type === "available") {
            // 將可用事件顏色改為紅色，並修改標題為「躺平日」
            event.setProp("backgroundColor", "red");
            event.setProp("title", "躺平日");
            event.setExtendedProp("type", "unavailable");

            // 更新 unavailableDates 狀態，加入並排序
            setUnavailableDates((prev) => 
                [...prev, event.startStr].sort((a, b) => new Date(a) - new Date(b))
            );
        } else if (event.extendedProps.type === "unavailable") {
            // 將不可用事件顏色改為綠色，並修改標題為「可躺平」
            event.setProp("backgroundColor", "green");
            event.setProp("title", "可躺平");
            event.setExtendedProp("type", "available");

            // 更新 unavailableDates 狀態，刪除已選擇的日期並排序
            setUnavailableDates((prev) => 
                prev.filter((date) => date !== event.startStr).sort((a, b) => new Date(a) - new Date(b))
            );
        }
    };

    return (
        <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={generateEvents()}
            eventClick={handleEventClick}
            headerToolbar={false}
            contentHeight="auto"
            eventClassNames="custom-event"
            datesSet={handleDatesSet}
            locale="zh-tw"
        />
    );
});

MyAdminCalendar.propTypes = {
    onDateChange: PropTypes.func.isRequired,
    getCalendarInfo: PropTypes.func.isRequired,
    unavailableDates: PropTypes.array.isRequired,
    reservedTimeSlots: PropTypes.array.isRequired,
    lastBookableDate: PropTypes.string.isRequired,
    setUnavailableDates:PropTypes.func.isRequired,
};

MyAdminCalendar.displayName = "MyCalendar";

export default MyAdminCalendar;
