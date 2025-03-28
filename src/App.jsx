import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // 在組件掛載時滾動到頁面最上方
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
