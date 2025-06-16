import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PropTypes from 'prop-types';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '../slice/loadingSlice';
import Loading from './Loading';
import AlertModal from './AlertModal';
import axios from 'axios';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const API_URL = import.meta.env.VITE_BASE_URL;

const OrderModal = ({ show, onClose, initialData, getOrders }) => {
  const dispatch = useDispatch();

  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [orderId, setOrderId] = useState('');


  const [alertState, setAlertState] = useState({ show: false, message: '', status: true });
  const showAlert = (message, status) => {
    setAlertState({ show: true, message: message, status: status });
  };

  const [onAlertComplete, setOnAlertComplete] = useState(() => () => {}); // 預設為空函式

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  });

  const isLoading = useSelector((state) => state.loading.isLoading);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  const handleClose = () => {
    onClose();
  };

  const stableDispatch = useMemo(() => dispatch, [dispatch]);

  const getAvailableSlots = useCallback(({
    unavailableTimeSlots = [],
    reservedTimeSlots = [],
    lastBookableDate = dayjs().add(30, 'day').format('YYYY-MM-DD'),
  }) => {
    const timeRanges = ['10:30～14:30', '14:30～18:30', '18:30～22:30'];
    const today = dayjs();
    const lastDate = dayjs(lastBookableDate);
    const result = [];

    for (let d = today; d.isSameOrBefore(lastDate); d = d.add(1, 'day')) {
      const dateStr = d.format('YYYY-MM-DD');
      if (unavailableTimeSlots.includes(dateStr)) continue;

      const reservedForDate = reservedTimeSlots
        .filter((r) => r.date === dateStr)
        .map((r) => r.timeSlot);

      const availableTimeSlots = timeRanges.filter(
        (slot) => !reservedForDate.includes(slot)
      );

      if (availableTimeSlots.length > 0) {
        result.push({
          date: dateStr,
          timeSlot: availableTimeSlots,
        });
      }
    }
    return result;
  }, []);

  const getLastDayOfMonth = () => {
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return lastDay.toISOString().split('T')[0];
  };


  const getCalendar = useCallback(async () => {
    stableDispatch(setLoading(true));
    try {
      const res = await axios.get(`${API_URL}/scheduleConfig`);
      const data = res.data[0] || {};
      const lastBookable = data.lastBookableDate || getLastDayOfMonth();

      const filteredSlots = getAvailableSlots({
        unavailableTimeSlots: data.unavailableTimeSlots,
        reservedTimeSlots: data.reservedTimeSlots,
        lastBookableDate: lastBookable,
      });
      setAvailableSlots(filteredSlots);
    } catch (error) {
      console.log(error)
      showAlert(error?.response?.data?.message || '獲取行程時發生錯誤', false);
    } finally {
      stableDispatch(setLoading(false));
    }
  }, [stableDispatch, getAvailableSlots]);

  const slotsByYearAndMonth = useMemo(() => {
  const grouped = {};

  availableSlots.forEach((slot) => {
    const [year, month] = slot.date.split('-'); // 取出年份和月份

    if (!grouped[year]) {
      grouped[year] = {};
    }
    if (!grouped[year][month]) {
      grouped[year][month] = [];
    }

    grouped[year][month].push(slot);
  });

  return grouped;
}, [availableSlots]);


  useEffect(() => {
    if (!show) return;
    const token = getCookie('token');
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    getCalendar();
    setValue('bodyPart', initialData.bodyPart || '');
    setValue('nailRemoval', initialData.nailRemoval || '');
    setValue('nailExtension', initialData.nailExtension || '');
    setOrderId(initialData.id || '');
  }, [getCalendar, show, setValue, initialData.bodyPart, initialData.nailRemoval, initialData.nailExtension, initialData.id]);

  const handleClear = () => {
    reset(initialData); // 清空整個表單
    setSelectedDate(null); // 清空選擇的日期
    setSelectedSlot("");   // 清空選擇的時段
  };

  const onSubmit = async (data) => {
    dispatch(setLoading(true));

    
    
    data = ({ ...data, date: selectedDate, timeSlot: selectedSlot });
    try {
      await axios.patch(`${API_URL}/appointments/${orderId}`, data);
      setOnAlertComplete(() => () => {
        handleClose();      // 關掉外層 modal
        getOrders();        // 更新資料
      });
      showAlert('預約修改成功', true);
    } catch (error) {
      console.log(error);
    }finally{
      dispatch(setLoading(false));
    }
  }

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1049 }}>
      {isLoading && <Loading />}
      <AlertModal 
        show={alertState.show} 
        onClose={() => setAlertState({ ...alertState, show: false })} 
        status={alertState.status} 
        onComplete={onAlertComplete}
      >
        {alertState.message}
      </AlertModal>
      <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
        <div className="modal-content text-center" style={{ border: '2px solid #BF9958' }}>
          <div className="modal-header">
            <h6 className="modal-title text-center w-100 text-primary">編輯預約</h6>
            <button className='btn-close' type='button' onClick={handleClose}></button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body row">
              <div className="col-lg-8 text-start row col-12">
              <label className="form-label fw-bold text-primary h6">可預約日期：</label>
              {Object.entries(slotsByYearAndMonth).map(([year, months]) => {
                const yearCollapseId = `collapse-year-${year}`;

                return (
                  <div key={year} className="mb-4">
                    {/* 年份標題（可展開折疊） */}
                    <h4>
                      <button
                        className="btn btn-link fw-bold text-primary text-decoration-none "
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${yearCollapseId}`}
                        aria-expanded="false"
                        aria-controls={yearCollapseId}
                      >
                        {year} 年 ▾
                      </button>
                    </h4>

                    {/* 年份內部區塊（月份群） */}
                    <div className="collapse" id={yearCollapseId}>
                      {Object.entries(months).map(([month, slots]) => {
                        const monthCollapseId = `collapse-${year}-${month}`;
                        return (
                          <div key={month} className="mb-3 ms-3">
                            {/* 月份標題 */}
                            <h5>
                              <button
                                className="btn btn-link text-decoration-none text-primary-02 fw-bold"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#${monthCollapseId}`}
                                aria-expanded="false"
                                aria-controls={monthCollapseId}
                              >
                                {parseInt(month)} 月 ▾
                              </button>
                            </h5>

                            {/* 月份內部區塊（日期按鈕） */}
                            <div className="collapse" id={monthCollapseId}>
                              <div className="row">
                                {slots.map((item) => (
                                  <div className="col-lg-3 col-6 mb-2" key={item.date}>
                                    <button
                                      type="button"
                                      className={`btn ${selectedDate === item.date ? 'btn-primary' : 'btn-outline-primary'} w-100`}
                                      onClick={() => setSelectedDate(item.date)}
                                    >
                                      {item.date.slice(5)} {/* MM-DD */}
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="col-lg-4 col-12">
              <div className="mb-4">
                <label htmlFor="bodyPart" className="form-label fw-bold">
                  <span className="text-primary fw-bold">＊</span>手部＆足部：
                </label>
                  <select className={`form-select form-select-sm ${errors.bodyPart ? 'is-invalid' : ''}`} id="bodyPart" defaultValue={initialData.bodyPart} {...register('bodyPart', { required: { value: true, message: '請選擇施作部位' }, })}>
                    <option value="" disabled>請選擇手部或足部</option>
                    <option value="手部">手部</option>
                    <option value="足部">足部</option>
                  </select>
                  {errors.bodyPart && <div className="invalid-feedback">{errors.bodyPart.message}</div>}
                </div>
                <div className="mb-4">
                  <label htmlFor="nailRemoval" className="form-label fw-bold">
                    <span className="text-primary fw-bold">＊</span>是否需要卸甲：
                  </label>
                  <select className={`form-select form-select-sm ${errors.nailRemoval ? 'is-invalid' : ''}`} id="nailRemoval" defaultValue={initialData.nailRemoval} {...register('nailRemoval', { required: { value: true, message: '請選擇是否需要卸甲' }, })}>
                    <option value="" disabled>請選擇是否需要卸甲</option>
                    <option value="true">是</option>
                    <option value="false">否</option>
                  </select>
                  {errors.nailRemoval && <div className="invalid-feedback">{errors.nailRemoval.message}</div>}
                </div>
                <div className="mb-4">
                  <label htmlFor="nailExtension" className="form-label fw-bold">
                    <span className="text-primary fw-bold">＊</span>是否需要延甲：
                  </label>
                  <select className={`form-select form-select-sm ${errors.nailExtension ? 'is-invalid' : ''}`} id="nailExtension" defaultValue={initialData.nailExtension} {...register('nailExtension', { required: { value: true, message: '請選擇是否需要延甲' }, })}>
                    <option disabled value="">請選擇是否需要延甲</option>
                    <option value="true">是</option>
                    <option value="false">否</option>
                  </select>
                  {errors.nailExtension && <div className="invalid-feedback">{errors.nailExtension.message}</div>}
                </div>
                {selectedDate && (
                  <div className="mt-3 text-start row">
                    <h6 className="text-primary fw-bold">{selectedDate.slice(5)} 可預約時段：</h6>
                    {availableSlots
                      .find((item) => item.date === selectedDate)
                        ?.timeSlot.map((slot) => (
                          <button
                            type="button"
                            key={slot}
                            className={`btn ${selectedSlot === slot ? 'btn-success' : 'btn-outline-success'} me-2 col-12 my-2`}
                            onClick={() => setSelectedSlot(slot)}
                          >
                            {slot}
                          </button>
                      ))}
                  </div>
                )}
                {selectedDate && selectedSlot && (
                  <div className="alert alert-primary mt-4">
                    <strong>您選擇的時段為：</strong><br />
                    {selectedDate} - {selectedSlot}
                  </div>
                )}
                <div className="row mt-5">
                  <div className="col-12 col-sm-6">
                    <button
                    type="button"
                    className="btn btn-outline-primary w-100"
                    aria-label="清除"
                    onClick={handleClear}
                    >清除</button>
                  </div>
                  <div className="col-12 col-sm-6 ">
                      <button
                      type="submit"
                      className="btn btn-primary w-100"
                    >
                      確認修改
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

OrderModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    bodyPart: PropTypes.string,
    nailRemoval: PropTypes.string,
    nailExtension: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    ]),
    timeSlot: PropTypes.string,
  }),
  getOrders: PropTypes.func, // Add this line
};

export default OrderModal;
