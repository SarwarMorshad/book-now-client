import { useState, useEffect } from "react";
import { FaTicketAlt, FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import api from "../../../services/api";
import Loading from "../../../components/shared/Loading";
import PaymentModal from "../../../components/modals/PaymentModal";
import CountdownTimer from "../../../components/shared/CountdownTimer";
import toast from "react-hot-toast";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
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

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;
    return booking.status === filter;
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

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", "pending", "accepted", "rejected", "paid"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
              filter === status
                ? "bg-gradient-to-r from-primary to-secondary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
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
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(booking.status)}`}
                >
                  {booking.status.toUpperCase()}
                </div>

                {/* Title */}
                <h3 className="absolute bottom-3 left-3 text-white font-bold text-lg">
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
            {filter === "all" ? "You haven't made any bookings yet" : `No ${filter} bookings`}
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
