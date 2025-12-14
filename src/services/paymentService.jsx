import api from "./api";

// Create payment intent
export const createPaymentIntent = async (bookingId) => {
  const response = await api.post("/payments/create-payment-intent", {
    bookingId,
  });
  return response.data;
};

// Confirm payment
export const confirmPayment = async (bookingId, paymentIntentId) => {
  const response = await api.post("/payments/confirm-payment", {
    bookingId,
    paymentIntentId,
  });
  return response.data;
};

// Get user transactions
export const getUserTransactions = async () => {
  const response = await api.get("/payments/transactions");
  return response.data;
};
