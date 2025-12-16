import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  FaQuestionCircle,
  FaChevronDown,
  FaTicketAlt,
  FaCreditCard,
  FaUserShield,
  FaBus,
  FaSearch,
  FaHeadset,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openItems, setOpenItems] = useState([]);

  const categories = [
    { id: "all", label: "All Questions", icon: <FaQuestionCircle />, color: "primary" },
    { id: "booking", label: "Booking", icon: <FaTicketAlt />, color: "blue" },
    { id: "payment", label: "Payment", icon: <FaCreditCard />, color: "green" },
    { id: "account", label: "Account", icon: <FaUserShield />, color: "purple" },
    { id: "travel", label: "Travel", icon: <FaBus />, color: "orange" },
  ];

  const faqs = [
    {
      category: "booking",
      question: "How do I book a ticket?",
      answer:
        "Booking a ticket is simple! Browse our available tickets, select your preferred journey, choose your seats (for bus tickets), and proceed to checkout. You can pay securely using our integrated payment system.",
    },
    {
      category: "booking",
      question: "Can I cancel or modify my booking?",
      answer:
        "Yes, you can cancel or modify your booking up to 24 hours before departure. Go to your Dashboard > My Bookings, find your booking, and click on the cancel/modify button. Refund policies vary by ticket type.",
    },
    {
      category: "booking",
      question: "How do I select seats for bus tickets?",
      answer:
        "When booking a bus ticket, you'll see an interactive seat map. Available seats are shown in green, booked seats in red. Simply click on your preferred seats to select them. You can select multiple seats if needed.",
    },
    {
      category: "booking",
      question: "What happens after I book a ticket?",
      answer:
        "After booking, your ticket goes to the vendor for approval. Once approved, you'll receive a notification and can proceed to payment. After payment, your ticket is confirmed and you'll receive a digital ticket via email.",
    },
    {
      category: "payment",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit and debit cards (Visa, Mastercard, American Express) through our secure Stripe payment gateway. We also support digital wallets and online banking in select regions.",
    },
    {
      category: "payment",
      question: "Is my payment information secure?",
      answer:
        "Absolutely! We use Stripe, a PCI-compliant payment processor, to handle all transactions. Your card details are never stored on our servers. All data is encrypted using industry-standard SSL/TLS encryption.",
    },
    {
      category: "payment",
      question: "How do refunds work?",
      answer:
        "Refunds are processed within 5-7 business days after cancellation approval. The amount refunded depends on the cancellation policy and timing. Refunds are credited back to your original payment method.",
    },
    {
      category: "payment",
      question: "Can I get an invoice for my booking?",
      answer:
        "Yes! After successful payment, you can download your invoice from Dashboard > Transactions. Each transaction includes a detailed invoice with all booking information for your records.",
    },
    {
      category: "account",
      question: "How do I create an account?",
      answer:
        "Click on 'Register' in the navigation bar, fill in your details (name, email, password), and submit. You can also sign up using your Google account for faster registration.",
    },
    {
      category: "account",
      question: "How do I become a vendor?",
      answer:
        "To become a vendor, register as a regular user first, then contact our support team or apply through the 'Become a Vendor' option in your dashboard. After verification, your account will be upgraded to vendor status.",
    },
    {
      category: "account",
      question: "I forgot my password. What should I do?",
      answer:
        "Click on 'Login', then 'Forgot Password'. Enter your registered email address, and we'll send you a password reset link. The link expires in 24 hours for security.",
    },
    {
      category: "account",
      question: "How do I update my profile information?",
      answer:
        "Go to Dashboard > My Profile. Here you can update your name, profile picture, phone number, and other personal information. Don't forget to save your changes!",
    },
    {
      category: "travel",
      question: "What types of transport do you offer?",
      answer:
        "We offer tickets for buses, trains, launches (water transport), and flights. Each transport type has different features and amenities that you can view on the ticket details page.",
    },
    {
      category: "travel",
      question: "How early should I arrive before departure?",
      answer:
        "We recommend arriving at least 30 minutes before departure for buses and launches, 1 hour for trains, and 2-3 hours for flights. This allows time for boarding and any unexpected delays.",
    },
    {
      category: "travel",
      question: "Can I bring luggage?",
      answer:
        "Luggage allowances vary by transport type and operator. Generally, buses allow 1-2 bags, trains have generous luggage space, and flights have specific weight limits. Check the ticket details for specific allowances.",
    },
    {
      category: "travel",
      question: "What if my trip is delayed or cancelled?",
      answer:
        "If your trip is delayed or cancelled by the operator, you'll be notified immediately. You may be eligible for a full refund or rebooking at no extra cost. Contact support for assistance.",
    },
  ];

  const toggleItem = (index) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>FAQs | Book Now</title>
        <meta name="description" content="Frequently asked questions about Book Now" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-primary via-primary to-secondary overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse delay-500"></div>

          <div className="relative container mx-auto px-4 py-16 sm:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                <FaQuestionCircle className="text-4xl text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
              <p className="text-lg text-white/80 mb-8">
                Find answers to common questions about booking, payments, and more
              </p>

              {/* Search Bar */}
              <div className="max-w-xl mx-auto relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 transition-all"
                />
              </div>
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

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md"
                }`}
              >
                {category.icon}
                <span className="hidden sm:inline">{category.label}</span>
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="max-w-3xl mx-auto space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          faq.category === "booking"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-500"
                            : faq.category === "payment"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-500"
                              : faq.category === "account"
                                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-500"
                                : "bg-orange-100 dark:bg-orange-900/30 text-orange-500"
                        }`}
                      >
                        <FaQuestionCircle />
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-gray-100 pr-4">
                        {faq.question}
                      </span>
                    </div>
                    <FaChevronDown
                      className={`text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                        openItems.includes(index) ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openItems.includes(index) ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 pb-6 pl-20">
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSearch className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">No results found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or browse different categories
                </p>
              </div>
            )}
          </div>

          {/* Still Need Help Section */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-3xl p-8 sm:p-12 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaHeadset className="text-3xl text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Still have questions?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Can't find what you're looking for? Our support team is here to help you 24/7.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-105"
                >
                  Contact Support
                </Link>
                <Link
                  to="/support"
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105"
                >
                  Live Chat
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
