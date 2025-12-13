import { useState, useEffect } from "react";
import { getAllTickets } from "../../services/ticketService";
import TicketCard from "../../components/cards/TicketCard";
import Loading from "../../components/shared/Loading";
import toast from "react-hot-toast";
import { FaSearch, FaFilter } from "react-icons/fa";

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTransport, setSelectedTransport] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Fetch tickets
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await getAllTickets();
      if (response.success) {
        setTickets(response.tickets);
        setFilteredTickets(response.tickets);
      }
    } catch (error) {
      console.error("Fetch tickets error:", error);
      toast.error("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  // Filter and search
  useEffect(() => {
    let result = [...tickets];

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.fromLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.toLocation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Transport type filter
    if (selectedTransport !== "all") {
      result = result.filter((ticket) => ticket.transportType === selectedTransport);
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredTickets(result);
  }, [searchTerm, selectedTransport, sortBy, tickets]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">All Tickets</span>
          </h1>
          <p className="text-gray-600 text-lg">Browse and book tickets for your next journey</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Search</span>
              </label>
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by location or title..."
                  className="input input-bordered w-full pl-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Transport Type */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Transport Type</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={selectedTransport}
                onChange={(e) => setSelectedTransport(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="bus">🚌 Bus</option>
                <option value="train">🚆 Train</option>
                <option value="launch">🚢 Launch</option>
                <option value="plane">✈️ Plane</option>
              </select>
            </div>

            {/* Sort */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Sort By</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              Showing <span className="font-bold text-primary">{filteredTickets.length}</span> of{" "}
              <span className="font-bold">{tickets.length}</span> tickets
            </p>
          </div>
        </div>

        {/* Tickets Grid */}
        {filteredTickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎫</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No tickets found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTickets;
