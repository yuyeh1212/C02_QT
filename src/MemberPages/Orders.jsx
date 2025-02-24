import axios from "axios";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const API_URL = "https://web-project-api-zo40.onrender.com";
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXIiOiJhZG1pbiJ9.jxYxlyf8yETl-iO2wKZT2zrBCMCL3NYOsaDMEytW0c8";

export default function Orders() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  document.cookie = `token=${token};`;
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [pageInfo, setPageInfo] = useState({
    page: 1,
    maxPage: 0,
  });

  const [orders, setOrders] = useState([]);

  // 將 openOrder 改為數組來追踪多個打開的訂單
  const [openOrder, setOpenOrder] = useState(null);

  // 切換訂單開關狀態的函數
  const toggleOrder = (orderId) => {
    setOpenOrder((prev) => (prev === orderId ? null : orderId));
  };

  const getOrders = async (page = 1) => {
    try {
      const res = await axios.get(
        `${API_URL}/appointments?page=${page}&limit=10`
      );
      setPageInfo({
        page: res.data.pageInfo.currentPage,
        maxPage: res.data.pageInfo.totalPages,
      });
      setOrders(res.data.appointments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handlePageChange = (page) => {
    getOrders(page);
  };

  return (
    <>
      <div>
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
                          openOrder === order.id ? "" : "collapsed"
                        }`}
                        type="button"
                        onClick={() => toggleOrder(order.id)}
                      >
                        <p className="fw-bold text-primary mb-3">
                          訂單編號：{order.id}
                        </p>
                        <p className="mb-3">
                          <strong>姓名：</strong> {order.name}
                        </p>
                        <p className="mb-3">
                          <strong>預約時段：</strong> {order.date}{" "}
                          {order.timeSlot}
                        </p>
                        <span className="small text-muted">
                          查看詳細資訊{" "}
                          {openOrder === order.id ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </span>
                      </button>
                    </h2>
                    {/* 手風琴內容 - 使用 React 條件渲染而不是 Bootstrap collapse */}
                    {openOrder === order.id && (
                      <div className="accordion-collapse">
                        <div className="accordion-body">
                          <div className="card border-0 p-3">
                            <table className="table table-borderless mb-0">
                              <tbody>
                                <tr>
                                  <td
                                    className="text-secondary-200"
                                    style={{ width: "120px" }}
                                  >
                                    LINE ID
                                  </td>
                                  <td>{order.LineID}</td>
                                </tr>
                                <tr>
                                  <td className="text-secondary-200">電話</td>
                                  <td>{order.phone}</td>
                                </tr>
                                <tr>
                                  <td className="text-secondary-200">
                                    手部或足部
                                  </td>
                                  <td>
                                    <span className="badge text-bg-neutral-200 text-primary-02">
                                      {order.bodyPart === "hand"
                                        ? "手部"
                                        : "足部"}
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-secondary-200">
                                    是否卸甲
                                  </td>
                                  <td>
                                    <span className="badge text-bg-neutral-200 text-primary-02">
                                      {order.nailRemoval ? "是" : "否"}
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-secondary-200">
                                    是否延甲
                                  </td>
                                  <td>
                                    <span className="badge text-bg-neutral-200 text-primary-02">
                                      {order.nailExtension ? "是" : "否"}
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
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
                        {order.time}
                      </td>
                      <td>
                        <p className=" badge text-bg-neutral-200 text-primary-02">
                          {order.nailRemoval ? "是" : "否"}
                        </p>
                      </td>
                      <td>
                        <p className=" badge text-bg-neutral-200 text-primary-02">
                          {order.nailExtension ? "是" : "否"}
                        </p>
                      </td>
                      <td>
                        <p className=" badge text-bg-neutral-200 text-primary-02">
                          {order.bodyPart === "hand" ? "手部" : "足部"}
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
        <div className="pt-4">
          <Pagination
            pageInfo={pageInfo}
            handlePageChange={handlePageChange}
          ></Pagination>
        </div>
      </div>
    </>
  );
}
