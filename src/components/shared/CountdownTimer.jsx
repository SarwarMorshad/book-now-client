import { useState, useEffect, useMemo } from "react";

const CountdownTimer = ({ targetDate, targetTime }) => {
  // Calculate initial time left
  const calculateTimeLeft = useMemo(() => {
    return () => {
      // Combine date and time
      const dateStr = new Date(targetDate).toISOString().split("T")[0];
      const target = new Date(`${dateStr}T${targetTime}:00`);
      const now = new Date();
      const difference = target - now;

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          expired: true,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        expired: false,
      };
    };
  }, [targetDate, targetTime]);

  // Initialize state with calculated value
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  useEffect(() => {
    // Update every second using interval
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  if (timeLeft.expired) {
    return (
      <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-center">
        <span className="font-semibold">⏰ Departed</span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-xl">
      <p className="text-xs text-gray-600 mb-2 text-center font-medium">⏰ Departure In</p>
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-white rounded-lg p-2 shadow-sm">
          <span className="text-2xl font-bold gradient-text">{timeLeft.days}</span>
          <p className="text-xs text-gray-500">Days</p>
        </div>
        <div className="bg-white rounded-lg p-2 shadow-sm">
          <span className="text-2xl font-bold gradient-text">{timeLeft.hours}</span>
          <p className="text-xs text-gray-500">Hours</p>
        </div>
        <div className="bg-white rounded-lg p-2 shadow-sm">
          <span className="text-2xl font-bold gradient-text">{timeLeft.minutes}</span>
          <p className="text-xs text-gray-500">Mins</p>
        </div>
        <div className="bg-white rounded-lg p-2 shadow-sm">
          <span className="text-2xl font-bold gradient-text">{timeLeft.seconds}</span>
          <p className="text-xs text-gray-500">Secs</p>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
