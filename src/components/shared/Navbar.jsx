import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext.jsx";
import {
  FaUser,
  FaTicketAlt,
  FaCreditCard,
  FaSignOutAlt,
  FaTachometerAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    logOut();
  };

  // Generate default avatar URL based on user name
  const getDefaultAvatar = (name) => {
    const initial = name ? name.charAt(0).toUpperCase() : "U";
    return `https://ui-avatars.com/api/?name=${initial}&background=3b82f6&color=fff&bold=true`;
  };

  // Get dashboard link based on role
  const getDashboardLink = () => {
    if (user?.role === "admin") return "/dashboard/admin/manage-tickets";
    if (user?.role === "vendor") return "/dashboard/vendor/my-tickets";
    return "/dashboard/user/my-bookings";
  };

  // Get profile link based on role
  const getProfileLink = () => {
    if (user?.role === "admin") return "/dashboard/admin/profile";
    if (user?.role === "vendor") return "/dashboard/vendor/profile";
    return "/dashboard/user/profile";
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-primary"
              : "hover:text-primary text-gray-700 dark:text-gray-300 transition-colors"
          }
        >
          Home
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/all-tickets"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-primary"
                : "hover:text-primary text-gray-700 dark:text-gray-300 transition-colors"
            }
          >
            All Tickets
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-white/80 dark:bg-gray-800/90 backdrop-blur-md shadow-sm sticky top-0 z-50 px-4 lg:px-8 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="navbar-start">
        {/* Mobile Hamburger */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden text-gray-700 dark:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white dark:bg-gray-800 rounded-box w-52 border border-gray-200 dark:border-gray-700"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="btn btn-ghost text-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <span className="text-3xl">🎫</span>
          <span className="gradient-text text-2xl hidden sm:inline">Book Now</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-medium">{navLinks}</ul>
      </div>

      <div className="navbar-end gap-3">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <FaSun className="text-yellow-400 text-lg" />
          ) : (
            <FaMoon className="text-gray-600 text-lg" />
          )}
        </button>

        {user ? (
          <div className="flex items-center gap-3">
            {/* User Role Badge */}
            <div
              className={`hidden sm:flex px-3 py-1 rounded-full text-xs font-bold ${
                user.role === "admin"
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                  : user.role === "vendor"
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                    : "bg-gradient-to-r from-primary to-blue-600 text-white"
              }`}
            >
              {user.role?.toUpperCase()}
            </div>

            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar ring-2 ring-primary/30 hover:ring-primary transition-all"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={user?.photoURL || getDefaultAvatar(user?.name)}
                    alt={user?.name || "User"}
                    className="object-cover"
                    onError={(e) => {
                      e.target.src = getDefaultAvatar(user?.name);
                    }}
                  />
                </div>
              </label>

              {/* Dropdown Content */}
              <div
                tabIndex={0}
                className="dropdown-content mt-4 z-[1] w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                {/* User Header */}
                <div className="bg-gradient-to-r from-primary to-secondary p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full border-2 border-white overflow-hidden">
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
                      <p className="font-bold text-white truncate text-lg">{user?.name || "User"}</p>
                      <p className="text-white/80 text-sm truncate">{user?.email}</p>
                    </div>
                  </div>
                  {/* Role Badge in Header */}
                  <div className="mt-3">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        user.role === "admin"
                          ? "bg-red-500 text-white"
                          : user.role === "vendor"
                            ? "bg-yellow-500 text-white"
                            : "bg-white/20 text-white"
                      }`}
                    >
                      {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  {/* Dashboard */}
                  <Link
                    to={getDashboardLink()}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                      <FaTachometerAlt className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-100">Dashboard</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">View your dashboard</p>
                    </div>
                  </Link>

                  {/* Profile */}
                  <Link
                    to={getProfileLink()}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                      <FaUser className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-100">My Profile</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Edit your profile</p>
                    </div>
                  </Link>

                  {/* User-specific links */}
                  {user?.role === "user" && (
                    <>
                      {/* My Bookings */}
                      <Link
                        to="/dashboard/user/my-bookings"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all group"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                          <FaTicketAlt className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-gray-100">My Bookings</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">View your bookings</p>
                        </div>
                      </Link>

                      {/* Transactions */}
                      <Link
                        to="/dashboard/user/transactions"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all group"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-secondary to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                          <FaCreditCard className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-gray-100">Transactions</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Payment history</p>
                        </div>
                      </Link>
                    </>
                  )}

                  {/* Divider */}
                  <div className="my-2 border-t border-gray-100 dark:border-gray-700"></div>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                      <FaSignOutAlt className="text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-red-600 dark:text-red-400">Logout</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Sign out of your account</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="px-5 py-2 bg-gradient-to-r from-primary to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hidden sm:flex px-5 py-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-xl transition-all"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
