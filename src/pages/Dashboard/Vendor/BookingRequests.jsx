import { useState, useEffect } from "react";
import {
  FaCheck,
  FaTimes,
  FaUser,
  FaTicketAlt,
  FaClock,
  FaCreditCard,
  FaSearch,
  FaClipboardList,
} from "react-icons/fa";
import api from "../../../services/api";
import Loading from "../../../components/shared/Loading";
import ConfirmModal from "../../../components/modals/ConfirmModal";
import ResultModal from "../../../components/modals/ResultModal";
import { Helmet } from "react-helmet-async";

const BookingRequests = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "question",
    confirmText: "",
    onConfirm: null,
  });

  const [resultModal, setResultModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetchBookingRequests();
  }, []);

  const fetchBookingRequests = async () => {
    try {
      setLoading(true);
      const response = await api.get("/bookings/vendor/requests");
      if (response.data.success) {
        setBookings(response.data.bookings);
      }
    } catch (error) {
      console.error("Error fetching booking requests:", error);
    } finally {
      setLoading(false);
    }
  };

  // Stats
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    accepted: bookings.filter((b) => b.status === "accepted").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
    paid: bookings.filter((b) => b.status === "paid").length,
  };

  // Filter & Search
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.ticket?.title?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "all" || booking.status === filter;

    return matchesSearch && matchesFilter;
  });

  const handleAccept = (booking) => {
    setConfirmModal({
      isOpen: true,
      title: "Accept Booking?",
      message: (
        <div>
          <p>
            Accept booking request from <strong>{booking.user?.name || "Customer"}</strong>?
          </p>
          <div className="mt-3 p-3 bg-blue-50 rounded-xl text-sm">
            <p className="font-semibold text-blue-800">{booking.ticket?.title}</p>
            <p className="text-blue-600">
              {booking.quantity} ticket(s) × ${booking.ticket?.price} = ${booking.totalPrice}
            </p>
          </div>
        </div>
      ),
      type: "question",
      confirmText: "Yes, Accept",
      onConfirm: async () => {
        try {
          setActionLoading(booking._id);
          const response = await api.patch(`/bookings/${booking._id}/accept`);

          if (response.data.success) {
            setBookings(bookings.map((b) => (b._id === booking._id ? { ...b, status: "accepted" } : b)));
            setConfirmModal({ ...confirmModal, isOpen: false });
            setResultModal({
              isOpen: true,
              title: "Booking Accepted!",
              message: "Customer can now proceed with payment.",
              type: "success",
            });
          }
        } catch (error) {
          console.error("Accept error:", error);
          setConfirmModal({ ...confirmModal, isOpen: false });
          setResultModal({
            isOpen: true,
            title: "Error!",
            message: error.response?.data?.message || "Failed to accept booking",
            type: "error",
          });
        } finally {
          setActionLoading(null);
        }
      },
    });
  };

  const handleReject = (booking) => {
    setConfirmModal({
      isOpen: true,
      title: "Reject Booking?",
      message: (
        <div>
          <p>
            Are you sure you want to reject this booking from{" "}
            <strong>{booking.user?.name || "Customer"}</strong>?
          </p>
          <div className="mt-3 p-3 bg-red-50 rounded-xl text-sm">
            <p className="font-semibold text-red-800">{booking.ticket?.title}</p>
            <p className="text-red-600">
              {booking.quantity} ticket(s) - ${booking.totalPrice}
            </p>
          </div>
        </div>
      ),
      type: "danger",
      confirmText: "Yes, Reject",
      onConfirm: async () => {
        try {
          setActionLoading(booking._id);
          const response = await api.patch(`/bookings/${booking._id}/reject`);

          if (response.data.success) {
            setBookings(bookings.map((b) => (b._id === booking._id ? { ...b, status: "rejected" } : b)));
            setConfirmModal({ ...confirmModal, isOpen: false });
            setResultModal({
              isOpen: true,
              title: "Booking Rejected",
              message: "The booking request has been rejected.",
              type: "success",
            });
          }
        } catch (error) {
          console.error("Reject error:", error);
          setConfirmModal({ ...confirmModal, isOpen: false });
          setResultModal({
            isOpen: true,
            title: "Error!",
            message: error.response?.data?.message || "Failed to reject booking",
            type: "error",
          });
        } finally {
          setActionLoading(null);
        }
      },
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: "bg-yellow-100 text-yellow-700",
      accepted: "bg-blue-100 text-blue-700",
      rejected: "bg-red-100 text-red-700",
      paid: "bg-green-100 text-green-700",
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
    <>
      <Helmet>
        <title>Booking Requests | Book Now</title>
        <meta
          name="description"
          content="Manage and respond to booking requests from customers on Book Now"
        />
      </Helmet>
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Booking Requests</h1>
          <p className="text-gray-600 mt-1">Manage customer booking requests</p>
        </div>

        {/* Stats Cards - Clickable */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
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
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer name, email or ticket..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Bookings Table */}
        {filteredBookings.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#10B981] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Ticket</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Qty</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Total</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredBookings.map((booking, index) => (
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
                              onClick={() => handleAccept(booking)}
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
                              onClick={() => handleReject(booking)}
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

            {/* Table Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
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
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTicketAlt className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Booking Requests</h3>
            <p className="text-gray-600">
              {filter === "all"
                ? "Booking requests from customers will appear here"
                : `No ${filter} bookings found`}
            </p>
          </div>
        )}

        {/* Confirm Modal */}
        <ConfirmModal
          isOpen={confirmModal.isOpen}
          onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
          onConfirm={confirmModal.onConfirm}
          title={confirmModal.title}
          message={confirmModal.message}
          type={confirmModal.type}
          confirmText={confirmModal.confirmText}
          loading={actionLoading !== null}
        />

        {/* Result Modal */}
        <ResultModal
          isOpen={resultModal.isOpen}
          onClose={() => setResultModal({ ...resultModal, isOpen: false })}
          title={resultModal.title}
          message={resultModal.message}
          type={resultModal.type}
        />
      </div>
    </>
  );
};

export default BookingRequests;
