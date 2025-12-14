import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { createBooking } from "../../services/bookingService";
import toast from "react-hot-toast";

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

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-white">Confirm Booking</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-all text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Ticket Title */}
          <div className="pb-3 border-b-2 border-gray-200">
            <h3 className="text-lg font-bold text-gray-800">{ticket.title}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {ticket.fromLocation} → {ticket.toLocation}
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-500">Transport</p>
              <p className="font-semibold text-gray-800 capitalize">{ticket.transportType}</p>
            </div>
            <div>
              <p className="text-gray-500">Available</p>
              <p className="font-semibold text-gray-800">{ticket.quantity} seats</p>
            </div>
            <div>
              <p className="text-gray-500">Date</p>
              <p className="font-semibold text-gray-800">
                {new Date(ticket.departureDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Time</p>
              <p className="font-semibold text-gray-800">{ticket.departureTime}</p>
            </div>
          </div>

          {/* Price */}
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 mb-1">Price per ticket</p>
            <p className="text-2xl font-bold gradient-text">${ticket.price}</p>
          </div>

          {/* Quantity Selector */}
          <div className="border-2 border-gray-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-700 mb-3">Tickets</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 border-2 border-gray-300 text-gray-700 font-bold text-xl hover:bg-gray-200 transition-all disabled:opacity-30"
                disabled={quantity <= 1}
              >
                −
              </button>
              <input
                type="number"
                className="flex-1 text-center text-2xl font-bold py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.min(ticket.quantity, Math.max(1, parseInt(e.target.value) || 1)))
                }
                min="1"
                max={ticket.quantity}
              />
              <button
                onClick={() => setQuantity(Math.min(ticket.quantity, quantity + 1))}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 border-2 border-gray-300 text-gray-700 font-bold text-xl hover:bg-gray-200 transition-all disabled:opacity-30"
                disabled={quantity >= ticket.quantity}
              >
                +
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">Max {ticket.quantity} available</p>
          </div>

          {/* Total */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 border-2 border-primary/20">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-xs text-gray-500">
                  {quantity} × ${ticket.price}
                </p>
              </div>
              <p className="text-3xl font-bold gradient-text">${totalPrice}</p>
            </div>
          </div>

          {/* User Info */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
            <p className="text-xs text-gray-700">
              <span className="font-semibold">Booking as:</span> {user.name}
            </p>
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
            <p className="text-xs text-gray-700">⚠️ Vendor approval required before payment</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleBooking}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="loading loading-spinner loading-sm"></span>
                  Processing...
                </span>
              ) : (
                "Confirm"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
