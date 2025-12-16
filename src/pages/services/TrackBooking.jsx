import { useState } from "react";
import {
  FaSearch,
  FaTicketAlt,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaBus,
  FaTrain,
  FaPlane,
  FaShip,
  FaUser,
  FaCalendarAlt,
  FaBarcode,
  FaPrint,
  FaDownload,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";

const TrackBooking = () => {
  const [bookingId, setBookingId] = useState("");
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("bookingId");

  // Mock booking data for demonstration
  const mockBookings = {
    "BN-2024-78542": {
      id: "BN-2024-78542",
      status: "confirmed",
      type: "bus",
      passenger: {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1 234 567 8900",
      },
      journey: {
        from: "New York",
        to: "Boston",
        date: "Dec 20, 2024",
        departureTime: "08:30 AM",
        arrivalTime: "12:45 PM",
        duration: "4h 15m",
      },
      ticket: {
        seatNumber: "A12",
        busNumber: "NY-BOS-Express",
        platform: "Gate 5",
        class: "Premium",
        price: 85.0,
      },
      timeline: [
        { step: "Booking Created", time: "Dec 15, 2024 10:30 AM", completed: true },
        { step: "Payment Confirmed", time: "Dec 15, 2024 10:32 AM", completed: true },
        { step: "Ticket Issued", time: "Dec 15, 2024 10:33 AM", completed: true },
        { step: "Ready for Journey", time: "Dec 20, 2024", completed: false },
      ],
    },
    "BN-2024-45123": {
      id: "BN-2024-45123",
      status: "pending",
      type: "train",
      passenger: {
        name: "Jane Smith",
        email: "jane.smith@email.com",
        phone: "+1 987 654 3210",
      },
      journey: {
        from: "Chicago",
        to: "Detroit",
        date: "Dec 22, 2024",
        departureTime: "06:00 AM",
        arrivalTime: "11:30 AM",
        duration: "5h 30m",
      },
      ticket: {
        seatNumber: "C24",
        busNumber: "Midwest Express",
        platform: "Platform 3",
        class: "Business",
        price: 120.0,
      },
      timeline: [
        { step: "Booking Created", time: "Dec 16, 2024 02:15 PM", completed: true },
        { step: "Payment Processing", time: "Pending", completed: false },
        { step: "Ticket Issued", time: "Pending", completed: false },
        { step: "Ready for Journey", time: "Dec 22, 2024", completed: false },
      ],
    },
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setError("");
    setBookingData(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const searchKey = activeTab === "bookingId" ? bookingId.toUpperCase() : email.toLowerCase();

    // Check mock data
    if (activeTab === "bookingId" && mockBookings[searchKey]) {
      setBookingData(mockBookings[searchKey]);
    } else if (activeTab === "email") {
      // Find by email
      const found = Object.values(mockBookings).find((b) => b.passenger.email.toLowerCase() === searchKey);
      if (found) {
        setBookingData(found);
      } else {
        setError("No booking found with this email address.");
      }
    } else {
      setError("Booking not found. Please check your booking ID and try again.");
    }

    setIsSearching(false);
  };

  const getStatusConfig = (status) => {
    const configs = {
      confirmed: {
        icon: <FaCheckCircle className="text-xl" />,
        text: "Confirmed",
        bgColor: "bg-green-50",
        textColor: "text-green-600",
        borderColor: "border-green-200",
      },
      pending: {
        icon: <FaHourglassHalf className="text-xl" />,
        text: "Pending",
        bgColor: "bg-yellow-50",
        textColor: "text-yellow-600",
        borderColor: "border-yellow-200",
      },
      cancelled: {
        icon: <FaTimesCircle className="text-xl" />,
        text: "Cancelled",
        bgColor: "bg-red-50",
        textColor: "text-red-600",
        borderColor: "border-red-200",
      },
    };
    return configs[status] || configs.pending;
  };

  const getTransportIcon = (type) => {
    const icons = {
      bus: <FaBus className="text-2xl text-primary" />,
      train: <FaTrain className="text-2xl text-primary" />,
      flight: <FaPlane className="text-2xl text-primary" />,
      ship: <FaShip className="text-2xl text-primary" />,
    };
    return icons[type] || icons.bus;
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <FaTicketAlt className="text-4xl text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Track Your Booking</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Enter your booking ID or email address to check your ticket status, view journey details, and
            download your e-ticket.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          {/* Tab Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab("bookingId")}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "bookingId"
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <FaBarcode className="inline mr-2" />
              Search by Booking ID
            </button>
            <button
              onClick={() => setActiveTab("email")}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "email"
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <FaEnvelope className="inline mr-2" />
              Search by Email
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch}>
            <div className="flex gap-4">
              {activeTab === "bookingId" ? (
                <div className="flex-1 relative">
                  <FaBarcode className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                    placeholder="Enter Booking ID (e.g., BN-2024-78542)"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-lg focus:border-primary focus:outline-none transition-colors"
                    required
                  />
                </div>
              ) : (
                <div className="flex-1 relative">
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-lg focus:border-primary focus:outline-none transition-colors"
                    required
                  />
                </div>
              )}
              <button
                type="submit"
                disabled={isSearching}
                className="px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-primary/30"
              >
                {isSearching ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Searching...
                  </>
                ) : (
                  <>
                    <FaSearch />
                    Track
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Sample Booking IDs */}
          <div className="mt-4 text-center">
            <span className="text-gray-500 text-sm">Try sample: </span>
            <button
              onClick={() => {
                setActiveTab("bookingId");
                setBookingId("BN-2024-78542");
              }}
              className="text-primary text-sm font-medium hover:underline"
            >
              BN-2024-78542
            </button>
            <span className="text-gray-400 mx-2">or</span>
            <button
              onClick={() => {
                setActiveTab("bookingId");
                setBookingId("BN-2024-45123");
              }}
              className="text-primary text-sm font-medium hover:underline"
            >
              BN-2024-45123
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600">
              <FaTimesCircle className="text-xl flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Booking Results */}
        {bookingData && (
          <div className="space-y-6 animate-fadeIn">
            {/* Status Banner */}
            <div
              className={`${getStatusConfig(bookingData.status).bgColor} ${
                getStatusConfig(bookingData.status).borderColor
              } border rounded-2xl p-6 flex items-center justify-between`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`${getStatusConfig(bookingData.status).textColor} p-3 bg-white rounded-full shadow-sm`}
                >
                  {getStatusConfig(bookingData.status).icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Booking {getStatusConfig(bookingData.status).text}
                  </h3>
                  <p className="text-gray-600">Booking ID: {bookingData.id}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="btn btn-sm bg-white border-gray-200 text-gray-700 hover:bg-gray-50">
                  <FaPrint className="mr-1" /> Print
                </button>
                <button className="btn btn-sm btn-primary">
                  <FaDownload className="mr-1" /> Download
                </button>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Journey Details */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-primary/5 px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    {getTransportIcon(bookingData.type)}
                    Journey Details
                  </h3>
                </div>
                <div className="p-6">
                  {/* Route Visualization */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FaMapMarkerAlt className="text-2xl text-primary" />
                      </div>
                      <h4 className="font-bold text-xl text-gray-800">{bookingData.journey.from}</h4>
                      <p className="text-primary font-semibold">{bookingData.journey.departureTime}</p>
                    </div>

                    <div className="flex-1 px-6">
                      <div className="relative">
                        <div className="border-t-2 border-dashed border-gray-300"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-full border border-gray-200">
                          <span className="text-gray-600 font-medium flex items-center gap-2">
                            <FaClock className="text-primary" />
                            {bookingData.journey.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FaMapMarkerAlt className="text-2xl text-secondary" />
                      </div>
                      <h4 className="font-bold text-xl text-gray-800">{bookingData.journey.to}</h4>
                      <p className="text-secondary font-semibold">{bookingData.journey.arrivalTime}</p>
                    </div>
                  </div>

                  {/* Ticket Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <FaCalendarAlt className="text-primary text-xl mx-auto mb-2" />
                      <p className="text-xs text-gray-500 mb-1">Date</p>
                      <p className="font-semibold text-gray-800">{bookingData.journey.date}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <MdOutlineAirlineSeatReclineNormal className="text-primary text-xl mx-auto mb-2" />
                      <p className="text-xs text-gray-500 mb-1">Seat</p>
                      <p className="font-semibold text-gray-800">{bookingData.ticket.seatNumber}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <FaTicketAlt className="text-primary text-xl mx-auto mb-2" />
                      <p className="text-xs text-gray-500 mb-1">Class</p>
                      <p className="font-semibold text-gray-800">{bookingData.ticket.class}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <FaMapMarkerAlt className="text-primary text-xl mx-auto mb-2" />
                      <p className="text-xs text-gray-500 mb-1">Platform</p>
                      <p className="font-semibold text-gray-800">{bookingData.ticket.platform}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Passenger & Payment Info */}
              <div className="space-y-6">
                {/* Passenger Info */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-primary/5 px-6 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <FaUser className="text-primary" />
                      Passenger Details
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Name</p>
                      <p className="font-semibold text-gray-800">{bookingData.passenger.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Email</p>
                      <p className="font-medium text-gray-700 flex items-center gap-2">
                        <FaEnvelope className="text-gray-400" />
                        {bookingData.passenger.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Phone</p>
                      <p className="font-medium text-gray-700 flex items-center gap-2">
                        <FaPhoneAlt className="text-gray-400" />
                        {bookingData.passenger.phone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-secondary/5 px-6 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800">Payment Summary</h3>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center text-gray-600 mb-2">
                      <span>Ticket Price</span>
                      <span>${bookingData.ticket.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600 mb-2">
                      <span>Service Fee</span>
                      <span>$5.00</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800">Total Paid</span>
                        <span className="font-bold text-xl text-primary">
                          ${(bookingData.ticket.price + 5).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Timeline */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-primary/5 px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800">Booking Timeline</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  {bookingData.timeline.map((item, index) => (
                    <div key={index} className="flex-1 relative">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                            item.completed ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"
                          }`}
                        >
                          {item.completed ? (
                            <FaCheckCircle className="text-xl" />
                          ) : (
                            <FaHourglassHalf className="text-lg" />
                          )}
                        </div>
                        <div className="mt-3 text-center">
                          <p className="font-semibold text-gray-800 text-sm">{item.step}</p>
                          <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                        </div>
                      </div>
                      {index < bookingData.timeline.length - 1 && (
                        <div
                          className={`absolute top-6 left-1/2 w-full h-0.5 ${
                            item.completed ? "bg-green-500" : "bg-gray-200"
                          }`}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Need help with your booking?</p>
          <div className="flex justify-center gap-4">
            <a href="/contact" className="btn btn-outline btn-primary">
              <FaPhoneAlt className="mr-2" />
              Contact Support
            </a>
            <a href="/faq" className="btn btn-ghost text-gray-600">
              View FAQs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackBooking;
