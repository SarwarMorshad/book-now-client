import { useState, useEffect } from "react";
import {
  getAllTicketsAdmin,
  approveTicket,
  rejectTicket,
  toggleAdvertisement,
} from "../../../services/adminService";
import Loading from "../../../components/shared/Loading";
import ConfirmModal from "../../../components/modals/ConfirmModal";
import ResultModal from "../../../components/modals/ResultModal";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaStar,
  FaRegStar,
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaSearch,
  FaTicketAlt,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

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
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await getAllTicketsAdmin();
      if (response.success) {
        setTickets(response.tickets);
      }
    } catch (error) {
      console.error("Fetch tickets error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = (ticket) => {
    setConfirmModal({
      isOpen: true,
      title: "Approve Ticket?",
      message: (
        <div>
          <p>
            Are you sure you want to approve <strong>{ticket.title}</strong>?
          </p>
          <div className="mt-3 p-3 bg-green-50 rounded-xl text-sm">
            <p className="text-green-700">
              This ticket will be visible to all users and available for booking.
            </p>
          </div>
        </div>
      ),
      type: "success",
      confirmText: "Yes, Approve",
      onConfirm: async () => {
        try {
          setActionLoading(ticket._id);
          const response = await approveTicket(ticket._id);
          if (response.success) {
            setTickets(
              tickets.map((t) => (t._id === ticket._id ? { ...t, verificationStatus: "approved" } : t))
            );
            setConfirmModal({ ...confirmModal, isOpen: false });
            setResultModal({
              isOpen: true,
              title: "Ticket Approved!",
              message: "The ticket is now live and available for booking.",
              type: "success",
            });
          }
        } catch (error) {
          console.error("Approve error:", error);
          setConfirmModal({ ...confirmModal, isOpen: false });
          setResultModal({
            isOpen: true,
            title: "Error!",
            message: error.response?.data?.message || "Failed to approve ticket",
            type: "error",
          });
        } finally {
          setActionLoading(null);
        }
      },
    });
  };

  const handleReject = (ticket) => {
    setConfirmModal({
      isOpen: true,
      title: "Reject Ticket?",
      message: (
        <div>
          <p>
            Are you sure you want to reject <strong className="text-error">{ticket.title}</strong>?
          </p>
          <div className="mt-3 p-3 bg-red-50 rounded-xl text-sm">
            <p className="text-red-700">
              This ticket will be hidden from users and the vendor will be notified.
            </p>
          </div>
        </div>
      ),
      type: "danger",
      confirmText: "Yes, Reject",
      onConfirm: async () => {
        try {
          setActionLoading(ticket._id);
          const response = await rejectTicket(ticket._id);
          if (response.success) {
            setTickets(
              tickets.map((t) =>
                t._id === ticket._id ? { ...t, verificationStatus: "rejected", isAdvertised: false } : t
              )
            );
            setConfirmModal({ ...confirmModal, isOpen: false });
            setResultModal({
              isOpen: true,
              title: "Ticket Rejected",
              message: "The ticket has been rejected.",
              type: "success",
            });
          }
        } catch (error) {
          console.error("Reject error:", error);
          setConfirmModal({ ...confirmModal, isOpen: false });
          setResultModal({
            isOpen: true,
            title: "Error!",
            message: error.response?.data?.message || "Failed to reject ticket",
            type: "error",
          });
        } finally {
          setActionLoading(null);
        }
      },
    });
  };

  const handleToggleAdvertise = async (ticket) => {
    const isCurrentlyAdvertised = ticket.isAdvertised;
    const advertisedCount = tickets.filter((t) => t.isAdvertised).length;

    // Check limit when trying to advertise
    if (!isCurrentlyAdvertised && advertisedCount >= 6) {
      setResultModal({
        isOpen: true,
        title: "Limit Reached!",
        message: "Maximum 6 tickets can be advertised at a time. Please remove one first.",
        type: "error",
      });
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: isCurrentlyAdvertised ? "Remove from Ads?" : "Advertise Ticket?",
      message: (
        <div>
          <p>
            {isCurrentlyAdvertised
              ? `Remove "${ticket.title}" from advertised section?`
              : `Add "${ticket.title}" to advertised section on homepage?`}
          </p>
          {!isCurrentlyAdvertised && (
            <div className="mt-3 p-3 bg-purple-50 rounded-xl text-sm">
              <p className="text-purple-700">Currently {advertisedCount}/6 tickets are advertised.</p>
            </div>
          )}
        </div>
      ),
      type: "question",
      confirmText: isCurrentlyAdvertised ? "Yes, Remove" : "Yes, Advertise",
      onConfirm: async () => {
        try {
          setActionLoading(ticket._id);
          const response = await toggleAdvertisement(ticket._id);
          if (response.success) {
            setTickets(
              tickets.map((t) => (t._id === ticket._id ? { ...t, isAdvertised: !t.isAdvertised } : t))
            );
            setConfirmModal({ ...confirmModal, isOpen: false });
            setResultModal({
              isOpen: true,
              title: isCurrentlyAdvertised ? "Removed from Ads" : "Ticket Advertised!",
              message: isCurrentlyAdvertised
                ? "The ticket has been removed from the advertised section."
                : "The ticket is now featured on the homepage.",
              type: "success",
            });
          }
        } catch (error) {
          console.error("Toggle advertise error:", error);
          setConfirmModal({ ...confirmModal, isOpen: false });
          setResultModal({
            isOpen: true,
            title: "Error!",
            message: error.response?.data?.message || "Failed to update advertisement",
            type: "error",
          });
        } finally {
          setActionLoading(null);
        }
      },
    });
  };

  const getTransportIcon = (type) => {
    const icons = {
      bus: <FaBus className="text-blue-500" />,
      train: <FaTrain className="text-green-500" />,
      launch: <FaShip className="text-cyan-500" />,
      plane: <FaPlane className="text-purple-500" />,
    };
    return icons[type] || <FaBus className="text-gray-500" />;
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: {
        bg: "bg-yellow-100 text-yellow-700",
        icon: <FaClock className="text-xs" />,
      },
      approved: {
        bg: "bg-green-100 text-green-700",
        icon: <FaCheck className="text-xs" />,
      },
      rejected: {
        bg: "bg-red-100 text-red-700",
        icon: <FaTimes className="text-xs" />,
      },
    };
    return badges[status] || badges.pending;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Stats
  const stats = {
    total: tickets.length,
    pending: tickets.filter((t) => t.verificationStatus === "pending").length,
    approved: tickets.filter((t) => t.verificationStatus === "approved").length,
    rejected: tickets.filter((t) => t.verificationStatus === "rejected").length,
    advertised: tickets.filter((t) => t.isAdvertised).length,
  };

  // Filter & Search
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.fromLocation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.toLocation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.vendorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.vendorEmail?.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesFilter = true;
    if (filter === "all") {
      matchesFilter = true;
    } else if (filter === "advertised") {
      matchesFilter = ticket.isAdvertised === true;
    } else {
      matchesFilter = ticket.verificationStatus === filter;
    }

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Tickets</h1>
        <p className="text-gray-600 mt-1">Approve, reject, or advertise vendor tickets</p>
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
              <FaTicketAlt className="text-primary" />
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
          onClick={() => setFilter("approved")}
          className={`bg-white rounded-xl p-4 shadow-md text-left transition-all hover:shadow-lg ${
            filter === "approved" ? "ring-2 ring-success" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FaCheckCircle className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-success">{stats.approved}</p>
              <p className="text-xs text-gray-500">Approved</p>
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
              <FaTimesCircle className="text-error" />
            </div>
            <div>
              <p className="text-2xl font-bold text-error">{stats.rejected}</p>
              <p className="text-xs text-gray-500">Rejected</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setFilter("advertised")}
          className={`bg-white rounded-xl p-4 shadow-md text-left transition-all hover:shadow-lg ${
            filter === "advertised" ? "ring-2 ring-purple-500" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FaStar className="text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{stats.advertised}</p>
              <p className="text-xs text-gray-500">Advertised</p>
            </div>
          </div>
        </button>

        {/* Advertise Limit Indicator */}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, location, or vendor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Tickets Table */}
      {filteredTickets.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-primary to-secondary text-white">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Ticket</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Route</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Type</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Vendor</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Price</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Seats</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTickets.map((ticket, index) => {
                  const status = getStatusBadge(ticket.verificationStatus);
                  return (
                    <tr
                      key={ticket._id}
                      className={`hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      {/* Ticket Info */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src={
                                ticket.imageUrl ||
                                "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100"
                              }
                              alt={ticket.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-800 truncate max-w-[180px]">
                              {ticket.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              {ticket.isAdvertised && (
                                <span className="inline-flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                  <FaStar className="text-[10px]" /> Advertised
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Route */}
                      <td className="px-4 py-4">
                        <div className="text-sm">
                          <p className="text-gray-800 font-medium">{ticket.fromLocation}</p>
                          <p className="text-gray-400">↓</p>
                          <p className="text-gray-800 font-medium">{ticket.toLocation}</p>
                        </div>
                      </td>

                      {/* Transport Type */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          {getTransportIcon(ticket.transportType)}
                          <span className="capitalize text-sm">{ticket.transportType}</span>
                        </div>
                      </td>

                      {/* Vendor */}
                      <td className="px-4 py-4">
                        <div className="text-sm">
                          <p className="font-medium text-gray-800">{ticket.vendorName}</p>
                          <p className="text-gray-500 text-xs truncate max-w-[150px]">{ticket.vendorEmail}</p>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-4 py-4">
                        <span className="font-bold text-lg gradient-text">${ticket.price}</span>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-4">
                        <div className="text-sm">
                          <p className="text-gray-800">{formatDate(ticket.departureDate)}</p>
                          <p className="text-gray-500">{ticket.departureTime}</p>
                        </div>
                      </td>

                      {/* Seats */}
                      <td className="px-4 py-4">
                        <span className="font-semibold">{ticket.quantity}</span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${status.bg}`}
                        >
                          {status.icon}
                          {ticket.verificationStatus?.toUpperCase()}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          {ticket.verificationStatus === "pending" && (
                            <>
                              <button
                                onClick={() => handleApprove(ticket)}
                                disabled={actionLoading === ticket._id}
                                className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all text-sm disabled:opacity-50"
                              >
                                <FaCheckCircle className="text-xs" />
                                Approve
                              </button>
                              <button
                                onClick={() => handleReject(ticket)}
                                disabled={actionLoading === ticket._id}
                                className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all text-sm disabled:opacity-50"
                              >
                                <FaTimesCircle className="text-xs" />
                                Reject
                              </button>
                            </>
                          )}

                          {ticket.verificationStatus === "approved" && (
                            <button
                              onClick={() => handleToggleAdvertise(ticket)}
                              disabled={actionLoading === ticket._id}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all text-sm disabled:opacity-50 ${
                                ticket.isAdvertised
                                  ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {ticket.isAdvertised ? (
                                <>
                                  <FaStar className="text-xs" />
                                  Remove Ad
                                </>
                              ) : (
                                <>
                                  <FaRegStar className="text-xs" />
                                  Advertise
                                </>
                              )}
                            </button>
                          )}

                          {ticket.verificationStatus === "rejected" && (
                            <span className="text-gray-400 text-sm">—</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-bold text-primary">{filteredTickets.length}</span> of{" "}
              <span className="font-bold">{tickets.length}</span> tickets
              {filter !== "all" && (
                <span className="ml-2">
                  (filtered by{" "}
                  <span className="capitalize font-medium">
                    {filter === "advertised" ? "⭐ Advertised" : filter}
                  </span>
                  )
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
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Tickets Found</h3>
          <p className="text-gray-600">
            {searchTerm || filter !== "all" ? "Try adjusting your search or filter" : "No tickets available"}
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
  );
};

export default ManageTickets;
