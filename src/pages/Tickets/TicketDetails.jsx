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
  FaChair,
} from "react-icons/fa";
import api from "../../services/api";
import Loading from "../../components/shared/Loading";
import BookingModal from "../../components/modals/BookingModal";
import SeatMapModal from "../../components/modals/SeatMapModal";
import CountdownTimer from "../../components/shared/CountdownTimer";
import ResultModal from "../../components/modals/ResultModal";
import toast from "react-hot-toast";

const TicketDetails = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showSeatMap, setShowSeatMap] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Result Modal
  const [resultModal, setResultModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "success",
  });

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

  // Handle Book Now click
  const handleBookNow = () => {
    if (ticket.transportType === "bus") {
      // Show seat map for bus tickets
      setShowSeatMap(true);
    } else {
      // Show regular booking modal for other transport types
      setShowBookingModal(true);
    }
  };

  // Handle seat selection confirmation (for bus)
  const handleSeatConfirm = async (selectedSeats) => {
    try {
      setBookingLoading(true);
      const response = await api.post("/bookings", {
        ticketId: ticket._id,
        quantity: selectedSeats.length,
        selectedSeats: selectedSeats,
      });

      if (response.data.success) {
        setShowSeatMap(false);
        setResultModal({
          isOpen: true,
          title: "Booking Successful! 🎉",
          message: (
            <div className="text-center">
              <p className="mb-3">Your booking is pending vendor approval.</p>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 inline-block">
                <p className="text-sm text-gray-500 dark:text-gray-400">Selected Seats</p>
                <p className="text-2xl font-bold gradient-text">
                  {selectedSeats.sort((a, b) => a - b).join(", ")}
                </p>
              </div>
            </div>
          ),
          type: "success",
        });
        fetchTicket(); // Refresh ticket data
      }
    } catch (error) {
      console.error("Booking error:", error);
      setShowSeatMap(false);
      setResultModal({
        isOpen: true,
        title: "Booking Failed",
        message: error.response?.data?.message || "Failed to create booking",
        type: "error",
      });
    } finally {
      setBookingLoading(false);
    }
  };

  // Handle regular booking success (for non-bus)
  const handleBookingSuccess = () => {
    setShowBookingModal(false);
    navigate("/dashboard/user/my-bookings");
  };

  // Handle result modal close
  const handleResultModalClose = () => {
    setResultModal({ ...resultModal, isOpen: false });
    if (resultModal.type === "success") {
      navigate("/dashboard/user/my-bookings");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Ticket Not Found</h2>
          <button
            onClick={() => navigate("/all-tickets")}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:shadow-lg transition-all"
          >
            Back to All Tickets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Ticket Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
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
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-4 py-2 rounded-full">
                <span className="text-2xl font-bold gradient-text">${ticket.price}</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">/person</span>
              </div>

              {/* Title */}
              <div className="absolute bottom-4 left-4 right-4">
                <h1 className="text-2xl md:text-3xl font-bold text-white">{ticket.title}</h1>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Route */}
              <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">From</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary" />
                    {ticket.fromLocation}
                  </p>
                </div>
                <div className="text-2xl text-gray-400">→</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">To</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-secondary" />
                    {ticket.toLocation}
                  </p>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                    <FaCalendarAlt />
                    <span className="text-sm">Date</span>
                  </div>
                  <p className="font-bold text-gray-800 dark:text-gray-100">
                    {new Date(ticket.departureDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
                    <FaClock />
                    <span className="text-sm">Time</span>
                  </div>
                  <p className="font-bold text-gray-800 dark:text-gray-100">{ticket.departureTime}</p>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
                    <FaUsers />
                    <span className="text-sm">Available</span>
                  </div>
                  <p className="font-bold text-gray-800 dark:text-gray-100">{ticket.quantity} seats</p>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-1">
                    <span className="text-sm">Vendor</span>
                  </div>
                  <p className="font-bold text-gray-800 dark:text-gray-100">{ticket.vendorName}</p>
                </div>
              </div>

              {/* Perks */}
              {ticket.perks && ticket.perks.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3">Perks & Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {ticket.perks.map((perk, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm flex items-center gap-1"
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

              {/* Bus Seat Selection Info */}
              {ticket.transportType === "bus" && !isBookingDisabled() && (
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
                      <FaChair className="text-blue-600 dark:text-blue-400 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-800 dark:text-blue-300">
                        🚌 Live Seat Selection Available!
                      </h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        Choose your preferred seats from the interactive seat map
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Book Now Button */}
              <button
                onClick={handleBookNow}
                disabled={isBookingDisabled() || bookingLoading}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  isBookingDisabled()
                    ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-[1.02]"
                }`}
              >
                {bookingLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : isDeparturePassed() ? (
                  "Departure Time Passed"
                ) : ticket.quantity <= 0 ? (
                  "Sold Out"
                ) : ticket.transportType === "bus" ? (
                  <>
                    <FaChair />
                    Select Seats & Book
                  </>
                ) : (
                  "Book Now"
                )}
              </button>

              {/* Warning Messages */}
              {isDeparturePassed() && (
                <p className="text-center text-red-500 dark:text-red-400 mt-3 text-sm">
                  ⚠️ This ticket&apos;s departure time has already passed
                </p>
              )}
              {!isDeparturePassed() && ticket.quantity <= 0 && (
                <p className="text-center text-red-500 dark:text-red-400 mt-3 text-sm">
                  ⚠️ All seats have been booked
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Regular Booking Modal (for non-bus tickets) */}
      {showBookingModal && (
        <BookingModal
          ticket={ticket}
          onClose={() => setShowBookingModal(false)}
          onSuccess={handleBookingSuccess}
        />
      )}

      {/* Seat Map Modal (for bus tickets) */}
      {showSeatMap && (
        <SeatMapModal
          isOpen={showSeatMap}
          onClose={() => setShowSeatMap(false)}
          ticket={ticket}
          onConfirm={handleSeatConfirm}
          maxSeats={Math.min(ticket.quantity, 10)}
          loading={bookingLoading}
        />
      )}

      {/* Result Modal */}
      <ResultModal
        isOpen={resultModal.isOpen}
        onClose={handleResultModalClose}
        title={resultModal.title}
        message={resultModal.message}
        type={resultModal.type}
      />
    </div>
  );
};

export default TicketDetails;
