import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaCalendar, FaEdit, FaSave, FaTimes } from "react-icons/fa";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    photoURL: user?.photoURL || "",
  });

  const getDefaultAvatar = (name) => {
    const initial = name ? name.charAt(0).toUpperCase() : "U";
    return `https://ui-avatars.com/api/?name=${initial}&background=3b82f6&color=fff&bold=true&size=200`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUserProfile(formData.name, formData.photoURL);
      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      photoURL: user?.photoURL || "",
    });
    setIsEditing(false);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-primary to-secondary"></div>

          {/* Avatar & Info */}
          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="absolute -top-16 left-6">
              <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-white">
                <img
                  src={user?.photoURL || getDefaultAvatar(user?.name)}
                  alt={user?.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = getDefaultAvatar(user?.name);
                  }}
                />
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex justify-end pt-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 transition-all"
                >
                  <FaEdit />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-700 transition-all"
                  >
                    <FaTimes />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="mt-8">
              {!isEditing ? (
                <div className="space-y-6">
                  {/* Name */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FaUser className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="text-lg font-semibold text-gray-800">{user?.name}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <FaEnvelope className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="text-lg font-semibold text-gray-800">{user?.email}</p>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <span className="text-xl">🎭</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Account Type</p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          user?.role === "admin"
                            ? "bg-red-100 text-red-700"
                            : user?.role === "vendor"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Member Since */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <FaCalendar className="text-orange-600 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {user?.createdAt ? formatDate(user.createdAt) : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Edit Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-all"
                      required
                    />
                  </div>

                  {/* Photo URL Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Photo URL</label>
                    <input
                      type="url"
                      name="photoURL"
                      value={formData.photoURL}
                      onChange={handleChange}
                      placeholder="https://example.com/your-photo.jpg"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">Leave empty to use default avatar</p>
                  </div>

                  {/* Preview */}
                  {formData.photoURL && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                      <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-gray-200">
                        <img
                          src={formData.photoURL}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = getDefaultAvatar(formData.name);
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave />
                        Save Changes
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
