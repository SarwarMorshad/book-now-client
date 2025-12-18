import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import PaymentModal from "../../../components/modals/PaymentModal";
import { Helmet } from "react-helmet-async";

const PaymentCancelled = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  if (!booking) {
    navigate("/dashboard/user/my-bookings");
    return null;
  }

  const handleTryAgain = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    navigate("/dashboard/user/my-bookings");
  };

  return (
    <>
      <Helmet>
        <title>Payment Cancelled | Try Again</title>
        <meta
          name="description"
          content="Your payment was not completed. Your booking is still active and waiting for payment."
        />
      </Helmet>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Payment Cancelled</h2>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            Your payment was not completed. Your booking is still active and waiting for payment.
          </p>

          {/* Booking Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm text-gray-500 mb-2">Booking Details:</p>
            <p className="font-bold text-gray-800 mb-1">{booking.ticket.title}</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Amount:</span>
              <span className="font-bold gradient-text text-lg">${booking.totalPrice}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleTryAgain}
              className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/dashboard/user/my-bookings")}
              className="w-full px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
            >
              Back to My Bookings
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          booking={booking}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
};

export default PaymentCancelled;
