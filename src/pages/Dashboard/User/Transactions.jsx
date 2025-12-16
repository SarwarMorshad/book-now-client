import { useState, useEffect } from "react";
import { FaCreditCard, FaCheckCircle, FaReceipt, FaSearch, FaClock, FaDollarSign } from "react-icons/fa";
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
        <title>Transactions</title>
        <meta name="description" content="Browse all transactions in the Book Now collection." />
      </Helmet>
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Transaction History</h1>
          <p className="text-gray-600 mt-1">Your payment history</p>
        </div>

        {/* Stats Cards - Clickable */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`bg-white rounded-xl p-4 shadow-md text-left transition-all hover:shadow-lg ${
              filter === "all" ? "ring-2 ring-primary" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaCreditCard className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                <p className="text-xs text-gray-500">Total</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setFilter("completed")}
            className={`bg-white rounded-xl p-4 shadow-md text-left transition-all hover:shadow-lg ${
              filter === "completed" ? "ring-2 ring-success" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FaCheckCircle className="text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-success">{stats.completed}</p>
                <p className="text-xs text-gray-500">Completed</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setFilter("pending")}
            className={`bg-white rounded-xl p-4 shadow-md text-left transition-all hover:shadow-lg ${
              filter === "pending" ? "ring-2 ring-warning" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FaClock className="text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warning">{stats.pending}</p>
                <p className="text-xs text-gray-500">Pending</p>
              </div>
            </div>
          </button>

          {/* Total Spent Card - Not clickable */}
          <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-4 shadow-md text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <FaDollarSign className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">${stats.totalSpent}</p>
                <p className="text-xs text-white/80">Total Spent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ticket title or transaction ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Transactions Table */}
        {filteredTransactions.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-primary to-secondary text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Transaction ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Ticket Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Payment Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredTransactions.map((transaction, index) => (
                    <tr
                      key={transaction._id}
                      className={`hover:bg-gray-50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      {/* Transaction ID */}
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {transaction.paymentIntentId?.slice(-12) || "N/A"}
                        </span>
                      </td>

                      {/* Ticket Title */}
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-800">{transaction.ticketTitle || "N/A"}</span>
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-4">
                        <span className="font-bold gradient-text text-lg">${transaction.amount}</span>
                      </td>

                      {/* Payment Date */}
                      <td className="px-6 py-4">
                        <span className="text-gray-600">{formatDate(transaction.createdAt)}</span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            transaction.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {transaction.status?.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-wrap justify-between items-center gap-4">
              <p className="text-sm text-gray-600">
                Showing <span className="font-bold text-primary">{filteredTransactions.length}</span> of{" "}
                <span className="font-bold">{transactions.length}</span> transactions
                {filter !== "all" && (
                  <span className="ml-2">
                    (filtered by <span className="capitalize font-medium">{filter}</span>)
                  </span>
                )}
              </p>
              {filter !== "all" && (
                <p className="text-sm text-gray-600">
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
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCreditCard className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Transactions Found</h3>
            <p className="text-gray-600">
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
