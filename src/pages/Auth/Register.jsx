import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { uploadImage, validateImage } from "../../services/uploadService";
import toast from "react-hot-toast";
import {
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
  FaCheckCircle,
  FaUpload,
  FaTimes,
  FaCheck,
} from "react-icons/fa";

const Register = () => {
  const { createUser, signInWithGoogle, loading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  // Watch password field for real-time validation
  const watchPassword = watch("password", "");

  useEffect(() => {
    setPasswordValue(watchPassword);
  }, [watchPassword]);

  // Password validation checks
  const passwordChecks = {
    length: passwordValue.length >= 6,
    uppercase: /[A-Z]/.test(passwordValue),
    lowercase: /[a-z]/.test(passwordValue),
  };

  const allChecksPassed = Object.values(passwordChecks).every(Boolean);

  const validatePassword = (value) => {
    if (value.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(value)) return "Must contain uppercase letter";
    if (!/[a-z]/.test(value)) return "Must contain lowercase letter";
    return true;
  };

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
    setValue("photoURL", "");
  };

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    try {
      let photoURL = "https://i.ibb.co/fMxkR1r/user.png";

      if (imageFile) {
        setUploadingImage(true);
        toast.loading("Uploading image...", { id: "image-upload" });

        try {
          const uploadResult = await uploadImage(imageFile);
          photoURL = uploadResult.url;
          toast.success("Image uploaded successfully!", { id: "image-upload" });
        } catch (error) {
          console.error("Image upload error:", error);
          toast.error("Image upload failed. Using default image.", {
            id: "image-upload",
          });
        } finally {
          setUploadingImage(false);
        }
      }

      await createUser(email, password, name, photoURL);
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use. Please login instead.");
      } else {
        toast.error(error.message || "Registration failed");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Google sign up failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Left Side - Brand & Features */}
          <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-blue-600 to-orange-500 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-12">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <span className="text-3xl">🎫</span>
                </div>
                <h2 className="text-3xl font-bold">Book Now</h2>
              </div>

              <div className="mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  Start Your Journey With Us
                </h1>
                <p className="text-blue-100 text-lg">
                  Join thousands of happy travelers booking their tickets seamlessly
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaCheckCircle className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Easy Booking</h3>
                    <p className="text-blue-100">Book tickets in just a few clicks</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaCheckCircle className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Secure Payment</h3>
                    <p className="text-blue-100">Your transactions are 100% safe</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaCheckCircle className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">24/7 Support</h3>
                    <p className="text-blue-100">We're here to help anytime</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 relative z-10 mt-12">
              <div>
                <p className="text-3xl font-bold">10K+</p>
                <p className="text-blue-100 text-sm">Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold">50+</p>
                <p className="text-blue-100 text-sm">Routes</p>
              </div>
              <div>
                <p className="text-3xl font-bold">98%</p>
                <p className="text-blue-100 text-sm">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎫</span>
              </div>
              <h2 className="text-2xl font-bold gradient-text">Book Now</h2>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Create Account</h2>
              <p className="text-gray-500">Fill in your details to get started</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("name", {
                      required: "Name is required",
                      minLength: { value: 3, message: "Name too short" },
                    })}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email",
                      },
                    })}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              {/* Profile Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Photo <span className="text-gray-400">(Optional)</span>
                </label>

                {imagePreview ? (
                  <div className="relative">
                    <div className="flex items-center gap-4 p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                      <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded-lg object-cover" />
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
                      id="profilePhoto"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="profilePhoto"
                      className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                    >
                      <FaUpload className="text-3xl text-gray-400 mb-2" />
                      <p className="text-sm font-medium text-gray-700">Click to upload profile photo</p>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG, WEBP or GIF (Max 5MB)</p>
                    </label>
                  </div>
                )}
              </div>

              {/* Password with Interactive Validation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                      errors.password
                        ? "border-red-500"
                        : passwordValue && allChecksPassed
                          ? "border-green-500"
                          : "border-gray-300"
                    }`}
                    {...register("password", {
                      required: "Password is required",
                      validate: validatePassword,
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {/* Interactive Password Requirements */}
                {passwordValue && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-2">
                    <div className="flex items-center gap-2">
                      {passwordChecks.length ? (
                        <FaCheck className="text-green-500 text-sm" />
                      ) : (
                        <FaTimes className="text-red-500 text-sm" />
                      )}
                      <span
                        className={`text-sm ${
                          passwordChecks.length ? "text-green-600 font-medium" : "text-gray-600"
                        }`}
                      >
                        At least 6 characters
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {passwordChecks.uppercase ? (
                        <FaCheck className="text-green-500 text-sm" />
                      ) : (
                        <FaTimes className="text-red-500 text-sm" />
                      )}
                      <span
                        className={`text-sm ${
                          passwordChecks.uppercase ? "text-green-600 font-medium" : "text-gray-600"
                        }`}
                      >
                        One uppercase letter
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {passwordChecks.lowercase ? (
                        <FaCheck className="text-green-500 text-sm" />
                      ) : (
                        <FaTimes className="text-red-500 text-sm" />
                      )}
                      <span
                        className={`text-sm ${
                          passwordChecks.lowercase ? "text-green-600 font-medium" : "text-gray-600"
                        }`}
                      >
                        One lowercase letter
                      </span>
                    </div>

                    {/* Password Strength Indicator */}
                    <div className="mt-3 pt-2 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Password Strength:</span>
                        <span
                          className={`text-xs font-semibold ${
                            allChecksPassed
                              ? "text-green-600"
                              : passwordValue.length >= 6
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {allChecksPassed ? "Strong" : passwordValue.length >= 6 ? "Medium" : "Weak"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            allChecksPassed
                              ? "w-full bg-green-500"
                              : passwordValue.length >= 6
                                ? "w-2/3 bg-yellow-500"
                                : "w-1/3 bg-red-500"
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading || uploadingImage}
                className="w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading || uploadingImage ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loading loading-spinner loading-sm"></span>
                    {uploadingImage ? "Uploading..." : "Creating Account..."}
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Google Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200"
            >
              <FaGoogle className="text-xl text-red-500" />
              Continue with Google
            </button>

            {/* Login Link */}
            <p className="text-center mt-8 text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:text-orange-500 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
