import { useState, useEffect } from "react";
import {
  getAllTicketsAdmin,
  approveTicket,
  rejectTicket,
  toggleAdvertisement,
} from "../../services/adminService";
import Loading from "../../components/shared/Loading";
import toast from "react-hot-toast";
import { FaCheckCircle, FaTimesCircle, FaEye, FaClock, FaStar, FaRegStar } from "react-icons/fa";

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected
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

  const getStatusBadge = (status) => {
    const badges = {
      pending: { color: "badge-warning", icon: <FaClock />, text: "Pending" },
      approved: { color: "badge-success", icon: <FaCheckCircle />, text: "Approved" },
      rejected: { color: "badge-error", icon: <FaTimesCircle />, text: "Rejected" },
    };
    return badges[status] || badges.pending;
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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Manage Tickets</span>
          </h1>
          <p className="text-gray-600">Approve, reject, or advertise tickets</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-500">
            <p className="text-sm text-gray-600">Total Tickets</p>
            <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-yellow-500">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-green-500">
            <p className="text-sm text-gray-600">Approved</p>
            <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-red-500">
            <p className="text-sm text-gray-600">Rejected</p>
            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-purple-500">
            <p className="text-sm text-gray-600">Advertised</p>
            <p className="text-2xl font-bold text-purple-600">{stats.advertised}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {["all", "pending", "approved", "rejected"].map((status) => (
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

        {/* Tickets Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {filteredTickets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th>Ticket Info</th>
                    <th>Route</th>
                    <th>Price</th>
                    <th>Seats</th>
                    <th>Vendor</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((ticket) => {
                    const statusBadge = getStatusBadge(ticket.verificationStatus);
                    return (
                      <tr key={ticket._id} className="hover:bg-gray-50">
                        {/* Ticket Info */}
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="w-12 h-12 rounded-lg">
                                <img
                                  src={ticket.imageUrl || "https://via.placeholder.com/100?text=Ticket"}
                                  alt={ticket.title}
                                />
                              </div>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{ticket.title}</p>
                              <p className="text-sm text-gray-500">{ticket.transportType}</p>
                            </div>
                          </div>
                        </td>

                        {/* Route */}
                        <td>
                          <p className="text-sm">
                            {ticket.fromLocation} → {ticket.toLocation}
                          </p>
                        </td>

                        {/* Price */}
                        <td>
                          <p className="font-bold text-primary">${ticket.price}</p>
                        </td>

                        {/* Seats */}
                        <td>
                          <p className="text-sm">{ticket.quantity} seats</p>
                        </td>

                        {/* Vendor */}
                        <td>
                          <p className="text-sm font-medium">{ticket.vendorName}</p>
                          <p className="text-xs text-gray-500">{ticket.vendorEmail}</p>
                        </td>

                        {/* Status */}
                        <td>
                          <div className={`badge ${statusBadge.color} gap-1 text-white`}>
                            {statusBadge.icon}
                            {statusBadge.text}
                          </div>
                          {ticket.isAdvertised && (
                            <div className="badge badge-sm badge-secondary mt-1">
                              <FaStar className="mr-1" />
                              Advertised
                            </div>
                          )}
                        </td>

                        {/* Actions */}
                        <td>
                          <div className="flex flex-col gap-2">
                            {ticket.verificationStatus === "pending" && (
                              <>
                                <button
                                  onClick={() => handleApprove(ticket._id)}
                                  className="btn btn-success btn-xs text-white"
                                  disabled={actionLoading === ticket._id}
                                >
                                  {actionLoading === ticket._id ? (
                                    <span className="loading loading-spinner loading-xs"></span>
                                  ) : (
                                    <>
                                      <FaCheckCircle />
                                      Approve
                                    </>
                                  )}
                                </button>
                                <button
                                  onClick={() => handleReject(ticket._id)}
                                  className="btn btn-error btn-xs text-white"
                                  disabled={actionLoading === ticket._id}
                                >
                                  <FaTimesCircle />
                                  Reject
                                </button>
                              </>
                            )}

                            {ticket.verificationStatus === "approved" && (
                              <button
                                onClick={() => handleToggleAdvertise(ticket._id)}
                                className={`btn btn-xs ${
                                  ticket.isAdvertised ? "btn-secondary" : "btn-outline"
                                }`}
                                disabled={actionLoading === ticket._id}
                              >
                                {ticket.isAdvertised ? <FaStar /> : <FaRegStar />}
                                {ticket.isAdvertised ? "Remove Ad" : "Advertise"}
                              </button>
                            )}

                            <a
                              href={`/tickets/${ticket._id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-ghost btn-xs"
                            >
                              <FaEye />
                              View
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No tickets found</h3>
              <p className="text-gray-600">No tickets match the selected filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageTickets;
