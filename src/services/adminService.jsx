import api from "./api";

// Get all tickets (including pending) - Admin only
export const getAllTicketsAdmin = async () => {
  const response = await api.get("/admin/tickets");
  return response.data;
};

// Approve ticket
export const approveTicket = async (ticketId) => {
  const response = await api.patch(`/admin/tickets/${ticketId}/approve`);
  return response.data;
};

// Reject ticket
export const rejectTicket = async (ticketId) => {
  const response = await api.patch(`/admin/tickets/${ticketId}/reject`);
  return response.data;
};

// Toggle advertisement
export const toggleAdvertisement = async (ticketId) => {
  const response = await api.patch(`/admin/tickets/${ticketId}/advertise`);
  return response.data;
};
