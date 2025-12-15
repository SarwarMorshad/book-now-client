import { useState, useEffect } from "react";
import { FaUser, FaUserShield, FaStore, FaBan, FaSearch, FaUserMinus } from "react-icons/fa";
import api from "../../../services/api";
import Loading from "../../../components/shared/Loading";
import ConfirmModal from "../../../components/modals/ConfirmModal";
import ResultModal from "../../../components/modals/ResultModal";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
          Are you sure you want to change <strong>{userName}</strong>'s role to{" "}
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
          <div className="bg-red-50 p-3 rounded-xl text-left text-sm">
            <p className="text-red-700 font-semibold mb-1">⚠️ This will:</p>
            <ul className="text-red-600 list-disc list-inside">
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
                <strong>{userName}</strong>'s fraud status has been removed.
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
      return "bg-red-100 text-red-700";
    }
    const badges = {
      admin: "bg-purple-100 text-purple-700",
      vendor: "bg-blue-100 text-blue-700",
      user: "bg-gray-100 text-gray-700",
    };
    return badges[role] || "bg-gray-100 text-gray-700";
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

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
        <p className="text-gray-600 mt-1">Manage user roles and permissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold text-gray-800">{users.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md">
          <p className="text-sm text-gray-500">Admins</p>
          <p className="text-2xl font-bold text-purple-600">
            {users.filter((u) => u.role === "admin").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md">
          <p className="text-sm text-gray-500">Vendors</p>
          <p className="text-2xl font-bold text-primary">{users.filter((u) => u.role === "vendor").length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md">
          <p className="text-sm text-gray-500">Fraud Vendors</p>
          <p className="text-2xl font-bold text-error">{users.filter((u) => u.isFraud).length}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Users Table */}
      {filteredUsers.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-primary to-secondary text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Joined</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                    } ${user.isFraud ? "bg-red-50" : ""} ${isCurrentUser(user._id) ? "bg-yellow-50" : ""}`}
                  >
                    {/* User */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                          {user.photoURL ? (
                            <img src={user.photoURL} alt={user.name} className="w-full h-full object-cover" />
                          ) : (
                            <FaUser className="text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {user.name || "N/A"}
                            {isCurrentUser(user._id) && (
                              <span className="ml-2 text-xs text-yellow-600 font-semibold">(You)</span>
                            )}
                          </p>
                          {user.isFraud && <span className="text-xs text-error font-semibold">⚠️ FRAUD</span>}
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4">
                      <span className="text-gray-600">{user.email}</span>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getRoleBadge(
                          user.role,
                          user.isFraud
                        )}`}
                      >
                        {user.isFraud ? "FRAUD" : user.role?.toUpperCase()}
                      </span>
                    </td>

                    {/* Joined */}
                    <td className="px-6 py-4">
                      <span className="text-gray-600">{formatDate(user.createdAt)}</span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      {isCurrentUser(user._id) ? (
                        <span className="text-gray-400 text-sm italic">Cannot modify yourself</span>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {user.role !== "admin" && (
                            <button
                              onClick={() => handleChangeRole(user._id, "admin", user.name)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all text-sm"
                            >
                              <FaUserShield className="text-xs" />
                              Make Admin
                            </button>
                          )}

                          {user.role !== "vendor" && !user.isFraud && (
                            <button
                              onClick={() => handleChangeRole(user._id, "vendor", user.name)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-primary rounded-lg hover:bg-blue-200 transition-all text-sm"
                            >
                              <FaStore className="text-xs" />
                              Make Vendor
                            </button>
                          )}

                          {user.role !== "user" && (
                            <button
                              onClick={() => handleChangeRole(user._id, "user", user.name)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm"
                            >
                              <FaUserMinus className="text-xs" />
                              Make User
                            </button>
                          )}

                          {user.role === "vendor" && !user.isFraud && (
                            <button
                              onClick={() => handleMarkAsFraud(user._id, user.name)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-error rounded-lg hover:bg-red-200 transition-all text-sm"
                            >
                              <FaBan className="text-xs" />
                              Mark Fraud
                            </button>
                          )}

                          {user.isFraud && (
                            <button
                              onClick={() => handleRemoveFraud(user._id, user.name)}
                              className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-success rounded-lg hover:bg-green-200 transition-all text-sm"
                            >
                              Remove Fraud
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
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUser className="text-gray-400 text-3xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Users Found</h3>
          <p className="text-gray-600">
            {searchTerm ? "Try a different search term" : "No users registered yet"}
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
  );
};

export default ManageUsers;
