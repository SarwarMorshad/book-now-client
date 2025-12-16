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
    if (user?.role === "user") {
      return [
        {
          icon: FaTicketAlt,
          label: "My Bookings",
          path: "/dashboard/user/my-bookings",
          color: "text-blue-600 dark:text-blue-400",
          bgColor: "bg-blue-100 dark:bg-blue-900/50",
          hoverBg: "hover:bg-blue-50 dark:hover:bg-blue-900/30",
        },
        {
          icon: FaCreditCard,
          label: "Transactions",
          path: "/dashboard/user/transactions",
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-900/50",
          hoverBg: "hover:bg-green-50 dark:hover:bg-green-900/30",
        },
        {
          icon: FaUser,
          label: "My Profile",
          path: "/dashboard/user/profile",
          color: "text-purple-600 dark:text-purple-400",
          bgColor: "bg-purple-100 dark:bg-purple-900/50",
          hoverBg: "hover:bg-purple-50 dark:hover:bg-purple-900/30",
        },
      ];
    }

    if (user?.role === "vendor") {
      return [
        {
          icon: FaTicketAlt,
          label: "My Tickets",
          path: "/dashboard/vendor/my-tickets",
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-900/50",
          hoverBg: "hover:bg-green-50 dark:hover:bg-green-900/30",
        },
        {
          icon: FaPlus,
          label: "Add Ticket",
          path: "/dashboard/vendor/add-ticket",
          color: "text-orange-600 dark:text-orange-400",
          bgColor: "bg-orange-100 dark:bg-orange-900/50",
          hoverBg: "hover:bg-orange-50 dark:hover:bg-orange-900/30",
        },
        {
          icon: FaClipboardList,
          label: "Booking Requests",
          path: "/dashboard/vendor/booking-requests",
          color: "text-purple-600 dark:text-purple-400",
          bgColor: "bg-purple-100 dark:bg-purple-900/50",
          hoverBg: "hover:bg-purple-50 dark:hover:bg-purple-900/30",
        },
        {
          icon: FaChartBar,
          label: "Revenue Overview",
          path: "/dashboard/vendor/revenue",
          color: "text-cyan-600 dark:text-cyan-400",
          bgColor: "bg-cyan-100 dark:bg-cyan-900/50",
          hoverBg: "hover:bg-cyan-50 dark:hover:bg-cyan-900/30",
        },
        {
          icon: FaUser,
          label: "My Profile",
          path: "/dashboard/vendor/profile",
          color: "text-pink-600 dark:text-pink-400",
          bgColor: "bg-pink-100 dark:bg-pink-900/50",
          hoverBg: "hover:bg-pink-50 dark:hover:bg-pink-900/30",
        },
      ];
    }

    if (user?.role === "admin") {
      return [
        {
          icon: FaTicketAlt,
          label: "Manage Tickets",
          path: "/dashboard/admin/manage-tickets",
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-900/50",
          hoverBg: "hover:bg-green-50 dark:hover:bg-green-900/30",
        },
        {
          icon: FaUsers,
          label: "Manage Users",
          path: "/dashboard/admin/manage-users",
          color: "text-orange-600 dark:text-orange-400",
          bgColor: "bg-orange-100 dark:bg-orange-900/50",
          hoverBg: "hover:bg-orange-50 dark:hover:bg-orange-900/30",
        },
        {
          icon: FaClipboardList,
          label: "All Bookings",
          path: "/dashboard/admin/all-bookings",
          color: "text-purple-600 dark:text-purple-400",
          bgColor: "bg-purple-100 dark:bg-purple-900/50",
          hoverBg: "hover:bg-purple-50 dark:hover:bg-purple-900/30",
        },
        {
          icon: FaUser,
          label: "My Profile",
          path: "/dashboard/admin/profile",
          color: "text-pink-600 dark:text-pink-400",
          bgColor: "bg-pink-100 dark:bg-pink-900/50",
          hoverBg: "hover:bg-pink-50 dark:hover:bg-pink-900/30",
        },
      ];
    }

    return [];
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Hamburger Icon - LEFT */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all"
          >
            {sidebarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>

          {/* Logo - CENTER */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🎫</span>
            <span className="gradient-text text-xl font-bold">Book Now</span>
          </Link>

          {/* User Avatar - RIGHT */}
          <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-primary/20 flex-shrink-0">
            <img
              src={user?.photoURL || getDefaultAvatar(user?.name)}
              alt={user?.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = getDefaultAvatar(user?.name);
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Overlay (Mobile) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <Link to="/" className="flex items-center gap-3">
                <span className="text-3xl">🎫</span>
                <span className="gradient-text text-2xl font-bold">Book Now</span>
              </Link>
            </div>

            {/* User Info */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-xl">
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
                  <p className="font-bold text-gray-800 dark:text-gray-100 truncate">{user?.name}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      user?.role === "admin"
                        ? "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400"
                        : user?.role === "vendor"
                          ? "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400"
                          : "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400"
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
                        : `${item.hoverBg} text-gray-700 dark:text-gray-300`
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

            {/* Bottom Actions - Back to Home & Logout */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
              {/* Back to Home */}
              <Link
                to="/"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                  <FaHome className="text-primary" />
                </div>
                <span className="font-medium">Back to Home</span>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                  <FaSignOutAlt className="text-red-600 dark:text-red-400" />
                </div>
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen lg:min-h-[calc(100vh)] bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
