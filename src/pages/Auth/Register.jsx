import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaGoogle } from "react-icons/fa";

const Register = () => {
  const { signInWithGoogle, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle Google Sign Up
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
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

          {/* Google Sign Up Button */}
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-primary w-full text-white"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                <FaGoogle size={20} />
                Sign up with Google
              </>
            )}
          </button>

          {/* Login Link */}
          <p className="text-center mt-6 text-neutral">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Login here
            </Link>
          </p>

          {/* Development Info */}
          <div className="mt-6 p-4 bg-info/10 rounded-lg">
            <p className="text-sm text-center text-neutral">🚀 Quick registration with Google!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
