import { Helmet } from "react-helmet-async";
import { useState } from "react";
import {
  FaTag,
  FaPercent,
  FaGift,
  FaClock,
  FaFire,
  FaStar,
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaCopy,
  FaCheck,
  FaBolt,
  FaCalendarAlt,
  FaCrown,
  FaUsers,
  FaHeart,
  FaBell,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const OffersDeals = () => {
  const [copiedCode, setCopiedCode] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const categories = [
    { id: "all", label: "All Offers", icon: <FaTag /> },
    { id: "flash", label: "Flash Sale", icon: <FaBolt /> },
    { id: "seasonal", label: "Seasonal", icon: <FaCalendarAlt /> },
    { id: "firsttime", label: "First Time", icon: <FaStar /> },
    { id: "loyalty", label: "Loyalty", icon: <FaCrown /> },
  ];

  const featuredDeals = [
    {
      id: 1,
      title: "New Year Special",
      discount: "30%",
      code: "NEWYEAR30",
      description: "Celebrate 2025 with massive savings on all bus tickets",
      validUntil: "Jan 15, 2025",
      type: "seasonal",
      color: "from-orange-500 to-red-500",
      icon: <FaFire />,
      minPurchase: "৳500",
      maxDiscount: "৳300",
    },
    {
      id: 2,
      title: "Flash Sale Friday",
      discount: "50%",
      code: "FLASH50",
      description: "Limited time offer! Book now before it's gone",
      validUntil: "Dec 22, 2024",
      type: "flash",
      color: "from-purple-500 to-pink-500",
      icon: <FaBolt />,
      minPurchase: "৳800",
      maxDiscount: "৳500",
    },
    {
      id: 3,
      title: "First Ride Free",
      discount: "100%",
      code: "FIRSTRIDE",
      description: "Your first booking is on us! New users only",
      validUntil: "Ongoing",
      type: "firsttime",
      color: "from-green-500 to-teal-500",
      icon: <FaGift />,
      minPurchase: "None",
      maxDiscount: "৳200",
    },
  ];

  const allOffers = [
    {
      id: 1,
      title: "Weekend Getaway",
      discount: "20%",
      code: "WEEKEND20",
      description: "Save on all weekend departures",
      validUntil: "Dec 31, 2024",
      transport: ["bus", "train"],
      category: "seasonal",
      terms: "Valid for Fri-Sun departures only",
    },
    {
      id: 2,
      title: "Student Discount",
      discount: "15%",
      code: "STUDENT15",
      description: "Special discount for students with valid ID",
      validUntil: "Ongoing",
      transport: ["bus", "train", "launch"],
      category: "loyalty",
      terms: "Student ID verification required",
    },
    {
      id: 3,
      title: "Group Booking",
      discount: "25%",
      code: "GROUP25",
      description: "Book for 5+ passengers and save big",
      validUntil: "Ongoing",
      transport: ["bus", "train", "launch", "flight"],
      category: "loyalty",
      terms: "Minimum 5 passengers required",
    },
    {
      id: 4,
      title: "Early Bird",
      discount: "10%",
      code: "EARLY10",
      description: "Book 7 days in advance and save",
      validUntil: "Ongoing",
      transport: ["bus", "train"],
      category: "seasonal",
      terms: "Must book at least 7 days before departure",
    },
    {
      id: 5,
      title: "Night Owl Special",
      discount: "35%",
      code: "NIGHT35",
      description: "Midnight to 6AM bookings at special rates",
      validUntil: "Jan 31, 2025",
      transport: ["bus", "launch"],
      category: "flash",
      terms: "For night departures only",
    },
    {
      id: 6,
      title: "Loyalty Reward",
      discount: "₹100 OFF",
      code: "LOYAL100",
      description: "For our valued returning customers",
      validUntil: "Ongoing",
      transport: ["bus", "train", "launch", "flight"],
      category: "loyalty",
      terms: "Minimum 3 previous bookings required",
    },
  ];

  const stats = [
    { number: "50+", label: "Active Offers", icon: <FaTag /> },
    { number: "৳5M+", label: "Savings Given", icon: <FaGift /> },
    { number: "100K+", label: "Happy Users", icon: <FaUsers /> },
    { number: "Daily", label: "New Deals", icon: <FaBolt /> },
  ];

  const getTransportIcon = (type) => {
    switch (type) {
      case "bus":
        return <FaBus className="text-blue-500" />;
      case "train":
        return <FaTrain className="text-green-500" />;
      case "launch":
        return <FaShip className="text-cyan-500" />;
      case "flight":
        return <FaPlane className="text-purple-500" />;
      default:
        return <FaBus />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Offers & Deals | Book Now</title>
        <meta name="description" content="Exclusive travel deals and discount offers on Book Now" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-primary via-primary to-secondary overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
            {/* Floating Icons */}
            <FaPercent className="absolute top-1/4 left-1/4 text-white/10 text-6xl animate-bounce" />
            <FaGift className="absolute bottom-1/3 right-1/4 text-white/10 text-8xl animate-pulse" />
          </div>

          <div className="relative container mx-auto px-4 py-20 sm:py-28">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                <FaTag className="text-4xl text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Exclusive
                <span className="block">Offers & Deals</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
                Save big on your travels with our exclusive discounts, promo codes, and seasonal offers.
              </p>
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

        {/* Stats Section */}
        <div className="container mx-auto px-4 -mt-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold gradient-text mb-1">{stat.number}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Deals */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold mb-2 block">HOT DEALS</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
              Featured Offers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredDeals.map((deal) => (
              <div
                key={deal.id}
                className={`relative bg-gradient-to-br ${deal.color} rounded-3xl p-6 text-white overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                      {deal.icon}
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                      {deal.type}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{deal.title}</h3>
                  <p className="text-white/80 text-sm mb-4">{deal.description}</p>

                  <div className="text-5xl font-bold mb-4">{deal.discount}</div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <code className="text-lg font-mono font-bold">{deal.code}</code>
                      <button
                        onClick={() => handleCopyCode(deal.code)}
                        className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                      >
                        {copiedCode === deal.code ? <FaCheck /> : <FaCopy />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-white/80">
                    <span className="flex items-center gap-1">
                      <FaClock />
                      Valid until {deal.validUntil}
                    </span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-white/60">Min Purchase</p>
                      <p className="font-semibold">{deal.minPurchase}</p>
                    </div>
                    <div>
                      <p className="text-white/60">Max Discount</p>
                      <p className="font-semibold">{deal.maxDiscount}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Offers Section */}
        <div className="bg-white dark:bg-gray-800 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold mb-2 block">ALL OFFERS</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
                Browse All Deals
              </h2>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-primary to-secondary text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {category.icon}
                  {category.label}
                </button>
              ))}
            </div>

            {/* Offers Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">{offer.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{offer.description}</p>
                    </div>
                    <span className="text-2xl font-bold gradient-text">{offer.discount}</span>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {offer.transport.map((type) => (
                      <span
                        key={type}
                        className="w-8 h-8 bg-white dark:bg-gray-600 rounded-lg flex items-center justify-center"
                      >
                        {getTransportIcon(type)}
                      </span>
                    ))}
                  </div>

                  <div className="bg-white dark:bg-gray-600 rounded-xl p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <code className="font-mono font-bold text-primary">{offer.code}</code>
                      <button
                        onClick={() => handleCopyCode(offer.code)}
                        className="p-2 bg-gray-100 dark:bg-gray-500 rounded-lg hover:bg-primary hover:text-white transition-colors"
                      >
                        {copiedCode === offer.code ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaCopy className="text-gray-500 dark:text-gray-300" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                      <FaClock className="text-xs" />
                      Until {offer.validUntil}
                    </span>
                    <Link
                      to="/all-tickets"
                      className="text-primary hover:underline font-medium flex items-center gap-1"
                    >
                      Use Now <FaArrowRight className="text-xs" />
                    </Link>
                  </div>

                  <p className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600 text-xs text-gray-500 dark:text-gray-400">
                    * {offer.terms}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FaBell className="text-white text-2xl" />
                  <span className="text-white/80 font-medium">Never Miss a Deal</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Subscribe for Exclusive Offers
                </h2>
                <p className="text-white/80 mb-6">
                  Get the best deals delivered straight to your inbox. Be the first to know about flash sales
                  and special promotions!
                </p>
              </div>
              <div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <button className="px-6 py-3 bg-white text-primary font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105">
                      Subscribe
                    </button>
                  </div>
                  <p className="text-white/60 text-sm mt-3 flex items-center gap-2">
                    <FaHeart className="text-red-400" />
                    Join 50,000+ subscribers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Terms Section */}
        <div className="container mx-auto px-4 pb-20">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <FaStar className="text-primary" />
              Terms & Conditions
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Offers cannot be combined with other promotions unless specified</li>
              <li>• Discount codes are valid for one-time use per user</li>
              <li>• BookNow reserves the right to modify or cancel offers at any time</li>
              <li>• Refunds on discounted bookings will be processed at the discounted amount</li>
              <li>• Some offers may have minimum purchase requirements</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default OffersDeals;
