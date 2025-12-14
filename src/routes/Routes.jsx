import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AllTickets from "../pages/Tickets/AllTickets";
import TicketDetails from "../pages/Tickets/TicketDetails";

import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage";
import AddTicket from "../pages/Dashboard/Vendor/AddTicket";
import ManageTickets from "../pages/Dashboard/Admin/ManageTickets";
import MyBookings from "../pages/Dashboard/User/MyBookings";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/all-tickets",
        element: <AllTickets />,
      },
      {
        path: "/tickets/:ticketId",
        element: <TicketDetails />,
      },
      {
        path: "/dashboard/vendor/add-ticket",
        element: (
          <PrivateRoute>
            <AddTicket />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admin/manage-tickets",
        element: (
          <PrivateRoute>
            <ManageTickets />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/user/my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Routes;
