import { useState, useEffect } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import { MdEventSeat } from "react-icons/md";
import api from "../../services/api";

const SeatMapModal = ({ isOpen, onClose, ticket, onConfirm, maxSeats, loading: externalLoading }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Bus layout: 10 rows x 4 seats (2 + aisle + 2)
  const rows = 10;
  const seatsPerRow = 4;

  useEffect(() => {
    if (isOpen && ticket?._id) {
      fetchBookedSeats();
      setSelectedSeats([]); // Reset selection when modal opens
    }
  }, [isOpen, ticket]);

  const fetchBookedSeats = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/bookings/seats/${ticket._id}`);
      if (response.data.success) {
        setBookedSeats(response.data.bookedSeats);
      }
    } catch (error) {
      console.error("Error fetching booked seats:", error);
      setBookedSeats([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      if (selectedSeats.length < maxSeats) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
    }
  };

  const getSeatStatus = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return "booked";
    if (selectedSeats.includes(seatNumber)) return "selected";
    return "available";
  };

  const getSeatStyle = (status) => {
    switch (status) {
      case "booked":
        return "bg-gray-400 dark:bg-gray-600 text-gray-600 dark:text-gray-400 cursor-not-allowed opacity-60";
      case "selected":
        return "bg-gradient-to-br from-primary to-secondary text-white scale-110 shadow-lg ring-2 ring-primary/50";
      default:
        return "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 hover:scale-105 cursor-pointer";
    }
  };

  const handleConfirm = () => {
    if (selectedSeats.length > 0 && selectedSeats.length <= maxSeats) {
      onConfirm(selectedSeats);
    }
  };

  const handleClose = () => {
    setSelectedSeats([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden animate-fadeInUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">🚌 Select Your Seats</h2>
              <p className="text-white/80 text-sm">{ticket?.title}</p>
            </div>
            <button
              onClick={handleClose}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <p className="mt-3 text-gray-500 dark:text-gray-400">Loading seat map...</p>
            </div>
          ) : (
            <>
              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/50 rounded flex items-center justify-center">
                    <MdEventSeat className="text-green-600 dark:text-green-400 text-sm" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded flex items-center justify-center">
                    <MdEventSeat className="text-white text-sm" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-400 dark:bg-gray-600 rounded flex items-center justify-center opacity-60">
                    <MdEventSeat className="text-gray-600 dark:text-gray-400 text-sm" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Booked</span>
                </div>
              </div>

              {/* Bus Front */}
              <div className="flex justify-center mb-3">
                <div className="bg-gray-200 dark:bg-gray-700 px-6 sm:px-8 py-2 rounded-t-3xl text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium flex items-center gap-2">
                  <span>🚌</span> Front / Driver
                </div>
              </div>

              {/* Seat Grid */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 sm:p-4 border-2 border-gray-200 dark:border-gray-600">
                {Array.from({ length: rows }).map((_, rowIndex) => (
                  <div key={rowIndex} className="flex justify-center items-center gap-1 sm:gap-2 mb-2">
                    {/* Left side seats (2 seats) */}
                    {Array.from({ length: 2 }).map((_, seatIndex) => {
                      const seatNumber = rowIndex * seatsPerRow + seatIndex + 1;
                      const status = getSeatStatus(seatNumber);
                      return (
                        <button
                          key={seatNumber}
                          onClick={() => handleSeatClick(seatNumber)}
                          disabled={status === "booked"}
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-200 ${getSeatStyle(status)}`}
                          title={`Seat ${seatNumber}${status === "booked" ? " (Booked)" : ""}`}
                        >
                          {status === "selected" ? <FaCheck className="text-sm" /> : seatNumber}
                        </button>
                      );
                    })}

                    {/* Aisle */}
                    <div className="w-6 sm:w-8 flex items-center justify-center text-gray-400 dark:text-gray-500 text-xs font-medium">
                      {rowIndex + 1}
                    </div>

                    {/* Right side seats (2 seats) */}
                    {Array.from({ length: 2 }).map((_, seatIndex) => {
                      const seatNumber = rowIndex * seatsPerRow + seatIndex + 3;
                      const status = getSeatStatus(seatNumber);
                      return (
                        <button
                          key={seatNumber}
                          onClick={() => handleSeatClick(seatNumber)}
                          disabled={status === "booked"}
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-200 ${getSeatStyle(status)}`}
                          title={`Seat ${seatNumber}${status === "booked" ? " (Booked)" : ""}`}
                        >
                          {status === "selected" ? <FaCheck className="text-sm" /> : seatNumber}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Bus Back */}
              <div className="flex justify-center mt-3">
                <div className="bg-gray-200 dark:bg-gray-700 px-6 sm:px-8 py-2 rounded-b-xl text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium">
                  Back
                </div>
              </div>

              {/* Selection Info */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Selected Seats</p>
                    <p className="font-bold text-gray-800 dark:text-gray-100 text-sm sm:text-base">
                      {selectedSeats.length > 0
                        ? selectedSeats.sort((a, b) => a - b).join(", ")
                        : "None selected"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {selectedSeats.length} / {maxSeats} max
                    </p>
                    <p className="text-xl sm:text-2xl font-bold gradient-text">
                      ${ticket?.price * selectedSeats.length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Helper Text */}
              {selectedSeats.length === 0 && (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                  👆 Tap on available seats to select (max {maxSeats})
                </p>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-3 bg-gray-50 dark:bg-gray-800/50">
          <button
            onClick={handleClose}
            disabled={externalLoading}
            className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={selectedSeats.length === 0 || externalLoading}
            className={`flex-1 py-3 font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              selectedSeats.length > 0
                ? "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-[1.02]"
                : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            }`}
          >
            {externalLoading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Booking...
              </>
            ) : (
              <>
                <FaCheck />
                Confirm ({selectedSeats.length} seat{selectedSeats.length !== 1 ? "s" : ""})
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatMapModal;
