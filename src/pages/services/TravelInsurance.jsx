import { Helmet } from "react-helmet-async";
import { useState } from "react";
import {
  FaShieldAlt,
  FaUmbrella,
  FaMedkit,
  FaSuitcase,
  FaPlane,
  FaBus,
  FaTrain,
  FaShip,
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
  FaPhone,
  FaEnvelope,
  FaFileAlt,
  FaUserShield,
  FaHospital,
  FaMoneyBillWave,
  FaClock,
  FaGlobe,
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
  FaStar,
  FaHeartbeat,
  FaCar,
  FaExclamationTriangle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const TravelInsurance = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("standard");

  const coverageHighlights = [
    {
      icon: <FaMedkit className="text-3xl" />,
      title: "Medical Emergencies",
      description: "Coverage for unexpected illness or injury during travel",
      amount: "Up to ৳5,00,000",
      color: "red",
    },
    {
      icon: <FaSuitcase className="text-3xl" />,
      title: "Lost Baggage",
      description: "Compensation for lost, stolen, or damaged luggage",
      amount: "Up to ৳50,000",
      color: "blue",
    },
    {
      icon: <FaClock className="text-3xl" />,
      title: "Trip Delays",
      description: "Coverage for expenses due to unexpected delays",
      amount: "Up to ৳10,000",
      color: "yellow",
    },
    {
      icon: <FaTimesCircle className="text-3xl" />,
      title: "Trip Cancellation",
      description: "Reimbursement for cancelled trips due to covered reasons",
      amount: "100% Refund",
      color: "purple",
    },
  ];

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 99,
      period: "per trip",
      description: "Essential coverage for budget travelers",
      popular: false,
      features: [
        { text: "Medical Coverage up to ৳1,00,000", included: true },
        { text: "Lost Baggage up to ৳15,000", included: true },
        { text: "Trip Delay Coverage", included: true },
        { text: "24/7 Assistance Hotline", included: true },
        { text: "Trip Cancellation", included: false },
        { text: "Personal Accident Cover", included: false },
        { text: "Adventure Sports Cover", included: false },
      ],
    },
    {
      id: "standard",
      name: "Standard",
      price: 199,
      period: "per trip",
      description: "Comprehensive coverage for most travelers",
      popular: true,
      features: [
        { text: "Medical Coverage up to ৳3,00,000", included: true },
        { text: "Lost Baggage up to ৳35,000", included: true },
        { text: "Trip Delay Coverage", included: true },
        { text: "24/7 Assistance Hotline", included: true },
        { text: "Trip Cancellation up to ৳50,000", included: true },
        { text: "Personal Accident Cover", included: true },
        { text: "Adventure Sports Cover", included: false },
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: 349,
      period: "per trip",
      description: "Maximum protection for worry-free travel",
      popular: false,
      features: [
        { text: "Medical Coverage up to ৳5,00,000", included: true },
        { text: "Lost Baggage up to ৳50,000", included: true },
        { text: "Trip Delay Coverage", included: true },
        { text: "24/7 Assistance Hotline", included: true },
        { text: "Trip Cancellation up to ৳1,00,000", included: true },
        { text: "Personal Accident Cover", included: true },
        { text: "Adventure Sports Cover", included: true },
      ],
    },
  ];

  const benefits = [
    {
      icon: <FaHeartbeat />,
      title: "Emergency Medical Evacuation",
      description: "Air ambulance and emergency transport to nearest medical facility",
    },
    {
      icon: <FaHospital />,
      title: "Hospitalization Support",
      description: "Cashless treatment at network hospitals across Bangladesh",
    },
    {
      icon: <FaUserShield />,
      title: "Personal Liability",
      description: "Coverage for accidental damage to third-party property",
    },
    {
      icon: <FaCar />,
      title: "Rental Vehicle Cover",
      description: "Protection for rental car damages during your trip",
    },
    {
      icon: <FaPhone />,
      title: "24/7 Support",
      description: "Round-the-clock emergency assistance in multiple languages",
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Quick Claims",
      description: "Hassle-free claims process with fast reimbursement",
    },
  ];

  const faqs = [
    {
      question: "What does travel insurance cover?",
      answer:
        "Our travel insurance covers medical emergencies, trip cancellation, lost baggage, trip delays, personal accidents, and more depending on the plan you choose. Each plan has specific coverage limits detailed in the policy document.",
    },
    {
      question: "When should I buy travel insurance?",
      answer:
        "We recommend purchasing travel insurance as soon as you book your trip. This ensures you're covered for pre-trip cancellations and gives you peace of mind from the start. You can purchase insurance up to 24 hours before your departure.",
    },
    {
      question: "Are pre-existing medical conditions covered?",
      answer:
        "Standard policies typically don't cover pre-existing conditions. However, our Premium plan offers limited coverage for stable pre-existing conditions. Please review the policy terms or contact us for specific details.",
    },
    {
      question: "How do I file a claim?",
      answer:
        "Filing a claim is easy! You can submit claims through our mobile app, website, or by calling our 24/7 helpline. Simply provide the required documents (receipts, medical reports, police reports if applicable) and we'll process your claim within 7-14 business days.",
    },
    {
      question: "Can I cancel my insurance and get a refund?",
      answer:
        "Yes, you can cancel your insurance within 15 days of purchase for a full refund, provided no claim has been made. After 15 days, cancellation refunds are prorated based on the remaining coverage period.",
    },
    {
      question: "Is COVID-19 covered?",
      answer:
        "Yes! All our plans include COVID-19 coverage for medical emergencies and trip cancellation due to positive test results. Quarantine accommodation costs are also covered under the Standard and Premium plans.",
    },
  ];

  const testimonials = [
    {
      quote:
        "When I fell ill during my trip to Cox's Bazar, BookNow's insurance saved me from a huge medical bill. The claim process was incredibly smooth!",
      author: "Karim Rahman",
      trip: "Cox's Bazar Trip",
      rating: 5,
    },
    {
      quote:
        "My luggage was lost on a bus journey. I got compensated within a week. Highly recommend their insurance to all travelers!",
      author: "Nadia Islam",
      trip: "Sylhet Journey",
      rating: 5,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Travel Insurance | Book Now</title>
        <meta name="description" content="Comprehensive travel insurance for worry-free journeys" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <div className="relative bg-[#10B981] overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
            <FaUmbrella className="absolute top-1/4 right-1/4 text-white/10 text-8xl" />
          </div>

          <div className="relative container mx-auto px-4 py-20 sm:py-28">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                <FaShieldAlt className="text-4xl text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Travel with
                <span className="block">Peace of Mind</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8">
                Comprehensive travel insurance to protect you from unexpected events. Travel worry-free
                knowing you're covered.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#plans"
                  className="px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105"
                >
                  View Plans
                </a>
                <a
                  href="#coverage"
                  className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/30 transition-all"
                >
                  What's Covered?
                </a>
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

        {/* Coverage Highlights */}
        <div id="coverage" className="container mx-auto px-4 -mt-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {coverageHighlights.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                    item.color === "red"
                      ? "bg-red-100 dark:bg-red-900/30 text-red-500"
                      : item.color === "blue"
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-500"
                        : item.color === "yellow"
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-500"
                          : "bg-purple-100 dark:bg-purple-900/30 text-purple-500"
                  }`}
                >
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-1">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{item.description}</p>
                <p className="text-primary font-semibold">{item.amount}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Insurance Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-semibold mb-2 block">WHY TRAVEL INSURANCE?</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                Don't Let Unexpected Events
                <span className="gradient-text"> Ruin Your Trip</span>
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  Travel is full of surprises – some wonderful, some not so much. From medical emergencies to
                  lost luggage, unexpected events can turn your dream trip into a nightmare.
                </p>
                <p>
                  BookNow Travel Insurance provides comprehensive coverage to protect you financially and give
                  you peace of mind. With affordable plans and hassle-free claims, we've got you covered every
                  step of the way.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <span className="text-gray-800 dark:text-gray-100">Instant Coverage</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <span className="text-gray-800 dark:text-gray-100">Easy Claims</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <span className="text-gray-800 dark:text-gray-100">24/7 Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <span className="text-gray-800 dark:text-gray-100">All Transport Types</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-2xl p-6 flex flex-col items-center justify-center h-40">
                    <FaBus className="text-5xl text-blue-500 mb-2" />
                    <p className="text-gray-800 dark:text-gray-100 font-medium">Bus</p>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-2xl p-6 flex flex-col items-center justify-center h-48">
                    <FaTrain className="text-5xl text-green-500 mb-2" />
                    <p className="text-gray-800 dark:text-gray-100 font-medium">Train</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-cyan-100 dark:bg-cyan-900/30 rounded-2xl p-6 flex flex-col items-center justify-center h-48">
                    <FaShip className="text-5xl text-cyan-500 mb-2" />
                    <p className="text-gray-800 dark:text-gray-100 font-medium">Launch</p>
                  </div>
                  <div className="bg-purple-100 dark:bg-purple-900/30 rounded-2xl p-6 flex flex-col items-center justify-center h-40">
                    <FaPlane className="text-5xl text-purple-500 mb-2" />
                    <p className="text-gray-800 dark:text-gray-100 font-medium">Flight</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#10B981] rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>

        {/* Plans Section */}
        <div id="plans" className="bg-white dark:bg-gray-800 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold mb-2 block">CHOOSE YOUR PLAN</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
                Insurance Plans for Every Traveler
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-2 ${
                    selectedPlan === plan.id ? "ring-2 ring-primary shadow-xl" : "hover:shadow-lg"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#10B981] text-white text-sm font-medium rounded-full">
                      Most Popular
                    </div>
                  )}

                  <div className="text-center mb-6 pt-4">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{plan.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{plan.description}</p>
                    <div className="mt-4">
                      <span className="text-4xl font-bold gradient-text">৳{plan.price}</span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">/{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className={`flex items-center gap-2 text-sm ${
                          feature.included
                            ? "text-gray-800 dark:text-gray-100"
                            : "text-gray-400 dark:text-gray-500"
                        }`}
                      >
                        {feature.included ? (
                          <FaCheckCircle className="text-green-500 flex-shrink-0" />
                        ) : (
                          <FaTimesCircle className="text-gray-400 flex-shrink-0" />
                        )}
                        {feature.text}
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      selectedPlan === plan.id
                        ? "bg-[#10B981] text-white"
                        : "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 hover:bg-primary hover:text-white"
                    }`}
                  >
                    {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold mb-2 block">ADDITIONAL BENEFITS</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
              More Than Just Insurance
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-[#10B981] rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white dark:bg-gray-800 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold mb-2 block">TESTIMONIALS</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
                Real Stories from Travelers
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 italic mb-6">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-bold text-gray-800 dark:text-gray-100">{testimonial.author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.trip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold mb-2 block">FAQs</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-3">
                    <FaQuestionCircle className="text-primary flex-shrink-0" />
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <FaChevronUp className="text-primary" />
                  ) : (
                    <FaChevronDown className="text-gray-400" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 dark:text-gray-400 pl-9">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 pb-20">
          <div className="bg-[#10B981] rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <FaExclamationTriangle className="text-5xl text-white/80 mx-auto mb-4" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Don't Travel Without Protection
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                For just ৳99 per trip, get comprehensive coverage that could save you thousands in unexpected
                expenses.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/all-tickets"
                  className="px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2"
                >
                  Get Insured Now
                  <FaArrowRight />
                </Link>
                <a
                  href="tel:+880123456789"
                  className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/30 hover:bg-white/30 transition-all flex items-center gap-2"
                >
                  <FaPhone />
                  Talk to Expert
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="container mx-auto px-4 pb-20">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-500 text-2xl">
                  <FaPhone />
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">24/7 Helpline</p>
                  <p className="font-bold text-gray-800 dark:text-gray-100">+880 123 456 789</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-500 text-2xl">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Email Support</p>
                  <p className="font-bold text-gray-800 dark:text-gray-100">insurance@booknow.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-500 text-2xl">
                  <FaFileAlt />
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Claims</p>
                  <p className="font-bold text-gray-800 dark:text-gray-100">claims@booknow.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelInsurance;
