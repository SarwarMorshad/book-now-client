import { useState, useEffect } from "react";
import {
  FaUser,
  FaUserShield,
  FaStore,
  FaBan,
  FaSearch,
  FaUserMinus,
  FaUsers,
  FaCrown,
  FaExclamationTriangle,
  FaEnvelope,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import api from "../../../services/api";
import Loading from "../../../components/shared/Loading";
import ConfirmModal from "../../../components/modals/ConfirmModal";
import ResultModal from "../../../components/modals/ResultModal";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Modal states
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "question",
    confirmText: "",
    onConfirm: null,
  });

  const [resultModal, setResultModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/users");
      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const showConfirm = (config) => {
    setConfirmModal({ isOpen: true, ...config });
  };

  const closeConfirm = () => {
    setConfirmModal({ ...confirmModal, isOpen: false });
  };

  const showResult = (title, message, type = "success") => {
    setResultModal({ isOpen: true, title, message, type });
  };

  const closeResult = () => {
    setResultModal({ ...resultModal, isOpen: false });
  };

  const handleChangeRole = (userId, newRole, userName) => {
    const roleLabels = {
      admin: "Admin",
      vendor: "Vendor",
      user: "User",
    };

    const roleTypes = {
      admin: "question",
      vendor: "question",
      user: "warning",
    };

    showConfirm({
      title: "Change User Role?",
      message: (
        <p>
          Are you sure you want to change <strong>{userName}</strong>&apos;s role to{" "}
          <strong className="text-primary">{roleLabels[newRole]}</strong>?
        </p>
      ),
      type: roleTypes[newRole],
      confirmText: `Yes, Make ${roleLabels[newRole]}`,
      onConfirm: async () => {
        try {
          setActionLoading(true);
          const response = await api.patch(`/admin/users/${userId}/role`, {
            role: newRole,
          });

          if (response.data.success) {
            setUsers(users.map((u) => (u._id === userId ? { ...u, role: newRole } : u)));
            closeConfirm();
            showResult(
              "Role Updated!",
              <p>
                <strong>{userName}</strong> is now a <strong>{roleLabels[newRole]}</strong>
              </p>
            );
          }
        } catch (error) {
          console.error("Error:", error);
          closeConfirm();
          showResult("Error!", error.response?.data?.message || "Failed to update role", "error");
        } finally {
          setActionLoading(false);
        }
      },
    });
  };

  const handleMarkAsFraud = (userId, userName) => {
    showConfirm({
      title: "Mark as Fraud?",
      message: (
        <div>
          <p className="mb-3">
            Are you sure you want to mark <strong>{userName}</strong> as{" "}
            <span className="text-error font-bold">FRAUD</span>?
          </p>
          <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-xl text-left text-sm">
            <p className="text-red-700 dark:text-red-400 font-semibold mb-1">⚠️ This will:</p>
            <ul className="text-red-600 dark:text-red-400 list-disc list-inside">
              <li>Hide all their tickets from public</li>
              <li>Prevent them from adding new tickets</li>
            </ul>
          </div>
        </div>
      ),
      type: "danger",
      confirmText: "Yes, Mark as Fraud",
      onConfirm: async () => {
        try {
          setActionLoading(true);
          const response = await api.patch(`/admin/users/${userId}/fraud`);

          if (response.data.success) {
            setUsers(users.map((u) => (u._id === userId ? { ...u, isFraud: true } : u)));
            closeConfirm();
            showResult(
              "Marked as Fraud!",
              <p>
                <strong>{userName}</strong> has been marked as fraud. All their tickets are now hidden.
              </p>
            );
          }
        } catch (error) {
          console.error("Error:", error);
          closeConfirm();
          showResult("Error!", error.response?.data?.message || "Failed to mark as fraud", "error");
        } finally {
          setActionLoading(false);
        }
      },
    });
  };

  const handleRemoveFraud = (userId, userName) => {
    showConfirm({
      title: "Remove Fraud Status?",
      message: (
        <p>
          Remove fraud status from <strong>{userName}</strong>? Their tickets will become visible again.
        </p>
      ),
      type: "success",
      confirmText: "Yes, Remove Fraud",
      onConfirm: async () => {
        try {
          setActionLoading(true);
          const response = await api.patch(`/admin/users/${userId}/remove-fraud`);

          if (response.data.success) {
            setUsers(users.map((u) => (u._id === userId ? { ...u, isFraud: false } : u)));
            closeConfirm();
            showResult(
              "Fraud Status Removed!",
              <p>
                <strong>{userName}</strong>&apos;s fraud status has been removed.
              </p>
            );
          }
        } catch (error) {
          console.error("Error:", error);
          closeConfirm();
          showResult("Error!", error.response?.data?.message || "Failed to remove fraud status", "error");
        } finally {
          setActionLoading(false);
        }
      },
    });
  };

  const getRoleBadge = (role, isFraud) => {
    if (isFraud) {
      return "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400";
    }
    const badges = {
      admin: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400",
      vendor: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400",
      user: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
    };
    return badges[role] || "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
  };

  const getRoleIcon = (role, isFraud) => {
    if (isFraud) {
      return <FaExclamationTriangle className="text-red-500" />;
    }
    const icons = {
      admin: <FaCrown className="text-purple-500" />,
      vendor: <FaStore className="text-blue-500" />,
      user: <FaUser className="text-gray-500" />,
    };
    return icons[role] || <FaUser className="text-gray-500" />;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isCurrentUser = (userId) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    return storedUser?._id === userId;
  };

  // Stats
  const stats = {
    total: users.length,
    admins: users.filter((u) => u.role === "admin").length,
    vendors: users.filter((u) => u.role === "vendor" && !u.isFraud).length,
    users: users.filter((u) => u.role === "user").length,
    fraud: users.filter((u) => u.isFraud).length,
  };

  // Filter & Search
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesFilter = true;
    if (filter === "all") {
      matchesFilter = true;
    } else if (filter === "admin") {
      matchesFilter = user.role === "admin";
    } else if (filter === "vendor") {
      matchesFilter = user.role === "vendor" && !user.isFraud;
    } else if (filter === "user") {
      matchesFilter = user.role === "user";
    } else if (filter === "fraud") {
      matchesFilter = user.isFraud === true;
    }

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Manage Users | Book Now</title>
        <meta name="description" content="Manage user roles and permissions on Book Now" />
      </Helmet>
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">Manage Users</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
            Manage user roles and permissions
          </p>
        </div>

        {/* Stats Cards - Responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-md text-left transition-all hover:shadow-lg ${
              filter === "all" ? "ring-2 ring-primary" : ""
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                <FaUsers className="text-primary text-sm sm:text-base" />
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
            onClick={() => setFilter("admin")}
            className={`bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-md text-left transition-all hover:shadow-lg ${
              filter === "admin" ? "ring-2 ring-purple-500" : ""
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
                <FaCrown className="text-purple-500 text-sm sm:text-base" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {stats.admins}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Admins</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setFilter("vendor")}
            className={`bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-md text-left transition-all hover:shadow-lg ${
              filter === "vendor" ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                <FaStore className="text-blue-500 text-sm sm:text-base" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.vendors}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Vendors</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setFilter("user")}
            className={`bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-md text-left transition-all hover:shadow-lg ${
              filter === "user" ? "ring-2 ring-gray-400" : ""
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <FaUser className="text-gray-500 text-sm sm:text-base" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-gray-600 dark:text-gray-300">
                  {stats.users}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Users</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setFilter("fraud")}
            className={`bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-md text-left transition-all hover:shadow-lg col-span-2 sm:col-span-1 ${
              filter === "fraud" ? "ring-2 ring-error" : ""
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 dark:bg-red-900/50 rounded-lg flex items-center justify-center">
                <FaExclamationTriangle className="text-error text-sm sm:text-base" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-error">{stats.fraud}</p>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Fraud</p>
              </div>
            </div>
          </button>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Users - Responsive: Cards on Mobile, Table on Desktop */}
        {filteredUsers.length > 0 ? (
          <>
            {/* Mobile Card View */}
            <div className="block lg:hidden space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className={`bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden ${
                    user.isFraud ? "ring-2 ring-red-500" : ""
                  } ${isCurrentUser(user._id) ? "ring-2 ring-yellow-500" : ""}`}
                >
                  {/* Card Header */}
                  <div
                    className={`p-4 ${
                      user.isFraud
                        ? "bg-red-50 dark:bg-red-900/30"
                        : isCurrentUser(user._id)
                          ? "bg-yellow-50 dark:bg-yellow-900/20"
                          : "bg-gray-50 dark:bg-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <FaUser className="text-gray-400 text-lg" />
                        )}
                      </div>

                      {/* Name & Role */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-gray-800 dark:text-gray-100 truncate">
                            {user.name || "N/A"}
                          </p>
                          {isCurrentUser(user._id) && (
                            <span className="text-[10px] bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400 px-1.5 py-0.5 rounded-full font-semibold">
                              You
                            </span>
                          )}
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold mt-1 ${getRoleBadge(
                            user.role,
                            user.isFraud
                          )}`}
                        >
                          {getRoleIcon(user.role, user.isFraud)}
                          {user.isFraud ? "FRAUD" : user.role?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4">
                    {/* Email */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <FaEnvelope className="text-gray-400 text-xs flex-shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </div>

                    {/* Joined Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <FaCalendarAlt className="text-gray-400 text-xs flex-shrink-0" />
                      <span>Joined {formatDate(user.createdAt)}</span>
                    </div>

                    {/* Fraud Warning */}
                    {user.isFraud && (
                      <div className="mb-4 p-2 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
                        <p className="text-xs text-red-700 dark:text-red-400 font-medium flex items-center gap-1">
                          <FaExclamationTriangle className="text-[10px]" />
                          This user is marked as FRAUD
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    {isCurrentUser(user._id) ? (
                      <div className="text-center py-2 text-gray-400 dark:text-gray-500 text-sm italic">
                        Cannot modify yourself
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {user.role !== "admin" && (
                          <button
                            onClick={() => handleChangeRole(user._id, "admin", user.name)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900 transition-all text-xs font-medium"
                          >
                            <FaUserShield className="text-[10px]" />
                            Admin
                          </button>
                        )}

                        {user.role !== "vendor" && !user.isFraud && (
                          <button
                            onClick={() => handleChangeRole(user._id, "vendor", user.name)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-100 dark:bg-blue-900/50 text-primary dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900 transition-all text-xs font-medium"
                          >
                            <FaStore className="text-[10px]" />
                            Vendor
                          </button>
                        )}

                        {user.role !== "user" && (
                          <button
                            onClick={() => handleChangeRole(user._id, "user", user.name)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-xs font-medium"
                          >
                            <FaUserMinus className="text-[10px]" />
                            User
                          </button>
                        )}

                        {user.role === "vendor" && !user.isFraud && (
                          <button
                            onClick={() => handleMarkAsFraud(user._id, user.name)}
                            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-red-100 dark:bg-red-900/50 text-error dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900 transition-all text-xs font-medium mt-1"
                          >
                            <FaBan className="text-[10px]" />
                            Mark as Fraud
                          </button>
                        )}

                        {user.isFraud && (
                          <button
                            onClick={() => handleRemoveFraud(user._id, user.name)}
                            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-green-100 dark:bg-green-900/50 text-success dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900 transition-all text-xs font-medium"
                          >
                            <FaCheckCircle className="text-[10px]" />
                            Remove Fraud Status
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Mobile Footer */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Showing <span className="font-bold text-primary">{filteredUsers.length}</span> of{" "}
                  <span className="font-bold">{users.length}</span> users
                  {filter !== "all" && (
                    <span className="block sm:inline sm:ml-1">
                      (filtered by <span className="capitalize font-medium">{filter}</span>)
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-primary to-secondary text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">User</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Joined</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {filteredUsers.map((user, index) => (
                      <tr
                        key={user._id}
                        className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                          index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50/50 dark:bg-gray-700/50"
                        } ${user.isFraud ? "!bg-red-50 dark:!bg-red-900/20" : ""} ${
                          isCurrentUser(user._id) ? "!bg-yellow-50 dark:!bg-yellow-900/20" : ""
                        }`}
                      >
                        {/* User */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                              {user.photoURL ? (
                                <img
                                  src={user.photoURL}
                                  alt={user.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <FaUser className="text-gray-400" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800 dark:text-gray-100">
                                {user.name || "N/A"}
                                {isCurrentUser(user._id) && (
                                  <span className="ml-2 text-xs text-yellow-600 dark:text-yellow-400 font-semibold">
                                    (You)
                                  </span>
                                )}
                              </p>
                              {user.isFraud && (
                                <span className="text-xs text-error font-semibold">⚠️ FRAUD</span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-6 py-4">
                          <span className="text-gray-600 dark:text-gray-400">{user.email}</span>
                        </td>

                        {/* Role */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${getRoleBadge(
                              user.role,
                              user.isFraud
                            )}`}
                          >
                            {getRoleIcon(user.role, user.isFraud)}
                            {user.isFraud ? "FRAUD" : user.role?.toUpperCase()}
                          </span>
                        </td>

                        {/* Joined */}
                        <td className="px-6 py-4">
                          <span className="text-gray-600 dark:text-gray-400">
                            {formatDate(user.createdAt)}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          {isCurrentUser(user._id) ? (
                            <span className="text-gray-400 dark:text-gray-500 text-sm italic">
                              Cannot modify yourself
                            </span>
                          ) : (
                            <div className="flex flex-wrap gap-1">
                              {user.role !== "admin" && (
                                <button
                                  onClick={() => handleChangeRole(user._id, "admin", user.name)}
                                  className="flex items-center gap-1 px-2 py-1.5 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900 transition-all text-xs"
                                >
                                  <FaUserShield className="text-[10px]" />
                                  Admin
                                </button>
                              )}

                              {user.role !== "vendor" && !user.isFraud && (
                                <button
                                  onClick={() => handleChangeRole(user._id, "vendor", user.name)}
                                  className="flex items-center gap-1 px-2 py-1.5 bg-blue-100 dark:bg-blue-900/50 text-primary dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900 transition-all text-xs"
                                >
                                  <FaStore className="text-[10px]" />
                                  Vendor
                                </button>
                              )}

                              {user.role !== "user" && (
                                <button
                                  onClick={() => handleChangeRole(user._id, "user", user.name)}
                                  className="flex items-center gap-1 px-2 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-xs"
                                >
                                  <FaUserMinus className="text-[10px]" />
                                  User
                                </button>
                              )}

                              {user.role === "vendor" && !user.isFraud && (
                                <button
                                  onClick={() => handleMarkAsFraud(user._id, user.name)}
                                  className="flex items-center gap-1 px-2 py-1.5 bg-red-100 dark:bg-red-900/50 text-error dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900 transition-all text-xs"
                                >
                                  <FaBan className="text-[10px]" />
                                  Fraud
                                </button>
                              )}

                              {user.isFraud && (
                                <button
                                  onClick={() => handleRemoveFraud(user._id, user.name)}
                                  className="flex items-center gap-1 px-2 py-1.5 bg-green-100 dark:bg-green-900/50 text-success dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900 transition-all text-xs"
                                >
                                  <FaCheckCircle className="text-[10px]" />
                                  Remove
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing <span className="font-bold text-primary">{filteredUsers.length}</span> of{" "}
                  <span className="font-bold">{users.length}</span> users
                  {filter !== "all" && (
                    <span className="ml-2">
                      (filtered by <span className="capitalize font-medium">{filter}</span>)
                    </span>
                  )}
                </p>
              </div>
            </div>
          </>
        ) : (
          // Empty State
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 sm:p-12 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUser className="text-gray-400 text-2xl sm:text-3xl" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              No Users Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              {searchTerm || filter !== "all"
                ? "Try adjusting your search or filter"
                : "No users registered yet"}
            </p>
          </div>
        )}

        {/* Confirm Modal */}
        <ConfirmModal
          isOpen={confirmModal.isOpen}
          onClose={closeConfirm}
          onConfirm={confirmModal.onConfirm}
          title={confirmModal.title}
          message={confirmModal.message}
          type={confirmModal.type}
          confirmText={confirmModal.confirmText}
          loading={actionLoading}
        />

        {/* Result Modal */}
        <ResultModal
          isOpen={resultModal.isOpen}
          onClose={closeResult}
          title={resultModal.title}
          message={resultModal.message}
          type={resultModal.type}
        />
      </div>
    </>
  );
};

export default ManageUsers;
