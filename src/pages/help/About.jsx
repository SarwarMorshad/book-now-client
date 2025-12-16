import { Helmet } from "react-helmet-async";
import {
  FaRocket,
  FaUsers,
  FaGlobe,
  FaAward,
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaHeart,
  FaShieldAlt,
  FaClock,
  FaHandshake,
  FaLinkedin,
  FaTwitter,
  FaQuoteLeft,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  const stats = [
    { number: "500K+", label: "Happy Travelers", icon: <FaUsers /> },
    { number: "50+", label: "Cities Covered", icon: <FaGlobe /> },
    { number: "1000+", label: "Daily Trips", icon: <FaBus /> },
    { number: "99%", label: "Satisfaction Rate", icon: <FaAward /> },
  ];

  const values = [
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Trust & Safety",
      description: "Your safety is our top priority. We verify all vendors and ensure secure transactions.",
      color: "blue",
    },
    {
      icon: <FaClock className="text-3xl" />,
      title: "Reliability",
      description:
        "Count on us for accurate schedules, real-time updates, and dependable service every time.",
      color: "green",
    },
    {
      icon: <FaHeart className="text-3xl" />,
      title: "Customer First",
      description:
        "We're dedicated to providing exceptional experiences and support at every step of your journey.",
      color: "red",
    },
    {
      icon: <FaHandshake className="text-3xl" />,
      title: "Transparency",
      description: "No hidden fees, no surprises. What you see is what you get, always.",
      color: "purple",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
      bio: "10+ years in travel tech",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      bio: "Former Google Engineer",
    },
    {
      name: "Emily Williams",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
      bio: "Operations excellence expert",
    },
    {
      name: "David Kumar",
      role: "Head of Customer Success",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
      bio: "Customer experience leader",
    },
  ];

  const milestones = [
    { year: "2020", title: "Founded", description: "BookNow was born with a vision to simplify travel" },
    { year: "2021", title: "100K Users", description: "Reached our first major milestone" },
    { year: "2022", title: "Multi-city Expansion", description: "Expanded to 30+ cities across the country" },
    { year: "2023", title: "Mobile App Launch", description: "Launched iOS and Android apps" },
    { year: "2024", title: "500K+ Users", description: "Half a million happy travelers and counting" },
  ];

  const testimonials = [
    {
      quote:
        "BookNow has completely transformed how I plan my trips. The booking process is seamless and the customer support is exceptional!",
      author: "Rahim Ahmed",
      role: "Frequent Traveler",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    },
    {
      quote:
        "As a vendor, partnering with BookNow has significantly increased my visibility and bookings. The platform is intuitive and professional.",
      author: "Fatima Hassan",
      role: "Bus Operator",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Book Now</title>
        <meta name="description" content="Learn about Book Now - Your trusted travel booking platform" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-primary via-primary to-secondary overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>

          <div className="relative container mx-auto px-4 py-20 sm:py-28">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                <FaRocket className="text-4xl text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Making Travel
                <span className="block">Simple & Accessible</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
                We're on a mission to revolutionize how people book and experience travel across Bangladesh
                and beyond.
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

        {/* Our Story */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-semibold mb-2 block">OUR STORY</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                From a Simple Idea to
                <span className="gradient-text"> Transforming Travel</span>
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  BookNow was founded in 2020 with a simple yet powerful vision: to make travel booking as
                  easy as a few taps on your phone. We noticed that travelers often struggled with fragmented
                  booking systems, unreliable schedules, and lack of transparency.
                </p>
                <p>
                  Today, we've grown into a comprehensive platform connecting thousands of travelers with
                  verified transport operators across the country. From buses and trains to launches and
                  flights, we're your one-stop destination for all travel needs.
                </p>
                <p>
                  Our commitment to excellence, innovation, and customer satisfaction drives everything we do.
                  We're not just a booking platform; we're your travel partner.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-2xl p-6 flex items-center justify-center h-40">
                    <FaBus className="text-6xl text-blue-500" />
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-2xl p-6 flex items-center justify-center h-48">
                    <FaTrain className="text-6xl text-green-500" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-cyan-100 dark:bg-cyan-900/30 rounded-2xl p-6 flex items-center justify-center h-48">
                    <FaShip className="text-6xl text-cyan-500" />
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900/30 rounded-2xl p-6 flex items-center justify-center h-40">
                    <FaPlane className="text-6xl text-purple-500" />
                  </div>
                </div>
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-white dark:bg-gray-800 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold mb-2 block">OUR VALUES</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
                What We Stand For
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                      value.color === "blue"
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-500"
                        : value.color === "green"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-500"
                          : value.color === "red"
                            ? "bg-red-100 dark:bg-red-900/30 text-red-500"
                            : "bg-purple-100 dark:bg-purple-900/30 text-purple-500"
                    }`}
                  >
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold mb-2 block">OUR JOURNEY</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
              Milestones We're Proud Of
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary"></div>

              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center mb-8 ${
                    index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ml-12 sm:ml-0 ${index % 2 === 0 ? "sm:pr-12" : "sm:pl-12"}`}>
                    <div
                      className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg ${
                        index % 2 === 0 ? "sm:text-right" : "sm:text-left"
                      }`}
                    >
                      <span className="text-primary font-bold text-lg">{milestone.year}</span>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-1">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-primary to-secondary rounded-full border-4 border-white dark:border-gray-900 shadow-md"></div>

                  {/* Spacer for opposite side */}
                  <div className="hidden sm:block flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white dark:bg-gray-800 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold mb-2 block">OUR TEAM</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
                Meet the People Behind BookNow
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <div className="flex gap-2">
                        <a
                          href="#"
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors"
                        >
                          <FaLinkedin />
                        </a>

                        <a
                          href="#"
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors"
                        >
                          <FaTwitter />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg">{member.name}</h3>
                    <p className="text-primary font-medium text-sm">{member.role}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold mb-2 block">TESTIMONIALS</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
              What People Say About Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg relative">
                <FaQuoteLeft className="text-4xl text-primary/20 absolute top-6 left-6" />
                <div className="relative z-10">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-100">{testimonial.author}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 pb-20">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Join over 500,000 travelers who trust BookNow for their travel needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/all-tickets"
                  className="px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105"
                >
                  Browse Tickets
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/30 transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
