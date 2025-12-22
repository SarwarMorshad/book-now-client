import { Helmet } from "react-helmet-async";
import { useState } from "react";
import {
  FaCalendarAlt,
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaClock,
  FaMapMarkerAlt,
  FaSearch,
  FaFilter,
  FaArrowRight,
  FaSun,
  FaMoon,
  FaCloudSun,
  FaStar,
  FaExchangeAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Schedules = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");

  const transportTypes = [
    { id: "all", label: "All", icon: <FaCalendarAlt /> },
    { id: "bus", label: "Bus", icon: <FaBus /> },
    { id: "train", label: "Train", icon: <FaTrain /> },
    { id: "launch", label: "Launch", icon: <FaShip /> },
    { id: "flight", label: "Flight", icon: <FaPlane /> },
  ];

  const popularRoutes = [
    {
      from: "Dhaka",
      to: "Chittagong",
      duration: "5-6 hours",
      types: ["bus", "train"],
      frequency: "Every 30 mins",
      price: "From ৳500",
    },
    {
      from: "Dhaka",
      to: "Sylhet",
      duration: "4-5 hours",
      types: ["bus", "train"],
      frequency: "Every hour",
      price: "From ৳450",
    },
    {
      from: "Dhaka",
      to: "Cox's Bazar",
      duration: "8-10 hours",
      types: ["bus", "flight"],
      frequency: "Multiple daily",
      price: "From ৳800",
    },
    {
      from: "Dhaka",
      to: "Barishal",
      duration: "6-8 hours",
      types: ["bus", "launch"],
      frequency: "Daily",
      price: "From ৳400",
    },
    {
      from: "Dhaka",
      to: "Rajshahi",
      duration: "4-5 hours",
      types: ["bus", "train"],
      frequency: "Every hour",
      price: "From ৳500",
    },
    {
      from: "Dhaka",
      to: "Khulna",
      duration: "5-6 hours",
      types: ["bus", "train"],
      frequency: "Every 45 mins",
      price: "From ৳550",
    },
  ];

  const scheduleData = [
    {
      id: 1,
      operator: "Green Line Paribahan",
      type: "bus",
      icon: <FaBus />,
      from: "Dhaka",
      to: "Chittagong",
      departure: "06:00 AM",
      arrival: "12:00 PM",
      duration: "6h",
      price: 750,
      seats: 12,
      rating: 4.8,
      timeOfDay: "morning",
    },
    {
      id: 2,
      operator: "Subarna Express",
      type: "train",
      icon: <FaTrain />,
      from: "Dhaka",
      to: "Chittagong",
      departure: "07:30 AM",
      arrival: "01:00 PM",
      duration: "5h 30m",
      price: 550,
      seats: 45,
      rating: 4.9,
      timeOfDay: "morning",
    },
    {
      id: 3,
      operator: "Shyamoli Paribahan",
      type: "bus",
      icon: <FaBus />,
      from: "Dhaka",
      to: "Sylhet",
      departure: "10:00 AM",
      arrival: "02:30 PM",
      duration: "4h 30m",
      price: 500,
      seats: 8,
      rating: 4.6,
      timeOfDay: "morning",
    },
    {
      id: 4,
      operator: "Sundarban Launch",
      type: "launch",
      icon: <FaShip />,
      from: "Dhaka",
      to: "Barishal",
      departure: "08:00 PM",
      arrival: "06:00 AM",
      duration: "10h",
      price: 850,
      seats: 20,
      rating: 4.5,
      timeOfDay: "night",
    },
    {
      id: 5,
      operator: "Biman Bangladesh",
      type: "flight",
      icon: <FaPlane />,
      from: "Dhaka",
      to: "Cox's Bazar",
      departure: "02:00 PM",
      arrival: "03:05 PM",
      duration: "1h 5m",
      price: 4500,
      seats: 25,
      rating: 4.7,
      timeOfDay: "afternoon",
    },
    {
      id: 6,
      operator: "Hanif Enterprise",
      type: "bus",
      icon: <FaBus />,
      from: "Dhaka",
      to: "Rajshahi",
      departure: "11:00 PM",
      arrival: "05:00 AM",
      duration: "6h",
      price: 650,
      seats: 15,
      rating: 4.4,
      timeOfDay: "night",
    },
  ];

  const timeFilters = [
    { id: "all", label: "All Times", icon: <FaClock /> },
    { id: "morning", label: "Morning", icon: <FaSun />, time: "6AM - 12PM" },
    { id: "afternoon", label: "Afternoon", icon: <FaCloudSun />, time: "12PM - 6PM" },
    { id: "night", label: "Night", icon: <FaMoon />, time: "6PM - 6AM" },
  ];

  const cities = [
    "Dhaka",
    "Chittagong",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barishal",
    "Cox's Bazar",
    "Rangpur",
    "Comilla",
    "Mymensingh",
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case "bus":
        return <FaBus className="text-blue-500" />;
      case "train":
        return <FaTrain className="text-green-500" />;
      case "launch":
        return <FaShip className="text-cyan-500" />;
      case "flight":
        return <FaPlane className="text-purple-500" />;
      default:
        return <FaBus />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Schedules | Book Now</title>
        <meta name="description" content="View all travel schedules - buses, trains, launches, and flights" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <div className="relative bg-[#10B981] overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>

          <div className="relative container mx-auto px-4 py-20 sm:py-28">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                <FaCalendarAlt className="text-4xl text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Travel
                <span className="block">Schedules</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
                Browse comprehensive schedules for all transport options. Find the perfect time for your
                journey.
              </p>
            </div>
          </div>

          {/* Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                className="fill-gray-50 dark:fill-gray-900"
              />
            </svg>
          </div>
        </div>

        {/* Search & Filter Section */}
        <div className="container mx-auto px-4 -mt-8 relative z-10">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl">
            {/* Transport Type Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {transportTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                    selectedType === type.id
                      ? "bg-[#10B981] text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {type.icon}
                  {type.label}
                </button>
              ))}
            </div>

            {/* Search Fields */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                  From
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="relative flex items-end">
                <button className="absolute left-1/2 -translate-x-1/2 bottom-3 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center z-10 hover:bg-secondary transition-colors">
                  <FaExchangeAlt />
                </button>
              </div>

              <div className="relative">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 block">To</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-end">
                <button className="w-full py-3 bg-[#10B981] text-white font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2">
                  <FaSearch />
                  Search
                </button>
              </div>
            </div>

            {/* Time Filters */}
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              {timeFilters.map((filter) => (
                <button
                  key={filter.id}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-all text-sm"
                >
                  {filter.icon}
                  <span>{filter.label}</span>
                  {filter.time && <span className="text-xs opacity-70">({filter.time})</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Routes */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold mb-2 block">POPULAR ROUTES</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
              Most Traveled Routes
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularRoutes.map((route, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary" />
                    <span className="font-bold text-gray-800 dark:text-gray-100">{route.from}</span>
                  </div>
                  <FaArrowRight className="text-gray-400 group-hover:text-primary transition-colors" />
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-secondary" />
                    <span className="font-bold text-gray-800 dark:text-gray-100">{route.to}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex gap-1">
                    {route.types.map((type) => (
                      <span
                        key={type}
                        className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center"
                      >
                        {getTypeIcon(type)}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Duration</p>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">{route.duration}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Frequency</p>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">{route.frequency}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Price</p>
                    <p className="font-semibold text-primary">{route.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule List */}
        <div className="bg-white dark:bg-gray-800 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold mb-2 block">TODAY'S SCHEDULES</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
                Available Departures
              </h2>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              {scheduleData.map((schedule) => (
                <div
                  key={schedule.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 flex flex-col lg:flex-row lg:items-center gap-4"
                >
                  {/* Operator Info */}
                  <div className="flex items-center gap-4 lg:w-1/4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                        schedule.type === "bus"
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-500"
                          : schedule.type === "train"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-500"
                            : schedule.type === "launch"
                              ? "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-500"
                              : "bg-purple-100 dark:bg-purple-900/30 text-purple-500"
                      }`}
                    >
                      {schedule.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-gray-100">{schedule.operator}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <FaStar className="text-yellow-500 text-xs" />
                        {schedule.rating}
                      </div>
                    </div>
                  </div>

                  {/* Route & Time */}
                  <div className="flex items-center gap-4 lg:w-2/5">
                    <div className="text-center">
                      <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        {schedule.departure}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{schedule.from}</p>
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-600 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 dark:bg-gray-700 px-2 text-xs text-gray-500 dark:text-gray-400">
                          {schedule.duration}
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{schedule.arrival}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{schedule.to}</p>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between lg:w-1/3">
                    <div>
                      <p className="text-2xl font-bold gradient-text">৳{schedule.price}</p>
                      <p className="text-sm text-green-500">{schedule.seats} seats left</p>
                    </div>
                    <Link
                      to="/all-tickets"
                      className="px-6 py-3 bg-[#10B981] text-white font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                to="/all-tickets"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-700 text-primary border-2 border-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all"
              >
                View All Schedules
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="bg-[#10B981] rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Schedule Updates</h2>
                <p className="text-white/80 mb-6">
                  Get real-time schedule updates and notifications. Never miss your departure!
                </p>
                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <FaInfoCircle className="text-white text-xl mt-1" />
                  <div>
                    <p className="text-white font-medium">Pro Tip</p>
                    <p className="text-white/80 text-sm">
                      Download our mobile app for instant push notifications on schedule changes.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <FaClock className="text-3xl text-white mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">24/7</p>
                    <p className="text-white/80 text-sm">Real-time Updates</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <FaCalendarAlt className="text-3xl text-white mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">365</p>
                    <p className="text-white/80 text-sm">Days Coverage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Schedules;
