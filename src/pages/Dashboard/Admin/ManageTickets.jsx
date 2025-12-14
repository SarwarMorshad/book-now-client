import { useState, useEffect } from "react";
import {
  getAllTicketsAdmin,
  approveTicket,
  rejectTicket,
  toggleAdvertisement,
} from "../../../services/adminService";
import Loading from "../../../components/shared/Loading";
import toast from "react-hot-toast";
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
} from "react-icons/fa";

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [actionLoading, setActionLoading] = useState(null);

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
      toast.error("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (ticketId) => {
    try {
      setActionLoading(ticketId);
      const response = await approveTicket(ticketId);
      if (response.success) {
        toast.success("Ticket approved successfully!");
        fetchTickets();
      }
    } catch (error) {
      console.error("Approve error:", error);
      toast.error(error.response?.data?.message || "Failed to approve ticket");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (ticketId) => {
    try {
      setActionLoading(ticketId);
      const response = await rejectTicket(ticketId);
      if (response.success) {
        toast.success("Ticket rejected");
        fetchTickets();
      }
    } catch (error) {
      console.error("Reject error:", error);
      toast.error(error.response?.data?.message || "Failed to reject ticket");
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleAdvertise = async (ticketId) => {
    try {
      setActionLoading(ticketId);
      const response = await toggleAdvertisement(ticketId);
      if (response.success) {
        toast.success(response.message);
        fetchTickets();
      }
    } catch (error) {
      console.error("Toggle advertise error:", error);
      toast.error(error.response?.data?.message || "Failed to update advertisement");
    } finally {
      setActionLoading(null);
    }
  };

  const getTransportIcon = (type) => {
    const icons = {
      bus: { icon: <FaBus />, color: "text-blue-600" },
      train: { icon: <FaTrain />, color: "text-green-600" },
      launch: { icon: <FaShip />, color: "text-purple-600" },
      plane: { icon: <FaPlane />, color: "text-orange-600" },
    };
    return icons[type] || icons.bus;
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (filter === "all") return true;
    return ticket.verificationStatus === filter;
  });

  const stats = {
    total: tickets.length,
    pending: tickets.filter((t) => t.verificationStatus === "pending").length,
    approved: tickets.filter((t) => t.verificationStatus === "approved").length,
    rejected: tickets.filter((t) => t.verificationStatus === "rejected").length,
    advertised: tickets.filter((t) => t.isAdvertised).length,
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Manage Tickets</h1>
          <p className="text-gray-600 text-lg">Approve, reject, or advertise vendor tickets</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-sm text-gray-600 mb-1">Total Tickets</p>
            <p className="text-3xl font-bold gradient-text">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-sm text-gray-600 mb-1">Approved</p>
            <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-sm text-gray-600 mb-1">Rejected</p>
            <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-sm text-gray-600 mb-1">Advertised</p>
            <p className="text-3xl font-bold text-purple-600">{stats.advertised}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="flex flex-wrap gap-3">
            {["all", "pending", "approved", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  filter === status
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets List */}
        {filteredTickets.length > 0 ? (
          <div className="space-y-4">
            {filteredTickets.map((ticket) => {
              const transportInfo = getTransportIcon(ticket.transportType);
              return (
                <div
                  key={ticket._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Left Side - Ticket Info */}
                      <div className="flex-1 flex gap-4">
                        {/* Ticket Image */}
                        <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                          <img
                            src={
                              ticket.imageUrl ||
                              "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200"
                            }
                            alt={ticket.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Ticket Details */}
                        <div className="flex-1">
                          {/* Title */}
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">{ticket.title}</h3>

                          {/* Transport Type */}
                          <div className={`flex items-center gap-2 mb-4 ${transportInfo.color}`}>
                            <span className="text-xl">{transportInfo.icon}</span>
                            <span className="font-semibold capitalize">{ticket.transportType}</span>
                          </div>

                          {/* Info Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {/* Route */}
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Route</p>
                              <p className="font-semibold text-gray-800">
                                {ticket.fromLocation} → {ticket.toLocation}
                              </p>
                            </div>

                            {/* Price */}
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Price</p>
                              <p className="text-xl font-bold gradient-text">${ticket.price}</p>
                            </div>

                            {/* Seats */}
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Available Seats</p>
                              <p className="font-semibold text-gray-800">{ticket.quantity}</p>
                            </div>

                            {/* Vendor */}
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Vendor</p>
                              <p className="font-semibold text-gray-800">{ticket.vendorName}</p>
                              <p className="text-xs text-gray-500">{ticket.vendorEmail}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Side - Status & Actions */}
                      <div className="lg:w-64 flex flex-col gap-3">
                        {/* Status Badge */}
                        <div className="flex items-center justify-center gap-2 p-3 rounded-lg border-2">
                          {ticket.verificationStatus === "pending" && (
                            <div className="flex items-center gap-2 text-yellow-600 border-yellow-300 bg-yellow-50 w-full justify-center p-2 rounded-lg">
                              <FaClock className="text-lg" />
                              <span className="font-bold">Pending Approval</span>
                            </div>
                          )}
                          {ticket.verificationStatus === "approved" && (
                            <div className="flex items-center gap-2 text-green-600 border-green-300 bg-green-50 w-full justify-center p-2 rounded-lg">
                              <FaCheckCircle className="text-lg" />
                              <span className="font-bold">Approved</span>
                            </div>
                          )}
                          {ticket.verificationStatus === "rejected" && (
                            <div className="flex items-center gap-2 text-red-600 border-red-300 bg-red-50 w-full justify-center p-2 rounded-lg">
                              <FaTimesCircle className="text-lg" />
                              <span className="font-bold">Rejected</span>
                            </div>
                          )}
                        </div>

                        {/* Advertised Badge */}
                        {ticket.isAdvertised && (
                          <div className="flex items-center justify-center gap-2 bg-purple-50 text-purple-700 p-2 rounded-lg border-2 border-purple-300">
                            <FaStar />
                            <span className="font-semibold">Advertised</span>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="space-y-2">
                          {ticket.verificationStatus === "pending" && (
                            <>
                              <button
                                onClick={() => handleApprove(ticket._id)}
                                disabled={actionLoading === ticket._id}
                                className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                              >
                                {actionLoading === ticket._id ? (
                                  <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                  <>
                                    <FaCheckCircle />
                                    Approve
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() => handleReject(ticket._id)}
                                disabled={actionLoading === ticket._id}
                                className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                              >
                                <FaTimesCircle />
                                Reject
                              </button>
                            </>
                          )}

                          {ticket.verificationStatus === "approved" && (
                            <button
                              onClick={() => handleToggleAdvertise(ticket._id)}
                              disabled={actionLoading === ticket._id}
                              className={`w-full px-4 py-3 font-semibold rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 ${
                                ticket.isAdvertised
                                  ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700"
                                  : "bg-white border-2 border-purple-500 text-purple-600 hover:bg-purple-50"
                              }`}
                            >
                              {ticket.isAdvertised ? <FaStar /> : <FaRegStar />}
                              {ticket.isAdvertised ? "Remove from Ads" : "Advertise This"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No tickets found</h3>
            <p className="text-gray-600 mb-6">
              {filter === "all" ? "No tickets available" : `No ${filter} tickets`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTickets;
