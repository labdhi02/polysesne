import React from "react";
import { useNavigate } from "react-router-dom";
import cycleTrackingImg from "../../assets/cycle-tracking.jpg";
import pcodDetectionImg from "../../assets/pcod-detection.jpg";
import solution from "../../assets/solution.jpg";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center">
      {/* Navbar */}
      <nav className="w-full bg-[#FFAABB] py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-4xl font-bold text-[#ad3559]">Polysense</h1>
        <button
          onClick={() => navigate('/auth')}
          className="px-4 py-2 bg-[#cf446d] text-white rounded-full hover:bg-[#fb6f92c5] focus:outline-none focus:ring focus:ring-[#ffb3c6] transition-transform transform hover:scale-105"
        >
          Login
        </button>
      </nav>

      {/* Header Section */}
      <header className="text-center py-10">
        <h1 className="text-5xl font-bold text-[#cf446d] mb-6 animate-bounce">
          Welcome to Your Health Companion
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          "Revolutionizing women's health with intelligent insights, tailored solutions, and comprehensive care for hormonal balance and overall well-being."
        </p>
      </header>

      {/* Features Section */}
      <main className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
        <div
          onClick={() => navigate('/auth')}
          className="p-4 bg-[#fff] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          style={{ height: "400px", width: "400px" }}
        >
          <img
            src={cycleTrackingImg}
            alt="Cycle Tracking"
            className="w-full h-3/5 object-cover rounded mb-2"
          />
          <h2 className="text-xl font-bold text-[#cf446d] mb-1">Cycle Tracking</h2>
          <p className="text-gray-700 text-sm"> Track your menstrual cycle with ease and accuracy. Stay informed and prepared with our intuitive tracking tools.</p>
        </div>

        <div
          onClick={() => navigate('/auth')}
          className="p-4 bg-[#fff] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          style={{ height: "400px", width: "400px" }}
        >
          <img
            src={pcodDetectionImg}
            alt="PCOD Detection"
            className="w-full h-3/5 object-cover rounded mb-2"
          />
          <h2 className="text-xl font-bold text-[#cf446d] mb-1">PCOD Detection</h2>
          <p className="text-gray-700 text-sm"> Get insights and early detection of PCOD symptoms. Our advanced algorithms help you stay ahead of your health.</p>
        </div>

        <div
          onClick={() => navigate('/auth')}
          className="p-4 bg-[#fff] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          style={{ height: "400px", width: "400px" }}
        >
          <img
            src={solution}
            alt="Personalized Solutions"
            className="w-full h-3/5 object-cover rounded mb-2"
          />
          <h2 className="text-xl font-bold text-[#cf446d] mb-1">Personalized Solutions</h2>
          <p className="text-gray-700 text-sm"> Receive personalized health and wellness solutions tailored to your unique needs. Achieve your health goals with our expert guidance.</p>
        </div>
      </main>

      {/* Call-to-Action Section */}
      <div className="mt-12 mb-10">
        <button
          onClick={() => navigate('/auth')}
          className="px-8 py-4 bg-[#cf446d] text-white rounded-full hover:bg-[#fb6f92c5] focus:outline-none focus:ring focus:ring-[#ffb3c6] transition-transform transform hover:scale-105"
        >
          Get Started Today
        </button>
      </div>

      {/* Footer Section */}
      <footer className="w-full text-center mt-auto py-6 bg-[#ffc2d1]">
        <p className="text-gray-700 text-sm">
          &copy; {new Date().getFullYear()} Polysense. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Homepage;
