import api from "./api";

// Create a new booking request
export const createBooking = async (bookingData) => {
  const response = await api.post("/bookings", bookingData);
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
