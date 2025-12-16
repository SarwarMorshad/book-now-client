import { useState, useEffect } from "react";
import {
  FaTicketAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaClipboardList,
  FaCheck,
  FaCreditCard,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
import api from "../../../services/api";
import Loading from "../../../components/shared/Loading";
import PaymentModal from "../../../components/modals/PaymentModal";
import CountdownTimer from "../../../components/shared/CountdownTimer";
import toast from "react-hot-toast";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get("/bookings/my-bookings");
      if (response.data.success) {
        setBookings(response.data.bookings);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  // Check if departure date/time has passed
  const isDeparturePassed = (booking) => {
    if (!booking?.ticket) return false;
    const dateStr = new Date(booking.ticket.departureDate).toISOString().split("T")[0];
    const departureDateTime = new Date(`${dateStr}T${booking.ticket.departureTime}:00`);
    return new Date() > departureDateTime;
  };

  // Stats
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    accepted: bookings.filter((b) => b.status === "accepted").length,
    paid: bookings.filter((b) => b.status === "paid").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
    totalSpent: bookings.filter((b) => b.status === "paid").reduce((sum, b) => sum + b.totalPrice, 0),
  };

  // Filter & Search
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.ticket?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.ticket?.fromLocation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.ticket?.toLocation?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "all" || booking.status === filter;

    return matchesSearch && matchesFilter;
  });

  // Get status badge color
  const getStatusBadge = (status) => {
    const badges = {
      pending: "bg-yellow-100 text-yellow-700",
      accepted: "bg-blue-100 text-blue-700",
      rejected: "bg-red-100 text-red-700",
      paid: "bg-green-100 text-green-700",
    };
    return badges[status] || "bg-gray-100 text-gray-700";
  };

  const handlePayNow = (booking) => {
    if (isDeparturePassed(booking)) {
      toast.error("Cannot pay - departure time has passed");
      return;
    }
    setSelectedBooking(booking);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setSelectedBooking(null);
    fetchBookings();
    toast.success("Payment successful!");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
        <p className="text-gray-600 mt-1">Track your booking requests and payments</p>
      </div>

      {/* Stats Cards - Clickable */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <button
          onClick={() => setFilter("all")}
          className={`bg-white rounded-xl p-4 shadow-md text-left transition-all hover:shadow-lg ${
            filter === "all" ? "ring-2 ring-primary" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaClipboardList className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setFilter("pending")}
          className={`bg-white rounded-xl p-4 shadow-md text-left transition-all hover:shadow-lg ${
            filter === "pending" ? "ring-2 ring-warning" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FaClock className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-warning">{stats.pending}</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setFilter("accepted")}
          className={`bg-white rounded-xl p-4 shadow-md text-left transition-all hover:shadow-lg ${
            filter === "accepted" ? "ring-2 ring-blue-500" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaCheck className="text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{stats.accepted}</p>
              <p className="text-xs text-gray-500">Accepted</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setFilter("paid")}
          className={`bg-white rounded-xl p-4 shadow-md text-left transition-all hover:shadow-lg ${
            filter === "paid" ? "ring-2 ring-success" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FaCreditCard className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-success">{stats.paid}</p>
              <p className="text-xs text-gray-500">Paid</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setFilter("rejected")}
          className={`bg-white rounded-xl p-4 shadow-md text-left transition-all hover:shadow-lg ${
            filter === "rejected" ? "ring-2 ring-error" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <FaTimes className="text-error" />
            </div>
            <div>
              <p className="text-2xl font-bold text-error">{stats.rejected}</p>
              <p className="text-xs text-gray-500">Rejected</p>
            </div>
          </div>
        </button>

        {/* Total Spent Card - Not clickable */}
        <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-4 shadow-md text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <FaTicketAlt className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">${stats.totalSpent}</p>
              <p className="text-xs text-white/80">Total Spent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ticket title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing <span className="font-bold text-primary">{filteredBookings.length}</span> of{" "}
          <span className="font-bold">{bookings.length}</span> bookings
          {filter !== "all" && (
            <span className="ml-2">
              (filtered by <span className="capitalize font-medium">{filter}</span>)
            </span>
          )}
        </p>
      </div>

      {/* Bookings Grid */}
      {filteredBookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Image */}
              <div className="relative h-40">
                <img
                  src={
                    booking.ticket?.imageUrl ||
                    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400"
                  }
                  alt={booking.ticket?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* Status Badge */}
                <div
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(
                    booking.status
                  )}`}
                >
                  {booking.status.toUpperCase()}
                </div>

                {/* Title */}
                <h3 className="absolute bottom-3 left-3 text-white font-bold text-lg pr-4">
                  {booking.ticket?.title}
                </h3>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Route */}
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <FaMapMarkerAlt className="text-primary" />
                  <span>{booking.ticket?.fromLocation}</span>
                  <span>→</span>
                  <span>{booking.ticket?.toLocation}</span>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-400" />
                    <span>
                      {new Date(booking.ticket?.departureDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-gray-400" />
                    <span>{booking.ticket?.departureTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaTicketAlt className="text-gray-400" />
                    <span>{booking.quantity} ticket(s)</span>
                  </div>
                  <div className="font-bold gradient-text text-lg">${booking.totalPrice}</div>
                </div>

                {/* Countdown Timer - Only show if not rejected and not paid */}
                {booking.status !== "rejected" && booking.status !== "paid" && (
                  <div className="mb-4">
                    <CountdownTimer
                      targetDate={booking.ticket?.departureDate}
                      targetTime={booking.ticket?.departureTime}
                    />
                  </div>
                )}

                {/* Action Buttons */}
                {booking.status === "accepted" && (
                  <button
                    onClick={() => handlePayNow(booking)}
                    disabled={isDeparturePassed(booking)}
                    className={`w-full py-3 rounded-xl font-bold transition-all ${
                      isDeparturePassed(booking)
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg"
                    }`}
                  >
                    {isDeparturePassed(booking) ? "Time Passed" : "Pay Now"}
                  </button>
                )}

                {booking.status === "pending" && (
                  <div className="text-center py-3 bg-yellow-50 rounded-xl text-yellow-700 font-medium">
                    ⏳ Waiting for vendor approval
                  </div>
                )}

                {booking.status === "rejected" && (
                  <div className="text-center py-3 bg-red-50 rounded-xl text-red-700 font-medium">
                    ❌ Booking rejected by vendor
                  </div>
                )}

                {booking.status === "paid" && (
                  <div className="text-center py-3 bg-green-50 rounded-xl text-green-700 font-medium">
                    ✅ Payment completed
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTicketAlt className="text-gray-400 text-3xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Bookings Found</h3>
          <p className="text-gray-600">
            {searchTerm || filter !== "all"
              ? "Try adjusting your search or filter"
              : "You haven't made any bookings yet"}
          </p>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedBooking && (
        <PaymentModal
          booking={selectedBooking}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedBooking(null);
          }}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default MyBookings;
