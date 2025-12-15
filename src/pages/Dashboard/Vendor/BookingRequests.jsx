import { useState, useEffect } from "react";
import { FaCheck, FaTimes, FaUser, FaTicketAlt } from "react-icons/fa";
import api from "../../../services/api";
import Loading from "../../../components/shared/Loading";
import toast from "react-hot-toast";

const BookingRequests = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchBookingRequests();
  }, []);

  const fetchBookingRequests = async () => {
    try {
      setLoading(true);
      const response = await api.get("/bookings/vendor");
      if (response.data.success) {
        setBookings(response.data.bookings);
      }
    } catch (error) {
      console.error("Error fetching booking requests:", error);
      toast.error("Failed to load booking requests");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (bookingId) => {
    try {
      setActionLoading(bookingId);
      const response = await api.patch(`/bookings/${bookingId}/accept`);

      if (response.data.success) {
        toast.success("Booking accepted successfully");
        // Update local state
        setBookings(bookings.map((b) => (b._id === bookingId ? { ...b, status: "accepted" } : b)));
      }
    } catch (error) {
      console.error("Accept error:", error);
      toast.error(error.response?.data?.message || "Failed to accept booking");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (bookingId) => {
    try {
      setActionLoading(bookingId);
      const response = await api.patch(`/bookings/${bookingId}/reject`);

      if (response.data.success) {
        toast.success("Booking rejected");
        // Update local state
        setBookings(bookings.map((b) => (b._id === bookingId ? { ...b, status: "rejected" } : b)));
      }
    } catch (error) {
      console.error("Reject error:", error);
      toast.error(error.response?.data?.message || "Failed to reject booking");
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: "bg-yellow-100 text-yellow-700",
      accepted: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
      paid: "bg-blue-100 text-blue-700",
    };
    return badges[status] || "bg-gray-100 text-gray-700";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Booking Requests</h1>
        <p className="text-gray-600 mt-1">Manage customer booking requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <p className="text-sm text-gray-500">Total Requests</p>
          <p className="text-2xl font-bold text-gray-800">{bookings.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {bookings.filter((b) => b.status === "pending").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md">
          <p className="text-sm text-gray-500">Accepted</p>
          <p className="text-2xl font-bold text-green-600">
            {bookings.filter((b) => b.status === "accepted").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md">
          <p className="text-sm text-gray-500">Paid</p>
          <p className="text-2xl font-bold text-blue-600">
            {bookings.filter((b) => b.status === "paid").length}
          </p>
        </div>
      </div>

      {/* Bookings Table */}
      {bookings.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-primary to-secondary text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Ticket</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Total Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((booking, index) => (
                  <tr
                    key={booking._id}
                    className={`hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    }`}
                  >
                    {/* Customer */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                          {booking.user?.photoURL ? (
                            <img
                              src={booking.user.photoURL}
                              alt={booking.user.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FaUser className="text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{booking.user?.name || "Customer"}</p>
                          <p className="text-sm text-gray-500">{booking.user?.email || "N/A"}</p>
                        </div>
                      </div>
                    </td>

                    {/* Ticket */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{booking.ticket?.title || "N/A"}</p>
                      <p className="text-sm text-gray-500">
                        {booking.ticket?.fromLocation} → {booking.ticket?.toLocation}
                      </p>
                    </td>

                    {/* Quantity */}
                    <td className="px-6 py-4">
                      <span className="font-semibold">{booking.quantity}</span>
                    </td>

                    {/* Total Price */}
                    <td className="px-6 py-4">
                      <span className="font-bold gradient-text text-lg">${booking.totalPrice}</span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4">
                      <span className="text-gray-600">{formatDate(booking.createdAt)}</span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(
                          booking.status
                        )}`}
                      >
                        {booking.status?.toUpperCase()}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      {booking.status === "pending" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAccept(booking._id)}
                            disabled={actionLoading === booking._id}
                            className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all disabled:opacity-50"
                          >
                            {actionLoading === booking._id ? (
                              <span className="loading loading-spinner loading-xs"></span>
                            ) : (
                              <>
                                <FaCheck />
                                Accept
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => handleReject(booking._id)}
                            disabled={actionLoading === booking._id}
                            className="flex items-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all disabled:opacity-50"
                          >
                            <FaTimes />
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTicketAlt className="text-gray-400 text-3xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Booking Requests</h3>
          <p className="text-gray-600">Booking requests from customers will appear here</p>
        </div>
      )}
    </div>
  );
};

export default BookingRequests;
