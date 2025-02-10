import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export default function NotFund(){
    const navigate = useNavigate();

    useEffect(()=>{
        setTimeout(()=>{
            navigate('/');
        },2000);
        
    },[navigate])

    return <>
        <div>此頁面不存在</div>
    </>
}