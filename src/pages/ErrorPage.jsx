import { Link, useRouteError } from "react-router-dom";
import { FaHome, FaArrowLeft, FaSearch, FaHeadset, FaExclamationTriangle } from "react-icons/fa";
// import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ErrorPage = () => {
  const error = useRouteError();
  // const { theme } = useContext(ThemeContext);

  // Determine error type
  const is404 = error?.status === 404 || !error?.status;
  const is500 = error?.status === 500;
  const errorCode = error?.status || 404;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"></div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>

        {/* Floating Icons */}
        <div className="absolute top-20 left-20 text-6xl opacity-10 animate-bounce delay-100">🎫</div>
        <div className="absolute top-40 right-32 text-5xl opacity-10 animate-bounce delay-300">🚌</div>
        <div className="absolute bottom-32 left-40 text-5xl opacity-10 animate-bounce delay-500">🚂</div>
        <div className="absolute bottom-20 right-20 text-6xl opacity-10 animate-bounce delay-700">✈️</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl w-full">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          {/* Top Decorative Bar */}
          <div className="h-2 bg-gradient-to-r from-primary via-secondary to-primary"></div>

          <div className="p-8 sm:p-12 text-center">
            {/* Animated Error Code */}
            <div className="relative mb-8">
              {/* Glowing Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-2xl animate-pulse"></div>
              </div>

              {/* Error Code */}
              <div className="relative">
                <h1 className="text-[150px] sm:text-[180px] font-black leading-none">
                  <span className="bg-gradient-to-br from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
                    {errorCode}
                  </span>
                </h1>

                {/* Animated Underline */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
              </div>
            </div>

            {/* Error Icon */}
            <div className="mb-6 flex justify-center">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center ${
                  is500 ? "bg-red-100 dark:bg-red-900/30" : "bg-yellow-100 dark:bg-yellow-900/30"
                }`}
              >
                {is500 ? (
                  <FaExclamationTriangle className="text-4xl text-red-500" />
                ) : (
                  <span className="text-5xl">🔍</span>
                )}
              </div>
            </div>

            {/* Error Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {is404 && "Oops! Page Not Found"}
              {is500 && "Internal Server Error"}
              {!is404 && !is500 && "Something Went Wrong"}
            </h2>

            {/* Error Description */}
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
              {is404 && (
                <>
                  The page you&apos;re looking for seems to have taken a detour. It might have been moved,
                  deleted, or perhaps it never existed.
                </>
              )}
              {is500 && (
                <>
                  Our servers are having a bit of trouble right now. Please try again later or contact support
                  if the problem persists.
                </>
              )}
              {!is404 && !is500 && (
                <>{error?.statusText || error?.message || "An unexpected error occurred."}</>
              )}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                to="/"
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center"
              >
                <FaHome className="group-hover:animate-bounce" />
                Back to Home
              </Link>

              <button
                onClick={() => window.history.back()}
                className="group flex items-center gap-2 px-8 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Go Back
              </button>
            </div>

            {/* Helpful Links */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Here are some helpful links instead:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/all-tickets"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all text-sm font-medium"
                >
                  <FaSearch className="text-xs" />
                  Browse Tickets
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-all text-sm font-medium"
                >
                  <FaHeadset className="text-xs" />
                  Contact Support
                </Link>
                <Link
                  to="/faq"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all text-sm font-medium"
                >
                  <span className="text-xs">❓</span>
                  FAQs
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="bg-gray-50 dark:bg-gray-900/50 px-8 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
              <p className="text-gray-500 dark:text-gray-400">
                Error Code:{" "}
                <span className="font-mono font-semibold text-gray-700 dark:text-gray-300">{errorCode}</span>
              </p>
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              >
                <span className="text-xl">🎫</span>
                <span className="font-bold">
                  Book<span className="text-primary">Now</span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Fun Message */}
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6 animate-pulse">
          🚌 Don&apos;t worry, even the best journeys have unexpected detours! 🚂
        </p>
      </div>

      {/* CSS for gradient animation */}
      <style>{`
        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;
