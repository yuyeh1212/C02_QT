import axios from "axios"
import Pagination from "../components/Pagination"
import { useState } from "react";

export default function AdminOrders(){

    

    const [pageInfo,setPageInfo] = useState({
        page:1,
        maxPage:10
    });

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
        getOrders(page)
    }

    return <>
        <div className="bg-white p-6">
            <table className="table table-borderless">
                <thead>
                    <tr className="table-secondary-25">
                        <th scope="col">預約訂單編號</th>
                        <th scope="col">姓名</th>
                        <th scope="col">電話</th>
                        <th scope="col">LineID</th>
                        <th scope="col">預約時段</th>
                        <th scope="col">是否卸甲</th>
                        <th scope="col">是否延甲</th>
                        <th scope="col">手部或足部</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-bottom">
                        <td>qt1231214124</td>
                        <td>小k</td>
                        <td>0988888777</td>
                        <td>A1234567</td>
                        <td>今天</td>
                        <td>是</td>
                        <td>是</td>
                        <td>手部</td>
                    </tr>
                    <tr className="border-bottom">
                        <td>qt1231214124</td>
                        <td>小k</td>
                        <td>0988888777</td>
                        <td>A1234567</td>
                        <td>今天</td>
                        <td>是</td>
                        <td>是</td>
                        <td>手部</td>
                    </tr>
                    <tr className="border-bottom">
                        <td>qt1231214124</td>
                        <td>小k</td>
                        <td>0988888777</td>
                        <td>A1234567</td>
                        <td>今天</td>
                        <td>是</td>
                        <td>是</td>
                        <td>手部</td>
                    </tr>
                    <tr className="border-bottom">
                        <td>qt1231214124</td>
                        <td>小k</td>
                        <td>0988888777</td>
                        <td>A1234567</td>
                        <td>今天</td>
                        <td>是</td>
                        <td>是</td>
                        <td>手部</td>
                    </tr>
                    <tr className="border-bottom">
                        <td>qt1231214124</td>
                        <td>小k</td>
                        <td>0988888777</td>
                        <td>A1234567</td>
                        <td>今天</td>
                        <td>是</td>
                        <td>是</td>
                        <td>手部</td>
                    </tr>
                    <tr className="border-bottom">
                        <td>qt1231214124</td>
                        <td>小k</td>
                        <td>0988888777</td>
                        <td>A1234567</td>
                        <td>今天</td>
                        <td>是</td>
                        <td>是</td>
                        <td>手部</td>
                    </tr>
                    <tr className="border-bottom">
                        <td>qt1231214124</td>
                        <td>小k</td>
                        <td>0988888777</td>
                        <td>A1234567</td>
                        <td>今天</td>
                        <td>是</td>
                        <td>是</td>
                        <td>手部</td>
                    </tr>
                    <tr className="border-bottom">
                        <td>qt1231214124</td>
                        <td>小k</td>
                        <td>0988888777</td>
                        <td>A1234567</td>
                        <td>今天</td>
                        <td>是</td>
                        <td>是</td>
                        <td>手部</td>
                    </tr>
                    <tr className="border-bottom">
                        <td>qt1231214124</td>
                        <td>小k</td>
                        <td>0988888777</td>
                        <td>A1234567</td>
                        <td>今天</td>
                        <td>是</td>
                        <td>是</td>
                        <td>手部</td>
                    </tr>
                    <tr className="border-bottom">
                        <td>qt1231214124</td>
                        <td>小k</td>
                        <td>0988888777</td>
                        <td>A1234567</td>
                        <td>今天</td>
                        <td>是</td>
                        <td>是</td>
                        <td>手部</td>
                    </tr>
                    <tr className="border-bottom">
                        <td>qt1231214124</td>
                        <td>小k</td>
                        <td>0988888777</td>
                        <td>A1234567</td>
                        <td>今天</td>
                        <td>是</td>
                        <td>是</td>
                        <td>手部</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="pt-4">
            <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange}></Pagination>
        </div>
    </>
}