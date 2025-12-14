import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent, confirmPayment } from "../../services/paymentService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Load Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Card Element Options
const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#1f2937",
      fontFamily: "system-ui, -apple-system, sans-serif",
      "::placeholder": {
        color: "#9ca3af",
      },
    },
    invalid: {
      color: "#ef4444",
    },
  },
};

// Payment Form Component
const PaymentForm = ({ booking, onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const initPayment = async () => {
      try {
        const response = await createPaymentIntent(booking._id);
        if (response.success) {
          setClientSecret(response.clientSecret);
        }
      } catch (error) {
        console.error("Payment intent error:", error);
        toast.error("Failed to initialize payment");
        onClose();
      }
    };

    initPayment();
  }, [booking._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !cardholderName.trim()) {
      if (!cardholderName.trim()) {
        toast.error("Please enter cardholder name");
      }
      return;
    }

    setProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: cardholderName,
            address: address ? { line1: address } : undefined,
          },
        },
      });

      if (error) {
        toast.error(error.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        const response = await confirmPayment(booking._id, paymentIntent.id);

        if (response.success) {
          toast.success("Payment successful!");
          onSuccess();
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  const handleCancel = () => {
    navigate("/payment-cancelled", {
      state: {
        booking: booking,
        from: "payment-modal",
      },
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Booking Summary */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 border-2 border-primary/20">
        <p className="text-xs text-gray-600 mb-2">Payment Summary</p>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-gray-800">{booking.ticket.title}</p>
            <p className="text-sm text-gray-600">
              {booking.quantity} × ${booking.ticket.price}
            </p>
          </div>
          <p className="text-3xl font-bold gradient-text">${booking.totalPrice}</p>
        </div>
      </div>

      {/* Cardholder Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Cardholder Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          placeholder="John Doe"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-all"
          required
        />
      </div>

      {/* Card Information */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Card Information <span className="text-red-500">*</span>
        </label>
        <div className="p-4 border-2 border-gray-300 rounded-lg focus-within:border-primary transition-all">
          <CardElement options={cardElementOptions} />
        </div>
        <p className="text-xs text-gray-500 mt-2">🔒 Your payment is secure and encrypted</p>
      </div>

      {/* Billing Address (Optional) */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Billing Address <span className="text-gray-400">(Optional)</span>
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="123 Main St, City, Country"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary transition-all"
        />
      </div>

      {/* Test Card Info */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
        <p className="text-xs font-semibold text-blue-900 mb-1">Test Card:</p>
        <p className="text-xs text-blue-800 font-mono">4242 4242 4242 4242 | Exp: 12/26 | CVC: 123</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
          disabled={processing}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || processing || !cardholderName.trim()}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
        >
          {processing ? (
            <span className="flex items-center justify-center gap-2">
              <span className="loading loading-spinner loading-sm"></span>
              Processing...
            </span>
          ) : (
            `Pay $${booking.totalPrice}`
          )}
        </button>
      </div>
    </form>
  );
};

// Main Payment Modal Component
const PaymentModal = ({ booking, onClose, onSuccess }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-white">Complete Payment</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-all text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <Elements stripe={stripePromise}>
            <PaymentForm booking={booking} onSuccess={onSuccess} onClose={onClose} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
