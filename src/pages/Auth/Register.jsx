import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FaGoogle, FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaImage } from "react-icons/fa";

const Register = () => {
  const { createUser, signInWithGoogle, loading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password, photoURL } = data;

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Left Side - Brand */}
          <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-blue-600 to-orange-500 text-white relative overflow-hidden">
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
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
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
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
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                      errors.photoURL ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("photoURL", {
                      pattern: {
                        value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i,
                        message: "Please enter a valid image URL",
                      },
                    })}
                  />
                </div>
                {errors.photoURL && <p className="text-red-500 text-sm mt-1">{errors.photoURL.message}</p>}
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
                    className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message: "Must include uppercase, lowercase & number",
                      },
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
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 mt-2"
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
              <FaGoogle className="text-xl text-red-500" />
              Continue with Google
            </button>

            {/* Login Link */}
            <p className="text-center mt-6 text-gray-600">
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
