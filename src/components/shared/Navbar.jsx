import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut();
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "font-semibold text-primary" : "hover:text-primary")}
        >
          Home
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/all-tickets"
              className={({ isActive }) => (isActive ? "font-semibold text-primary" : "hover:text-primary")}
            >
              All Tickets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "font-semibold text-primary" : "hover:text-primary")}
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 px-4 lg:px-8 border-b border-gray-200">
      <div className="navbar-start">
        {/* Mobile Hamburger */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-300"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost text-xl font-bold flex items-center gap-2 hover:scale-105">
          <span className="text-3xl">🎫</span>
          <span className="gradient-text text-2xl">Book Now</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-medium">{navLinks}</ul>
      </div>

      <div className="navbar-end gap-2">
        {user ? (
          <div className="flex items-center gap-3">
            {/* User Role Badge */}
            <div
              className={`badge badge-sm ${
                user.role === "admin"
                  ? "badge-error"
                  : user.role === "vendor"
                    ? "badge-warning"
                    : "badge-primary"
              }`}
            >
              {user.role}
            </div>

            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar hover:ring-2 ring-primary">
                <div className="w-10 rounded-full">
                  <img
                    src={user?.photoURL || "https://i.ibb.co/fMxkR1r/user.png"}
                    alt={user?.name || "User"}
                    onError={(e) => {
                      e.target.src = "https://i.ibb.co/fMxkR1r/user.png";
                    }}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-300"
              >
                <li className="menu-title">
                  <span className="text-primary font-bold">{user?.name || "User"}</span>
                </li>
                <li>
                  <span className="text-xs text-neutral">{user?.email}</span>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <Link to="/dashboard/profile" className="hover:text-primary">
                    My Profile
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-error hover:bg-error/10">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline btn-primary btn-sm">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
