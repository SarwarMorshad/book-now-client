import { useState, useEffect } from "react";
import { getAllTickets } from "../../services/ticketService";
import TicketCard from "../../components/cards/TicketCard";
import Loading from "../../components/shared/Loading";
import toast from "react-hot-toast";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTransport, setSelectedTransport] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage, setTicketsPerPage] = useState(6);

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
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedTransport, sortBy, tickets]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  // Page change handlers
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Tickets</title>
        <meta name="description" content="Browse all tickets in the Book Now collection." />
      </Helmet>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

              {/* Per Page */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Per Page</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={ticketsPerPage}
                  onChange={(e) => {
                    setTicketsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={6}>6 per page</option>
                  <option value={9}>9 per page</option>
                  <option value={12}>12 per page</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap justify-between items-center gap-2">
              <p className="text-gray-600">
                Showing{" "}
                <span className="font-bold text-primary">
                  {indexOfFirstTicket + 1}-{Math.min(indexOfLastTicket, filteredTickets.length)}
                </span>{" "}
                of <span className="font-bold">{filteredTickets.length}</span> tickets
              </p>
              {totalPages > 1 && (
                <p className="text-gray-500 text-sm">
                  Page {currentPage} of {totalPages}
                </p>
              )}
            </div>
          </div>

          {/* Tickets Grid */}
          {currentTickets.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentTickets.map((ticket) => (
                  <TicketCard key={ticket._id} ticket={ticket} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12">
                  <div className="flex items-center gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={goToPrevious}
                      disabled={currentPage === 1}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-primary hover:text-white shadow-md"
                      }`}
                    >
                      <FaChevronLeft className="text-sm" />
                      Prev
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {getPageNumbers().map((page, index) => (
                        <button
                          key={index}
                          onClick={() => typeof page === "number" && goToPage(page)}
                          disabled={page === "..."}
                          className={`w-10 h-10 rounded-xl font-medium transition-all ${
                            page === currentPage
                              ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                              : page === "..."
                                ? "bg-transparent text-gray-400 cursor-default"
                                : "bg-white text-gray-700 hover:bg-primary hover:text-white shadow-md"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={goToNext}
                      disabled={currentPage === totalPages}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-primary hover:text-white shadow-md"
                      }`}
                    >
                      Next
                      <FaChevronRight className="text-sm" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎫</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No tickets found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllTickets;
