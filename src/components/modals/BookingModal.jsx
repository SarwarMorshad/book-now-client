import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { createBooking } from "../../services/bookingService";
import { FaChair } from "react-icons/fa";
import toast from "react-hot-toast";

const BookingModal = ({ ticket, onClose, onSuccess, onOpenSeatMap }) => {
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

  // Handle opening seat map for bus
  const handleOpenSeatMap = () => {
    if (onOpenSeatMap) {
      onClose();
      onOpenSeatMap(quantity);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#10B981] p-4 flex items-center justify-between rounded-t-2xl">
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
          <div className="pb-3 border-b-2 border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{ticket.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {ticket.fromLocation} → {ticket.toLocation}
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Transport</p>
              <p className="font-semibold text-gray-800 dark:text-gray-100 capitalize">
                {ticket.transportType}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Available</p>
              <p className="font-semibold text-gray-800 dark:text-gray-100">{ticket.quantity} seats</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Date</p>
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {new Date(ticket.departureDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Time</p>
              <p className="font-semibold text-gray-800 dark:text-gray-100">{ticket.departureTime}</p>
            </div>
          </div>

          {/* Price */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Price per ticket</p>
            <p className="text-2xl font-bold gradient-text">${ticket.price}</p>
          </div>

          {/* Bus Seat Map Option */}
          {ticket.transportType === "bus" && onOpenSeatMap && (
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                  <FaChair className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-blue-800 dark:text-blue-300">
                    🚌 Seat Selection Available!
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    Choose your preferred seats from the map
                  </p>
                </div>
              </div>
              <button
                onClick={handleOpenSeatMap}
                className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <FaChair />
                Select Seats on Map
              </button>
            </div>
          )}

          {/* Quantity Selector - Hide for bus if seat map available */}
          {!(ticket.transportType === "bus" && onOpenSeatMap) && (
            <div className="border-2 border-gray-200 dark:border-gray-600 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Tickets</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold text-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all disabled:opacity-30"
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <input
                  type="number"
                  className="flex-1 text-center text-2xl font-bold py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.min(ticket.quantity, Math.max(1, parseInt(e.target.value) || 1)))
                  }
                  min="1"
                  max={ticket.quantity}
                />
                <button
                  onClick={() => setQuantity(Math.min(ticket.quantity, quantity + 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold text-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all disabled:opacity-30"
                  disabled={quantity >= ticket.quantity}
                >
                  +
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                Max {ticket.quantity} available
              </p>
            </div>
          )}

          {/* Total - Hide for bus if seat map available */}
          {!(ticket.transportType === "bus" && onOpenSeatMap) && (
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-xl p-4 border-2 border-primary/20">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {quantity} × ${ticket.price}
                  </p>
                </div>
                <p className="text-3xl font-bold gradient-text">${totalPrice}</p>
              </div>
            </div>
          )}

          {/* User Info */}
          <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-3 rounded">
            <p className="text-xs text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Booking as:</span> {user.name}
            </p>
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-3 rounded">
            <p className="text-xs text-gray-700 dark:text-gray-300">
              ⚠️ Vendor approval required before payment
            </p>
          </div>

          {/* Action Buttons - Hide confirm for bus if seat map available */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
              disabled={loading}
            >
              Cancel
            </button>
            {!(ticket.transportType === "bus" && onOpenSeatMap) && (
              <button
                onClick={handleBooking}
                className="flex-1 px-4 py-3 bg-[#10B981] text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
