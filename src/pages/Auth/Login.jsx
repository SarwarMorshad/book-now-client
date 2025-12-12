import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle Email/Password Login
  const onSubmit = (data) => {
    const { email, password } = data;
    setLoading(true);

    signInUser(email, password)
      .then((result) => {
        console.log("User logged in:", result.user);
        toast.success("Login successful! Welcome back!");
        reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Login error:", error);
        toast.error(error.message || "Login failed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle Google Sign In
  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithGoogle()
      .then((result) => {
        console.log("Google sign in successful:", result.user);
        toast.success("Welcome! Signed in with Google.");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Google sign in error:", error);
        toast.error(error.message || "Google sign in failed.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle Forget Password (Placeholder for now)
  const handleForgetPassword = () => {
    toast.info("Password reset feature coming soon!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 py-12 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold gradient-text">Welcome Back!</h2>
            <p className="text-neutral mt-2">Login to continue your journey</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`input input-bordered ${errors.email ? "input-error" : ""}`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.email.message}</span>
                </label>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`input input-bordered w-full pr-10 ${errors.password ? "input-error" : ""}`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral hover:text-primary"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.password.message}</span>
                </label>
              )}
            </div>

            {/* Forget Password Link */}
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgetPassword}
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary text-white" disabled={loading}>
                {loading ? <span className="loading loading-spinner loading-sm"></span> : "Login"}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="divider">OR</div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline btn-primary w-full"
            disabled={loading}
          >
            <FaGoogle size={20} />
            Sign in with Google
          </button>

          {/* Register Link */}
          <p className="text-center mt-6 text-neutral">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
