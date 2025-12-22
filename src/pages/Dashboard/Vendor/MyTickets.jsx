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
  FaWifi,
  FaSnowflake,
  FaUtensils,
  FaPlug,
  FaTv,
  FaToilet,
  FaSuitcase,
  FaCouch,
  FaHeadphones,
  FaShieldAlt,
  FaParking,
  FaCoffee,
  FaEye,
  FaChair,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDollarSign,
  FaUser,
} from "react-icons/fa";
import { MdAirlineSeatReclineExtra, MdPets, MdLocalLaundryService, MdEventSeat } from "react-icons/md";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import Loading from "../../../components/shared/Loading";
import ConfirmModal from "../../../components/modals/ConfirmModal";
import ResultModal from "../../../components/modals/ResultModal";
import { Helmet } from "react-helmet-async";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTicket, setEditingTicket] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPerks, setSelectedPerks] = useState([]);
  const [updateLoading, setUpdateLoading] = useState(false);

  // View Details Modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [viewingTicket, setViewingTicket] = useState(null);

  // Seat Preview Modal
  const [showSeatPreview, setShowSeatPreview] = useState(false);
  const [seatPreviewTicket, setSeatPreviewTicket] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [seatLoading, setSeatLoading] = useState(false);

  // Available perks with icons
  const availablePerks = [
    { id: "ac", label: "Air Conditioning", icon: <FaSnowflake /> },
    { id: "wifi", label: "Free WiFi", icon: <FaWifi /> },
    { id: "meals", label: "Meals Included", icon: <FaUtensils /> },
    { id: "charging", label: "Charging Ports", icon: <FaPlug /> },
    { id: "entertainment", label: "Entertainment", icon: <FaTv /> },
    { id: "toilet", label: "Onboard Toilet", icon: <FaToilet /> },
    { id: "luggage", label: "Extra Luggage", icon: <FaSuitcase /> },
    { id: "reclining", label: "Reclining Seats", icon: <MdAirlineSeatReclineExtra /> },
    { id: "blanket", label: "Blanket & Pillow", icon: <FaCouch /> },
    { id: "headphones", label: "Headphones", icon: <FaHeadphones /> },
    { id: "insurance", label: "Travel Insurance", icon: <FaShieldAlt /> },
    { id: "parking", label: "Free Parking", icon: <FaParking /> },
    { id: "snacks", label: "Snacks & Drinks", icon: <FaCoffee /> },
    { id: "pets", label: "Pet Friendly", icon: <MdPets /> },
    { id: "laundry", label: "Laundry Service", icon: <MdLocalLaundryService /> },
  ];

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

  // Handle perk toggle
  const handlePerkToggle = (perkLabel) => {
    setSelectedPerks((prev) =>
      prev.includes(perkLabel) ? prev.filter((p) => p !== perkLabel) : [...prev, perkLabel]
    );
  };

  // Transport icons
  const getTransportIcon = (type, size = "text-xl") => {
    const icons = {
      bus: <FaBus className={`text-blue-500 ${size}`} />,
      train: <FaTrain className={`text-green-500 ${size}`} />,
      launch: <FaShip className={`text-cyan-500 ${size}`} />,
      plane: <FaPlane className={`text-purple-500 ${size}`} />,
    };
    return icons[type] || <FaBus className={`text-gray-500 ${size}`} />;
  };

  // Transport colors
  const getTransportColor = (type) => {
    const colors = {
      bus: "bg-blue-500",
      train: "bg-green-500",
      launch: "bg-cyan-500",
      plane: "bg-purple-500",
    };
    return colors[type] || "bg-gray-500";
  };

  // Status badge
  const getStatusBadge = (status) => {
    const badges = {
      pending: {
        bg: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        icon: <FaClock className="text-xs" />,
      },
      approved: {
        bg: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        icon: <FaCheck className="text-xs" />,
      },
      rejected: {
        bg: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
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

  // View ticket details
  const handleViewDetails = (ticket) => {
    setViewingTicket(ticket);
    setShowDetailsModal(true);
  };

  // View seat preview
  const handleSeatPreview = async (ticket) => {
    setSeatPreviewTicket(ticket);
    setShowSeatPreview(true);
    setSeatLoading(true);

    try {
      const response = await api.get(`/bookings/seats/${ticket._id}`);
      if (response.data.success) {
        setBookedSeats(response.data.bookedSeats || []);
      }
    } catch (error) {
      console.error("Error fetching booked seats:", error);
      setBookedSeats([]);
    } finally {
      setSeatLoading(false);
    }
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
    setSelectedPerks(ticket.perks || []);
    setShowEditModal(true);
  };

  // Update ticket
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoading(true);
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
        perks: selectedPerks,
      });

      if (response.data.success) {
        setTickets(
          tickets.map((t) => (t._id === editingTicket._id ? { ...editingTicket, perks: selectedPerks } : t))
        );
        setShowEditModal(false);
        setEditingTicket(null);
        setSelectedPerks([]);
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
    } finally {
      setUpdateLoading(false);
    }
  };

  // Close edit modal
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingTicket(null);
    setSelectedPerks([]);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>My Tickets | Book Now</title>
        <meta name="description" content="Manage and view your added tickets on Book Now" />
      </Helmet>
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">My Tickets</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
              Manage your added tickets
            </p>
          </div>
          <Link
            to="/dashboard/vendor/add-ticket"
            className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#10B981] text-white font-semibold rounded-xl hover:shadow-lg transition-all text-sm sm:text-base"
          >
            <FaPlus />
            <span className="hidden sm:inline">Add New Ticket</span>
            <span className="sm:hidden">Add Ticket</span>
          </Link>
        </div>

        {/* Stats Cards - Responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-md text-left transition-all hover:shadow-lg ${
              filter === "all" ? "ring-2 ring-primary" : ""
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                <FaTicketAlt className="text-primary text-sm sm:text-base" />
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
            onClick={() => setFilter("approved")}
            className={`bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-md text-left transition-all hover:shadow-lg ${
              filter === "approved" ? "ring-2 ring-success" : ""
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                <FaCheck className="text-success text-sm sm:text-base" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-success">{stats.approved}</p>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Approved</p>
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

          <button
            onClick={() => setFilter("advertised")}
            className={`bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-md text-left transition-all hover:shadow-lg col-span-2 sm:col-span-1 ${
              filter === "advertised" ? "ring-2 ring-purple-500" : ""
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
                <FaStar className="text-purple-500 text-sm sm:text-base" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {stats.advertised}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Advertised</p>
              </div>
            </div>
          </button>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Tickets - Responsive: Cards on Mobile, Table on Desktop */}
        {filteredTickets.length > 0 ? (
          <>
            {/* Mobile Card View */}
            <div className="block lg:hidden space-y-4">
              {filteredTickets.map((ticket) => {
                const status = getStatusBadge(ticket.verificationStatus);
                return (
                  <div
                    key={ticket._id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden"
                  >
                    {/* Card Header with Image */}
                    <div className="relative h-36">
                      <img
                        src={
                          ticket.imageUrl || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400"
                        }
                        alt={ticket.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                      {/* Status Badge */}
                      <div className="absolute top-2 right-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${status.bg}`}
                        >
                          {status.icon}
                          {ticket.verificationStatus?.toUpperCase()}
                        </span>
                      </div>

                      {/* Transport Badge */}
                      <div
                        className={`absolute top-2 left-2 ${getTransportColor(
                          ticket.transportType
                        )} text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1`}
                      >
                        {getTransportIcon(ticket.transportType, "text-xs")}
                        <span className="capitalize">{ticket.transportType}</span>
                      </div>

                      {/* Advertised Badge */}
                      {ticket.isAdvertised && (
                        <div className="absolute bottom-10 left-2 bg-purple-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                          <FaStar className="text-[10px]" /> Advertised
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="absolute bottom-2 left-2 right-2 text-white font-bold text-base truncate">
                        {ticket.title}
                      </h3>
                    </div>

                    {/* Card Body */}
                    <div className="p-4">
                      {/* Route */}
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <FaMapMarkerAlt className="text-primary text-xs flex-shrink-0" />
                        <span className="font-medium text-gray-800 dark:text-gray-100 truncate">
                          {ticket.fromLocation}
                        </span>
                        <span className="flex-shrink-0">→</span>
                        <span className="font-medium text-gray-800 dark:text-gray-100 truncate">
                          {ticket.toLocation}
                        </span>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-center">
                          <p className="text-[10px] text-gray-500 dark:text-gray-400">Date</p>
                          <p className="font-semibold text-gray-800 dark:text-gray-100 text-xs">
                            {new Date(ticket.departureDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-center">
                          <p className="text-[10px] text-gray-500 dark:text-gray-400">Time</p>
                          <p className="font-semibold text-gray-800 dark:text-gray-100 text-xs">
                            {ticket.departureTime}
                          </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-center">
                          <p className="text-[10px] text-gray-500 dark:text-gray-400">Seats</p>
                          <p className="font-semibold text-gray-800 dark:text-gray-100 text-xs">
                            {ticket.quantity}
                          </p>
                        </div>
                      </div>

                      {/* Price & Actions Row */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold gradient-text">${ticket.price}</span>
                          <span className="text-gray-500 dark:text-gray-400 text-xs">/person</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-1.5">
                          {/* Seat Preview - Only for Bus */}
                          {ticket.transportType === "bus" && (
                            <button
                              onClick={() => handleSeatPreview(ticket)}
                              className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900 transition-all"
                              title="View Seat Map"
                            >
                              <FaChair className="text-sm" />
                            </button>
                          )}

                          {/* View Details */}
                          <button
                            onClick={() => handleViewDetails(ticket)}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                            title="View Details"
                          >
                            <FaEye className="text-sm" />
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => handleEdit(ticket)}
                            disabled={ticket.verificationStatus === "rejected"}
                            className={`p-2 rounded-lg transition-all ${
                              ticket.verificationStatus === "rejected"
                                ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                                : "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900"
                            }`}
                            title="Edit"
                          >
                            <FaEdit className="text-sm" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(ticket)}
                            disabled={ticket.verificationStatus === "rejected"}
                            className={`p-2 rounded-lg transition-all ${
                              ticket.verificationStatus === "rejected"
                                ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                                : "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900"
                            }`}
                            title="Delete"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Mobile Footer */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Showing <span className="font-bold text-primary">{filteredTickets.length}</span> of{" "}
                  <span className="font-bold">{tickets.length}</span> tickets
                  {filter !== "all" && (
                    <span className="block sm:inline sm:ml-1">
                      (filtered by <span className="capitalize font-medium">{filter}</span>)
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#10B981] text-white">
                    <tr>
                      <th className="px-4 py-4 text-left text-sm font-semibold whitespace-nowrap">Ticket</th>
                      <th className="px-4 py-4 text-left text-sm font-semibold whitespace-nowrap">Route</th>
                      <th className="px-4 py-4 text-left text-sm font-semibold whitespace-nowrap">Type</th>
                      <th className="px-4 py-4 text-left text-sm font-semibold whitespace-nowrap">
                        Date & Time
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-semibold whitespace-nowrap">Price</th>
                      <th className="px-4 py-4 text-left text-sm font-semibold whitespace-nowrap">Seats</th>
                      <th className="px-4 py-4 text-left text-sm font-semibold whitespace-nowrap">Status</th>
                      <th className="px-4 py-4 text-left text-sm font-semibold whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {filteredTickets.map((ticket, index) => {
                      const status = getStatusBadge(ticket.verificationStatus);
                      return (
                        <tr
                          key={ticket._id}
                          className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                            index % 2 === 0
                              ? "bg-white dark:bg-gray-800"
                              : "bg-gray-50/50 dark:bg-gray-700/50"
                          }`}
                        >
                          {/* Ticket Info */}
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
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
                                <p className="font-semibold text-gray-800 dark:text-gray-100 truncate max-w-[150px]">
                                  {ticket.title}
                                </p>
                                {ticket.isAdvertised && (
                                  <span className="inline-flex items-center gap-1 text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400 px-2 py-0.5 rounded-full">
                                    <FaStar className="text-[10px]" /> Ad
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Route */}
                          <td className="px-4 py-4">
                            <div className="text-sm">
                              <p className="text-gray-800 dark:text-gray-100 font-medium whitespace-nowrap">
                                {ticket.fromLocation}
                              </p>
                              <p className="text-gray-400">↓</p>
                              <p className="text-gray-800 dark:text-gray-100 font-medium whitespace-nowrap">
                                {ticket.toLocation}
                              </p>
                            </div>
                          </td>

                          {/* Transport Type */}
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              {getTransportIcon(ticket.transportType)}
                              <span className="capitalize text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                {ticket.transportType}
                              </span>
                            </div>
                          </td>

                          {/* Date & Time */}
                          <td className="px-4 py-4">
                            <div className="text-sm">
                              <p className="text-gray-800 dark:text-gray-100 whitespace-nowrap">
                                {formatDate(ticket.departureDate)}
                              </p>
                              <p className="text-gray-500 dark:text-gray-400">{ticket.departureTime}</p>
                            </div>
                          </td>

                          {/* Price */}
                          <td className="px-4 py-4">
                            <span className="font-bold text-lg gradient-text whitespace-nowrap">
                              ${ticket.price}
                            </span>
                          </td>

                          {/* Seats */}
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-800 dark:text-gray-100">
                                {ticket.quantity}
                              </span>
                              <span className="text-gray-500 dark:text-gray-400 text-sm">left</span>
                              {ticket.transportType === "bus" && (
                                <button
                                  onClick={() => handleSeatPreview(ticket)}
                                  className="ml-1 p-1.5 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900 transition-all"
                                  title="View Seat Map"
                                >
                                  <FaChair className="text-sm" />
                                </button>
                              )}
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${status.bg}`}
                            >
                              {status.icon}
                              {ticket.verificationStatus?.toUpperCase()}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-1">
                              {/* View Details */}
                              <button
                                onClick={() => handleViewDetails(ticket)}
                                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                                title="View Details"
                              >
                                <FaEye className="text-sm" />
                              </button>

                              {/* Edit */}
                              <button
                                onClick={() => handleEdit(ticket)}
                                disabled={ticket.verificationStatus === "rejected"}
                                className={`p-2 rounded-lg transition-all ${
                                  ticket.verificationStatus === "rejected"
                                    ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                                    : "bg-blue-100 dark:bg-blue-900/50 text-primary hover:bg-blue-200 dark:hover:bg-blue-900"
                                }`}
                                title="Edit"
                              >
                                <FaEdit className="text-sm" />
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() => handleDelete(ticket)}
                                disabled={ticket.verificationStatus === "rejected"}
                                className={`p-2 rounded-lg transition-all ${
                                  ticket.verificationStatus === "rejected"
                                    ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                                    : "bg-red-100 dark:bg-red-900/50 text-error hover:bg-red-200 dark:hover:bg-red-900"
                                }`}
                                title="Delete"
                              >
                                <FaTrash className="text-sm" />
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
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                <p className="text-sm text-gray-600 dark:text-gray-400">
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
          </>
        ) : (
          // Empty State
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 sm:p-12 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTicketAlt className="text-gray-400 text-2xl sm:text-3xl" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              No Tickets Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm sm:text-base">
              {searchTerm || filter !== "all"
                ? "Try adjusting your search or filter"
                : "You haven't added any tickets yet"}
            </p>
            {!searchTerm && filter === "all" && (
              <Link
                to="/dashboard/vendor/add-ticket"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#10B981] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                <FaPlus />
                Add Your First Ticket
              </Link>
            )}
          </div>
        )}

        {/* View Details Modal */}
        {showDetailsModal && viewingTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowDetailsModal(false)}
            ></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
              {/* Modal Header with Image */}
              <div className="relative h-40 sm:h-48">
                <img
                  src={
                    viewingTicket.imageUrl ||
                    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800"
                  }
                  alt={viewingTicket.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Close Button */}
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="absolute top-3 right-3 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
                >
                  <FaTimes />
                </button>

                {/* Transport Badge */}
                <div
                  className={`absolute top-3 left-3 ${getTransportColor(
                    viewingTicket.transportType
                  )} text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-2`}
                >
                  {getTransportIcon(viewingTicket.transportType, "text-xs sm:text-sm")}
                  <span className="capitalize font-semibold text-xs sm:text-sm">
                    {viewingTicket.transportType}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2">
                  <span
                    className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${
                      getStatusBadge(viewingTicket.verificationStatus).bg
                    }`}
                  >
                    {getStatusBadge(viewingTicket.verificationStatus).icon}
                    {viewingTicket.verificationStatus?.toUpperCase()}
                  </span>
                </div>

                {/* Title & Price */}
                <div className="absolute bottom-3 left-3 right-3">
                  <h2 className="text-lg sm:text-2xl font-bold text-white mb-1 truncate">
                    {viewingTicket.title}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-3xl font-bold text-white">${viewingTicket.price}</span>
                    <span className="text-white/70 text-sm">/person</span>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-160px)] sm:max-h-[calc(90vh-192px)]">
                {/* Route */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">From</p>
                    <p className="text-sm sm:text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 truncate">
                      <FaMapMarkerAlt className="text-primary flex-shrink-0" />
                      <span className="truncate">{viewingTicket.fromLocation}</span>
                    </p>
                  </div>
                  <div className="text-xl sm:text-2xl text-gray-400 flex-shrink-0">→</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">To</p>
                    <p className="text-sm sm:text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 truncate">
                      <FaMapMarkerAlt className="text-secondary flex-shrink-0" />
                      <span className="truncate">{viewingTicket.toLocation}</span>
                    </p>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 sm:p-4 rounded-xl">
                    <div className="flex items-center gap-1 sm:gap-2 text-blue-600 dark:text-blue-400 mb-1">
                      <FaCalendarAlt className="text-xs sm:text-sm" />
                      <span className="text-[10px] sm:text-xs">Date</span>
                    </div>
                    <p className="font-bold text-gray-800 dark:text-gray-100 text-xs sm:text-base">
                      {formatDate(viewingTicket.departureDate)}
                    </p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/30 p-3 sm:p-4 rounded-xl">
                    <div className="flex items-center gap-1 sm:gap-2 text-green-600 dark:text-green-400 mb-1">
                      <FaClock className="text-xs sm:text-sm" />
                      <span className="text-[10px] sm:text-xs">Time</span>
                    </div>
                    <p className="font-bold text-gray-800 dark:text-gray-100 text-xs sm:text-base">
                      {viewingTicket.departureTime}
                    </p>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/30 p-3 sm:p-4 rounded-xl">
                    <div className="flex items-center gap-1 sm:gap-2 text-purple-600 dark:text-purple-400 mb-1">
                      <FaChair className="text-xs sm:text-sm" />
                      <span className="text-[10px] sm:text-xs">Available</span>
                    </div>
                    <p className="font-bold text-gray-800 dark:text-gray-100 text-xs sm:text-base">
                      {viewingTicket.quantity} seats
                    </p>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/30 p-3 sm:p-4 rounded-xl">
                    <div className="flex items-center gap-1 sm:gap-2 text-orange-600 dark:text-orange-400 mb-1">
                      <FaDollarSign className="text-xs sm:text-sm" />
                      <span className="text-[10px] sm:text-xs">Price</span>
                    </div>
                    <p className="font-bold text-gray-800 dark:text-gray-100 text-xs sm:text-base">
                      ${viewingTicket.price}
                    </p>
                  </div>
                </div>

                {/* Perks */}
                {viewingTicket.perks && viewingTicket.perks.length > 0 && (
                  <div className="mb-4 sm:mb-6">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2 sm:mb-3 text-sm sm:text-base">
                      Amenities & Perks
                    </h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {viewingTicket.perks.map((perk, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm flex items-center gap-1"
                        >
                          <FaCheck className="text-green-500 text-[10px] sm:text-xs" />
                          {perk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Vendor Info */}
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                      <FaUser className="text-primary text-sm" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Vendor</p>
                      <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base truncate">
                        {viewingTicket.vendorName}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                        {viewingTicket.vendorEmail}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Advertised Badge */}
                {viewingTicket.isAdvertised && (
                  <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400">
                      <FaStar className="text-base sm:text-lg" />
                      <span className="font-semibold text-xs sm:text-sm">
                        This ticket is being advertised on the homepage
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Seat Preview Modal */}
        {showSeatPreview && seatPreviewTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowSeatPreview(false)}
            ></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="bg-[#10B981] p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">🚌 Live Seat Map</h2>
                    <p className="text-white/80 text-xs sm:text-sm truncate">{seatPreviewTicket.title}</p>
                  </div>
                  <button
                    onClick={() => setShowSeatPreview(false)}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[60vh]">
                {seatLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm">Loading seat map...</p>
                  </div>
                ) : (
                  <>
                    {/* Legend */}
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 dark:bg-green-900/50 rounded flex items-center justify-center">
                          <MdEventSeat className="text-green-600 dark:text-green-400 text-xs sm:text-sm" />
                        </div>
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-100 dark:bg-red-900/50 rounded flex items-center justify-center">
                          <MdEventSeat className="text-red-600 dark:text-red-400 text-xs sm:text-sm" />
                        </div>
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Booked</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-2 sm:p-3 text-center">
                        <p className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-gray-100">40</p>
                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Total Seats</p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-2 sm:p-3 text-center">
                        <p className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400">
                          {40 - bookedSeats.length}
                        </p>
                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Available</p>
                      </div>
                      <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-2 sm:p-3 text-center">
                        <p className="text-lg sm:text-2xl font-bold text-red-600 dark:text-red-400">
                          {bookedSeats.length}
                        </p>
                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Booked</p>
                      </div>
                    </div>

                    {/* Bus Front */}
                    <div className="flex justify-center mb-2 sm:mb-3">
                      <div className="bg-gray-200 dark:bg-gray-700 px-4 sm:px-6 py-1.5 sm:py-2 rounded-t-3xl text-gray-600 dark:text-gray-400 text-[10px] sm:text-xs font-medium flex items-center gap-1 sm:gap-2">
                        <span>🚌</span> Front / Driver
                      </div>
                    </div>

                    {/* Seat Grid */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-600">
                      {Array.from({ length: 10 }).map((_, rowIndex) => (
                        <div
                          key={rowIndex}
                          className="flex justify-center items-center gap-1 sm:gap-2 mb-1.5 sm:mb-2"
                        >
                          {/* Left side seats (2 seats) */}
                          {Array.from({ length: 2 }).map((_, seatIndex) => {
                            const seatNumber = rowIndex * 4 + seatIndex + 1;
                            const isBooked = bookedSeats.includes(seatNumber);
                            return (
                              <div
                                key={seatNumber}
                                className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center font-bold text-[10px] sm:text-xs transition-all ${
                                  isBooked
                                    ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
                                    : "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400"
                                }`}
                                title={`Seat ${seatNumber} - ${isBooked ? "Booked" : "Available"}`}
                              >
                                {seatNumber}
                              </div>
                            );
                          })}

                          {/* Aisle */}
                          <div className="w-5 sm:w-6 flex items-center justify-center text-gray-400 dark:text-gray-500 text-[10px] sm:text-xs font-medium">
                            {rowIndex + 1}
                          </div>

                          {/* Right side seats (2 seats) */}
                          {Array.from({ length: 2 }).map((_, seatIndex) => {
                            const seatNumber = rowIndex * 4 + seatIndex + 3;
                            const isBooked = bookedSeats.includes(seatNumber);
                            return (
                              <div
                                key={seatNumber}
                                className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center font-bold text-[10px] sm:text-xs transition-all ${
                                  isBooked
                                    ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
                                    : "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400"
                                }`}
                                title={`Seat ${seatNumber} - ${isBooked ? "Booked" : "Available"}`}
                              >
                                {seatNumber}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>

                    {/* Bus Back */}
                    <div className="flex justify-center mt-2 sm:mt-3">
                      <div className="bg-gray-200 dark:bg-gray-700 px-4 sm:px-6 py-1.5 sm:py-2 rounded-b-xl text-gray-600 dark:text-gray-400 text-[10px] sm:text-xs font-medium">
                        Back
                      </div>
                    </div>

                    {/* Booked Seats List */}
                    {bookedSeats.length > 0 && (
                      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                        <p className="text-xs sm:text-sm text-red-700 dark:text-red-400">
                          <span className="font-semibold">Booked Seats ({bookedSeats.length}):</span>{" "}
                          {bookedSeats.sort((a, b) => a - b).join(", ")}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <button
                  onClick={() => setShowSeatPreview(false)}
                  className="w-full py-2.5 sm:py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && editingTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleCloseEditModal}
            ></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="sticky top-0 bg-[#10B981] p-3 sm:p-4 flex items-center justify-between z-10">
                <h3 className="text-lg sm:text-xl font-bold text-white">Edit Ticket</h3>
                <button
                  onClick={handleCloseEditModal}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Modal Body */}
              <form
                onSubmit={handleUpdate}
                className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(95vh-60px)] sm:max-h-[calc(90vh-80px)]"
              >
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Ticket Title
                  </label>
                  <input
                    type="text"
                    value={editingTicket.title}
                    onChange={(e) => setEditingTicket({ ...editingTicket, title: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm sm:text-base"
                    required
                  />
                </div>

                {/* From / To */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      From Location
                    </label>
                    <input
                      type="text"
                      value={editingTicket.fromLocation}
                      onChange={(e) => setEditingTicket({ ...editingTicket, fromLocation: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      To Location
                    </label>
                    <input
                      type="text"
                      value={editingTicket.toLocation}
                      onChange={(e) => setEditingTicket({ ...editingTicket, toLocation: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                {/* Transport Type - Card Style */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
                    Transport Type
                  </label>
                  <div className="grid grid-cols-4 gap-2 sm:gap-3">
                    {[
                      { value: "bus", label: "Bus", icon: <FaBus /> },
                      { value: "train", label: "Train", icon: <FaTrain /> },
                      { value: "launch", label: "Launch", icon: <FaShip /> },
                      { value: "plane", label: "Plane", icon: <FaPlane /> },
                    ].map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setEditingTicket({ ...editingTicket, transportType: type.value })}
                        className={`flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl border-2 transition-all ${
                          editingTicket.transportType === type.value
                            ? "bg-primary text-white border-primary shadow-lg"
                            : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-400"
                        }`}
                      >
                        <span className="text-lg sm:text-xl mb-1">{type.icon}</span>
                        <span className="text-[10px] sm:text-xs font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price / Quantity */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      value={editingTicket.price}
                      onChange={(e) => setEditingTicket({ ...editingTicket, price: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm sm:text-base"
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Seats
                    </label>
                    <input
                      type="number"
                      value={editingTicket.quantity}
                      onChange={(e) => setEditingTicket({ ...editingTicket, quantity: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm sm:text-base"
                      min="1"
                      required
                    />
                  </div>
                </div>

                {/* Date / Time */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={editingTicket.departureDate?.split("T")[0]}
                      onChange={(e) => setEditingTicket({ ...editingTicket, departureDate: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={editingTicket.departureTime}
                      onChange={(e) => setEditingTicket({ ...editingTicket, departureTime: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={editingTicket.imageUrl || ""}
                    onChange={(e) => setEditingTicket({ ...editingTicket, imageUrl: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm sm:text-base"
                    placeholder="https://..."
                  />
                </div>

                {/* Amenities & Perks - Checkbox Grid */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Amenities & Perks
                  </label>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mb-2 sm:mb-3">
                    Select the amenities included with this ticket
                  </p>

                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-2">
                    {availablePerks.map((perk) => (
                      <button
                        key={perk.id}
                        type="button"
                        onClick={() => handlePerkToggle(perk.label)}
                        className={`relative flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl border-2 transition-all duration-300 ${
                          selectedPerks.includes(perk.label)
                            ? "bg-primary/10 dark:bg-primary/20 border-primary text-primary shadow-md"
                            : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-600"
                        }`}
                      >
                        <div
                          className={`text-base sm:text-lg mb-0.5 sm:mb-1 ${
                            selectedPerks.includes(perk.label)
                              ? "text-primary"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {perk.icon}
                        </div>
                        <span
                          className={`text-[8px] sm:text-[10px] font-medium text-center leading-tight ${
                            selectedPerks.includes(perk.label)
                              ? "text-primary"
                              : "text-gray-600 dark:text-gray-300"
                          }`}
                        >
                          {perk.label}
                        </span>
                        {/* Checkmark indicator */}
                        {selectedPerks.includes(perk.label) && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full flex items-center justify-center">
                            <FaCheck className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Selected Perks Display */}
                  {selectedPerks.length > 0 && (
                    <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                      <p className="text-xs sm:text-sm text-green-700 dark:text-green-400">
                        <span className="font-semibold">Selected ({selectedPerks.length}):</span>{" "}
                        {selectedPerks.join(", ")}
                      </p>
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2 sm:pt-4 sticky bottom-0 bg-white dark:bg-gray-800 pb-2">
                  <button
                    type="button"
                    onClick={handleCloseEditModal}
                    disabled={updateLoading}
                    className="flex-1 py-2.5 sm:py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all disabled:opacity-50 text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updateLoading}
                    className="flex-1 py-2.5 sm:py-3 bg-[#10B981] text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    {updateLoading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        <span className="hidden sm:inline">Updating...</span>
                      </>
                    ) : (
                      <>
                        <FaCheck />
                        <span className="hidden sm:inline">Update Ticket</span>
                        <span className="sm:hidden">Update</span>
                      </>
                    )}
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
    </>
  );
};

export default MyTickets;
