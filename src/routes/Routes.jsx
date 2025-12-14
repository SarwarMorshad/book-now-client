import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Public Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AllTickets from "../pages/Tickets/AllTickets";
import TicketDetails from "../pages/Tickets/TicketDetails";
import ErrorPage from "../pages/ErrorPage";

// User Dashboard Pages
import MyBookings from "../pages/Dashboard/User/MyBookings";
import Transactions from "../pages/Dashboard/User/Transactions";
import PaymentCancelled from "../pages/Dashboard/User/PaymentCancelled";

// Vendor Dashboard Pages
import AddTicket from "../pages/Dashboard/Vendor/AddTicket";

// Admin Dashboard Pages
import ManageTickets from "../pages/Dashboard/Admin/ManageTickets";

// Shared Dashboard Pages
// import Profile from "../pages/Dashboard/Shared/Profile";

// Route Guards
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/Dashboard/shared/Profile";

// ===========================
// Router Configuration
// ===========================
const router = createBrowserRouter([
  // ===========================
  // Public Routes (MainLayout)
  // ===========================
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "all-tickets",
        element: <AllTickets />,
      },
      {
        path: "tickets/:ticketId",
        element: <TicketDetails />,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancelled />,
      },
    ],
  },

  // ===========================
  // Dashboard Routes (Sidebar)
  // ===========================
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      // -----------------------
      // User Routes
      // -----------------------
      {
        path: "user/my-bookings",
        element: <MyBookings />,
      },
      {
        path: "user/transactions",
        element: <Transactions />,
      },
      {
        path: "user/profile",
        element: <Profile />,
      },

      // -----------------------
      // Vendor Routes
      // -----------------------
      {
        path: "vendor/add-ticket",
        element: <AddTicket />,
      },
      {
        path: "vendor/my-tickets",
        element: <div className="p-8 text-center text-2xl text-gray-500">🚧 Coming Soon</div>,
      },
      {
        path: "vendor/booking-requests",
        element: <div className="p-8 text-center text-2xl text-gray-500">🚧 Coming Soon</div>,
      },
      {
        path: "vendor/profile",
        element: <Profile />,
      },

      // -----------------------
      // Admin Routes
      // -----------------------
      {
        path: "admin/manage-tickets",
        element: <ManageTickets />,
      },
      {
        path: "admin/manage-users",
        element: <div className="p-8 text-center text-2xl text-gray-500">🚧 Coming Soon</div>,
      },
      {
        path: "admin/all-bookings",
        element: <div className="p-8 text-center text-2xl text-gray-500">🚧 Coming Soon</div>,
      },
      {
        path: "admin/profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
