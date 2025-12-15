import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaTicketAlt, FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import Loading from "../../../components/shared/Loading";
import toast from "react-hot-toast";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [editingTicket, setEditingTicket] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchMyTickets();
  }, []);

  const fetchMyTickets = async () => {
    try {
      setLoading(true);
      const response = await api.get("/tickets/vendor/my-tickets");
      if (response.data.success) {
        setTickets(response.data.tickets);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
      toast.error("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ticketId) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) {
      return;
    }

    try {
      setDeleteLoading(ticketId);
      const response = await api.delete(`/tickets/${ticketId}`);
      if (response.data.success) {
        toast.success("Ticket deleted successfully");
        setTickets(tickets.filter((t) => t._id !== ticketId));
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || "Failed to delete ticket");
    } finally {
      setDeleteLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: "bg-yellow-100 text-yellow-700",
      approved: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaTicketAlt className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Tickets</p>
              <p className="text-2xl font-bold text-gray-800">{tickets.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaTicketAlt className="text-green-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Approved</p>
              <p className="text-2xl font-bold text-gray-800">
                {tickets.filter((t) => t.verificationStatus === "approved").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <FaTicketAlt className="text-yellow-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-gray-800">
                {tickets.filter((t) => t.verificationStatus === "pending").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets Grid */}
      {tickets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Image */}
              <div className="relative h-40">
                <img
                  src={ticket.imageUrl || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400"}
                  alt={ticket.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* Status Badge */}
                <div
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(
                    ticket.verificationStatus
                  )}`}
                >
                  {ticket.verificationStatus?.toUpperCase()}
                </div>

                {/* Advertised Badge */}
                {ticket.isAdvertised && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
                    ⭐ ADVERTISED
                  </div>
                )}

                {/* Title */}
                <h3 className="absolute bottom-3 left-3 text-white font-bold text-lg pr-3">{ticket.title}</h3>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Route */}
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <FaMapMarkerAlt className="text-primary" />
                  <span>{ticket.fromLocation}</span>
                  <span>→</span>
                  <span>{ticket.toLocation}</span>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-400" />
                    <span>{formatDate(ticket.departureDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-gray-400" />
                    <span>{ticket.departureTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaTicketAlt className="text-gray-400" />
                    <span>{ticket.quantity} seats</span>
                  </div>
                  <div className="font-bold gradient-text text-lg">${ticket.price}</div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingTicket(ticket);
                      setShowEditModal(true);
                    }}
                    disabled={ticket.verificationStatus === "rejected"}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl font-medium transition-all ${
                      ticket.verificationStatus === "rejected"
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    }`}
                  >
                    <FaEdit />
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(ticket._id)}
                    disabled={ticket.verificationStatus === "rejected" || deleteLoading === ticket._id}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl font-medium transition-all ${
                      ticket.verificationStatus === "rejected"
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                  >
                    {deleteLoading === ticket._id ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <>
                        <FaTrash />
                        Delete
                      </>
                    )}
                  </button>
                </div>

                {/* Rejected Message */}
                {ticket.verificationStatus === "rejected" && (
                  <p className="text-center text-red-500 text-sm mt-3">
                    ❌ This ticket was rejected by admin
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTicketAlt className="text-gray-400 text-3xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Tickets Yet</h3>
          <p className="text-gray-600 mb-6">Start by adding your first ticket</p>
          <Link
            to="/dashboard/vendor/add-ticket"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            <FaPlus />
            Add New Ticket
          </Link>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingTicket && (
        <EditTicketModal
          ticket={editingTicket}
          onClose={() => {
            setShowEditModal(false);
            setEditingTicket(null);
          }}
          onSuccess={() => {
            setShowEditModal(false);
            setEditingTicket(null);
            fetchMyTickets();
          }}
        />
      )}
    </div>
  );
};

// Edit Ticket Modal Component
const EditTicketModal = ({ ticket, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: ticket.title || "",
    fromLocation: ticket.fromLocation || "",
    toLocation: ticket.toLocation || "",
    transportType: ticket.transportType || "bus",
    price: ticket.price || "",
    quantity: ticket.quantity || "",
    departureDate: ticket.departureDate?.split("T")[0] || "",
    departureTime: ticket.departureTime || "",
    imageUrl: ticket.imageUrl || "",
    perks: ticket.perks || [],
  });

  const perksOptions = [
    "AC",
    "WiFi",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Blanket",
    "Charging Port",
    "Entertainment",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePerkToggle = (perk) => {
    setFormData((prev) => ({
      ...prev,
      perks: prev.perks.includes(perk) ? prev.perks.filter((p) => p !== perk) : [...prev.perks, perk],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.patch(`/tickets/${ticket._id}`, {
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
      });

      if (response.data.success) {
        toast.success("Ticket updated successfully");
        onSuccess();
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Edit Ticket</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
              required
            />
          </div>

          {/* From - To */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Location</label>
              <input
                type="text"
                name="fromLocation"
                value={formData.fromLocation}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Location</label>
              <input
                type="text"
                name="toLocation"
                value={formData.toLocation}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Transport Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transport Type</label>
            <select
              name="transportType"
              value={formData.transportType}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
            >
              <option value="bus">Bus</option>
              <option value="train">Train</option>
              <option value="launch">Launch</option>
              <option value="plane">Plane</option>
            </select>
          </div>

          {/* Price - Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (per unit)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Date - Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
              <input
                type="time"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
            />
          </div>

          {/* Perks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Perks & Amenities</label>
            <div className="flex flex-wrap gap-2">
              {perksOptions.map((perk) => (
                <button
                  key={perk}
                  type="button"
                  onClick={() => handlePerkToggle(perk)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    formData.perks.includes(perk)
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {perk}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? <span className="loading loading-spinner loading-sm"></span> : "Update Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyTickets;
