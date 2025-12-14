import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { addTicket } from "../../../services/ticketService";
import toast from "react-hot-toast";
import { FaBus, FaTrain, FaShip, FaPlane } from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";

const AddTicket = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const transportType = watch("transportType", "bus");

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
        perks: data.perks
          ? data.perks
              .split(",")
              .map((p) => p.trim())
              .filter((p) => p)
          : [],
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
    { value: "bus", label: "Bus", icon: <FaBus className="text-xl" /> },
    { value: "train", label: "Train", icon: <FaTrain className="text-xl" /> },
    { value: "launch", label: "Launch", icon: <FaShip className="text-xl" /> },
    { value: "plane", label: "Plane", icon: <FaPlane className="text-xl" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Add New Ticket</h1>
          <p className="text-gray-600 text-lg">Enter your ticket details</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Transport Type Radio Buttons */}
            <div>
              <div className="flex gap-6 mb-6">
                {transportTypes.map((type) => (
                  <label key={type.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value={type.value}
                      className="radio radio-success"
                      {...register("transportType", {
                        required: "Transport type is required",
                      })}
                    />
                    <span className="flex items-center gap-2 text-gray-700 font-medium">
                      {type.icon}
                      {type.label}
                    </span>
                  </label>
                ))}
              </div>
              {errors.transportType && <p className="text-error text-sm">{errors.transportType.message}</p>}
            </div>

            {/* Ticket Title and Seats - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ticket Title */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Ticket Title</label>
                <input
                  type="text"
                  placeholder="Ticket Title"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    errors.title ? "border-error" : "border-gray-300"
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

              {/* Available Seats */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Available Seats</label>
                <input
                  type="number"
                  placeholder="Available Seats"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    errors.quantity ? "border-error" : "border-gray-300"
                  }`}
                  {...register("quantity", {
                    required: "Quantity is required",
                    min: { value: 1, message: "Quantity must be at least 1" },
                  })}
                />
                {errors.quantity && <p className="text-error text-sm mt-1">{errors.quantity.message}</p>}
              </div>
            </div>

            {/* Route Details Section Header */}
            <div className="pt-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Route Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* From Location */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">From Location</label>
                  <input
                    type="text"
                    placeholder="From Location"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      errors.fromLocation ? "border-error" : "border-gray-300"
                    }`}
                    {...register("fromLocation", {
                      required: "From location is required",
                    })}
                  />
                  {errors.fromLocation && (
                    <p className="text-error text-sm mt-1">{errors.fromLocation.message}</p>
                  )}
                </div>

                {/* To Location */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">To Location</label>
                  <input
                    type="text"
                    placeholder="To Location"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      errors.toLocation ? "border-error" : "border-gray-300"
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

            {/* Pricing Section Header */}
            <div className="pt-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Pricing & Schedule</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Price per Ticket ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Price per Ticket"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      errors.price ? "border-error" : "border-gray-300"
                    }`}
                    {...register("price", {
                      required: "Price is required",
                      min: { value: 1, message: "Price must be at least $1" },
                    })}
                  />
                  {errors.price && <p className="text-error text-sm mt-1">{errors.price.message}</p>}
                </div>

                {/* Departure Date */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Departure Date</label>
                  <input
                    type="date"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      errors.departureDate ? "border-error" : "border-gray-300"
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

                {/* Departure Time */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Departure Time</label>
                  <input
                    type="time"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      errors.departureTime ? "border-error" : "border-gray-300"
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

            {/* Amenities */}
            <div className="pt-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Additional Details</h2>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Amenities & Perks <span className="text-gray-400 text-sm">(Optional)</span>
                </label>
                <textarea
                  placeholder="e.g., AC, WiFi, Reclining Seats (comma separated)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 h-24 resize-none"
                  {...register("perks")}
                ></textarea>
                <p className="text-gray-500 text-sm mt-1">* Separate multiple perks with commas</p>
              </div>
            </div>

            {/* Info Note */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-gray-700">
                * Your ticket will be submitted for admin approval before becoming visible to users
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-green-400 to-green-500 text-gray-800 font-semibold rounded-lg hover:from-green-500 hover:to-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loading loading-spinner loading-sm"></span>
                    Processing...
                  </span>
                ) : (
                  "Proceed to Confirm Booking"
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
