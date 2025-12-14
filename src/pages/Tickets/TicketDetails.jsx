import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTicketById } from "../../services/ticketService";
import { AuthContext } from "../../context/AuthContext";
import BookingModal from "../../components/modals/BookingModal";
import Loading from "../../components/shared/Loading";
import toast from "react-hot-toast";
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaUser, FaCheckCircle, FaArrowLeft } from "react-icons/fa";

const TicketDetails = () => {
  const { ticketId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    fetchTicketDetails();
  }, [ticketId]);

  const fetchTicketDetails = async () => {
    try {
      setLoading(true);
      const response = await getTicketById(ticketId);
      if (response.success) {
        setTicket(response.ticket);
      }
    } catch (error) {
      console.error("Fetch ticket error:", error);
      toast.error("Failed to load ticket details");
      navigate("/all-tickets");
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!user) {
      toast.error("Please login to book tickets");
      navigate("/login", { state: { from: `/tickets/${ticketId}` } });
      return;
    }

    if (user.role !== "user") {
      toast.error("Only users can book tickets");
      return;
    }

    setShowBookingModal(true);
  };

  const handleBookingSuccess = () => {
    // Refresh ticket details to update available seats
    fetchTicketDetails();
    // Navigate to My Bookings
    navigate("/dashboard/user/my-bookings");
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTransportInfo = (type) => {
    const types = {
      bus: { icon: "🚌", color: "bg-blue-500", label: "Bus" },
      train: { icon: "🚆", color: "bg-green-500", label: "Train" },
      launch: { icon: "🚢", color: "bg-purple-500", label: "Launch" },
      plane: { icon: "✈️", color: "bg-orange-500", label: "Plane" },
    };
    return types[type] || types.bus;
  };

  if (loading) {
    return <Loading />;
  }

  if (!ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Ticket not found</p>
      </div>
    );
  }

  const transportInfo = getTransportInfo(ticket.transportType);

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <button onClick={() => navigate(-1)} className="btn btn-ghost mb-6 gap-2">
            <FaArrowLeft />
            Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Image & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl h-96">
                <img
                  src={ticket.imageUrl || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800"}
                  alt={ticket.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute top-6 left-6 ${transportInfo.color} text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2`}
                >
                  <span className="text-2xl">{transportInfo.icon}</span>
                  <span>{transportInfo.label}</span>
                </div>
              </div>

              {/* Title & Vendor */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{ticket.title}</h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaUser />
                  <span>
                    Operated by <span className="font-semibold text-gray-800">{ticket.vendorName}</span>
                  </span>
                </div>
              </div>

              {/* Route & Schedule */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Journey Details</h2>

                {/* Route */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-primary mb-1">
                      <FaMapMarkerAlt />
                      <span className="text-sm text-gray-600">From</span>
                    </div>
                    <p className="text-xl font-bold text-gray-800">{ticket.fromLocation}</p>
                  </div>

                  <div className="text-3xl text-gray-400">→</div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-secondary mb-1">
                      <FaMapMarkerAlt />
                      <span className="text-sm text-gray-600">To</span>
                    </div>
                    <p className="text-xl font-bold text-gray-800">{ticket.toLocation}</p>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <FaCalendarAlt />
                      <span className="text-sm font-semibold">Departure Date</span>
                    </div>
                    <p className="font-bold text-gray-800">{formatDate(ticket.departureDate)}</p>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-xl">
                    <div className="flex items-center gap-2 text-secondary mb-2">
                      <FaClock />
                      <span className="text-sm font-semibold">Departure Time</span>
                    </div>
                    <p className="font-bold text-gray-800">{ticket.departureTime}</p>
                  </div>
                </div>
              </div>

              {/* Perks */}
              {ticket.perks && ticket.perks.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Amenities & Perks</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {ticket.perks.map((perk, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                        <FaCheckCircle className="text-green-500" />
                        <span className="text-gray-700">{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-xl sticky top-24">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Book Your Ticket</h3>

                {/* Price */}
                <div className="mb-6">
                  <p className="text-gray-600 mb-2">Price per person</p>
                  <p className="text-4xl font-bold text-primary">${ticket.price}</p>
                </div>

                {/* Available Seats */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Available Seats</span>
                    <span className="text-xl font-bold text-gray-800">{ticket.quantity}</span>
                  </div>
                </div>

                {/* Book Button */}
                <button
                  onClick={handleBookNow}
                  className="btn btn-primary w-full text-white text-lg mb-4"
                  disabled={ticket.quantity === 0}
                >
                  {ticket.quantity === 0 ? "Sold Out" : "Book Now"}
                </button>

                {/* Info */}
                <div className="p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-gray-600 text-center">
                    🔒 Secure booking • Instant confirmation
                  </p>
                </div>
              </div>
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
    </>
  );
};

export default TicketDetails;
