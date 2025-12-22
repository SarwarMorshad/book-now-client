import { Helmet } from "react-helmet-async";
import { useState } from "react";
import {
  FaSearch,
  FaTicketAlt,
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaSpinner,
  FaExclamationCircle,
  FaQrcode,
  FaPhone,
  FaEnvelope,
  FaPrint,
  FaDownload,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const TrackBooking = () => {
  const [bookingId, setBookingId] = useState("");
  const [searchType, setSearchType] = useState("booking");

  const trackingSteps = [
    {
      icon: <FaTicketAlt />,
      title: "Enter Booking ID",
      description: "Input your booking reference number or ticket ID",
    },
    {
      icon: <FaSearch />,
      title: "Search & Verify",
      description: "We'll find your booking in our secure database",
    },
    {
      icon: <FaCheckCircle />,
      title: "View Status",
      description: "Get real-time updates on your travel booking",
    },
  ];

  const statusTypes = [
    {
      status: "Confirmed",
      icon: <FaCheckCircle className="text-2xl" />,
      color: "green",
      description: "Your booking is confirmed and ready",
    },
    {
      status: "Pending",
      icon: <FaSpinner className="text-2xl" />,
      color: "yellow",
      description: "Awaiting confirmation from operator",
    },
    {
      status: "In Transit",
      icon: <FaBus className="text-2xl" />,
      color: "blue",
      description: "Your journey is currently in progress",
    },
    {
      status: "Completed",
      icon: <FaCheckCircle className="text-2xl" />,
      color: "purple",
      description: "Journey completed successfully",
    },
  ];

  const recentBookings = [
    {
      id: "BN-2024-78543",
      type: "Bus",
      icon: <FaBus />,
      from: "Dhaka",
      to: "Chittagong",
      date: "Dec 20, 2024",
      status: "Confirmed",
      statusColor: "green",
    },
    {
      id: "BN-2024-78521",
      type: "Train",
      icon: <FaTrain />,
      from: "Dhaka",
      to: "Sylhet",
      date: "Dec 18, 2024",
      status: "Completed",
      statusColor: "purple",
    },
    {
      id: "BN-2024-78499",
      type: "Launch",
      icon: <FaShip />,
      from: "Dhaka",
      to: "Barishal",
      date: "Dec 15, 2024",
      status: "Completed",
      statusColor: "purple",
    },
  ];

  const faqs = [
    {
      question: "Where can I find my booking ID?",
      answer:
        "Your booking ID is sent to your email and SMS after successful booking. It starts with 'BN-' followed by the year and a unique number.",
    },
    {
      question: "How often is the tracking updated?",
      answer:
        "Our tracking system updates in real-time. For buses with GPS tracking, you can see live location updates every 30 seconds.",
    },
    {
      question: "Can I track multiple bookings?",
      answer:
        "Yes! Log into your account to view and track all your bookings in one place. You can also set up notifications for each booking.",
    },
    {
      question: "What if my booking shows 'Pending'?",
      answer:
        "Pending status usually resolves within 15-30 minutes. If it persists, please contact our support team for assistance.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Track Booking | Book Now</title>
        <meta name="description" content="Track your travel booking in real-time with Book Now" />
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
                <FaSearch className="text-4xl text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Track Your
                <span className="block">Booking</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8">
                Stay updated with real-time tracking of your travel bookings. Enter your booking ID to get
                instant status updates.
              </p>

              {/* Search Box */}
              <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl">
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setSearchType("booking")}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                      searchType === "booking"
                        ? "bg-primary text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    Booking ID
                  </button>
                  <button
                    onClick={() => setSearchType("phone")}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                      searchType === "phone"
                        ? "bg-primary text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    Phone Number
                  </button>
                </div>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder={
                        searchType === "booking"
                          ? "Enter Booking ID (e.g., BN-2024-XXXXX)"
                          : "Enter Phone Number"
                      }
                      value={bookingId}
                      onChange={(e) => setBookingId(e.target.value)}
                      className="w-full px-4 py-4 pr-12 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <FaQrcode className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl cursor-pointer hover:text-[#10B981] transition-colors" />
                  </div>
                  <button className="px-8 py-4 bg-[#10B981] text-white font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105">
                    Track
                  </button>
                </div>
              </div>
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

        {/* How It Works */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold mb-2 block">HOW IT WORKS</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
              Track in 3 Simple Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {trackingSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-[#EF4444] rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#F59E0B] text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#10B981]"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Status Types */}
        <div className="bg-white dark:bg-gray-800 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold mb-2 block">BOOKING STATUS</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
                Understanding Your Booking Status
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {statusTypes.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                      item.color === "green"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-500"
                        : item.color === "yellow"
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-500"
                          : item.color === "blue"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-500"
                            : "bg-purple-100 dark:bg-purple-900/30 text-purple-500"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">{item.status}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Demo Recent Bookings */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            {/* <span className="text-primary font-semibold mb-2 block">DEMO</span> */}
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
              Sample Booking Results
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Here's what your tracking results would look like
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {recentBookings.map((booking, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#EF4444] rounded-xl flex items-center justify-center text-white text-xl">
                      {booking.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{booking.id}</p>
                      <p className="font-semibold text-gray-800 dark:text-gray-100">
                        {booking.from} → {booking.to}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <FaClock className="text-xs" />
                        {booking.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        booking.statusColor === "green"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                          : "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                      }`}
                    >
                      {booking.status}
                    </span>
                    <div className="flex gap-2">
                      <button className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-colors">
                        <FaPrint />
                      </button>
                      <button className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-colors">
                        <FaDownload />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white dark:bg-gray-800 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold mb-2 block">FAQs</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-start gap-3">
                    <FaExclamationCircle className="text-primary mt-1 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm ml-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Need Help Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="bg-[#10B981] rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Need Help Tracking?</h2>
                <p className="text-white/80 mb-6">
                  Our support team is available 24/7 to help you with any booking inquiries.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+880123456789"
                    className="flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105"
                  >
                    <FaPhone /> Call Support
                  </a>
                  <a
                    href="mailto:support@booknow.com"
                    className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/30 transition-all"
                  >
                    <FaEnvelope /> Email Us
                  </a>
                </div>
              </div>
              <div className="hidden md:flex justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <FaBus className="text-4xl text-white mx-auto mb-2" />
                    <p className="text-white/80 text-sm">Bus</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <FaTrain className="text-4xl text-white mx-auto mb-2" />
                    <p className="text-white/80 text-sm">Train</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <FaShip className="text-4xl text-white mx-auto mb-2" />
                    <p className="text-white/80 text-sm">Launch</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <FaPlane className="text-4xl text-white mx-auto mb-2" />
                    <p className="text-white/80 text-sm">Flight</p>
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

export default TrackBooking;
