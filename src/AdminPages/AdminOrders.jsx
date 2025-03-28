import axios from 'axios';
import Pagination from '../components/Pagination';
import { useCallback, useEffect, useMemo, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../slice/loadingSlice';
import Loading from '../components/Loading';

const API_URL = import.meta.env.VITE_BASE_URL;

export default function Orders() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();

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

  // 將 openOrder 改為數組來追踪多個打開的訂單
  const [openOrder, setOpenOrder] = useState(null);

  // 追踪動畫狀態
  const [, setAnimating] = useState(false);

  // 切換訂單開關狀態的函數
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
  ); // 確保 getOrders 使用穩定的 dispatch

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    getOrders(); // 初次執行
  }, [getOrders]); // 依賴 getOrders，保證它只會在初次掛載時執行

  const handlePageChange = (page) => {
    getOrders(page);
  };

  return (
    <>
      <div>
        {isLoading && <Loading />}
        <div className="bg-white h-75 p-6">
          {orders.length > 0 ? (
            isMobile ? (
              <div className="accordion" id="accordionExample">
                {orders.map((order) => (
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
                        <p className="fw-bold text-primary mb-3">訂單編號：{order.id}</p>
                        <p className="mb-3">
                          <strong>姓名：</strong> {order.name}
                        </p>
                        <p className="mb-3">
                          <strong>預約時段：</strong> {order.date} {order.timeSlot}
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
                                <td className="text-secondary-200" style={{ width: '120px' }}>
                                  LINE ID
                                </td>
                                <td>{order.LineID}</td>
                              </tr>
                              <tr>
                                <td className="text-secondary-200">電話</td>
                                <td>{order.phone}</td>
                              </tr>
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
                                    {order.nailRemoval ? '是' : '否'}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-secondary-200">是否延甲</td>
                                <td>
                                  <span className="badge text-bg-neutral-200 text-primary-02">
                                    {order.nailExtension ? '是' : '否'}
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // 原始大螢幕尺寸表格實現
              <table className="table table-borderless align-middle">
                <thead>
                  <tr className="table-secondary-25">
                    <th scope="col" width="15%">
                      預約訂單編號
                    </th>
                    <th scope="col" width="10%">
                      姓名
                    </th>
                    <th scope="col" width="15%">
                      電話
                    </th>
                    <th scope="col" width="15%">
                      LineID
                    </th>
                    <th scope="col" width="15%">
                      預約時段
                    </th>
                    <th scope="col" width="9%">
                      是否
                      <br className="d-xl-none" />
                      卸甲
                    </th>
                    <th scope="col" width="9%">
                      是否
                      <br className="d-xl-none" />
                      延甲
                    </th>
                    <th scope="col" width="9%">
                      手部或
                      <br className="d-xl-none" />
                      足部
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr className="border-bottom" key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.name}</td>
                      <td>{order.phone}</td>
                      <td>{order.LineID}</td>
                      <td>
                        {order.date} <br />
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
                    </tr>
                  ))}
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
        <div className="py-6">
          <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange}></Pagination>
        </div>
      </div>
    </>
  );
}
