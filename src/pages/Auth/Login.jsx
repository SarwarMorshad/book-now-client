import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const { signInWithGoogle, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="card bg-base-100 shadow-2xl border border-base-300">
          <div className="card-body p-8">
            {/* Logo & Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-4xl">🎫</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="gradient-text">Welcome Back!</span>
              </h1>
              <p className="text-base-content/60 text-lg">Sign in to continue your journey</p>
            </div>

            {/* Divider */}
            <div className="divider text-base-content/40">Sign in with</div>

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="btn btn-outline btn-primary btn-lg w-full gap-3 hover:btn-primary group"
            >
              {loading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                <>
                  <FaGoogle className="text-xl group-hover:scale-110 transition-transform" />
                  <span className="text-base">Continue with Google</span>
                </>
              )}
            </button>

            {/* Features */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-sm text-base-content/70">
                <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                  <span className="text-success">✓</span>
                </div>
                <span>Quick & Secure Authentication</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-base-content/70">
                <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                  <span className="text-success">✓</span>
                </div>
                <span>Access All Booking Features</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-base-content/70">
                <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                  <span className="text-success">✓</span>
                </div>
                <span>No Password Required</span>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center mt-8 pt-6 border-t border-base-300">
              <p className="text-base-content/60">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary font-semibold hover:underline hover:text-secondary transition-colors"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-6">
          <p className="text-sm text-base-content/50">🔒 Secure authentication powered by Google</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
