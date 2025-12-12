import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const password = watch("password");

  // Password Validation Function
  const validatePassword = (value) => {
    if (value.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(value)) {
      return "Password must contain at least one lowercase letter";
    }
    return true;
  };

  // Handle Registration
  const onSubmit = (data) => {
    const { name, email, photoURL, password } = data;
    setLoading(true);

    createUser(email, password)
      .then((result) => {
        console.log("User created:", result.user);

        // Update user profile with name and photo
        updateUserProfile(name, photoURL)
          .then(() => {
            console.log("Profile updated successfully");
            toast.success("Registration successful! Welcome to Book Now!");
            reset();
            navigate("/");
          })
          .catch((error) => {
            console.error("Profile update error:", error);
            toast.error("Profile update failed, but account was created.");
            navigate("/");
          });
      })
      .catch((error) => {
        console.error("Registration error:", error);
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email already in use. Please login instead.");
        } else {
          toast.error(error.message || "Registration failed. Please try again.");
        }
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
        navigate("/");
      })
      .catch((error) => {
        console.error("Google sign in error:", error);
        toast.error(error.message || "Google sign in failed.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 py-12 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold gradient-text">Create Account</h2>
            <p className="text-neutral mt-2">Join us and start booking today!</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className={`input input-bordered ${errors.name ? "input-error" : ""}`}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
              />
              {errors.name && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.name.message}</span>
                </label>
              )}
            </div>

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

            {/* Photo URL Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Photo URL</span>
              </label>
              <input
                type="url"
                placeholder="Enter photo URL"
                className={`input input-bordered ${errors.photoURL ? "input-error" : ""}`}
                {...register("photoURL", {
                  required: "Photo URL is required",
                  pattern: {
                    value: /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i,
                    message: "Please enter a valid image URL",
                  },
                })}
              />
              {errors.photoURL && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.photoURL.message}</span>
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
                    validate: validatePassword,
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

              {/* Password Requirements */}
              <label className="label">
                <span className="label-text-alt text-neutral text-xs">
                  • At least 6 characters • One uppercase • One lowercase
                </span>
              </label>
            </div>

            {/* Register Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary text-white" disabled={loading}>
                {loading ? <span className="loading loading-spinner loading-sm"></span> : "Register"}
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
            Sign up with Google
          </button>

          {/* Login Link */}
          <p className="text-center mt-6 text-neutral">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
