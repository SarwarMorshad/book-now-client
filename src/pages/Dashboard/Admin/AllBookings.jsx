import { useState, useEffect } from "react";
import { FaUser, FaTicketAlt, FaFilter } from "react-icons/fa";
import api from "../../../services/api";
import Loading from "../../../components/shared/Loading";
import toast from "react-hot-toast";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const fetchAllBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/bookings");
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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Filter bookings
  const filteredBookings = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  // Calculate stats
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    accepted: bookings.filter((b) => b.status === "accepted").length,
    paid: bookings.filter((b) => b.status === "paid").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
    totalRevenue: bookings.filter((b) => b.status === "paid").reduce((sum, b) => sum + b.totalPrice, 0),
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">All Bookings</h1>
        <p className="text-gray-600 mt-1">View all bookings on the platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-md text-center">
          <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          <p className="text-sm text-gray-500">Total</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 shadow-md text-center">
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          <p className="text-sm text-yellow-700">Pending</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 shadow-md text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.accepted}</p>
          <p className="text-sm text-blue-700">Accepted</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 shadow-md text-center">
          <p className="text-2xl font-bold text-green-600">{stats.paid}</p>
          <p className="text-sm text-green-700">Paid</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 shadow-md text-center">
          <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
          <p className="text-sm text-red-700">Rejected</p>
        </div>
        <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-4 shadow-md text-center text-white">
          <p className="text-2xl font-bold">${stats.totalRevenue}</p>
          <p className="text-sm text-white/80">Revenue</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", "pending", "accepted", "paid", "rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
              filter === status
                ? "bg-gradient-to-r from-primary to-secondary text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Bookings Table */}
      {filteredBookings.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-primary to-secondary text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Ticket</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Vendor</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Qty</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
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
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                          {booking.user?.photoURL ? (
                            <img
                              src={booking.user.photoURL}
                              alt={booking.user.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FaUser className="text-gray-400 text-sm" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{booking.user?.name || "N/A"}</p>
                          <p className="text-xs text-gray-500">{booking.user?.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Ticket */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800 text-sm">{booking.ticket?.title || "N/A"}</p>
                      <p className="text-xs text-gray-500">
                        {booking.ticket?.fromLocation} → {booking.ticket?.toLocation}
                      </p>
                    </td>

                    {/* Vendor */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{booking.ticket?.vendorEmail || "N/A"}</p>
                    </td>

                    {/* Quantity */}
                    <td className="px-6 py-4">
                      <span className="font-semibold">{booking.quantity}</span>
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4">
                      <span className="font-bold gradient-text">${booking.totalPrice}</span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4">
                      <span className="text-gray-600 text-sm">{formatDate(booking.createdAt)}</span>
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
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Bookings Found</h3>
          <p className="text-gray-600">
            {filter === "all" ? "No bookings on the platform yet" : `No ${filter} bookings`}
          </p>
        </div>
      )}
    </div>
  );
};

export default AllBookings;
