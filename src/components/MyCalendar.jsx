import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { forwardRef, useEffect, useState, useImperativeHandle, useRef } from "react";
import PropTypes from "prop-types";

const MyCalendar = forwardRef(({ onDateChange }, ref) => {

    const [selectedEventId, setSelectedEventId] = useState(null);
    const [events, setEvents] = useState([
      { id: "1", title: "10:30~14:30", date: "2025-02-19", backgroundColor: "#F7F0EA", textColor: "#6E5E57", classNames: ['custom-event'] },
      { id: "2", title: "14:30~18:30", date: "2025-02-19", backgroundColor: "#F7F0EA", textColor: "#6E5E57", classNames: ['custom-event'] },
      { id: "3", title: "18:30~22:30", date: "2025-02-19", backgroundColor: "#F7F0EA", textColor: "#6E5E57", classNames: ['custom-event'] },
      { id: "4", title: "10:30~14:30", date:"2025-02-20", backgroundColor: "#F7F0EA", textColor: "#6E5E57",classNames: ['custom-event'] },
      { id: "5", title: "14:30~18:30", date:"2025-02-20", backgroundColor: "#F7F0EA", textColor: "#6E5E57",classNames: ['custom-event'] },
      { id: "6", title: "18:30~22:30", date:"2025-02-20", backgroundColor: "#F7F0EA", textColor: "#6E5E57",classNames: ['custom-event'] },
    ]);
   
  
    // 將 FullCalendar API 傳遞出去，讓外層能控制
    useImperativeHandle(ref, () => ({
        getApi: () => calendarRef.current?.getApi(),
    }));
    const calendarRef = useRef(null);
    const handleDatesSet = (info) => {
        onDateChange(info.view.title);
    };
    useEffect(() => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            onDateChange(calendarApi.view.title);
        } // 更新當前月份
    }, [onDateChange]);

    const handleEventClick = (info) => {
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
