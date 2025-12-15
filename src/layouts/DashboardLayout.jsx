import { useContext, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FaHome,
  FaTicketAlt,
  FaUser,
  FaCreditCard,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaPlus,
  FaClipboardList,
  FaUsers,
  FaChartBar,
  FaCog,
  FaAd,
} from "react-icons/fa";

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  // Generate default avatar
  const getDefaultAvatar = (name) => {
    const initial = name ? name.charAt(0).toUpperCase() : "U";
    return `https://ui-avatars.com/api/?name=${initial}&background=3b82f6&color=fff&bold=true`;
  };

  // Menu items based on role
  const getMenuItems = () => {
    const commonItems = [
      {
        icon: FaHome,
        label: "Back to Home",
        path: "/",
        color: "text-gray-600",
        bgColor: "bg-gray-100",
        hoverBg: "hover:bg-gray-200",
      },
    ];

    if (user?.role === "user") {
      return [
        {
          icon: FaTicketAlt,
          label: "My Bookings",
          path: "/dashboard/user/my-bookings",
          color: "text-blue-600",
          bgColor: "bg-blue-100",
          hoverBg: "hover:bg-blue-50",
        },
        {
          icon: FaCreditCard,
          label: "Transactions",
          path: "/dashboard/user/transactions",
          color: "text-green-600",
          bgColor: "bg-green-100",
          hoverBg: "hover:bg-green-50",
        },
        {
          icon: FaUser,
          label: "My Profile",
          path: "/dashboard/user/profile",
          color: "text-purple-600",
          bgColor: "bg-purple-100",
          hoverBg: "hover:bg-purple-50",
        },
        ...commonItems,
      ];
    }

    if (user?.role === "vendor") {
      return [
        // {
        //   icon: FaChartBar,
        //   label: "Overview",
        //   path: "/dashboard/vendor",
        //   color: "text-blue-600",
        //   bgColor: "bg-blue-100",
        //   hoverBg: "hover:bg-blue-50",
        // },
        {
          icon: FaTicketAlt,
          label: "My Tickets",
          path: "/dashboard/vendor/my-tickets",
          color: "text-green-600",
          bgColor: "bg-green-100",
          hoverBg: "hover:bg-green-50",
        },
        {
          icon: FaPlus,
          label: "Add Ticket",
          path: "/dashboard/vendor/add-ticket",
          color: "text-orange-600",
          bgColor: "bg-orange-100",
          hoverBg: "hover:bg-orange-50",
        },
        {
          icon: FaClipboardList,
          label: "Booking Requests",
          path: "/dashboard/vendor/booking-requests",
          color: "text-purple-600",
          bgColor: "bg-purple-100",
          hoverBg: "hover:bg-purple-50",
        },
        {
          path: "/dashboard/vendor/revenue",
          label: "Revenue Overview",
          icon: FaChartBar, // or FaChartLine
          color: "bg-cyan-100 text-cyan-600",
        },
        {
          icon: FaUser,
          label: "My Profile",
          path: "/dashboard/vendor/profile",
          color: "text-pink-600",
          bgColor: "bg-pink-100",
          hoverBg: "hover:bg-pink-50",
        },

        ...commonItems,
      ];
    }

    if (user?.role === "admin") {
      return [
        // {
        //   icon: FaChartBar,
        //   label: "Overview",
        //   path: "/dashboard/admin",
        //   color: "text-blue-600",
        //   bgColor: "bg-blue-100",
        //   hoverBg: "hover:bg-blue-50",
        // },
        {
          icon: FaTicketAlt,
          label: "Manage Tickets",
          path: "/dashboard/admin/manage-tickets",
          color: "text-green-600",
          bgColor: "bg-green-100",
          hoverBg: "hover:bg-green-50",
        },
        {
          icon: FaUsers,
          label: "Manage Users",
          path: "/dashboard/admin/manage-users",
          color: "text-orange-600",
          bgColor: "bg-orange-100",
          hoverBg: "hover:bg-orange-50",
        },
        {
          icon: FaClipboardList,
          label: "All Bookings",
          path: "/dashboard/admin/all-bookings",
          color: "text-purple-600",
          bgColor: "bg-purple-100",
          hoverBg: "hover:bg-purple-50",
        },
        {
          icon: FaUser,
          label: "My Profile",
          path: "/dashboard/admin/profile",
          color: "text-pink-600",
          bgColor: "bg-pink-100",
          hoverBg: "hover:bg-pink-50",
        },
        ...commonItems,
      ];
    }

    return commonItems;
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🎫</span>
            <span className="gradient-text text-xl font-bold">Book Now</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all"
          >
            {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Overlay (Mobile) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
              <Link to="/" className="flex items-center gap-3">
                <span className="text-3xl">🎫</span>
                <span className="gradient-text text-2xl font-bold">Book Now</span>
              </Link>
            </div>

            {/* User Info */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
                  <img
                    src={user?.photoURL || getDefaultAvatar(user?.name)}
                    alt={user?.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = getDefaultAvatar(user?.name);
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-800 truncate">{user?.name}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      user?.role === "admin"
                        ? "bg-red-100 text-red-700"
                        : user?.role === "vendor"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? `bg-gradient-to-r from-primary to-secondary text-white shadow-md`
                        : `${item.hoverBg} text-gray-700`
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isActive ? "bg-white/20" : item.bgColor
                        }`}
                      >
                        <item.icon className={isActive ? "text-white" : item.color} />
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-50 text-gray-700 hover:text-red-600 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <FaSignOutAlt className="text-red-600" />
                </div>
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen lg:min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
