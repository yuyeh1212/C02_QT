import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("Current Location Hash:", location.hash); // 檢查哈希路徑
    window.scrollTo(0, 0);
  }, [location.hash]); // 當哈希路徑變更時觸發
  

  return null;
};

export default ScrollToTop;
