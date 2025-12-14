import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { createBooking } from "../../services/bookingService";
import toast from "react-hot-toast";
import { FaTicketAlt, FaCalendarAlt, FaClock, FaUsers } from "react-icons/fa";

const BookingModal = ({ ticket, onClose, onSuccess }) => {
  const { user } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const totalPrice = ticket.price * quantity;

  const handleBooking = async () => {
    try {
      setLoading(true);

      const bookingData = {
        ticketId: ticket._id,
        quantity: quantity,
        totalPrice: totalPrice,
      };

      const response = await createBooking(bookingData);

      if (response.success) {
        toast.success("Booking request submitted successfully!");
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.response?.data?.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Confirm Your Booking</h2>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-circle text-white hover:bg-white/20"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Ticket Info */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
              <FaTicketAlt className="text-primary" />
              {ticket.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Route */}
              <div>
                <p className="text-sm text-gray-600 mb-1">Route</p>
                <p className="font-semibold text-gray-800">
                  {ticket.fromLocation} → {ticket.toLocation}
                </p>
              </div>

              {/* Transport */}
              <div>
                <p className="text-sm text-gray-600 mb-1">Transport Type</p>
                <p className="font-semibold text-gray-800 capitalize">{ticket.transportType}</p>
              </div>

              {/* Date */}
              <div>
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                  <FaCalendarAlt className="text-primary" />
                  Departure Date
                </p>
                <p className="font-semibold text-gray-800">{formatDate(ticket.departureDate)}</p>
              </div>

              {/* Time */}
              <div>
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                  <FaClock className="text-secondary" />
                  Departure Time
                </p>
                <p className="font-semibold text-gray-800">{ticket.departureTime}</p>
              </div>

              {/* Price */}
              <div>
                <p className="text-sm text-gray-600 mb-1">Price per Ticket</p>
                <p className="font-bold text-primary text-xl">${ticket.price}</p>
              </div>

              {/* Available */}
              <div>
                <p className="text-sm text-gray-600 mb-1">Available Seats</p>
                <p className="font-semibold text-gray-800">{ticket.quantity} seats</p>
              </div>
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-5">
            <label className="block text-gray-700 font-bold mb-3 text-lg flex items-center gap-2">
              <FaUsers className="text-primary" />
              Number of Tickets
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="btn btn-circle btn-outline btn-primary"
                disabled={quantity <= 1}
              >
                <span className="text-xl">−</span>
              </button>
              <div className="flex-1">
                <input
                  type="number"
                  className="input input-bordered input-lg w-full text-center text-2xl font-bold"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.min(ticket.quantity, Math.max(1, parseInt(e.target.value) || 1)))
                  }
                  min="1"
                  max={ticket.quantity}
                />
              </div>
              <button
                onClick={() => setQuantity(Math.min(ticket.quantity, quantity + 1))}
                className="btn btn-circle btn-outline btn-primary"
                disabled={quantity >= ticket.quantity}
              >
                <span className="text-xl">+</span>
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Maximum {ticket.quantity} tickets available
            </p>
          </div>

          {/* Total Price */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 mb-1">Total Amount</p>
                <p className="text-sm text-gray-500">
                  {quantity} ticket{quantity > 1 ? "s" : ""} × ${ticket.price}
                </p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-primary">${totalPrice}</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Booking as:</span> {user.name} ({user.email})
            </p>
          </div>

          {/* Info Notice */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-sm text-gray-700">
              ⚠️ Your booking request will be sent to the vendor for approval. You'll be able to make payment
              once the vendor accepts your booking.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button onClick={onClose} className="btn btn-outline flex-1 btn-lg" disabled={loading}>
              Cancel
            </button>
            <button
              onClick={handleBooking}
              className="btn btn-primary text-white flex-1 btn-lg"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-sm"></span>
                  Processing...
                </span>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
