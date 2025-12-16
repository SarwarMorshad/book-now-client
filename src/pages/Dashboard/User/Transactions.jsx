import { useState, useEffect } from "react";
import {
  FaCreditCard,
  FaCheckCircle,
  FaSearch,
  FaClock,
  FaDollarSign,
  FaTicketAlt,
  FaCalendarAlt,
  FaReceipt,
} from "react-icons/fa";
import api from "../../../services/api";
import Loading from "../../../components/shared/Loading";
import { Helmet } from "react-helmet-async";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await api.get("/payments/transactions");
      if (response.data.success) {
        setTransactions(response.data.transactions);
      }
    } catch (error) {
      console.error("Fetch transactions error:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatShortDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      completed: {
        bg: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        icon: <FaCheckCircle className="text-xs" />,
      },
      pending: {
        bg: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        icon: <FaClock className="text-xs" />,
      },
    };
    return badges[status] || badges.pending;
  };

  // Stats
  const stats = {
    total: transactions.length,
    completed: transactions.filter((t) => t.status === "completed").length,
    pending: transactions.filter((t) => t.status === "pending").length,
    totalSpent: transactions
      .filter((t) => t.status === "completed")
      .reduce((acc, t) => acc + (t.amount || 0), 0),
  };

  // Filter & Search
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.ticketTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.paymentIntentId?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "all" || transaction.status === filter;

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Transactions | Book Now</title>
        <meta name="description" content="View your payment history and transactions." />
      </Helmet>

      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
            Transaction History
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">Your payment history</p>
        </div>

        {/* Stats Cards - Responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-md text-left transition-all hover:shadow-lg ${
              filter === "all" ? "ring-2 ring-primary" : ""
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                <FaCreditCard className="text-primary text-sm sm:text-base" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {stats.total}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Total</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setFilter("completed")}
            className={`bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-md text-left transition-all hover:shadow-lg ${
              filter === "completed" ? "ring-2 ring-success" : ""
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                <FaCheckCircle className="text-success text-sm sm:text-base" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-success">{stats.completed}</p>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Completed</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setFilter("pending")}
            className={`bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-md text-left transition-all hover:shadow-lg ${
              filter === "pending" ? "ring-2 ring-warning" : ""
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg flex items-center justify-center">
                <FaClock className="text-warning text-sm sm:text-base" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-warning">{stats.pending}</p>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Pending</p>
              </div>
            </div>
          </button>

          {/* Total Spent Card - Not clickable */}
          <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-3 sm:p-4 shadow-md text-white">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <FaDollarSign className="text-white text-sm sm:text-base" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold">${stats.totalSpent}</p>
                <p className="text-[10px] sm:text-xs text-white/80">Total Spent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ticket title or transaction ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Transactions - Responsive: Cards on Mobile, Table on Desktop */}
        {filteredTransactions.length > 0 ? (
          <>
            {/* Mobile Card View */}
            <div className="block lg:hidden space-y-4">
              {filteredTransactions.map((transaction) => {
                const status = getStatusBadge(transaction.status);
                return (
                  <div
                    key={transaction._id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden"
                  >
                    {/* Card Header - Status & Amount */}
                    <div
                      className={`px-4 py-3 flex items-center justify-between ${
                        transaction.status === "completed"
                          ? "bg-green-50 dark:bg-green-900/20"
                          : "bg-yellow-50 dark:bg-yellow-900/20"
                      }`}
                    >
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${status.bg}`}
                      >
                        {status.icon}
                        {transaction.status?.toUpperCase()}
                      </span>
                      <span className="text-2xl font-bold gradient-text">${transaction.amount}</span>
                    </div>

                    {/* Card Body */}
                    <div className="p-4">
                      {/* Transaction ID */}
                      <div className="flex items-center gap-2 mb-3">
                        <FaReceipt className="text-gray-400 text-xs flex-shrink-0" />
                        <span className="font-mono text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded truncate">
                          {transaction.paymentIntentId?.slice(-16) || "N/A"}
                        </span>
                      </div>

                      {/* Ticket Title */}
                      <div className="flex items-center gap-2 mb-3">
                        <FaTicketAlt className="text-primary text-xs flex-shrink-0" />
                        <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm truncate">
                          {transaction.ticketTitle || "N/A"}
                        </span>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                          <FaDollarSign className="text-green-500 text-sm mx-auto mb-1" />
                          <p className="font-bold text-gray-800 dark:text-gray-100 text-lg">
                            ${transaction.amount}
                          </p>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400">Amount</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                          <FaCalendarAlt className="text-blue-500 text-sm mx-auto mb-1" />
                          <p className="font-bold text-gray-800 dark:text-gray-100 text-xs">
                            {formatShortDate(transaction.createdAt)}
                          </p>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400">Date</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Mobile Footer */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Showing <span className="font-bold text-primary">{filteredTransactions.length}</span> of{" "}
                  <span className="font-bold">{transactions.length}</span> transactions
                  {filter !== "all" && (
                    <span className="block sm:inline sm:ml-1">
                      (filtered by <span className="capitalize font-medium">{filter}</span>)
                    </span>
                  )}
                </p>
                {filter !== "all" && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
                    Filtered Total:{" "}
                    <span className="font-bold text-success">
                      $
                      {filteredTransactions
                        .filter((t) => t.status === "completed")
                        .reduce((acc, t) => acc + (t.amount || 0), 0)}
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-primary to-secondary text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">
                        Transaction ID
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">
                        Ticket Title
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">
                        Payment Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {filteredTransactions.map((transaction, index) => {
                      const status = getStatusBadge(transaction.status);
                      return (
                        <tr
                          key={transaction._id}
                          className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                            index % 2 === 0
                              ? "bg-white dark:bg-gray-800"
                              : "bg-gray-50/50 dark:bg-gray-700/50"
                          }`}
                        >
                          {/* Transaction ID */}
                          <td className="px-6 py-4">
                            <span className="font-mono text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                              {transaction.paymentIntentId?.slice(-12) || "N/A"}
                            </span>
                          </td>

                          {/* Ticket Title */}
                          <td className="px-6 py-4">
                            <span className="font-medium text-gray-800 dark:text-gray-100">
                              {transaction.ticketTitle || "N/A"}
                            </span>
                          </td>

                          {/* Amount */}
                          <td className="px-6 py-4">
                            <span className="font-bold gradient-text text-lg">${transaction.amount}</span>
                          </td>

                          {/* Payment Date */}
                          <td className="px-6 py-4">
                            <span className="text-gray-600 dark:text-gray-400">
                              {formatDate(transaction.createdAt)}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${status.bg}`}
                            >
                              {status.icon}
                              {transaction.status?.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex flex-wrap justify-between items-center gap-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing <span className="font-bold text-primary">{filteredTransactions.length}</span> of{" "}
                  <span className="font-bold">{transactions.length}</span> transactions
                  {filter !== "all" && (
                    <span className="ml-2">
                      (filtered by <span className="capitalize font-medium">{filter}</span>)
                    </span>
                  )}
                </p>
                {filter !== "all" && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Filtered Total:{" "}
                    <span className="font-bold text-success">
                      $
                      {filteredTransactions
                        .filter((t) => t.status === "completed")
                        .reduce((acc, t) => acc + (t.amount || 0), 0)}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          // Empty State
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 sm:p-12 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCreditCard className="text-gray-400 text-2xl sm:text-3xl" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              No Transactions Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              {searchTerm || filter !== "all"
                ? "Try adjusting your search or filter"
                : "Your payment history will appear here"}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Transactions;
