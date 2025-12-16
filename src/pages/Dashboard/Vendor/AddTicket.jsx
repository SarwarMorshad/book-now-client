import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addTicket } from "../../../services/ticketService";
import toast from "react-hot-toast";
import {
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaWifi,
  FaSnowflake,
  FaUtensils,
  FaPlug,
  FaTv,
  FaToilet,
  FaSuitcase,
  FaCouch,
  FaHeadphones,
  FaShieldAlt,
  FaParking,
  FaCoffee,
} from "react-icons/fa";
import { MdAirlineSeatReclineExtra, MdPets, MdLocalLaundryService } from "react-icons/md";
import { AuthContext } from "../../../context/AuthContext";

const AddTicket = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [selectedPerks, setSelectedPerks] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      transportType: "bus",
    },
  });

  const transportType = watch("transportType", "bus");

  // Available perks with icons
  const availablePerks = [
    { id: "ac", label: "Air Conditioning", icon: <FaSnowflake /> },
    { id: "wifi", label: "Free WiFi", icon: <FaWifi /> },
    { id: "meals", label: "Meals Included", icon: <FaUtensils /> },
    { id: "charging", label: "Charging Ports", icon: <FaPlug /> },
    { id: "entertainment", label: "Entertainment", icon: <FaTv /> },
    { id: "toilet", label: "Onboard Toilet", icon: <FaToilet /> },
    { id: "luggage", label: "Extra Luggage", icon: <FaSuitcase /> },
    { id: "reclining", label: "Reclining Seats", icon: <MdAirlineSeatReclineExtra /> },
    { id: "blanket", label: "Blanket & Pillow", icon: <FaCouch /> },
    { id: "headphones", label: "Headphones", icon: <FaHeadphones /> },
    { id: "insurance", label: "Travel Insurance", icon: <FaShieldAlt /> },
    { id: "parking", label: "Free Parking", icon: <FaParking /> },
    { id: "snacks", label: "Snacks & Drinks", icon: <FaCoffee /> },
    { id: "pets", label: "Pet Friendly", icon: <MdPets /> },
    { id: "laundry", label: "Laundry Service", icon: <MdLocalLaundryService /> },
  ];

  // Handle perk toggle
  const handlePerkToggle = (perkLabel) => {
    setSelectedPerks((prev) =>
      prev.includes(perkLabel) ? prev.filter((p) => p !== perkLabel) : [...prev, perkLabel]
    );
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);

      const ticketData = {
        title: data.title,
        fromLocation: data.fromLocation,
        toLocation: data.toLocation,
        transportType: data.transportType,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity),
        departureDate: data.departureDate,
        departureTime: data.departureTime,
        perks: selectedPerks,
        imageUrl: "",
        vendorName: user.name,
        vendorEmail: user.email,
      };

      const response = await addTicket(ticketData);

      if (response.success) {
        toast.success("Ticket added successfully! Waiting for admin approval.");
        navigate("/dashboard/vendor/my-tickets");
      }
    } catch (error) {
      console.error("Add ticket error:", error);
      toast.error(error.response?.data?.message || "Failed to add ticket. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const transportTypes = [
    { value: "bus", label: "Bus", icon: <FaBus className="text-xl" />, color: "blue" },
    { value: "train", label: "Train", icon: <FaTrain className="text-xl" />, color: "green" },
    { value: "launch", label: "Launch", icon: <FaShip className="text-xl" />, color: "cyan" },
    { value: "plane", label: "Plane", icon: <FaPlane className="text-xl" />, color: "orange" },
  ];

  const getTransportColor = (type, isSelected) => {
    const colors = {
      bus: isSelected
        ? "bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/30"
        : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30",
      train: isSelected
        ? "bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/30"
        : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/30",
      launch: isSelected
        ? "bg-cyan-500 text-white border-cyan-500 shadow-lg shadow-cyan-500/30"
        : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/30",
      plane: isSelected
        ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/30"
        : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30",
    };
    return colors[type];
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Add New Ticket</h1>
          <p className="text-gray-600 dark:text-gray-400">Create a new travel ticket for customers</p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Transport Type Selection - Card Style */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-4">
                Select Transport Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {transportTypes.map((type) => (
                  <label
                    key={type.value}
                    className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${getTransportColor(
                      type.value,
                      transportType === type.value
                    )}`}
                  >
                    <input
                      type="radio"
                      value={type.value}
                      className="sr-only"
                      {...register("transportType", {
                        required: "Transport type is required",
                      })}
                    />
                    <div
                      className={`text-3xl mb-2 ${
                        transportType === type.value ? "text-white" : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {type.icon}
                    </div>
                    <span
                      className={`font-semibold ${
                        transportType === type.value ? "text-white" : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {type.label}
                    </span>
                    {/* Selected indicator */}
                    {transportType === type.value && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                    )}
                  </label>
                ))}
              </div>
              {errors.transportType && (
                <p className="text-error text-sm mt-2">{errors.transportType.message}</p>
              )}
            </div>

            {/* Ticket Title and Seats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                  Ticket Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Dhaka to Chittagong Express"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition-all ${
                    errors.title
                      ? "border-error"
                      : "border-gray-300 dark:border-gray-600 focus:border-primary"
                  }`}
                  {...register("title", {
                    required: "Title is required",
                    minLength: {
                      value: 5,
                      message: "Title must be at least 5 characters",
                    },
                  })}
                />
                {errors.title && <p className="text-error text-sm mt-1">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                  Available Seats
                </label>
                <input
                  type="number"
                  placeholder="e.g., 40"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition-all ${
                    errors.quantity
                      ? "border-error"
                      : "border-gray-300 dark:border-gray-600 focus:border-primary"
                  }`}
                  {...register("quantity", {
                    required: "Quantity is required",
                    min: { value: 1, message: "Quantity must be at least 1" },
                  })}
                />
                {errors.quantity && <p className="text-error text-sm mt-1">{errors.quantity.message}</p>}
              </div>
            </div>

            {/* Route Details */}
            <div className="pt-2">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                  📍
                </span>
                Route Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    From Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Dhaka"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition-all ${
                      errors.fromLocation
                        ? "border-error"
                        : "border-gray-300 dark:border-gray-600 focus:border-primary"
                    }`}
                    {...register("fromLocation", {
                      required: "From location is required",
                    })}
                  />
                  {errors.fromLocation && (
                    <p className="text-error text-sm mt-1">{errors.fromLocation.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    To Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Chittagong"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition-all ${
                      errors.toLocation
                        ? "border-error"
                        : "border-gray-300 dark:border-gray-600 focus:border-primary"
                    }`}
                    {...register("toLocation", {
                      required: "To location is required",
                    })}
                  />
                  {errors.toLocation && (
                    <p className="text-error text-sm mt-1">{errors.toLocation.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing & Schedule */}
            <div className="pt-2">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400">
                  💰
                </span>
                Pricing & Schedule
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Price per Ticket ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g., 50"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition-all ${
                      errors.price
                        ? "border-error"
                        : "border-gray-300 dark:border-gray-600 focus:border-primary"
                    }`}
                    {...register("price", {
                      required: "Price is required",
                      min: { value: 1, message: "Price must be at least $1" },
                    })}
                  />
                  {errors.price && <p className="text-error text-sm mt-1">{errors.price.message}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Departure Date
                  </label>
                  <input
                    type="date"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition-all ${
                      errors.departureDate
                        ? "border-error"
                        : "border-gray-300 dark:border-gray-600 focus:border-primary"
                    }`}
                    min={new Date().toISOString().split("T")[0]}
                    {...register("departureDate", {
                      required: "Departure date is required",
                    })}
                  />
                  {errors.departureDate && (
                    <p className="text-error text-sm mt-1">{errors.departureDate.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Departure Time
                  </label>
                  <input
                    type="time"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition-all ${
                      errors.departureTime
                        ? "border-error"
                        : "border-gray-300 dark:border-gray-600 focus:border-primary"
                    }`}
                    {...register("departureTime", {
                      required: "Departure time is required",
                    })}
                  />
                  {errors.departureTime && (
                    <p className="text-error text-sm mt-1">{errors.departureTime.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Amenities & Perks - Checkbox Grid */}
            <div className="pt-2">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400">
                  ✨
                </span>
                Amenities & Perks
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                Select the amenities included with this ticket (optional)
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {availablePerks.map((perk) => (
                  <label
                    key={perk.id}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedPerks.includes(perk.label)
                        ? "bg-primary/10 dark:bg-primary/20 border-primary text-primary shadow-md"
                        : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-600"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={selectedPerks.includes(perk.label)}
                      onChange={() => handlePerkToggle(perk.label)}
                    />
                    <div
                      className={`text-xl mb-1 ${
                        selectedPerks.includes(perk.label)
                          ? "text-primary"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {perk.icon}
                    </div>
                    <span
                      className={`text-xs font-medium text-center ${
                        selectedPerks.includes(perk.label)
                          ? "text-primary"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {perk.label}
                    </span>
                    {/* Checkmark indicator */}
                    {selectedPerks.includes(perk.label) && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </label>
                ))}
              </div>

              {/* Selected Perks Display */}
              {selectedPerks.length > 0 && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-700 dark:text-green-400">
                    <span className="font-semibold">Selected ({selectedPerks.length}):</span>{" "}
                    {selectedPerks.join(", ")}
                  </p>
                </div>
              )}
            </div>

            {/* Vendor Info - Read Only */}
            <div className="pt-2">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                  👤
                </span>
                Vendor Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Vendor Name
                  </label>
                  <input
                    type="text"
                    value={user?.name || ""}
                    readOnly
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Vendor Email
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Info Note */}
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <div className="flex items-start gap-3">
                <span className="text-blue-500 text-xl">ℹ️</span>
                <div>
                  <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                    Admin Approval Required
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    Your ticket will be reviewed by an admin before becoming visible to customers.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard/vendor/my-tickets")}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 sm:flex-none px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loading loading-spinner loading-sm"></span>
                    Adding Ticket...
                  </span>
                ) : (
                  "Add Ticket"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTicket;
