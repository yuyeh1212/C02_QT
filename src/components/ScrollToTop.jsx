import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation(); // 取得當前路由
  
  useEffect(() => {
    window.scrollTo(0, 0); // 滾動到最上方
  }, [location.pathname]); // 當 pathname 改變時執行

  return null; // 這個元件不渲染任何 UI
};

export default ScrollToTop;