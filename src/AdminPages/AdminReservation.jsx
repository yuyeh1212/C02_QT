import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CustomButton from '../components/CustomButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import MyAdminCalendar from '../components/MyAdminCalendar';
import AlertModal from '../components/AlertModal';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../slice/loadingSlice';

const API_URL = import.meta.env.VITE_BASE_URL;

export default function AdminReservation() {
  const calendarRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // 初始檢查視窗寬度
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [reservedTimeSlots, setReservedTimeSlots] = useState([]);
  const [lastBookableDate, setLastBookableDate] = useState('');
  const [selectLastDate, setSelectLastDate] = useState(dayjs());
  const [setCurrentMonthEvent] = useState([]);
  const [setMonthEventState] = useState([]);
  const [setCurrentTime] = useState([]);
  const [alertState, setAlertState] = useState({ show: false, message: '', status: true });
  const showAlert = (message, status) => {
    setAlertState({ show: true, message: message, status: status });
  };
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();

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

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const stableDispatch = useMemo(() => dispatch, [dispatch]);

  const getCalendar = useCallback(async () => {
    stableDispatch(setLoading(true));

    try {
      const res = await axios.get(`${API_URL}/scheduleConfig`);
      const data = res.data[0] || {};

      setUnavailableDates(data.unavailableTimeSlots || []);
      const lastBookable = data.lastBookableDate || getLastDayOfMonth();
      setLastBookableDate(lastBookable);
      setSelectLastDate(dayjs(lastBookable));
      setReservedTimeSlots(data.reservedTimeSlots || []);
    } catch (error) {
      console.error(error);
      showAlert(error?.response?.data?.message || '獲取行程時發生錯誤', false);
    } finally {
      stableDispatch(setLoading(false));
    }
  }, [stableDispatch]); // **依賴於 memo 化的 dispatch**

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    getCalendar();
  }, [getCalendar]);

  const getLastDayOfMonth = () => {
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return lastDay.toISOString().split('T')[0];
  };

  const handleDateChange = (newDate) => {
    if (!newDate) return;

    const formattedDate = newDate.format('YYYY-MM-DD');

    setUnavailableDates((prevDates) => {
      const updatedDates = prevDates.includes(formattedDate)
        ? prevDates.filter((date) => date !== formattedDate) // 取消選取
        : [...prevDates, formattedDate]; // 加入選取

      // 排序日期
      return updatedDates.sort((a, b) => new Date(a) - new Date(b));
    });
  };

  const disableSelectedDates = (date) => {
    return unavailableDates.includes(date.format('YYYY-MM-DD'));
  };

  const removeDate = (dateToRemove) => {
    setUnavailableDates((prevDates) => prevDates.filter((date) => date !== dateToRemove));
  };

  const tomorrow = dayjs().add(1, 'day').startOf('day'); // 取得明天 00:00

  const shouldDisableDate = (date) => {
    return date.isBefore(tomorrow, 'day'); // 🔹 禁用今天 & 以前的日期
  };

  const handleUpdateRest = async () => {
    dispatch(setLoading(true));
    try {
      await axios.patch(`${API_URL}/scheduleConfig`, {
        unavailableTimeSlots: unavailableDates,
      });
      getCalendar();
      showAlert('躺平日新增成功', true);
    } catch {
      showAlert('躺平日新增失敗，請稍後再試', false);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleUpdateLast = async () => {
    dispatch(setLoading(true));
    try {
      await axios.patch(`${API_URL}/scheduleConfig`, {
        lastBookableDate: selectLastDate.format('YYYY-MM-DD'),
      });
      getCalendar();
      showAlert('開放預約日更新成功', true);
    } catch {
      showAlert('開放預約日更新失敗，請稍後再試', false);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getCalendarInfo = (info, eventDate) => {
    const viewtitle = info.view.title;
    filterEventsByMonth(viewtitle, eventDate);
  };
  //篩選當月活動
  const filterEventsByMonth = (viewTitle, eventDate) => {
    const monthYear = viewTitle.split('年');
    const year = monthYear[0];
    let month = monthYear[1].replace('月', '');
    if (Number(month) < 10) {
      month = `0${month}`;
    }
    const date = `${year}-${month}`;

    const newEvent = [...new Set(eventDate.map((item) => item.date))].filter((item) =>
      item.startsWith(date),
    );
    setCurrentMonthEvent(newEvent);
    const eventTime = eventDate.filter((item) => item.date.startsWith(date));
    setMonthEventState(eventTime);
    setCurrentTime([]);
  };

  return (
    <div>
      {isLoading && <Loading />}
      {
        <AlertModal
          show={alertState.show}
          onClose={() => setAlertState({ ...alertState, show: false })}
          status={alertState.status}
        >
          {alertState.message}
        </AlertModal>
      }
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
      <div className="row mb-4 g-4 pb-6">
        {isMobile ? <p className="col-12 fw-bold ">選擇最後預約日期：</p> : <></>}
        <div className="col-lg-6 col-md-5 col-9">
          <div className="w-100">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-tw">
              <DatePicker
                label="選擇最後預約日期"
                value={selectLastDate}
                onChange={(newDate) => setSelectLastDate(newDate)}
                disablePast // 禁用過去的日期
                format="YYYY/MM/DD"
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-3 d-flex justify-content-center">
          <CustomButton
            type="btn"
            className={`btn ${isMobile ? 'btn-outline-primary  btn-lg' : 'btn-primary text-white'} `}
            onClick={(e) => handleUpdateLast(e)}
          >
            {isMobile ? '送出' : '確定開放預約日期'}
          </CustomButton>
        </div>
        {isMobile ? (
          <div>
            <div className="col-12 fw-bold">選擇躺平日：</div>
            <div className="col-12 pt-4">
              <div className="w-100">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="選擇躺平日(多選)"
                    onChange={handleDateChange}
                    shouldDisableDate={(date) =>
                      shouldDisableDate(date) || disableSelectedDates(date)
                    }
                    sx={{ width: '100%' }}
                  />
                </LocalizationProvider>
              </div>
              {unavailableDates.length > 0 ? (
                <div className="col-12 bg-white mt-4 p-4">
                  <div className="fw-bold p-2">已選擇日期：</div>
                  <div className="w-100">
                    {unavailableDates.map((date) => (
                      <div
                        key={date}
                        className="border p-3 border-primary my-2 d-flex align-items-center justify-content-between text-primary"
                      >
                        {date}
                        <button
                          className="btn btn-sm border-0 text-primary"
                          onClick={() => removeDate(date)}
                        >
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
        ) : (
          <></>
        )}
        <div className="col-lg-3 col-md-3 col-12 d-block d-sm-flex justify-content-end ">
          <CustomButton
            type="btn"
            className={`btn  ${isMobile ? 'w-100 btn-primary text-white btn-lg' : 'btn-outline-primary'}`}
            onClick={handleUpdateRest}
          >
            送出躺平日
          </CustomButton>
        </div>
      </div>
      {isMobile ? (
        <></>
      ) : (
        <div className="pb-8 mb-8">
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
      )}
    </div>
  );
}
