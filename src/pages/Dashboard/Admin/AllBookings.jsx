import { useState, useEffect } from "react";
import {
  FaUser,
  FaTicketAlt,
  FaSearch,
  FaClipboardList,
  FaClock,
  FaCheck,
  FaCreditCard,
  FaTimes,
  FaDollarSign,
} from "react-icons/fa";
import api from "../../../services/api";
import Loading from "../../../components/shared/Loading";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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

  // Calculate stats
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    accepted: bookings.filter((b) => b.status === "accepted").length,
    paid: bookings.filter((b) => b.status === "paid").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
    totalRevenue: bookings.filter((b) => b.status === "paid").reduce((sum, b) => sum + b.totalPrice, 0),
  };

  // Filter & Search
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.ticket?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.ticket?.vendorEmail?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "all" || booking.status === filter;

    return matchesSearch && matchesFilter;
  });

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

        {/* Revenue Card - Not clickable */}
        <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-4 shadow-md text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <FaDollarSign className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">${stats.totalRevenue}</p>
              <p className="text-xs text-white/80">Revenue</p>
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
            placeholder="Search by customer, ticket, or vendor..."
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

          {/* Table Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-wrap justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              Showing <span className="font-bold text-primary">{filteredBookings.length}</span> of{" "}
              <span className="font-bold">{bookings.length}</span> bookings
              {filter !== "all" && (
                <span className="ml-2">
                  (filtered by <span className="capitalize font-medium">{filter}</span>)
                </span>
              )}
            </p>
            {filter === "paid" && (
              <p className="text-sm text-gray-600">
                Filtered Revenue:{" "}
                <span className="font-bold text-success">
                  ${filteredBookings.reduce((sum, b) => sum + b.totalPrice, 0)}
                </span>
              </p>
            )}
          </div>
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
              : "No bookings on the platform yet"}
          </p>
        </div>
      )}
    </div>
  );
};

export default AllBookings;
