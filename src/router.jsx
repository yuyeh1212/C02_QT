import { createHashRouter } from "react-router-dom";
import Home from './HomePages/Home';
import Login from './HomePages/Login';
import Register from './HomePages/Register';
import NotFound from './HomePages/NotFound';

import Member from './MemberPages/Member';
import Reservation from './MemberPages/Reservation';
import Orders from './MemberPages/Orders';

import Admin from './AdminPages/Admin';
import AdminReservation from './AdminPages/AdminReservation';
import AdminOrders from './AdminPages/AdminOrders';

export const router = createHashRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path:"reservation",
          element:<Reservation/>
        }
      ],
    },
    {
      path: "/admin",
      element: <Admin />,
      children: [
        {
          path: "reservation",
          element: <AdminReservation />,
        },
        {
          path: "orders",
          element: <AdminOrders />,
        },
      ],
    },
    {
        path: "/member",
        element: <Member />,
        children: [
          {
            path: "reservation",
            element: <Reservation />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
        ],
      },
    {
      path:'*',
      element:<NotFound />
    },
  ]);