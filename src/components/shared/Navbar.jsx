import { Link, NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
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
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaQuestionCircle,
  FaPhoneAlt,
  FaInfoCircle,
  FaChevronDown,
  FaSearch,
  FaBell,
  FaHeart,
  FaCog,
  FaGift,
  FaShieldAlt,
  FaStar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaHeadset,
  FaTimes,
  FaBars,
  FaHome,
  FaChevronRight,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  // Close mobile menu on route change or resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    logOut();
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenAccordion(null);
  };

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
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

  // Transport types for dropdown
  const transportTypes = [
    { icon: <FaBus className="text-blue-500" />, label: "Bus", to: "/all-tickets?type=bus", color: "blue" },
    {
      icon: <FaTrain className="text-green-500" />,
      label: "Train",
      to: "/all-tickets?type=train",
      color: "green",
    },
    {
      icon: <FaShip className="text-cyan-500" />,
      label: "Launch",
      to: "/all-tickets?type=launch",
      color: "cyan",
    },
    {
      icon: <FaPlane className="text-purple-500" />,
      label: "Flight",
      to: "/all-tickets?type=plane",
      color: "purple",
    },
  ];

  // Popular routes
  const popularRoutes = [
    { from: "Dhaka", to: "Chittagong" },
    { from: "Dhaka", to: "Sylhet" },
    { from: "Dhaka", to: "Cox's Bazar" },
    { from: "Dhaka", to: "Khulna" },
  ];

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

      {/* Tickets Dropdown */}
      <li className="relative group">
        <div className="flex items-center gap-1 cursor-pointer hover:text-primary text-gray-700 dark:text-gray-300 transition-colors py-2">
          <span>Tickets</span>
          <FaChevronDown className="text-xs transition-transform group-hover:rotate-180" />
        </div>

        {/* Mega Menu Dropdown */}
        <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-6 w-[500px]">
            <div className="grid grid-cols-2 gap-6">
              {/* Transport Types */}
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <FaTicketAlt className="text-primary" />
                  Browse by Type
                </h4>
                <div className="space-y-2">
                  {transportTypes.map((type) => (
                    <Link
                      key={type.label}
                      to={type.to}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all group/item"
                    >
                      <div
                        className={`w-8 h-8 bg-${type.color}-100 dark:bg-${type.color}-900/30 rounded-lg flex items-center justify-center`}
                      >
                        {type.icon}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 group-hover/item:text-primary">
                        {type.label} Tickets
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/all-tickets"
                  className="mt-3 flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
                >
                  View All Tickets →
                </Link>
              </div>

              {/* Popular Routes */}
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  Popular Routes
                </h4>
                <div className="space-y-2">
                  {popularRoutes.map((route, index) => (
                    <Link
                      key={index}
                      to={`/all-tickets?from=${route.from}&to=${route.to}`}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-sm"
                    >
                      <FaMapMarkerAlt className="text-primary text-xs" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {route.from} → {route.to}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Promo Banner */}
            <div className="mt-4 p-3 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#10B981] rounded-lg flex items-center justify-center">
                  <FaGift className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
                    New User? Get 10% Off!
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Use code: WELCOME10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>

      {/* Services Dropdown */}
      <li className="relative group">
        <div className="flex items-center gap-1 cursor-pointer hover:text-primary text-gray-700 dark:text-gray-300 transition-colors py-2">
          <span>Services</span>
          <FaChevronDown className="text-xs transition-transform group-hover:rotate-180" />
        </div>

        {/* Dropdown */}
        <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 p-2 w-56">
            <Link
              to="/track-booking"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all"
            >
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <FaSearch className="text-blue-500 text-sm" />
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100 text-sm">Track Booking</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Check your status</p>
              </div>
            </Link>

            <Link
              to="/schedule"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all"
            >
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <FaCalendarAlt className="text-green-500 text-sm" />
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100 text-sm">Schedules</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">View timetables</p>
              </div>
            </Link>

            <Link
              to="/offers"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all"
            >
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <FaGift className="text-orange-500 text-sm" />
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100 text-sm">Offers & Deals</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Save on bookings</p>
              </div>
            </Link>

            <Link
              to="/insurance"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all"
            >
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <FaShieldAlt className="text-purple-500 text-sm" />
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100 text-sm">Travel Insurance</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Protect your trip</p>
              </div>
            </Link>
          </div>
        </div>
      </li>

      {/* Help Dropdown */}
      <li className="relative group">
        <div className="flex items-center gap-1 cursor-pointer hover:text-primary text-gray-700 dark:text-gray-300 transition-colors py-2">
          <span>Help</span>
          <FaChevronDown className="text-xs transition-transform group-hover:rotate-180" />
        </div>

        {/* Dropdown */}
        <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 p-2 w-56">
            <Link
              to="/faq"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all"
            >
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <FaQuestionCircle className="text-blue-500 text-sm" />
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100 text-sm">FAQs</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Common questions</p>
              </div>
            </Link>

            <Link
              to="/contact"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all"
            >
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <FaPhoneAlt className="text-green-500 text-sm" />
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100 text-sm">Contact Us</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Get in touch</p>
              </div>
            </Link>

            <Link
              to="/support"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all"
            >
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <FaHeadset className="text-purple-500 text-sm" />
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100 text-sm">Live Support</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">24/7 assistance</p>
              </div>
            </Link>

            <Link
              to="/about"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-all"
            >
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <FaInfoCircle className="text-orange-500 text-sm" />
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100 text-sm">About Us</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Our story</p>
              </div>
            </Link>
          </div>
        </div>
      </li>
    </>
  );

  return (
    <>
      <div className="navbar bg-white/80 dark:bg-gray-800/90 backdrop-blur-md shadow-sm sticky top-0 z-50 px-4 lg:px-8 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="navbar-start">
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            aria-label="Open menu"
          >
            <FaBars className="text-gray-700 dark:text-gray-300 text-lg" />
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="btn btn-ghost text-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl">
                <img src="/favicon.png" alt="logo" className="w-8 h-8" />
              </span>
              <span className="gradient-text text-2xl hidden sm:inline">Book Now</span>
            </div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1 font-medium">{navLinks}</ul>
        </div>

        <div className="navbar-end gap-2 sm:gap-3">
          {/* Search Button */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105"
            aria-label="Search"
          >
            <FaSearch className="text-gray-600 dark:text-gray-300" />
          </button>

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
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Notifications */}
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 relative"
                >
                  <FaBell className="text-gray-600 dark:text-gray-300" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>

                {/* Notifications Dropdown */}
                <div
                  tabIndex={0}
                  className="dropdown-content mt-4 z-[1] w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <h4 className="font-bold text-gray-800 dark:text-gray-100">Notifications</h4>
                    <span className="text-xs text-primary cursor-pointer hover:underline">Mark all read</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 cursor-pointer">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <FaTicketAlt className="text-green-500" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-800 dark:text-gray-100">
                            Your booking has been{" "}
                            <span className="font-semibold text-green-500">confirmed</span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 minutes ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 cursor-pointer">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <FaGift className="text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-800 dark:text-gray-100">
                            <span className="font-semibold">Special offer!</span> Get 20% off your next
                            booking
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">1 hour ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                          <FaCreditCard className="text-orange-500" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-800 dark:text-gray-100">
                            Payment of <span className="font-semibold">$150</span> was successful
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Yesterday</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-t border-gray-100 dark:border-gray-700">
                    <Link
                      to="/notifications"
                      className="block text-center text-sm text-primary font-semibold hover:underline"
                    >
                      View All Notifications
                    </Link>
                  </div>
                </div>
              </div>

              {/* User Role Badge - Desktop Only */}
              <div
                className={`hidden xl:flex px-3 py-1 rounded-full text-xs font-bold ${
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
                  <div className="bg-[#10B981] p-4">
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

                    {user?.role === "user" && (
                      <>
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

                        <Link
                          to="/dashboard/user/wishlist"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all group"
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                            <FaHeart className="text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-100">Wishlist</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Saved tickets</p>
                          </div>
                        </Link>
                      </>
                    )}

                    <Link
                      to="/settings"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                        <FaCog className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-100">Settings</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Preferences</p>
                      </div>
                    </Link>

                    <div className="my-2 border-t border-gray-100 dark:border-gray-700"></div>

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
                className="px-4 sm:px-5 py-2 bg-[#10B981] to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all text-sm sm:text-base"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hidden sm:flex px-5 py-2 border-2 border-[#10B981] text-black hover:bg-[#10B981] hover:text-white font-semibold rounded-xl transition-all"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-white dark:bg-gray-800 z-[70] lg:hidden transform transition-transform duration-300 ease-out shadow-2xl ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="bg-[#10B981] p-5">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" onClick={closeMobileMenu} className="flex items-center gap-2">
              <img src="/favicon.png" alt="logo" className="w-8 h-8" />
              <span className="text-white font-bold text-xl">Book Now</span>
            </Link>
            <button
              onClick={closeMobileMenu}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-all"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* User Info in Mobile Menu */}
          {user ? (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-white/50 overflow-hidden">
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
                <p className="text-white font-semibold truncate">{user?.name || "User"}</p>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
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
          ) : (
            <div className="flex gap-2">
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="flex-1 py-2.5 bg-white text-primary font-semibold rounded-xl text-center text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMobileMenu}
                className="flex-1 py-2.5 bg-white/20 text-white font-semibold rounded-xl text-center text-sm border border-white/30"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Content */}
        <div className="overflow-y-auto h-[calc(100%-180px)] py-4">
          {/* Main Navigation */}
          <div className="px-4 space-y-1">
            {/* Home */}
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <FaHome className="text-blue-500" />
              </div>
              <span className="font-medium text-gray-800 dark:text-gray-100">Home</span>
            </Link>

            {/* Tickets Accordion */}
            <div className="rounded-xl overflow-hidden">
              <button
                onClick={() => toggleAccordion("tickets")}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                    <FaTicketAlt className="text-green-500" />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-100">Tickets</span>
                </div>
                <FaChevronDown
                  className={`text-gray-400 transition-transform duration-300 ${
                    openAccordion === "tickets" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openAccordion === "tickets" ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="pl-6 pr-4 pb-2 space-y-1">
                  {transportTypes.map((type) => (
                    <Link
                      key={type.label}
                      to={type.to}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                    >
                      <div className="w-8 h-8 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                        {type.icon}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{type.label} Tickets</span>
                    </Link>
                  ))}
                  <Link
                    to="/all-tickets"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary font-medium text-sm"
                  >
                    <FaChevronRight className="text-xs" />
                    View All Tickets
                  </Link>
                </div>
              </div>
            </div>

            {/* Services Accordion */}
            <div className="rounded-xl overflow-hidden">
              <button
                onClick={() => toggleAccordion("services")}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                    <FaCog className="text-purple-500" />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-100">Services</span>
                </div>
                <FaChevronDown
                  className={`text-gray-400 transition-transform duration-300 ${
                    openAccordion === "services" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openAccordion === "services" ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="pl-6 pr-4 pb-2 space-y-1">
                  <Link
                    to="/track-booking"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <FaSearch className="text-blue-500 text-sm" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Track Booking</span>
                  </Link>
                  <Link
                    to="/schedule"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <FaCalendarAlt className="text-green-500 text-sm" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Schedules</span>
                  </Link>
                  <Link
                    to="/offers"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                      <FaGift className="text-orange-500 text-sm" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Offers & Deals</span>
                  </Link>
                  <Link
                    to="/insurance"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <FaShieldAlt className="text-purple-500 text-sm" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Travel Insurance</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Help Accordion */}
            <div className="rounded-xl overflow-hidden">
              <button
                onClick={() => toggleAccordion("help")}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                    <FaQuestionCircle className="text-orange-500" />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-100">Help</span>
                </div>
                <FaChevronDown
                  className={`text-gray-400 transition-transform duration-300 ${
                    openAccordion === "help" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openAccordion === "help" ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="pl-6 pr-4 pb-2 space-y-1">
                  <Link
                    to="/faq"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <FaQuestionCircle className="text-blue-500 text-sm" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">FAQs</span>
                  </Link>
                  <Link
                    to="/contact"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <FaPhoneAlt className="text-green-500 text-sm" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Contact Us</span>
                  </Link>
                  <Link
                    to="/support"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <FaHeadset className="text-purple-500 text-sm" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Live Support</span>
                  </Link>
                  <Link
                    to="/about"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                      <FaInfoCircle className="text-orange-500 text-sm" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">About Us</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* User Links (if logged in) */}
            {user && (
              <>
                <div className="my-3 border-t border-gray-200 dark:border-gray-700"></div>
                <Link
                  to={getDashboardLink()}
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center">
                    <FaTachometerAlt className="text-white" />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-100">Dashboard</span>
                </Link>
                <Link
                  to={getProfileLink()}
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <FaUser className="text-white" />
                  </div>
                  <span className="font-medium text-gray-800 dark:text-gray-100">My Profile</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              {theme === "dark" ? (
                <>
                  <FaSun className="text-yellow-400" />
                  <span className="text-sm font-medium">Light</span>
                </>
              ) : (
                <>
                  <FaMoon className="text-gray-600" />
                  <span className="text-sm font-medium">Dark</span>
                </>
              )}
            </button>

            {/* Logout (if logged in) */}
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-all"
              >
                <FaSignOutAlt />
                <span className="text-sm font-medium">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for tickets, routes, destinations..."
                  className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-lg"
                  autoFocus
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {["Dhaka to Chittagong", "Bus Tickets", "Train Schedule", "Cox's Bazar"].map((term) => (
                  <Link
                    key={term}
                    to={`/all-tickets?search=${term}`}
                    onClick={() => setShowSearch(false)}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-primary hover:text-white transition-all"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
