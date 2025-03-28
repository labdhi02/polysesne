import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/BGimage.png"; // Replace with your actual file path

function Auth() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // Success or Error
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/api/login" : "/api/register";
    setIsLoading(true); // Start loading

    try {
      const response = await axios.post(endpoint, form);
      setMessage(response.data.message || (isLogin ? "Login successful" : "Registration successful"));
      setMessageType("success"); // Green message for success

      if (isLogin) {
        localStorage.setItem("username", form.username);

        // Delay navigation for user to see loading state
        setTimeout(() => {
          setIsLoading(false);
          navigate("/home2");
        }, 2000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred. Please try again.");
      setMessageType("error"); // Red message for error
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${bgImage})`,
        backgroundSize: "85%",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Auth Form */}
      <div className="w-full max-w-lg p-10 bg-white bg-opacity-90 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Welcome Back!" : "Create an Account"}
        </h1>
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="relative">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#7d3c98] bg-gray-50 shadow-sm"
            />
            <span className="absolute top-3 right-4 text-gray-400">
              <i className="fas fa-user"></i>
            </span>
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#7d3c98] bg-gray-50 shadow-sm"
            />
            <span className="absolute top-3 right-4 text-gray-400">
              <i className="fas fa-lock"></i>
            </span>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-4 text-lg font-bold text-white bg-gradient-to-r from-[#cf446d] to-[#7d3c98] rounded-lg shadow-lg hover:shadow-xl hover:opacity-90 focus:outline-none focus:ring focus:ring-[#7d3c98] transition-transform transform hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : isLogin ? "Login" : "Register"}
          </button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-6 px-6 py-4 bg-gray-100 text-lg font-bold text-gray-700 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring focus:ring-gray-300 transition-all"
        >
          {isLogin ? "Switch to Register" : "Switch to Login"}
        </button>

        {/* Message Display */}
        {message && (
          <p
            className={`text-center text-lg mt-6 font-semibold ${
              messageType === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Auth;