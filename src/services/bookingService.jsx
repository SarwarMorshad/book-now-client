import api from "./api";

// Create a new booking request
export const createBooking = async (bookingData) => {
  console.log("bookingService - Sending data:", bookingData); // ← Add this
  const response = await api.post("/bookings", bookingData);
  console.log("bookingService - Response:", response.data); // ← Add this
  return response.data;
};

// Get user's bookings
export const getUserBookings = async () => {
  const response = await api.get("/bookings/my-bookings");
  return response.data;
};

// Get booking by ID
export const getBookingById = async (bookingId) => {
  const response = await api.get(`/bookings/${bookingId}`);
  return response.data;
};

// Cancel booking
export const cancelBooking = async (bookingId) => {
  const response = await api.patch(`/bookings/${bookingId}/cancel`);
  return response.data;
};
