import { useState, useEffect } from "react";

import Loading from "../../../components/shared/Loading";
import toast from "react-hot-toast";
import {
  FaTicketAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaDollarSign,
} from "react-icons/fa";
import { getUserBookings } from "../../../services/bookingService";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, accepted, rejected, paid

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await getUserBookings();
      if (response.success) {
        setBookings(response.bookings);
      }
    } catch (error) {
      console.error("Fetch bookings error:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: {
        color: "badge-warning",
        icon: <FaHourglassHalf />,
        text: "Pending",
      },
      accepted: {
        color: "badge-info",
        icon: <FaCheckCircle />,
        text: "Accepted",
      },
      rejected: {
        color: "badge-error",
        icon: <FaTimesCircle />,
        text: "Rejected",
      },
      paid: { color: "badge-success", icon: <FaCheckCircle />, text: "Paid" },
    };
    return badges[status] || badges.pending;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;
    return booking.status === filter;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    accepted: bookings.filter((b) => b.status === "accepted").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
    paid: bookings.filter((b) => b.status === "paid").length,
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">My Bookings</span>
          </h1>
          <p className="text-gray-600">View and manage your ticket bookings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-500">
            <p className="text-sm text-gray-600">Total Bookings</p>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-yellow-500">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-400">
            <p className="text-sm text-gray-600">Accepted</p>
            <p className="text-2xl font-bold text-blue-600">{stats.accepted}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-red-500">
            <p className="text-sm text-gray-600">Rejected</p>
            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-green-500">
            <p className="text-sm text-gray-600">Paid</p>
            <p className="text-2xl font-bold text-green-600">{stats.paid}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {["all", "pending", "accepted", "rejected", "paid"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`btn btn-sm ${filter === status ? "btn-primary" : "btn-outline"}`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredBookings.map((booking) => {
              const statusBadge = getStatusBadge(booking.status);
              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left - Ticket Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{booking.ticket.title}</h3>
                          <div className="flex items-center gap-2 text-gray-600 mb-2">
                            <FaMapMarkerAlt className="text-primary" />
                            <span>
                              {booking.ticket.fromLocation} → {booking.ticket.toLocation}
                            </span>
                          </div>
                        </div>
                        <div className={`badge ${statusBadge.color} gap-1 text-white`}>
                          {statusBadge.icon}
                          {statusBadge.text}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 mb-1">Departure</p>
                          <p className="font-semibold flex items-center gap-1">
                            <FaCalendarAlt className="text-primary" />
                            {formatDate(booking.ticket.departureDate)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Time</p>
                          <p className="font-semibold flex items-center gap-1">
                            <FaClock className="text-secondary" />
                            {booking.ticket.departureTime}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Tickets</p>
                          <p className="font-semibold">{booking.quantity} seats</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Total Price</p>
                          <p className="font-bold text-primary text-lg">${booking.totalPrice}</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">Booked on: {formatDate(booking.createdAt)}</p>
                      </div>
                    </div>

                    {/* Right - Action Button */}
                    <div className="flex items-center">
                      {booking.status === "accepted" && (
                        <button className="btn btn-success text-white gap-2">
                          <FaDollarSign />
                          Pay Now
                        </button>
                      )}
                      {booking.status === "pending" && (
                        <div className="text-center p-4 bg-yellow-50 rounded-xl">
                          <FaHourglassHalf className="text-3xl text-yellow-500 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Waiting for vendor approval</p>
                        </div>
                      )}
                      {booking.status === "rejected" && (
                        <div className="text-center p-4 bg-red-50 rounded-xl">
                          <FaTimesCircle className="text-3xl text-red-500 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Booking declined</p>
                        </div>
                      )}
                      {booking.status === "paid" && (
                        <div className="text-center p-4 bg-green-50 rounded-xl">
                          <FaCheckCircle className="text-3xl text-green-500 mx-auto mb-2" />
                          <p className="text-sm font-semibold text-green-700">Payment Complete</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <div className="text-6xl mb-4">🎫</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-6">
              {filter === "all" ? "You haven't booked any tickets yet" : `No ${filter} bookings`}
            </p>
            <a href="/all-tickets" className="btn btn-primary text-white">
              <FaTicketAlt />
              Browse Tickets
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
