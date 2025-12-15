import { useState, useEffect } from "react";
import {
  FaTicketAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaStar,
  FaCheck,
  FaClock,
  FaTimes,
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import Loading from "../../../components/shared/Loading";
import ConfirmModal from "../../../components/modals/ConfirmModal";
import ResultModal from "../../../components/modals/ResultModal";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTicket, setEditingTicket] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Modal states
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "danger",
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
      const response = await api.get("/tickets/vendor/my-tickets");
      if (response.data.success) {
        setTickets(response.data.tickets);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  // Transport icons
  const getTransportIcon = (type) => {
    const icons = {
      bus: <FaBus className="text-blue-500" />,
      train: <FaTrain className="text-green-500" />,
      launch: <FaShip className="text-cyan-500" />,
      plane: <FaPlane className="text-purple-500" />,
    };
    return icons[type] || <FaBus className="text-gray-500" />;
  };

  // Status badge
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

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Filter & Search

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.fromLocation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.toLocation?.toLowerCase().includes(searchTerm.toLowerCase());

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

  // Stats
  const stats = {
    total: tickets.length,
    approved: tickets.filter((t) => t.verificationStatus === "approved").length,
    pending: tickets.filter((t) => t.verificationStatus === "pending").length,
    rejected: tickets.filter((t) => t.verificationStatus === "rejected").length,
    advertised: tickets.filter((t) => t.isAdvertised).length,
  };

  // Delete ticket
  const handleDelete = (ticket) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Ticket?",
      message: (
        <p>
          Are you sure you want to delete <strong className="text-error">{ticket.title}</strong>? This action
          cannot be undone.
        </p>
      ),
      type: "danger",
      confirmText: "Yes, Delete",
      onConfirm: async () => {
        try {
          const response = await api.delete(`/tickets/${ticket._id}`);
          if (response.data.success) {
            setTickets(tickets.filter((t) => t._id !== ticket._id));
            setConfirmModal({ ...confirmModal, isOpen: false });
            setResultModal({
              isOpen: true,
              title: "Deleted!",
              message: "Ticket has been deleted successfully.",
              type: "success",
            });
          }
        } catch (error) {
          console.error("Delete error:", error);
          setConfirmModal({ ...confirmModal, isOpen: false });
          setResultModal({
            isOpen: true,
            title: "Error!",
            message: error.response?.data?.message || "Failed to delete ticket",
            type: "error",
          });
        }
      },
    });
  };

  // Edit ticket
  const handleEdit = (ticket) => {
    setEditingTicket({ ...ticket });
    setShowEditModal(true);
  };

  // Update ticket
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patch(`/tickets/${editingTicket._id}`, {
        title: editingTicket.title,
        fromLocation: editingTicket.fromLocation,
        toLocation: editingTicket.toLocation,
        transportType: editingTicket.transportType,
        price: parseFloat(editingTicket.price),
        quantity: parseInt(editingTicket.quantity),
        departureDate: editingTicket.departureDate,
        departureTime: editingTicket.departureTime,
        imageUrl: editingTicket.imageUrl,
        perks: editingTicket.perks,
      });

      if (response.data.success) {
        setTickets(tickets.map((t) => (t._id === editingTicket._id ? editingTicket : t)));
        setShowEditModal(false);
        setEditingTicket(null);
        setResultModal({
          isOpen: true,
          title: "Updated!",
          message: "Ticket has been updated successfully.",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Update error:", error);
      setResultModal({
        isOpen: true,
        title: "Error!",
        message: error.response?.data?.message || "Failed to update ticket",
        type: "error",
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Tickets</h1>
          <p className="text-gray-600 mt-1">Manage your added tickets</p>
        </div>
        <Link
          to="/dashboard/vendor/add-ticket"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all"
        >
          <FaPlus />
          Add New Ticket
        </Link>
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
          onClick={() => setFilter("approved")}
          className={`bg-white rounded-xl p-4 shadow-md text-left transition-all hover:shadow-lg ${
            filter === "approved" ? "ring-2 ring-success" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FaCheck className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-success">{stats.approved}</p>
              <p className="text-xs text-gray-500">Approved</p>
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
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or location..."
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
                  <th className="px-4 py-4 text-left text-sm font-semibold">Date & Time</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Price</th>
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
                            <p className="font-semibold text-gray-800 truncate max-w-[200px]">
                              {ticket.title}
                            </p>
                            {ticket.isAdvertised && (
                              <span className="inline-flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                <FaStar className="text-[10px]" /> Advertised
                              </span>
                            )}
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

                      {/* Date & Time */}
                      <td className="px-4 py-4">
                        <div className="text-sm">
                          <p className="text-gray-800">{formatDate(ticket.departureDate)}</p>
                          <p className="text-gray-500">{ticket.departureTime}</p>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-4 py-4">
                        <span className="font-bold text-lg gradient-text">${ticket.price}</span>
                      </td>

                      {/* Seats */}
                      <td className="px-4 py-4">
                        <span className="font-semibold">{ticket.quantity}</span>
                        <span className="text-gray-500 text-sm"> left</span>
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
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(ticket)}
                            disabled={ticket.verificationStatus === "rejected"}
                            className={`p-2 rounded-lg transition-all ${
                              ticket.verificationStatus === "rejected"
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-blue-100 text-primary hover:bg-blue-200"
                            }`}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(ticket)}
                            disabled={ticket.verificationStatus === "rejected"}
                            className={`p-2 rounded-lg transition-all ${
                              ticket.verificationStatus === "rejected"
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-red-100 text-error hover:bg-red-200"
                            }`}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
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
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Tickets Found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filter !== "all"
              ? "Try adjusting your search or filter"
              : "You haven't added any tickets yet"}
          </p>
          {!searchTerm && filter === "all" && (
            <Link
              to="/dashboard/vendor/add-ticket"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              <FaPlus />
              Add Your First Ticket
            </Link>
          )}
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowEditModal(false)}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary p-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Edit Ticket</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={editingTicket.title}
                  onChange={(e) => setEditingTicket({ ...editingTicket, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                  required
                />
              </div>

              {/* From / To */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
                  <input
                    type="text"
                    value={editingTicket.fromLocation}
                    onChange={(e) => setEditingTicket({ ...editingTicket, fromLocation: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
                  <input
                    type="text"
                    value={editingTicket.toLocation}
                    onChange={(e) => setEditingTicket({ ...editingTicket, toLocation: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Transport Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Transport Type</label>
                <select
                  value={editingTicket.transportType}
                  onChange={(e) => setEditingTicket({ ...editingTicket, transportType: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                >
                  <option value="bus">🚌 Bus</option>
                  <option value="train">🚆 Train</option>
                  <option value="launch">🚢 Launch</option>
                  <option value="plane">✈️ Plane</option>
                </select>
              </div>

              {/* Price / Quantity */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($)</label>
                  <input
                    type="number"
                    value={editingTicket.price}
                    onChange={(e) => setEditingTicket({ ...editingTicket, price: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Available Seats</label>
                  <input
                    type="number"
                    value={editingTicket.quantity}
                    onChange={(e) => setEditingTicket({ ...editingTicket, quantity: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                    min="1"
                    required
                  />
                </div>
              </div>

              {/* Date / Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Departure Date</label>
                  <input
                    type="date"
                    value={editingTicket.departureDate?.split("T")[0]}
                    onChange={(e) => setEditingTicket({ ...editingTicket, departureDate: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Departure Time</label>
                  <input
                    type="time"
                    value={editingTicket.departureTime}
                    onChange={(e) => setEditingTicket({ ...editingTicket, departureTime: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={editingTicket.imageUrl}
                  onChange={(e) => setEditingTicket({ ...editingTicket, imageUrl: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                  placeholder="https://..."
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                >
                  Update Ticket
                </button>
              </div>
            </form>
          </div>
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

export default MyTickets;
