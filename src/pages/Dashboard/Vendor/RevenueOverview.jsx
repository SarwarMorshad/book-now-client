import { useState, useEffect } from "react";
import { FaDollarSign, FaTicketAlt, FaShoppingCart, FaChartLine } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import api from "../../../services/api";
import Loading from "../../../components/shared/Loading";

const RevenueOverview = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalTicketsSold: 0,
    totalTicketsAdded: 0,
    totalBookings: 0,
    pendingBookings: 0,
    acceptedBookings: 0,
    paidBookings: 0,
    rejectedBookings: 0,
  });
  const [tickets, setTickets] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch vendor's tickets
      const ticketsRes = await api.get("/tickets/vendor/my-tickets");
      const ticketsData = ticketsRes.data.tickets || [];

      // Fetch vendor's bookings
      const bookingsRes = await api.get("/bookings/vendor/requests");
      const bookingsData = bookingsRes.data.bookings || [];

      setTickets(ticketsData);
      setBookings(bookingsData);

      // Calculate stats
      const paidBookings = bookingsData.filter((b) => b.status === "paid");
      const totalRevenue = paidBookings.reduce((sum, b) => sum + b.totalPrice, 0);
      const totalTicketsSold = paidBookings.reduce((sum, b) => sum + b.quantity, 0);

      setStats({
        totalRevenue,
        totalTicketsSold,
        totalTicketsAdded: ticketsData.length,
        totalBookings: bookingsData.length,
        pendingBookings: bookingsData.filter((b) => b.status === "pending").length,
        acceptedBookings: bookingsData.filter((b) => b.status === "accepted").length,
        paidBookings: paidBookings.length,
        rejectedBookings: bookingsData.filter((b) => b.status === "rejected").length,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart data
  const bookingStatusData = [
    { name: "Pending", value: stats.pendingBookings, color: "#FBBF24" },
    { name: "Accepted", value: stats.acceptedBookings, color: "#3B82F6" },
    { name: "Paid", value: stats.paidBookings, color: "#10B981" },
    { name: "Rejected", value: stats.rejectedBookings, color: "#EF4444" },
  ].filter((item) => item.value > 0);

  // Ticket sales data (top 5 tickets by revenue)
  const ticketSalesData = tickets
    .map((ticket) => {
      const ticketBookings = bookings.filter(
        (b) => b.ticketId?.toString() === ticket._id?.toString() && b.status === "paid"
      );
      const revenue = ticketBookings.reduce((sum, b) => sum + b.totalPrice, 0);
      const sold = ticketBookings.reduce((sum, b) => sum + b.quantity, 0);
      return {
        name: ticket.title?.length > 15 ? ticket.title.substring(0, 15) + "..." : ticket.title,
        revenue,
        sold,
      };
    })
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Monthly revenue data (last 6 months)
  const getMonthlyData = () => {
    const months = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleString("default", { month: "short" });
      const year = date.getFullYear();
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const monthBookings = bookings.filter((b) => {
        const bookingDate = new Date(b.createdAt);
        return b.status === "paid" && bookingDate >= monthStart && bookingDate <= monthEnd;
      });

      const revenue = monthBookings.reduce((sum, b) => sum + b.totalPrice, 0);
      const sales = monthBookings.reduce((sum, b) => sum + b.quantity, 0);

      months.push({
        name: `${monthName} ${year}`,
        revenue,
        sales,
      });
    }

    return months;
  };

  const monthlyData = getMonthlyData();

  // Ticket status data
  const ticketStatusData = [
    {
      name: "Approved",
      value: tickets.filter((t) => t.verificationStatus === "approved").length,
      color: "#10B981",
    },
    {
      name: "Pending",
      value: tickets.filter((t) => t.verificationStatus === "pending").length,
      color: "#FBBF24",
    },
    {
      name: "Rejected",
      value: tickets.filter((t) => t.verificationStatus === "rejected").length,
      color: "#EF4444",
    },
  ].filter((item) => item.value > 0);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Revenue Overview</h1>
        <p className="text-gray-600 mt-1">Track your sales and performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold mt-1">${stats.totalRevenue}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <FaDollarSign className="text-2xl" />
            </div>
          </div>
        </div>

        {/* Total Tickets Sold */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Tickets Sold</p>
              <p className="text-3xl font-bold mt-1">{stats.totalTicketsSold}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <FaShoppingCart className="text-2xl" />
            </div>
          </div>
        </div>

        {/* Total Tickets Added */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Tickets Added</p>
              <p className="text-3xl font-bold mt-1">{stats.totalTicketsAdded}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <FaTicketAlt className="text-2xl" />
            </div>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Total Bookings</p>
              <p className="text-3xl font-bold mt-1">{stats.totalBookings}</p>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <FaChartLine className="text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Monthly Revenue & Sales</h3>
          {monthlyData.some((m) => m.revenue > 0 || m.sales > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "none",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: "#10B981", strokeWidth: 2 }}
                  name="Revenue ($)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="sales"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: "#3B82F6", strokeWidth: 2 }}
                  name="Tickets Sold"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              No revenue data yet
            </div>
          )}
        </div>

        {/* Booking Status Pie Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Booking Status Distribution</h3>
          {bookingStatusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bookingStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {bookingStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              No booking data yet
            </div>
          )}
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Tickets */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Top Selling Tickets</h3>
          {ticketSalesData.some((t) => t.revenue > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ticketSalesData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "none",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="revenue" fill="url(#colorRevenue)" radius={[0, 10, 10, 0]} name="Revenue ($)" />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">No sales data yet</div>
          )}
        </div>

        {/* Ticket Status Pie Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Ticket Verification Status</h3>
          {ticketStatusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ticketStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {ticketStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">No ticket data yet</div>
          )}
        </div>
      </div>

      {/* Quick Stats Table */}
      <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-yellow-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.pendingBookings}</p>
            <p className="text-sm text-yellow-700">Pending Bookings</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.acceptedBookings}</p>
            <p className="text-sm text-blue-700">Accepted Bookings</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.paidBookings}</p>
            <p className="text-sm text-green-700">Paid Bookings</p>
          </div>
          <div className="bg-red-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{stats.rejectedBookings}</p>
            <p className="text-sm text-red-700">Rejected Bookings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueOverview;
