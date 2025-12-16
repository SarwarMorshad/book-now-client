import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import {
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaSearch,
  FaShieldAlt,
  FaClock,
  FaHeadset,
  FaMoneyBillWave,
  FaArrowRight,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import api from "../../services/api";
import TicketCard from "../../components/cards/TicketCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const [advertisedTickets, setAdvertisedTickets] = useState([]);
  const [latestTickets, setLatestTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    transportType: "",
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      // Fetch advertised tickets
      const advertisedRes = await api.get("/tickets/advertised");
      if (advertisedRes.data.success) {
        setAdvertisedTickets(advertisedRes.data.tickets.slice(0, 6));
      }

      // Fetch latest tickets
      const latestRes = await api.get("/tickets/latest");
      if (latestRes.data.success) {
        setLatestTickets(latestRes.data.tickets.slice(0, 8));
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchData.from) params.append("from", searchData.from);
    if (searchData.to) params.append("to", searchData.to);
    if (searchData.transportType) params.append("transportType", searchData.transportType);
    window.location.href = `/all-tickets?${params.toString()}`;
  };

  // Hero Slides Data
  const heroSlides = [
    {
      title: "Travel Anywhere, Anytime",
      subtitle: "Book bus, train, launch & flight tickets with ease",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920",
      gradient: "from-blue-900/80 to-purple-900/80",
    },
    {
      title: "Explore New Destinations",
      subtitle: "Discover amazing places with affordable tickets",
      image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1920",
      gradient: "from-green-900/80 to-blue-900/80",
    },
    {
      title: "Safe & Comfortable Journey",
      subtitle: "Travel with trusted vendors and premium services",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920",
      gradient: "from-orange-900/80 to-red-900/80",
    },
  ];

  // Transport Types
  const transportTypes = [
    { icon: FaBus, name: "Bus", color: "bg-blue-500" },
    { icon: FaTrain, name: "Train", color: "bg-green-500" },
    { icon: FaShip, name: "Launch", color: "bg-cyan-500" },
    { icon: FaPlane, name: "Plane", color: "bg-orange-500" },
  ];

  // Why Choose Us Data
  const features = [
    {
      icon: FaShieldAlt,
      title: "Secure Booking",
      description: "100% secure payment with Stripe integration",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: FaClock,
      title: "24/7 Availability",
      description: "Book tickets anytime, anywhere you want",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: FaHeadset,
      title: "Customer Support",
      description: "Dedicated support team ready to help you",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: FaMoneyBillWave,
      title: "Best Prices",
      description: "Competitive prices with no hidden charges",
      color: "bg-orange-100 text-orange-600",
    },
  ];

  // How It Works Data
  const steps = [
    {
      step: "01",
      title: "Search Tickets",
      description: "Enter your destination and travel date",
      icon: FaSearch,
    },
    {
      step: "02",
      title: "Select & Book",
      description: "Choose your preferred ticket and book it",
      icon: FaCalendarAlt,
    },
    {
      step: "03",
      title: "Make Payment",
      description: "Pay securely using Stripe payment",
      icon: FaMoneyBillWave,
    },
    {
      step: "04",
      title: "Start Journey",
      description: "Get your ticket and enjoy your trip",
      icon: FaMapMarkerAlt,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Home - Book Now</title>
        <meta
          name="description"
          content="Book bus, train, launch, and flight tickets with ease. Discover amazing destinations and enjoy a safe, comfortable journey."
        />
      </Helmet>
      <div className="min-h-screen">
        {/* ==================== HERO SECTION ==================== */}
        <section className="relative h-[600px] lg:h-[700px]">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            className="h-full"
          >
            {heroSlides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div
                  className="h-full bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`}></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white px-4 max-w-4xl">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fadeInUp">
                        {slide.title}
                      </h1>
                      <p className="text-lg md:text-xl text-white/90 mb-8">{slide.subtitle}</p>

                      {/* Transport Type Icons */}
                      <div className="flex justify-center gap-4 mb-8">
                        {transportTypes.map((transport, idx) => (
                          <div
                            key={idx}
                            className={`w-14 h-14 ${transport.color} rounded-xl flex items-center justify-center text-white text-xl hover:scale-110 transition-transform cursor-pointer`}
                            title={transport.name}
                          >
                            <transport.icon />
                          </div>
                        ))}
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                          to="/all-tickets"
                          className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-gray-100 transition-all hover:shadow-lg"
                        >
                          Explore Tickets
                        </Link>

                        <a
                          href="#how-it-works"
                          className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all"
                        >
                          How It Works
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Search Box */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-5xl px-4 z-10">
            <form
              onSubmit={handleSearch}
              className="bg-white rounded-2xl shadow-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              {/* From */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">From</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Departure City"
                    value={searchData.from}
                    onChange={(e) => setSearchData({ ...searchData, from: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* To */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">To</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Destination City"
                    value={searchData.to}
                    onChange={(e) => setSearchData({ ...searchData, to: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Transport Type */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Transport</label>
                <select
                  value={searchData.transportType}
                  onChange={(e) => setSearchData({ ...searchData, transportType: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none"
                >
                  <option value="">All Types</option>
                  <option value="bus">Bus</option>
                  <option value="train">Train</option>
                  <option value="launch">Launch</option>
                  <option value="plane">Plane</option>
                </select>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <FaSearch />
                  Search
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Spacer for Search Box */}
        <div className="h-24 md:h-16"></div>

        {/* ==================== STATS SECTION ==================== */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "10K+", label: "Happy Customers", icon: "😊" },
                { value: "500+", label: "Routes Available", icon: "🗺️" },
                { value: "50+", label: "Trusted Vendors", icon: "✅" },
                { value: "24/7", label: "Support Available", icon: "💬" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all"
                >
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <h3 className="text-3xl font-bold gradient-text mb-1">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== ADVERTISED TICKETS ==================== */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Featured Deals
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">Advertised Tickets</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Handpicked deals with the best prices and premium services
              </p>
            </div>

            {/* Tickets Grid */}
            {loading ? (
              <div className="flex justify-center py-12">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            ) : advertisedTickets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {advertisedTickets.map((ticket) => (
                  <TicketCard key={ticket._id} ticket={ticket} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-2xl">
                <p className="text-gray-500 text-lg">No advertised tickets available</p>
              </div>
            )}

            {/* View All Button */}
            <div className="text-center mt-10">
              <Link
                to="/all-tickets"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg transition-all"
              >
                View All Tickets
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* ==================== WHY CHOOSE US ==================== */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Our Benefits
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">Why Choose Us?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We provide the best booking experience with amazing features
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all group"
                >
                  <div
                    className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== LATEST TICKETS ==================== */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                New Arrivals
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">Latest Tickets</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Recently added tickets with fresh deals and routes
              </p>
            </div>

            {/* Tickets Grid */}
            {loading ? (
              <div className="flex justify-center py-12">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            ) : latestTickets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {latestTickets.map((ticket) => (
                  <TicketCard key={ticket._id} ticket={ticket} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-2xl">
                <p className="text-gray-500 text-lg">No tickets available yet</p>
              </div>
            )}
          </div>
        </section>

        {/* ==================== HOW IT WORKS ==================== */}
        <section id="how-it-works" className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                Simple Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">How It Works</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Book your tickets in just 4 simple steps</p>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((item, index) => (
                <div key={index} className="relative text-center group">
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gray-700">
                      <div className="absolute right-0 -top-1 w-3 h-3 border-t-2 border-r-2 border-gray-700 rotate-45"></div>
                    </div>
                  )}

                  {/* Step Number */}
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="text-3xl text-white" />
                  </div>

                  <span className="text-5xl font-bold text-gray-800">{item.step}</span>
                  <h3 className="text-xl font-bold mt-4 mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== POPULAR ROUTES ==================== */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Top Destinations
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">Popular Routes</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Most booked routes by our travelers</p>
            </div>

            {/* Routes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  from: "Dhaka",
                  to: "Chittagong",
                  image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=500",
                  price: 50,
                },
                {
                  from: "Dhaka",
                  to: "Cox's Bazar",
                  image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500",
                  price: 80,
                },
                {
                  from: "Dhaka",
                  to: "Sylhet",
                  image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=500",
                  price: 45,
                },
                {
                  from: "Dhaka",
                  to: "Rajshahi",
                  image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=500",
                  price: 55,
                },
                {
                  from: "Chittagong",
                  to: "Cox's Bazar",
                  image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=500",
                  price: 35,
                },
                {
                  from: "Dhaka",
                  to: "Barishal",
                  image: "https://images.unsplash.com/photo-1540729687087-c2c5f85d4c45?w=500",
                  price: 40,
                },
              ].map((route, index) => (
                <Link
                  key={index}
                  to={`/all-tickets?from=${route.from}&to=${route.to}`}
                  className="group relative h-64 rounded-2xl overflow-hidden shadow-lg"
                >
                  <img
                    src={route.image}
                    alt={`${route.from} to ${route.to}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 text-white mb-2">
                      <span className="font-semibold">{route.from}</span>
                      <FaArrowRight className="text-secondary" />
                      <span className="font-semibold">{route.to}</span>
                    </div>
                    <p className="text-white/80 text-sm">
                      Starting from <span className="text-secondary font-bold text-lg">${route.price}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== CTA SECTION ==================== */}
        <section className="py-16 bg-gradient-to-r from-primary to-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of happy travelers and book your next adventure today!
            </p>
            <Link
              to="/all-tickets"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:shadow-xl transition-all"
            >
              Book Now
              <FaArrowRight />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
