import api from "./api";

// Get all approved tickets
export const getAllTickets = async () => {
  const response = await api.get("/tickets");
  return response.data;
};

// Get latest tickets
export const getLatestTickets = async () => {
  const response = await api.get("/tickets/latest");
  return response.data;
};

// Get advertised tickets
export const getAdvertisedTickets = async () => {
  const response = await api.get("/tickets/advertised");
  return response.data;
};

// Get ticket by ID
export const getTicketById = async (ticketId) => {
  const response = await api.get(`/tickets/${ticketId}`);
  return response.data;
};

// Get vendor's tickets
export const getVendorTickets = async () => {
  const response = await api.get("/tickets/vendor/my-tickets");
  return response.data;
};

// Add new ticket (Vendor only)
export const addTicket = async (ticketData) => {
  const response = await api.post("/tickets", ticketData);
  return response.data;
};

// Update ticket (Vendor only)
export const updateTicket = async (ticketId, ticketData) => {
  const response = await api.patch(`/tickets/${ticketId}`, ticketData);
  return response.data;
};

// Delete ticket (Vendor only)
export const deleteTicket = async (ticketId) => {
  const response = await api.delete(`/tickets/${ticketId}`);
  return response.data;
};
