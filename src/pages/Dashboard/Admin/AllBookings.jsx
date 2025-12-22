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
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaStore,
  FaChair,
} from "react-icons/fa";
import api from "../../../services/api";
import Loading from "../../../components/shared/Loading";
import { Helmet } from "react-helmet-async";

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
      pending: {
        bg: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        icon: <FaClock className="text-xs" />,
      },
      accepted: {
        bg: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        icon: <FaCheck className="text-xs" />,
      },
      rejected: {
        bg: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        icon: <FaTimes className="text-xs" />,
      },
      paid: {
        bg: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        icon: <FaCreditCard className="text-xs" />,
      },
    };
    return badges[status] || badges.pending;
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

  const formatShortDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
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
    <>
      <Helmet>
        <title>All Bookings | Book Now</title>
        <meta name="description" content="View and manage all bookings on the Book Now platform" />
      </Helmet>
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">All Bookings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
            View all bookings on the platform
          </p>
        </div>

        {/* Stats Cards - Responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-md text-left transition-all hover:shadow-lg ${
              filter === "all" ? "ring-2 ring-primary" : ""
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                <FaClipboardList className="text-primary text-sm sm:text-base" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {stats.total}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Total</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setFilter("pending")}
            className={`bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-md text-left transition-all hover:shadow-lg ${
              filter === "pending" ? "ring-2 ring-warning" : ""
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg flex items-center justify-center">
                <FaClock className="text-warning text-sm sm:text-base" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-warning">{stats.pending}</p>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Pending</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setFilter("accepted")}
            className={`bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-md text-left transition-all hover:shadow-lg ${
              filter === "accepted" ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                <FaCheck className="text-blue-500 text-sm sm:text-base" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.accepted}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Accepted</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setFilter("paid")}
            className={`bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-md text-left transition-all hover:shadow-lg ${
              filter === "paid" ? "ring-2 ring-success" : ""
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                <FaCreditCard className="text-success text-sm sm:text-base" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-success">{stats.paid}</p>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Paid</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setFilter("rejected")}
            className={`bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-md text-left transition-all hover:shadow-lg ${
              filter === "rejected" ? "ring-2 ring-error" : ""
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 dark:bg-red-900/50 rounded-lg flex items-center justify-center">
                <FaTimes className="text-error text-sm sm:text-base" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-error">{stats.rejected}</p>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Rejected</p>
              </div>
            </div>
          </button>

          {/* Revenue Card - Not clickable */}
          <div className="bg-[#10B981] rounded-xl p-3 sm:p-4 shadow-md text-white col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <FaDollarSign className="text-white text-sm sm:text-base" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold">${stats.totalRevenue}</p>
                <p className="text-[10px] sm:text-xs text-white/80">Revenue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer, ticket, or vendor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Bookings - Responsive: Cards on Mobile, Table on Desktop */}
        {filteredBookings.length > 0 ? (
          <>
            {/* Mobile Card View */}
            <div className="block lg:hidden space-y-4">
              {filteredBookings.map((booking) => {
                const status = getStatusBadge(booking.status);
                return (
                  <div
                    key={booking._id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden"
                  >
                    {/* Card Header - Status */}
                    <div
                      className={`px-4 py-2 flex items-center justify-between ${
                        booking.status === "paid"
                          ? "bg-green-50 dark:bg-green-900/20"
                          : booking.status === "rejected"
                            ? "bg-red-50 dark:bg-red-900/20"
                            : booking.status === "accepted"
                              ? "bg-blue-50 dark:bg-blue-900/20"
                              : "bg-yellow-50 dark:bg-yellow-900/20"
                      }`}
                    >
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${status.bg}`}
                      >
                        {status.icon}
                        {booking.status?.toUpperCase()}
                      </span>
                      <span className="text-xl font-bold gradient-text">${booking.totalPrice}</span>
                    </div>

                    {/* Card Body */}
                    <div className="p-4">
                      {/* Customer Info */}
                      <div className="flex items-center gap-3 mb-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
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
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm truncate">
                            {booking.user?.name || "N/A"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {booking.user?.email}
                          </p>
                        </div>
                      </div>

                      {/* Ticket Info */}
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <FaTicketAlt className="text-primary text-xs" />
                          <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm truncate">
                            {booking.ticket?.title || "N/A"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <FaMapMarkerAlt className="text-gray-400 flex-shrink-0" />
                          <span className="truncate">
                            {booking.ticket?.fromLocation} → {booking.ticket?.toLocation}
                          </span>
                        </div>
                      </div>

                      {/* Vendor Info */}
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
                        <FaStore className="text-gray-400 flex-shrink-0" />
                        <span className="truncate">{booking.ticket?.vendorEmail || "N/A"}</span>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-center">
                          <FaChair className="text-purple-500 text-xs mx-auto mb-1" />
                          <p className="font-bold text-gray-800 dark:text-gray-100 text-sm">
                            {booking.quantity}
                          </p>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400">Qty</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-center">
                          <FaDollarSign className="text-green-500 text-xs mx-auto mb-1" />
                          <p className="font-bold text-gray-800 dark:text-gray-100 text-sm">
                            ${booking.totalPrice}
                          </p>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400">Total</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-center">
                          <FaCalendarAlt className="text-blue-500 text-xs mx-auto mb-1" />
                          <p className="font-bold text-gray-800 dark:text-gray-100 text-[10px]">
                            {formatShortDate(booking.createdAt)}
                          </p>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400">Date</p>
                        </div>
                      </div>

                      {/* Selected Seats */}
                      {booking.selectedSeats && booking.selectedSeats.length > 0 && (
                        <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-xs text-blue-700 dark:text-blue-400">
                            <FaChair className="inline mr-1" />
                            <span className="font-semibold">Seats:</span>{" "}
                            {booking.selectedSeats.sort((a, b) => a - b).join(", ")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Mobile Footer */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Showing <span className="font-bold text-primary">{filteredBookings.length}</span> of{" "}
                  <span className="font-bold">{bookings.length}</span> bookings
                  {filter !== "all" && (
                    <span className="block sm:inline sm:ml-1">
                      (filtered by <span className="capitalize font-medium">{filter}</span>)
                    </span>
                  )}
                </p>
                {filter === "paid" && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
                    Filtered Revenue:{" "}
                    <span className="font-bold text-success">
                      ${filteredBookings.reduce((sum, b) => sum + b.totalPrice, 0)}
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#10B981] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Ticket</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Vendor</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Qty</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Total</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {filteredBookings.map((booking, index) => {
                      const status = getStatusBadge(booking.status);
                      return (
                        <tr
                          key={booking._id}
                          className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                            index % 2 === 0
                              ? "bg-white dark:bg-gray-800"
                              : "bg-gray-50/50 dark:bg-gray-700/50"
                          }`}
                        >
                          {/* Customer */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
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
                                <p className="font-medium text-gray-800 dark:text-gray-100 text-sm">
                                  {booking.user?.name || "N/A"}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {booking.user?.email}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Ticket */}
                          <td className="px-6 py-4">
                            <p className="font-medium text-gray-800 dark:text-gray-100 text-sm">
                              {booking.ticket?.title || "N/A"}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {booking.ticket?.fromLocation} → {booking.ticket?.toLocation}
                            </p>
                          </td>

                          {/* Vendor */}
                          <td className="px-6 py-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {booking.ticket?.vendorEmail || "N/A"}
                            </p>
                          </td>

                          {/* Quantity */}
                          <td className="px-6 py-4">
                            <span className="font-semibold text-gray-800 dark:text-gray-100">
                              {booking.quantity}
                            </span>
                          </td>

                          {/* Total */}
                          <td className="px-6 py-4">
                            <span className="font-bold gradient-text">${booking.totalPrice}</span>
                          </td>

                          {/* Date */}
                          <td className="px-6 py-4">
                            <span className="text-gray-600 dark:text-gray-400 text-sm">
                              {formatDate(booking.createdAt)}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${status.bg}`}
                            >
                              {status.icon}
                              {booking.status?.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex flex-wrap justify-between items-center gap-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing <span className="font-bold text-primary">{filteredBookings.length}</span> of{" "}
                  <span className="font-bold">{bookings.length}</span> bookings
                  {filter !== "all" && (
                    <span className="ml-2">
                      (filtered by <span className="capitalize font-medium">{filter}</span>)
                    </span>
                  )}
                </p>
                {filter === "paid" && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Filtered Revenue:{" "}
                    <span className="font-bold text-success">
                      ${filteredBookings.reduce((sum, b) => sum + b.totalPrice, 0)}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          // Empty State
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 sm:p-12 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTicketAlt className="text-gray-400 text-2xl sm:text-3xl" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              No Bookings Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              {searchTerm || filter !== "all"
                ? "Try adjusting your search or filter"
                : "No bookings on the platform yet"}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default AllBookings;
