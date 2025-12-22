import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaCcVisa,
  FaCcMastercard,
  FaCcStripe,
  FaCcPaypal,
  FaHeart,
  FaArrowRight,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      {/* <div className="bg-[#10B981]">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-white/80 text-sm sm:text-base">
                Get the latest deals and travel updates delivered to your inbox
              </p>
            </div>
            <div className="flex w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-l-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 transition-all text-sm sm:text-base"
                />
              </div>
              <button className="px-4 sm:px-6 py-3 sm:py-4 bg-white text-primary font-semibold rounded-r-xl hover:bg-gray-100 transition-all flex items-center gap-2 text-sm sm:text-base">
                <span className="hidden sm:inline">Subscribe</span>
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand & Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12  flex items-center justify-center">
                <span className="text-2xl">
                  <img src="/favicon.png" alt="" />
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Book <span className="text-primary">Now</span>
                </h3>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm sm:text-base">
              Your trusted partner for seamless travel booking. Book bus, train, launch & flight tickets
              easily. Your journey starts here!
            </p>

            {/* Transport Icons */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <FaBus className="text-blue-500" />
              </div>
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                <FaTrain className="text-green-500" />
              </div>
              <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                <FaShip className="text-cyan-500" />
              </div>
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <FaPlane className="text-purple-500" />
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10
              bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all
              duration-300"
              >
                <FaFacebook className="text-white" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10
              bg-gray-800 hover:bg-sky-500 rounded-lg flex items-center justify-center transition-all
              duration-300"
              >
                <FaTwitter className="text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10
              bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all
              duration-300"
              >
                <FaInstagram className="text-white" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10
              bg-gray-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all
              duration-300"
              >
                <FaLinkedin className="text-white" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-[#10B981] rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/all-tickets", label: "All Tickets" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact Us" },
                { to: "/faq", label: "FAQs" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <FaArrowRight className="text-xs opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-[#10B981] rounded-full"></span>
              Support
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/help", label: "Help Center" },
                { to: "/privacy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms of Service" },
                { to: "/refund", label: "Refund Policy" },
                { to: "/sitemap", label: "Sitemap" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <FaArrowRight className="text-xs opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-[#10B981] rounded-full"></span>
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:support@booknow.com"
                  className="flex items-start gap-3 text-gray-400
                hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 bg-gray-800 group-hover:bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                    <FaEnvelope className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email Us</p>
                    <p className="text-sm">support@booknow.com</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801234567890"
                  className="flex items-start gap-3 text-gray-400 hover:text-primary
                transition-colors group"
                >
                  <div className="w-10 h-10 bg-gray-800 group-hover:bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                    <FaPhone className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Call Us</p>
                    <p className="text-sm">+880 123 456 7890</p>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </li>
            </ul>

            {/* Payment Methods */}
            <div className="mt-8">
              <p className="text-sm text-gray-500 mb-3">We Accept</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <FaCcStripe className="text-2xl text-purple-500" />
                </div>
                <div className="w-12 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <FaCcVisa className="text-2xl text-blue-500" />
                </div>
                <div className="w-12 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <FaCcMastercard className="text-2xl text-orange-500" />
                </div>
                <div className="w-12 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <FaCcPaypal className="text-2xl text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 text-center sm:text-left">
              © {currentYear} <span className="text-primary font-semibold">BookNow</span>. All rights
              reserved.
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              Made with <FaHeart className="text-red-500 animate-pulse" /> By Sarwar MOrshad
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
