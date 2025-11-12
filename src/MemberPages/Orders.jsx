import axios from 'axios';
import Pagination from '../components/Pagination';
import { useCallback, useEffect, useMemo, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../slice/loadingSlice';
import Loading from '../components/Loading';
import AlertModal from '../components/AlertModal';
import OrderModal from '../components/OrderModal';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_BASE_URL;

export default function Orders() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  const [alertState, setAlertState] = useState({
    show: false,
    status: true,
    message: '',
    redirectTo: null, 
  });

  const [orderModalState, setOrderModalState] = useState({
    show: false,
  });

  const [selectOrder, setSelectOrder] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [pageInfo, setPageInfo] = useState({
    page: 1,
    maxPage: 0,
  });

  const [orders, setOrders] = useState([]);


  const [openOrder, setOpenOrder] = useState(null);

  
  const [, setAnimating] = useState(false);

  
  const toggleOrder = (orderId) => {
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
    }, 300); // 動畫持續時間

    setOpenOrder((prev) => (prev === orderId ? null : orderId));
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const stableDispatch = useMemo(() => dispatch, [dispatch]); // 讓 dispatch 穩定

  const getOrders = useCallback(
    async (page = 1) => {
      stableDispatch(setLoading(true));
      try {
        const res = await axios.get(`${API_URL}/appointments?page=${page}&limit=10`);
        setPageInfo({
          page: res.data.pageInfo.currentPage,
          maxPage: res.data.pageInfo.totalPages,
        });
        setOrders(res.data.appointments);
      } catch (error) {
        console.error('獲取訂單失敗:', error);
      } finally {
        stableDispatch(setLoading(false));
      }
    },
    [stableDispatch],
  );

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    getOrders(); 
  }, [getOrders]); 

  const handlePageChange = (page) => {
    getOrders(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const showAlert = (message, status, redirectTo) => {
    setAlertState({ show: true, message: message, status: status, redirectTo: redirectTo });
  };
  const navigate = useNavigate();

  const deleteOrder = async (orderId) => {
    stableDispatch(setLoading(true));
    try {
      await axios.delete(`${API_URL}/appointments/${orderId}`);
      getOrders(pageInfo.page); // 刪除後重新獲取訂單列表
      // 如果當前頁面沒有訂單，則自動跳轉到上一頁
      if (orders.length === 1 && pageInfo.page > 1) {
        handlePageChange(pageInfo.page - 1);
      }
      showAlert('刪除訂單成功', true, '/member/center/orders');
    } catch (error) {
      console.error('刪除訂單失敗:', error);
    } finally {
      stableDispatch(setLoading(false));
    }
  }

  const handleModal = (order) => {
    setSelectOrder(order);
    setOrderModalState({ show: true });
  }

  return (
    <>
      {isLoading && <Loading />}
      {
        <OrderModal
          show={orderModalState.show} 
          onClose={() => {
            setOrderModalState({  show: false });
          }}
          getOrders={getOrders} 
          initialData={selectOrder} 
        />
      }
      {
        <AlertModal
          show={alertState.show}
          onClose={() => {
            setAlertState({ ...alertState, show: false });
            if (alertState.redirectTo) {
              navigate(alertState.redirectTo); 
            }
          }}
          status={alertState.status}
          redirectTo={alertState.redirectTo} 
        >
          {alertState.message}
        </AlertModal>
      }
      <div>
        <div className="bg-white p-6">
          {orders.length > 0 ? (
            isMobile ? (
              <div className="accordion" id="accordionExample">
                {orders.map((order) => {

                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  // 檢查訂單日期是否早於今天
                  order.date = new Date(order.date);
                  order.date.setHours(0, 0, 0, 0);
                  const isPastOrder = order.date < today;

                  return(
                  <div
                    className="accordion-item shadow-sm mb-3 rounded bg-secondary-25"
                    key={order.id}
                  >
                    {/* 手風琴標題 */}
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button bg-secondary-25 d-flex flex-column align-items-start border-0 ${
                          openOrder === order.id ? '' : 'collapsed'
                        }`}
                        type="button"
                        onClick={() => toggleOrder(order.id)}
                      >
                        <p className="fw-bold text-primary mb-5">訂單編號：{order.id}</p>
                        <p className="mb-1 text-secondary-200">預約時段</p>
                        <p className='mb-3 fw-bold'>
                          {order.date.toLocaleDateString()} {order.timeSlot}
                        </p>
                        <span className="small text-muted">
                          查看詳細資訊
                          {openOrder === order.id ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </span>
                      </button>
                    </h2>
                    {/* 手風琴內容 - 使用 CSS 過渡效果 */}
                    <div className={`accordion-body ${openOrder === order.id ? 'open' : ''}`}>
                      <div className="accordion-content p-3">
                        <div className="card border-0 p-3">
                          <table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                                <td className="text-secondary-200">手部或足部</td>
                                <td>
                                  <span className="badge text-bg-neutral-200 text-primary-02">
                                    {order.bodyPart === '手部' ? '手部' : '足部'}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-secondary-200">是否卸甲</td>
                                <td>
                                  <span className="badge text-bg-neutral-200 text-primary-02">
                                    {order.nailRemoval == 'true' ? '是' : '否'}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-secondary-200">是否延甲</td>
                                <td>
                                  <span className="badge text-bg-neutral-200 text-primary-02">
                                    {order.nailExtension == 'true' ? '是' : '否'}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <span className="text-secondary-200">管理訂單</span>
                                </td>
                                {
                                  isPastOrder ?
                                  (<td>
                                    <span className='badge text-bg-neutral-200 text-primary-02'>已完成</span>
                                    </td>):
                                    (<td>
                                    <span className='btn btn-primary btn-sm text-white' onClick={()=>handleModal(order)}>
                                      <i className="bi bi-pencil-square  me-1"></i>修改
                                    </span>
                                    <span className='btn btn-outline-primary btn-sm' onClick={()=>deleteOrder(order.id)}>
                                      <i className="bi bi-trash me-1"></i>刪除
                                    </span>
                                  </td>)
                                }
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )})}
              </div>
            ) : (
              // 原始大螢幕尺寸表格實現
              <table className="table table-borderless align-middle">
                <thead>
                  <tr className="table-secondary-25">
                    <th scope="col" width="16%">
                      預約訂單編號
                    </th>
                    <th scope="col" width="14%">
                      預約時段
                    </th>
                    <th scope="col" width="10%">
                      是否卸甲
                    </th>
                    <th scope="col" width="10%">
                      是否延甲
                    </th>
                    <th scope="col" width="10%">
                      手部或足部
                    </th>
                    <th scope='col' width="20%" className='text-center'>
                      管理訂單
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    // 檢查訂單日期是否早於今天
                    order.date = new Date(order.date);
                    order.date.setHours(0, 0, 0, 0);
                    const isPastOrder = order.date < today;

                    return(
                    <tr className="border-bottom" key={order.id}>
                      <td>{order.id}</td>
                      <td>
                        {order.date.toLocaleDateString()} <br />
                        {order.timeSlot}
                      </td>
                      <td>
                        <p className=" badge text-bg-neutral-200 text-primary-02">
                          {order.nailRemoval == 'true' ? '是' : '否'}
                        </p>
                      </td>
                      <td>
                        <p className=" badge text-bg-neutral-200 text-primary-02">
                          {order.nailExtension == 'true' ? '是' : '否'}
                        </p>
                      </td>
                      <td>
                        <p className=" badge text-bg-neutral-200 text-primary-02">
                          {order.bodyPart == '手部' ? '手部' : '足部'}
                        </p>
                      </td>
                      {
                        isPastOrder ?
                          (<td className='text-center'>
                          <span className='badge text-bg-neutral-200 text-primary-02'>已完成</span>
                          </td>):
                          (<td className='text-center'>
                            <span className='btn btn-primary btn-sm text-white' onClick={()=>handleModal(order)}>
                              <i className="bi bi-pencil-square  me-1"></i>修改
                            </span>
                          <span className='btn btn-outline-primary btn-sm'  onClick={()=>deleteOrder(order.id)}>
                            <i className="bi bi-trash me-1"></i>刪除
                          </span>
                          </td>)
                      }
                    </tr>
                  )})}
                </tbody>
              </table>
            )
          ) : (
            <>
              <div className="h-100 d-flex align-items-center justify-content-center">
                <div className="text-primary-02 h5">目前尚無訂單</div>
              </div>
            </>
          )}
        </div>
        <div className="pt-6">
          <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange}></Pagination>
        </div>
      </div>
    </>
  );
  
}
