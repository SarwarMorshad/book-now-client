import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  FaHeadset,
  FaComments,
  FaTicketAlt,
  FaSearch,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaArrowRight,
  FaPaperPlane,
  FaRobot,
  FaUser,
  FaClock,
  FaCheckCircle,
  FaQuestionCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Support = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      message: "Hello! 👋 Welcome to BookNow Support. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickOptions = [
    "Track my booking",
    "Refund status",
    "Payment issue",
    "Change booking",
    "Talk to agent",
  ];

  const supportChannels = [
    {
      icon: <FaComments className="text-2xl" />,
      title: "Live Chat",
      description: "Chat with our support team instantly",
      availability: "Available Now",
      color: "blue",
      action: () => setActiveTab("chat"),
    },
    {
      icon: <FaPhone className="text-2xl" />,
      title: "Phone Support",
      description: "Call us for immediate assistance",
      availability: "9AM - 8PM",
      color: "green",
      action: () => window.open("tel:+8801234567890"),
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email Support",
      description: "Get response within 24 hours",
      availability: "24/7",
      color: "purple",
      action: () => window.open("mailto:support@booknow.com"),
    },
    {
      icon: <FaWhatsapp className="text-2xl" />,
      title: "WhatsApp",
      description: "Message us on WhatsApp",
      availability: "Available Now",
      color: "emerald",
      action: () => window.open("https://wa.me/8801234567890"),
    },
  ];

  const commonIssues = [
    {
      title: "Booking & Reservations",
      items: [
        { question: "How to book a ticket?", to: "/faq#booking" },
        { question: "Modify or cancel booking", to: "/faq#cancel" },
        { question: "Seat selection issues", to: "/faq#seats" },
      ],
    },
    {
      title: "Payments & Refunds",
      items: [
        { question: "Payment failed", to: "/faq#payment-failed" },
        { question: "Refund status", to: "/faq#refund" },
        { question: "Invoice download", to: "/faq#invoice" },
      ],
    },
    {
      title: "Account & Profile",
      items: [
        { question: "Reset password", to: "/faq#password" },
        { question: "Update profile", to: "/faq#profile" },
        { question: "Become a vendor", to: "/faq#vendor" },
      ],
    },
  ];

  const handleSendMessage = (message) => {
    if (!message.trim()) return;

    const userMessage = {
      type: "user",
      message: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = {
        "track my booking":
          "To track your booking, please go to Dashboard > My Bookings. You can see the status of all your bookings there. Would you like me to guide you through the process?",
        "refund status":
          "Refunds are typically processed within 5-7 business days. You can check your refund status in Dashboard > Transactions. What's your booking ID?",
        "payment issue":
          "I'm sorry to hear you're having payment issues. Common solutions include: checking card details, trying a different card, or clearing browser cache. Can you describe the specific error?",
        "change booking":
          "You can modify your booking up to 24 hours before departure. Go to Dashboard > My Bookings, select the booking, and click 'Modify'. What changes would you like to make?",
        "talk to agent":
          "I'll connect you with a human agent shortly. Our average wait time is under 2 minutes. Please hold on! 🙏",
        default:
          "Thank you for your message! Our team will look into this and get back to you shortly. Is there anything else I can help you with?",
      };

      const lowerMessage = message.toLowerCase();
      let response = botResponses.default;

      for (const [key, value] of Object.entries(botResponses)) {
        if (lowerMessage.includes(key)) {
          response = value;
          break;
        }
      }

      const botMessage = {
        type: "bot",
        message: response,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setIsTyping(false);
      setChatMessages((prev) => [...prev, botMessage]);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Support | Book Now</title>
        <meta name="description" content="Get help and support from Book Now team" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <div className="relative bg-[#10B981] overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          <div className="relative container mx-auto px-4 py-16 sm:py-20">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                <FaHeadset className="text-4xl text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">How can we help?</h1>
              <p className="text-lg text-white/80 mb-8">
                Our support team is available 24/7 to assist you with any questions or issues.
              </p>

              {/* Search */}
              <div className="max-w-xl mx-auto relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Describe your issue..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                className="fill-gray-50 dark:fill-gray-900"
              />
            </svg>
          </div>
        </div>

        {/* Support Channels */}
        <div className="container mx-auto px-4 -mt-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportChannels.map((channel, index) => (
              <button
                key={index}
                onClick={channel.action}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    channel.color === "blue"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-500"
                      : channel.color === "green"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-500"
                        : channel.color === "purple"
                          ? "bg-purple-100 dark:bg-purple-900/30 text-purple-500"
                          : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500"
                  }`}
                >
                  {channel.icon}
                </div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-1">{channel.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{channel.description}</p>
                <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  {channel.availability}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Live Chat */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-[#10B981] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <FaRobot className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">BookNow Assistant</h3>
                    <p className="text-xs text-white/80 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      Online
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] ${
                        msg.type === "user"
                          ? "bg-[#10B981] text-white rounded-2xl rounded-br-md"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-2xl rounded-bl-md"
                      } p-4`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.type === "user" ? "text-white/70" : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-md p-4">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Options */}
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {quickOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(option)}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs hover:bg-primary hover:text-white transition-all"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputMessage)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-primary focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  />
                  <button
                    onClick={() => handleSendMessage(inputMessage)}
                    className="px-4 py-3 bg-[#10B981] text-white rounded-xl hover:shadow-lg transition-all"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            </div>

            {/* Common Issues */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Common Issues</h2>
              <div className="space-y-6">
                {commonIssues.map((category, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                      <FaQuestionCircle className="text-primary" />
                      {category.title}
                    </h3>
                    <div className="space-y-2">
                      {category.items.map((item, i) => (
                        <Link
                          key={i}
                          to={item.to}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all group"
                        >
                          <span className="text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors">
                            {item.question}
                          </span>
                          <FaArrowRight className="text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Support Ticket */}
              <div className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#10B981] rounded-xl flex items-center justify-center">
                    <FaTicketAlt className="text-2xl text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">Need more help?</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Create a support ticket and we'll get back to you
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    className="px-6 py-3 bg-[#10B981] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                  >
                    Create Ticket
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;
