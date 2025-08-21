const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center px-6">
      <div className="text-center text-white max-w-2xl">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to <span className="text-yellow-300">My Website</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl mb-6">
          A modern React + Tailwind app with amazing features 🚀
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <a
            href="/about"
            className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-300 transition"
          >
            Learn More
          </a>
          <a
            href="/register"
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition"
          >
            Get Started
          </a>
        </div>

        {/* Decorative Section */}
        <div className="mt-10 flex justify-center gap-6">
          <div className="w-16 h-16 bg-white/20 rounded-full animate-bounce"></div>
          <div className="w-16 h-16 bg-white/20 rounded-full animate-pulse"></div>
          <div className="w-16 h-16 bg-white/20 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
