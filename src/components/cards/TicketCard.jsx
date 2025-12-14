import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaTicketAlt, FaUser } from "react-icons/fa";

const TicketCard = ({ ticket }) => {
  const {
    _id,
    title,
    fromLocation,
    toLocation,
    transportType,
    price,
    quantity,
    departureDate,
    departureTime,
    imageUrl,
    vendorName,
  } = ticket;

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Transport type config
  const getTransportInfo = (type) => {
    const types = {
      bus: { icon: "🚌", color: "bg-blue-500", label: "Bus" },
      train: { icon: "🚆", color: "bg-green-500", label: "Train" },
      launch: { icon: "🚢", color: "bg-purple-500", label: "Launch" },
      plane: { icon: "✈️", color: "bg-orange-500", label: "Plane" },
    };
    return types[type] || types.bus;
  };

  const transportInfo = getTransportInfo(transportType);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Transport Type Badge */}
        <div
          className={`absolute top-4 left-4 ${transportInfo.color} text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg`}
        >
          <span className="text-lg">{transportInfo.icon}</span>
          <span>{transportInfo.label}</span>
        </div>

        {/* Seats Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-gray-800 shadow-lg">
          {quantity} seats left
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-4 line-clamp-1">{title}</h3>

        {/* Route */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2 flex-1">
            <FaMapMarkerAlt className="text-primary flex-shrink-0" />
            <span className="font-semibold text-gray-800">{fromLocation}</span>
          </div>
          <div className="text-gray-400 font-bold">→</div>
          <div className="flex items-center gap-2 flex-1">
            <FaMapMarkerAlt className="text-secondary flex-shrink-0" />
            <span className="font-semibold text-gray-800">{toLocation}</span>
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaCalendarAlt className="text-primary" />
            <span>{formatDate(departureDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaClock className="text-secondary" />
            <span>{departureTime}</span>
          </div>
        </div>

        {/* Vendor */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <FaUser className="text-gray-400" />
          <span>
            By <span className="font-semibold text-gray-700">{vendorName}</span>
          </span>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <p className="text-sm text-gray-500 mb-1">Starting from</p>
            <p className="text-3xl font-bold gradient-text">
              ${price}
              <span className="text-sm text-gray-500 font-normal">/person</span>
            </p>
          </div>
          <Link
            to={`/tickets/${_id}`}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <FaTicketAlt />
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
