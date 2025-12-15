import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaCheck,
} from "react-icons/fa";
import api from "../../services/api";
import Loading from "../../components/shared/Loading";
import BookingModal from "../../components/modals/BookingModal";
import CountdownTimer from "../../components/shared/CountdownTimer";
import toast from "react-hot-toast";

const TicketDetails = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    fetchTicket();
  }, [ticketId]);

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/tickets/${ticketId}`);
      if (response.data.success) {
        setTicket(response.data.ticket);
      }
    } catch (error) {
      console.error("Error fetching ticket:", error);
      toast.error("Failed to load ticket details");
    } finally {
      setLoading(false);
    }
  };

  // Check if departure date/time has passed
  const isDeparturePassed = () => {
    if (!ticket) return false;
    const dateStr = new Date(ticket.departureDate).toISOString().split("T")[0];
    const departureDateTime = new Date(`${dateStr}T${ticket.departureTime}:00`);
    return new Date() > departureDateTime;
  };

  // Check if booking is disabled
  const isBookingDisabled = () => {
    return isDeparturePassed() || ticket?.quantity <= 0;
  };

  // Get transport icon
  const getTransportIcon = (type) => {
    const icons = {
      bus: FaBus,
      train: FaTrain,
      launch: FaShip,
      plane: FaPlane,
    };
    const Icon = icons[type] || FaBus;
    return <Icon className="text-2xl" />;
  };

  // Get transport color
  const getTransportColor = (type) => {
    const colors = {
      bus: "bg-blue-500",
      train: "bg-green-500",
      launch: "bg-cyan-500",
      plane: "bg-orange-500",
    };
    return colors[type] || "bg-gray-500";
  };

  const handleBookingSuccess = () => {
    setShowBookingModal(false);
    navigate("/dashboard/user/my-bookings");
  };

  if (loading) {
    return <Loading />;
  }

  if (!ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Ticket Not Found</h2>
          <button
            onClick={() => navigate("/all-tickets")}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg"
          >
            Back to All Tickets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Ticket Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Image */}
            <div className="relative h-64 md:h-80">
              <img
                src={ticket.imageUrl || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800"}
                alt={ticket.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

              {/* Transport Badge */}
              <div
                className={`absolute top-4 left-4 ${getTransportColor(ticket.transportType)} text-white px-4 py-2 rounded-full flex items-center gap-2`}
              >
                {getTransportIcon(ticket.transportType)}
                <span className="capitalize font-semibold">{ticket.transportType}</span>
              </div>

              {/* Price Badge */}
              <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full">
                <span className="text-2xl font-bold gradient-text">${ticket.price}</span>
                <span className="text-gray-500 text-sm">/person</span>
              </div>

              {/* Title */}
              <div className="absolute bottom-4 left-4 right-4">
                <h1 className="text-2xl md:text-3xl font-bold text-white">{ticket.title}</h1>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Route */}
              <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex-1">
                  <p className="text-sm text-gray-500">From</p>
                  <p className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary" />
                    {ticket.fromLocation}
                  </p>
                </div>
                <div className="text-2xl text-gray-400">→</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">To</p>
                  <p className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-secondary" />
                    {ticket.toLocation}
                  </p>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <FaCalendarAlt />
                    <span className="text-sm">Date</span>
                  </div>
                  <p className="font-bold text-gray-800">
                    {new Date(ticket.departureDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-green-600 mb-1">
                    <FaClock />
                    <span className="text-sm">Time</span>
                  </div>
                  <p className="font-bold text-gray-800">{ticket.departureTime}</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-purple-600 mb-1">
                    <FaUsers />
                    <span className="text-sm">Available</span>
                  </div>
                  <p className="font-bold text-gray-800">{ticket.quantity} seats</p>
                </div>

                <div className="bg-orange-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-orange-600 mb-1">
                    <span className="text-sm">Vendor</span>
                  </div>
                  <p className="font-bold text-gray-800">{ticket.vendorName}</p>
                </div>
              </div>

              {/* Perks */}
              {ticket.perks && ticket.perks.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 mb-3">Perks & Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {ticket.perks.map((perk, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        <FaCheck className="text-green-500 text-xs" />
                        {perk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Countdown Timer */}
              <div className="mb-6">
                <CountdownTimer targetDate={ticket.departureDate} targetTime={ticket.departureTime} />
              </div>

              {/* Book Now Button */}
              <button
                onClick={() => setShowBookingModal(true)}
                disabled={isBookingDisabled()}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  isBookingDisabled()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg"
                }`}
              >
                {isDeparturePassed()
                  ? "Departure Time Passed"
                  : ticket.quantity <= 0
                    ? "Sold Out"
                    : "Book Now"}
              </button>

              {/* Warning Messages */}
              {isDeparturePassed() && (
                <p className="text-center text-red-500 mt-3 text-sm">
                  ⚠️ This ticket's departure time has already passed
                </p>
              )}
              {!isDeparturePassed() && ticket.quantity <= 0 && (
                <p className="text-center text-red-500 mt-3 text-sm">⚠️ All seats have been booked</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          ticket={ticket}
          onClose={() => setShowBookingModal(false)}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
};

export default TicketDetails;
