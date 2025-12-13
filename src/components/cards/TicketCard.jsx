import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaTicketAlt } from "react-icons/fa";

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

  // Transport type icon and color
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
    <div className="card bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 group">
      {/* Image */}
      <figure className="relative overflow-hidden h-48">
        <img
          src={imageUrl || "https://via.placeholder.com/400x300?text=Ticket"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Transport Type Badge */}
        <div
          className={`absolute top-3 left-3 ${transportInfo.color} text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2`}
        >
          <span>{transportInfo.icon}</span>
          <span>{transportInfo.label}</span>
        </div>
        {/* Quantity Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
          {quantity} seats left
        </div>
      </figure>

      {/* Content */}
      <div className="card-body p-5">
        {/* Title */}
        <h2 className="card-title text-lg font-bold text-gray-800 mb-3">{title}</h2>

        {/* Route */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt className="text-primary" />
            <span className="font-medium">{fromLocation}</span>
          </div>
          <div className="text-gray-400">→</div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt className="text-secondary" />
            <span className="font-medium">{toLocation}</span>
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-primary" />
            <span>{formatDate(departureDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-secondary" />
            <span>{departureTime}</span>
          </div>
        </div>

        {/* Vendor */}
        <p className="text-sm text-gray-500 mb-4">
          By <span className="font-semibold text-gray-700">{vendorName}</span>
        </p>

        {/* Price & Button */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
          <div>
            <p className="text-2xl font-bold text-primary">
              ${price}
              <span className="text-sm text-gray-500 font-normal">/person</span>
            </p>
          </div>
          <Link to={`/tickets/${_id}`} className="btn btn-primary btn-sm text-white">
            <FaTicketAlt />
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
