import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaCheckCircle,
  FaHeadset,
  FaComments,
  FaQuestionCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email Us",
      details: ["support@booknow.com", "info@booknow.com"],
      color: "blue",
      action: "mailto:support@booknow.com",
    },
    {
      icon: <FaPhone className="text-2xl" />,
      title: "Call Us",
      details: ["+880 123 456 7890", "+880 987 654 3210"],
      color: "green",
      action: "tel:+8801234567890",
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: "Visit Us",
      details: ["123 Travel Street", "Dhaka 1205, Bangladesh"],
      color: "red",
      action: "https://maps.google.com",
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: "Working Hours",
      details: ["Mon - Fri: 9AM - 8PM", "Sat - Sun: 10AM - 6PM"],
      color: "purple",
      action: null,
    },
  ];

  const quickLinks = [
    {
      icon: <FaHeadset />,
      title: "Live Support",
      description: "Chat with our support team",
      to: "/support",
      color: "blue",
    },
    {
      icon: <FaQuestionCircle />,
      title: "FAQs",
      description: "Find quick answers",
      to: "/faq",
      color: "green",
    },
    {
      icon: <FaComments />,
      title: "Feedback",
      description: "Share your thoughts",
      to: "/feedback",
      color: "purple",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | Book Now</title>
        <meta name="description" content="Get in touch with Book Now support team" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-primary via-primary to-secondary overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>

          <div className="relative container mx-auto px-4 py-16 sm:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                <FaEnvelope className="text-4xl text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Get in Touch</h1>
              <p className="text-lg text-white/80">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as
                possible.
              </p>
            </div>
          </div>

          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                className="fill-gray-50 dark:fill-gray-900"
              />
            </svg>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="container mx-auto px-4 -mt-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.action}
                target={info.action?.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  !info.action ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    info.color === "blue"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-500"
                      : info.color === "green"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-500"
                        : info.color === "red"
                          ? "bg-red-100 dark:bg-red-900/30 text-red-500"
                          : "bg-purple-100 dark:bg-purple-900/30 text-purple-500"
                  }`}
                >
                  {info.icon}
                </div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-gray-600 dark:text-gray-400 text-sm">
                    {detail}
                  </p>
                ))}
              </a>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 sm:p-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Send us a Message
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <FaCheckCircle className="text-4xl text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="payment">Payment Issue</option>
                      <option value="refund">Refund Request</option>
                      <option value="technical">Technical Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition-colors resize-none"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Side Content */}
            <div className="space-y-8">
              {/* Quick Links */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Quick Links</h3>
                <div className="grid gap-4">
                  {quickLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.to}
                      className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          link.color === "blue"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-500"
                            : link.color === "green"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-500"
                              : "bg-purple-100 dark:bg-purple-900/30 text-purple-500"
                        }`}
                      >
                        {link.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-100">{link.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{link.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                  <div className="text-center">
                    <FaMapMarkerAlt className="text-4xl text-primary mx-auto mb-2" />
                    <p className="text-gray-600 dark:text-gray-400">Interactive Map</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4">Connect With Us</h3>
                <div className="flex gap-3">
                  {[
                    { icon: <FaFacebook />, color: "hover:bg-blue-600", href: "https://facebook.com" },
                    { icon: <FaTwitter />, color: "hover:bg-sky-500", href: "https://twitter.com" },
                    { icon: <FaInstagram />, color: "hover:bg-pink-600", href: "https://instagram.com" },
                    { icon: <FaLinkedin />, color: "hover:bg-blue-700", href: "https://linkedin.com" },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 ${social.color} hover:text-white transition-all duration-300`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
