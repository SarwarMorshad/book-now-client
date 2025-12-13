import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import {
  FaTicketAlt,
  FaMapMarkerAlt,
  FaDollarSign,
  FaCalendarAlt,
  FaClock,
  FaImage,
  FaUpload,
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
} from "react-icons/fa";
import { AuthContext } from "../../../context/AuthContext";
import { addTicket } from "../../../services/ticketService";
import { uploadImage, validateImage } from "../../../services/uploadService";

const AddTicket = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  // Watch transport type for icon display
  const transportType = watch("transportType", "bus");

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateImage(file);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  // Handle Form Submit
  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      let imageUrl = "";

      // Upload image if selected
      if (imageFile) {
        setUploadingImage(true);
        toast.loading("Uploading image...", { id: "image-upload" });

        try {
          const uploadResult = await uploadImage(imageFile);
          imageUrl = uploadResult.url;
          toast.success("Image uploaded!", { id: "image-upload" });
        } catch (error) {
          console.error("Image upload error:", error);
          toast.error("Image upload failed. Please try again.", {
            id: "image-upload",
          });
          setSubmitting(false);
          setUploadingImage(false);
          return;
        } finally {
          setUploadingImage(false);
        }
      }

      // Prepare ticket data
      const ticketData = {
        title: data.title,
        fromLocation: data.fromLocation,
        toLocation: data.toLocation,
        transportType: data.transportType,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity),
        departureDate: data.departureDate,
        departureTime: data.departureTime,
        perks: data.perks ? data.perks.split(",").map((p) => p.trim()) : [],
        imageUrl: imageUrl,
        vendorName: user.name,
        vendorEmail: user.email,
      };

      console.log("Submitting ticket:", ticketData);

      // Submit to backend
      const response = await addTicket(ticketData);

      if (response.success) {
        toast.success(response.message || "Ticket added successfully!");
        navigate("/dashboard/vendor/my-tickets");
      }
    } catch (error) {
      console.error("Add ticket error:", error);
      toast.error(error.response?.data?.message || "Failed to add ticket. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Transport type options
  const transportTypes = [
    { value: "bus", label: "Bus", icon: <FaBus /> },
    { value: "train", label: "Train", icon: <FaTrain /> },
    { value: "launch", label: "Launch", icon: <FaShip /> },
    { value: "plane", label: "Plane", icon: <FaPlane /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Add New Ticket</span>
          </h1>
          <p className="text-gray-600">Fill in the details to add a new ticket to your inventory</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          {/* Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">Ticket Title *</span>
            </label>
            <div className="relative">
              <FaTicketAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="e.g., Dhaka to Chittagong Express"
                className={`input input-bordered w-full pl-12 ${errors.title ? "input-error" : ""}`}
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 5,
                    message: "Title must be at least 5 characters",
                  },
                })}
              />
            </div>
            {errors.title && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.title.message}</span>
              </label>
            )}
          </div>

          {/* Transport Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">Transport Type *</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {transportTypes.map((type) => (
                <label
                  key={type.value}
                  className={`flex items-center justify-center gap-2 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    transportType === type.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-gray-300 hover:border-primary/50"
                  }`}
                >
                  <input
                    type="radio"
                    value={type.value}
                    className="hidden"
                    {...register("transportType", {
                      required: "Transport type is required",
                    })}
                  />
                  <span className="text-2xl">{type.icon}</span>
                  <span className="font-semibold">{type.label}</span>
                </label>
              ))}
            </div>
            {errors.transportType && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.transportType.message}</span>
              </label>
            )}
          </div>

          {/* From & To Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* From Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">From Location *</span>
              </label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                <input
                  type="text"
                  placeholder="e.g., Dhaka"
                  className={`input input-bordered w-full pl-12 ${errors.fromLocation ? "input-error" : ""}`}
                  {...register("fromLocation", {
                    required: "From location is required",
                  })}
                />
              </div>
              {errors.fromLocation && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.fromLocation.message}</span>
                </label>
              )}
            </div>

            {/* To Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">To Location *</span>
              </label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
                <input
                  type="text"
                  placeholder="e.g., Chittagong"
                  className={`input input-bordered w-full pl-12 ${errors.toLocation ? "input-error" : ""}`}
                  {...register("toLocation", {
                    required: "To location is required",
                  })}
                />
              </div>
              {errors.toLocation && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.toLocation.message}</span>
                </label>
              )}
            </div>
          </div>

          {/* Price & Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Price per Ticket ($) *</span>
              </label>
              <div className="relative">
                <FaDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g., 50"
                  className={`input input-bordered w-full pl-12 ${errors.price ? "input-error" : ""}`}
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 1, message: "Price must be at least $1" },
                  })}
                />
              </div>
              {errors.price && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.price.message}</span>
                </label>
              )}
            </div>

            {/* Quantity */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Available Seats *</span>
              </label>
              <input
                type="number"
                placeholder="e.g., 40"
                className={`input input-bordered w-full ${errors.quantity ? "input-error" : ""}`}
                {...register("quantity", {
                  required: "Quantity is required",
                  min: { value: 1, message: "Quantity must be at least 1" },
                })}
              />
              {errors.quantity && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.quantity.message}</span>
                </label>
              )}
            </div>
          </div>

          {/* Departure Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Departure Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Departure Date *</span>
              </label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  className={`input input-bordered w-full pl-12 ${errors.departureDate ? "input-error" : ""}`}
                  min={new Date().toISOString().split("T")[0]}
                  {...register("departureDate", {
                    required: "Departure date is required",
                  })}
                />
              </div>
              {errors.departureDate && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.departureDate.message}</span>
                </label>
              )}
            </div>

            {/* Departure Time */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Departure Time *</span>
              </label>
              <div className="relative">
                <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="time"
                  className={`input input-bordered w-full pl-12 ${errors.departureTime ? "input-error" : ""}`}
                  {...register("departureTime", {
                    required: "Departure time is required",
                  })}
                />
              </div>
              {errors.departureTime && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.departureTime.message}</span>
                </label>
              )}
            </div>
          </div>

          {/* Perks */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                Amenities & Perks <span className="text-gray-400">(Optional)</span>
              </span>
            </label>
            <textarea
              placeholder="e.g., AC, WiFi, Reclining Seats (comma separated)"
              className="textarea textarea-bordered h-24"
              {...register("perks")}
            ></textarea>
            <label className="label">
              <span className="label-text-alt text-gray-500">Separate multiple perks with commas</span>
            </label>
          </div>

          {/* Image Upload */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700">
                Ticket Image <span className="text-gray-400">(Optional)</span>
              </span>
            </label>

            {imagePreview ? (
              <div className="relative">
                <div className="flex items-center gap-4 p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                  <img src={imagePreview} alt="Preview" className="w-32 h-32 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">{imageFile?.name}</p>
                    <p className="text-xs text-gray-500">{(imageFile?.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="btn btn-error btn-sm text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="file"
                  id="ticketImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="ticketImage"
                  className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                >
                  <FaUpload className="text-4xl text-gray-400 mb-3" />
                  <p className="text-sm font-medium text-gray-700">Click to upload ticket image</p>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG, WEBP or GIF (Max 5MB)</p>
                </label>
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6">
            <button type="button" onClick={() => navigate(-1)} className="btn btn-outline flex-1">
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || uploadingImage}
              className="btn btn-primary text-white flex-1"
            >
              {submitting || uploadingImage ? (
                <span className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-sm"></span>
                  {uploadingImage ? "Uploading..." : "Adding Ticket..."}
                </span>
              ) : (
                "Add Ticket"
              )}
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-gray-600 text-center">
            ℹ️ Your ticket will be submitted for admin approval before becoming visible to users
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddTicket;
