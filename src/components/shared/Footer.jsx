import { Link } from "react-router-dom";
import { FaFacebook, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🎫</span>
              <h3 className="text-2xl font-bold">Book Now</h3>
            </div>
            <p className="text-sm">
              Book bus, train, launch & flight tickets easily. Your journey starts here!
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="link link-hover">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/all-tickets" className="link link-hover">
                  All Tickets
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link link-hover">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="link link-hover">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <FaEnvelope />
                <a href="mailto:support@booknow.com" className="link link-hover">
                  support@booknow.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone />
                <a href="tel:+1234567890" className="link link-hover">
                  +123 456 7890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaFacebook />

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link
                link-hover"
                >
                  Facebook Page
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Payment Methods */}
          <div>
            <h4 className="font-bold text-lg mb-4">Payment Methods</h4>
            <div className="flex flex-wrap gap-3">
              <div className="badge badge-lg">Stripe</div>
              <div className="badge badge-lg">Visa</div>
              <div className="badge badge-lg">Mastercard</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-300">
        <div className="container mx-auto px-4 py-4 text-center">
          <p className="text-sm">© 2025 Book Now. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
