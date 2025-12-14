import { useState, useEffect } from "react";
import { getUserTransactions } from "../../../services/paymentService";
import Loading from "../../../components/shared/Loading";
import { FaCreditCard, FaCheckCircle, FaReceipt } from "react-icons/fa";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await getUserTransactions();
      if (response.success) {
        setTransactions(response.transactions);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Transactions</h1>
          <p className="text-gray-600 mt-1">Your payment history</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FaCreditCard className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-800">{transactions.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FaCheckCircle className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-gray-800">
                  {transactions.filter((t) => t.status === "completed").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <FaReceipt className="text-orange-600 text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Spent</p>
                <p className="text-2xl font-bold gradient-text">
                  ${transactions.reduce((acc, t) => acc + t.amount, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        {transactions.length > 0 ? (
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction._id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left - Transaction Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <FaCheckCircle className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Payment Successful</p>
                      <p className="text-sm text-gray-500">{formatDate(transaction.createdAt)}</p>
                    </div>
                  </div>

                  {/* Right - Amount */}
                  <div className="text-right">
                    <p className="text-2xl font-bold gradient-text">${transaction.amount}</p>
                    <p className="text-xs text-gray-500 font-mono truncate max-w-[200px]">
                      ID: {transaction.paymentIntentId?.slice(-12) || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      transaction.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {transaction.status?.charAt(0).toUpperCase() + transaction.status?.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCreditCard className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Transactions Yet</h3>
            <p className="text-gray-600">Your payment history will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
