import axios from "axios"
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


export default function AdminOrders(){

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 992); // 初始檢查視窗寬度
      
    // 監聽視窗大小變化
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 992); // 每次resize都檢查視窗寬度
      };
  
      // 當視窗尺寸變動時，更新狀態
      window.addEventListener('resize', handleResize);
  
      // 清理事件監聽
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [pageInfo,setPageInfo] = useState({
        page:1,
        maxPage:10
    });

    const [orders, setOrders] = useState([
      {
        id: "qt76475358173497",
        name: "Talor Swift",
        phone: "0912121212",
        lineId: "ILoveTalor",
        date: "2024/12/22",
        time: "10:30",
        part: "手部",
        removeNail: true,
        extendNail: true,
      },
      {
        id: "qt98765432109876",
        name: "Alice Wang",
        phone: "0987654321",
        lineId: "AliceLoveNails",
        date: "2024/12/23",
        time: "14:30",
        part: "足部",
        removeNail: false,
        extendNail: true,
      },
      {
        id: "qt12345678901234",
        name: "Lisa Chen",
        phone: "0911222333",
        lineId: "LisaChen88",
        date: "2024/12/25",
        time: "16:00",
        part: "手部",
        removeNail: true,
        extendNail: false,
      },
      {
        id: "qt56789012345678",
        name: "Emma Liu",
        phone: "0988111222",
        lineId: "EmmaLiuNails",
        date: "2024/12/26",
        time: "11:30",
        part: "足部",
        removeNail: false,
        extendNail: false,
      }
    ]);
    

    const [openOrder, setOpenOrder] = useState({});

    // 切換訂單的開合狀態
    const toggleOrder = (orderId) => {
      // 如果點擊的是當前開啟的訂單，則關閉它；否則，開啟該訂單
      setOpenOrder(openOrder === orderId ? null : orderId);
    };

    const getOrders = (page=1)=>{
      setPageInfo({
          page:page,
          maxPage:10
      })
      // try {
      //     const res = await axios.get(`api_url`);
      //     setPageInfo({
      //         page:page,
      //         maxPage:10
      //     })
      // } catch (error) {
      //     console.log(error);
      // }
    }

    const handlePageChange = (page)=>{
        getOrders(page);
    }

    return <>
        <div>
            <div className="bg-white h-75 p-6">
                {
                    (orders.length>0)?
                        isMobile? 
                            <div className="accordion" id="accordionExample">
                                {orders.map((order) => (
                                  <div className="accordion-item border-0 shadow-sm mb-3 rounded" key={order.id}>
                                    {/* 手風琴標題 */}
                                    <h2 className="accordion-header">
                                      <button
                                        className={`accordion-button bg-white d-flex flex-column align-items-start ${openOrder === order.id ? "" : "collapsed"}`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse-${order.id}`}
                                        aria-expanded={openOrder === order.id ? "true" : "false"}
                                        aria-controls={`collapse-${order.id}`}
                                        onClick={() => toggleOrder(order.id)} // 調用 toggleOrder 函式來切換開關
                                      >
                                        <p className="fw-bold text-primary mb-3">訂單編號：{order.id}</p>
                                        <p className="mb-3"><strong>姓名：</strong> {order.name}</p>
                                        <p className="mb-3"><strong>預約時段：</strong> {order.date} {order.time}</p>
                                        <span className="small text-muted">
                                          查看詳細資訊 {openOrder === order.id ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/> }
                                          
                                        </span>
                                      </button>
                                    </h2>
                                    {/* 手風琴內容 */}
                                    <div id={`collapse-${order.id}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                      <div className="accordion-body">
                                        <div className="card border-0 shadow-sm p-3 bg-light">
                                          <table className="table table-borderless mb-0">
                                            <tbody>
                                              <tr>
                                                <td className="text-secondary-200" style={{ width: "120px" }}>LINE ID</td>
                                                <td>{order.lineId}</td>
                                              </tr>
                                              <tr>
                                                <td className="text-secondary-200">電話</td>
                                                <td>{order.phone}</td>
                                              </tr>
                                              <tr>
                                                <td className="text-secondary-200">手部或足部</td>
                                                <td>
                                                  <span className='badge text-bg-neutral-200 text-primary-02'>{order.part}</span>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="text-secondary-200">是否卸甲</td>
                                                <td>
                                                  <span className='badge text-bg-neutral-200 text-primary-02'>{order.removeNail ? "是" : "否"}</span>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td className="text-secondary-200">是否延甲</td>
                                                <td>
                                                  <span className='badge text-bg-neutral-200 text-primary-02'>{order.extendNail ? "是" : "否"}</span>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div> :
                            <table className="table table-borderless align-middle">
                                <thead>
                                    <tr className="table-secondary-25">
                                        <th scope="col" width='15%'>預約訂單編號</th>
                                        <th scope="col" width='10%'>姓名</th>
                                        <th scope="col" width='15%'>電話</th>
                                        <th scope="col" width='15%'>LineID</th>
                                        <th scope="col" width='15%'>預約時段</th>
                                        <th scope="col" width='9%'>是否<br className="d-xl-none"/>卸甲</th>
                                        <th scope="col" width='9%'>是否<br className="d-xl-none"/>延甲</th>
                                        <th scope="col" width='9%'>手部或<br className="d-xl-none"/>足部</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order)=>(
                                        <tr className="border-bottom" key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.name}</td>
                                            <td>{order.phone}</td>
                                            <td>{order.lineId}</td>
                                            <td>
                                              {order.date} <br /> 
                                              {order.time}
                                            </td>
                                            <td>
                                              <p className=" badge text-bg-neutral-200 text-primary-02">
                                                {order.removeNail?'是':'否'}
                                                </p>
                                            </td>
                                            <td>
                                              <p className=" badge text-bg-neutral-200 text-primary-02">
                                                {order.extendNail?'是':'否'}
                                              </p>
                                            </td>
                                            <td>
                                              <p className=" badge text-bg-neutral-200 text-primary-02">
                                                {order.part}
                                              </p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>:
                        <>
                            <div className="h-100 d-flex align-items-center justify-content-center">
                                <div className="text-primary-02 h5">
                                    目前尚無訂單
                                </div>
                            </div>
                        </>
                }
                
            </div>
            <div className="pt-4">
                <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange}></Pagination>
            </div>
        </div>
    </>
}