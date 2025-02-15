import { useRef, useImperativeHandle, forwardRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const MyCalendar = forwardRef(({onDateChange}, ref) => {
  const calendarRef = useRef(null);

  // 讓父組件能夠訪問 `calendarRef`
  useImperativeHandle(ref, () => ({
    getApi: () => calendarRef.current?.getApi()
  }));

  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      editable={true}
      selectable={true}
      headerToolbar={false} // 移除內建 toolbar
      initialDate={new Date()}
      events={[
        { title: '預約 1', date: '2025-02-15' },
        { title: '預約 2', date: '2025-02-20' }
      ]}
      datesSet={(info) => {
        if (onDateChange) {
          const monthName = info.view.currentStart.toLocaleString('default', {
            year: 'numeric',
            month: 'long',
          });
          onDateChange(monthName); // 更新當前月份
        }
      }}

    />
  );
});

export default MyCalendar;
