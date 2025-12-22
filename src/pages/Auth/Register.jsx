import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import {
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaUser,
  FaImage,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const { createUser, signInWithGoogle, loading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Watch password field
  const watchedPassword = watch("password", "");

  useEffect(() => {
    setPassword(watchedPassword);
  }, [watchedPassword]);

  // Password validation checks
  const passwordChecks = {
    minLength: password.length >= 6,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
  };

  const allChecksPassed = Object.values(passwordChecks).every(Boolean);
  const checksPassedCount = Object.values(passwordChecks).filter(Boolean).length;

  // Password strength
  const getPasswordStrength = () => {
    if (checksPassedCount === 0) return { label: "", color: "", width: "0%" };
    if (checksPassedCount === 1) return { label: "Weak", color: "bg-error", width: "25%" };
    if (checksPassedCount === 2) return { label: "Fair", color: "bg-warning", width: "50%" };
    if (checksPassedCount === 3) return { label: "Good", color: "bg-info", width: "75%" };
    return { label: "Strong", color: "bg-success", width: "100%" };
  };

  const passwordStrength = getPasswordStrength();

  const onSubmit = async (data) => {
    const { name, email, password, photoURL } = data;

    if (!allChecksPassed) {
      toast.error("Please meet all password requirements");
      return;
    }

    try {
      await createUser(email, password, name, photoURL || "");
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use");
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
      console.error("Google login failed:", error);
    }
  };

  // Validation Check Item Component
  const ValidationCheck = ({ passed, label }) => (
    <div
      className={`flex items-center gap-2 text-sm transition-all ${
        passed ? "text-success" : "text-gray-400"
      }`}
    >
      {passed ? <FaCheck className="text-success" /> : <FaTimes className="text-gray-300" />}
      <span className={passed ? "font-medium" : ""}>{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Left Side - Brand */}
          <div className="hidden lg:flex flex-col justify-center p-12 bg-[#10B981] text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48"></div>

            <div className="relative z-10">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <span className="text-3xl">🎫</span>
                </div>
                <h2 className="text-3xl font-bold">Book Now</h2>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">Start Your Journey Today</h1>
              <p className="text-blue-100 text-lg mb-12">
                Join thousands of travelers who book their trips with confidence and ease
              </p>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">🚌</div>
                  <span className="font-medium">Bus, Train, Launch & Flights</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">💳</div>
                  <span className="font-medium">Secure Online Payments</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">⭐</div>
                  <span className="font-medium">Best Prices Guaranteed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-[#10B981] rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎫</span>
              </div>
              <h2 className="text-2xl font-bold gradient-text">Book Now</h2>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Create Account</h2>
              <p className="text-gray-500">Fill in your details to get started</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                      errors.name ? "border-error" : "border-gray-300"
                    }`}
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                  />
                </div>
                {errors.name && <p className="text-error text-sm mt-1">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                      errors.email ? "border-error" : "border-gray-300"
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
              </div>

              {/* Photo URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo URL <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="url"
                    placeholder="https://example.com/your-photo.jpg"
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                      errors.photoURL ? "border-error" : "border-gray-300"
                    }`}
                    {...register("photoURL", {
                      pattern: {
                        value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i,
                        message: "Please enter a valid image URL",
                      },
                    })}
                  />
                </div>
                {errors.photoURL && <p className="text-error text-sm mt-1">{errors.photoURL.message}</p>}
                <p className="text-xs text-gray-500 mt-1">Paste a direct link to your profile image</p>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                      errors.password
                        ? "border-error"
                        : password && allChecksPassed
                          ? "border-success"
                          : "border-gray-300"
                    }`}
                    {...register("password", {
                      required: "Password is required",
                    })}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {/* Password Strength Bar */}
                {password && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-500">Password Strength</span>
                      <span
                        className={`text-xs font-semibold ${
                          passwordStrength.label === "Strong"
                            ? "text-success"
                            : passwordStrength.label === "Good"
                              ? "text-info"
                              : passwordStrength.label === "Fair"
                                ? "text-warning"
                                : "text-error"
                        }`}
                      >
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${passwordStrength.color} transition-all duration-300`}
                        style={{ width: passwordStrength.width }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Password Requirements */}
                {(passwordFocused || password) && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-xl space-y-2">
                    <p className="text-xs font-semibold text-gray-600 mb-2">Password Requirements:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <ValidationCheck passed={passwordChecks.minLength} label="At least 6 characters" />
                      <ValidationCheck passed={passwordChecks.hasUppercase} label="One uppercase letter" />
                      <ValidationCheck passed={passwordChecks.hasLowercase} label="One lowercase letter" />
                      <ValidationCheck passed={passwordChecks.hasNumber} label="One number" />
                    </div>
                  </div>
                )}

                {errors.password && <p className="text-error text-sm mt-1">{errors.password.message}</p>}
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading || !allChecksPassed}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 mt-2 ${
                  allChecksPassed
                    ? "bg-[#10B981] text-white hover:shadow-lg transform hover:-translate-y-0.5"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating Account...
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
              <FaGoogle className="text-xl text-[#10B981]" />
              Continue with Google
            </button>

            {/* Login Link */}
            <p className="text-center mt-6 text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold hover:text-secondary transition-colors">
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
