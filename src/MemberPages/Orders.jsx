import { useState, useEffect, useMemo } from "react";
import Pagination from "../components/Pagination";

export default function Orders() {
  const orders = [];

  const ITEMS_PER_PAGE = 5;

  const [expandedCards, setExpandedCards] = useState({});

  const maxPage = useMemo(() => {
    return orders.length === 0 ? 1 : Math.ceil(orders.length / ITEMS_PER_PAGE);
  }, [orders.length]);

  const [pageInfo, setPageInfo] = useState({
    page: 1,
  });

  useEffect(() => {
    setPageInfo((prev) => ({
      ...prev,
      maxPage: maxPage,
    }));
  }, [maxPage]);

  const currentOrders = useMemo(() => {
    const startIndex = (pageInfo.page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return orders.slice(startIndex, endIndex);
  }, [orders, pageInfo.page]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > maxPage) return; // 避免超出範圍
    setPageInfo((prev) => ({
      ...prev,
      page: newPage,
    }));
    setExpandedCards({}); // 翻頁時重置展開狀態
  };

  const toggleCard = (orderId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  return (
    <div className="container p-4">
      {orders.length > 0 ? (
        <>
          {/* 桌面版表格 */}
          <div className="d-none d-md-block">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>訂購訂單編號</th>
                    <th>姓名</th>
                    <th>電話</th>
                    <th>LINE ID</th>
                    <th>預約時段</th>
                    <th>是否審理</th>
                    <th>是否寄單</th>
                    <th>手部或足部</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.name}</td>
                      <td>{order.phone}</td>
                      <td>{order.lineId}</td>
                      <td>{order.orderDate}</td>
                      <td>{order.isProcessed}</td>
                      <td>{order.isShipped}</td>
                      <td>{order.serviceType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 手機版卡片 */}
          <div className="d-md-none">
            <div className="order-cards">
              {currentOrders.map((order) => (
                <div key={order.id} className="card mb-3">
                  <div className="card-body">
                    {/* 基本資訊 */}
                    <div className="mb-2">
                      <label className="fw-bold">訂單編號：</label>
                      <span>{order.id}</span>
                    </div>
                    <div className="mb-2">
                      <label className="fw-bold">姓名：</label>
                      <span>{order.name}</span>
                    </div>
                    <div className="mb-2">
                      <label className="fw-bold">電話：</label>
                      <span>{order.phone}</span>
                    </div>

                    {/* 展開/收合按鈕 */}
                    <button
                      className="btn btn-link p-0 text-decoration-none"
                      onClick={() => toggleCard(order.id)}
                    >
                      {expandedCards[order.id]
                        ? "收起詳細資訊 ▼"
                        : "查看詳細資訊 ▶"}
                    </button>

                    {/* 詳細資訊 */}
                    {expandedCards[order.id] && (
                      <div className="mt-3">
                        <div className="mb-2">
                          <label className="fw-bold">LINE ID：</label>
                          <span>{order.lineId}</span>
                        </div>
                        <div className="mb-2">
                          <label className="fw-bold">預約時段：</label>
                          <span>{order.orderDate}</span>
                        </div>
                        <div className="mb-2">
                          <label className="fw-bold">是否審理：</label>
                          <span>{order.isProcessed}</span>
                        </div>
                        <div className="mb-2">
                          <label className="fw-bold">是否寄單：</label>
                          <span>{order.isShipped}</span>
                        </div>
                        <div className="mb-2">
                          <label className="fw-bold">手部或足部：</label>
                          <span>{order.serviceType}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange} />
        </>
      ) : (
        <>
          <div className="text-center py-5">
            <h3 className="fw-bold fs-5" style={{ color: "#6E5E57" }}>
              目前尚無訂單
            </h3>
          </div>

          <Pagination
            pageInfo={{
              page: 1,
              maxPage: 1,
            }}
            handlePageChange={() => {}}
          />
        </>
      )}
    </div>
  );
}
