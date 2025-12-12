const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient */}
      <div className="hero min-h-[600px] bg-gradient-to-r from-primary via-accent to-secondary relative overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="hero-content text-center text-white relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
              Welcome to{" "}
              <span className="text-white underline decoration-secondary decoration-4">Book Now</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light">
              Your one-stop platform for booking bus, train, launch & flight tickets easily!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="btn btn-accent btn-lg text-white border-none shadow-lg hover:shadow-2xl">
                🚀 Explore Tickets
              </button>
              <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">
                📖 Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="container mx-auto px-4 py-16 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Stat 1 */}
          <div className="stat bg-base-100 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-primary">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-10 h-10 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                ></path>
              </svg>
            </div>
            <div className="stat-title text-neutral font-semibold">Total Bookings</div>
            <div className="stat-value text-primary text-4xl">10K+</div>
            <div className="stat-desc text-success">↗︎ 22% increase</div>
          </div>

          {/* Stat 2 */}
          <div className="stat bg-base-100 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-secondary">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-10 h-10 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title text-neutral font-semibold">Happy Customers</div>
            <div className="stat-value text-secondary text-4xl">8K+</div>
            <div className="stat-desc text-success">↗︎ 400 new users</div>
          </div>

          {/* Stat 3 */}
          <div className="stat bg-base-100 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-accent">
            <div className="stat-figure text-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-10 h-10 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                ></path>
              </svg>
            </div>
            <div className="stat-title text-neutral font-semibold">Available Routes</div>
            <div className="stat-value text-accent text-4xl">50+</div>
            <div className="stat-desc text-info">Nationwide Coverage</div>
          </div>
        </div>
      </div>

      {/* Coming Soon Sections Placeholder */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold gradient-text mb-4">More Features Coming Soon</h2>
          <p className="text-neutral text-lg">
            Advertisement Section, Latest Tickets, Popular Routes & More!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
