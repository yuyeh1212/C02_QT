import { createHashRouter } from "react-router-dom";
import HomeLayout from './layout/HomeLayout'
import Home from './HomePages/Home';
import Login from './HomePages/Login';
import Register from './HomePages/Register';
import NotFound from './HomePages/NotFound';

import MemberLayout from './layout/MemberLayout';
import MemberCenter from "./MemberPages/MemberCenter";
import MemberData from './MemberPages/MemberData';
import Reservation from './MemberPages/Reservation';
import Orders from './MemberPages/Orders';

import AdminLayout from './layout/AdminLayout';
import AdminReservation from './AdminPages/AdminReservation';
import AdminOrders from './AdminPages/AdminOrders';

export const router = createHashRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
            index: true,
            element: <Home />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        }
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
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
        element: <MemberLayout />,
        children: [
          {
            path: "reservation",
            element: <Reservation />,
          },
          {
            path: "center",
            element: <MemberCenter />, 
            children: [
              {
                path: "data",
                element: <MemberData />,
              },
              {
                path: "orders",
                element: <Orders />,
              },
            ],
          },
        ],
      },
    {
      path:'*',
      element:<NotFound />
    },
  ]);