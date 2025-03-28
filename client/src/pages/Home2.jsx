import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format, differenceInDays, addDays } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import cycleImage from "../../assets/cycle-tracking.jpg";

function Home2() {
  const navigate = useNavigate();
  const [lastPeriodDates, setLastPeriodDates] = useState([]);
  const [approxNextPeriodDate, setApproxNextPeriodDate] = useState(null);
  const [username, setUsername] = useState("User");
  const [cycleStats, setCycleStats] = useState({
    avgCycle: 0,
    minCycle: 0,
    maxCycle: 0,
  });
  const [selectedDateToCancel, setSelectedDateToCancel] = useState(null);

  useEffect(() => {
    // Fetch username from localStorage or user context
    const storedUsername = localStorage.getItem("username") || "User";
    setUsername(storedUsername);
  }, []);

  // Calculate intervals between periods for the graph
  const calculateIntervals = () => {
    if (lastPeriodDates.length < 2) return [];
    
    return lastPeriodDates
      .slice(1)
      .map((date, index) => ({
        name: format(lastPeriodDates[index], "MMM d"),
        interval: differenceInDays(date, lastPeriodDates[index]),
      }));
  };

  useEffect(() => {
    if (lastPeriodDates.length >= 2) {
      const intervals = calculateIntervals().map(data => data.interval);
      setCycleStats({
        avgCycle: Math.round(intervals.reduce((sum, val) => sum + val, 0) / intervals.length),
        minCycle: Math.min(...intervals),
        maxCycle: Math.max(...intervals)
      });
      
      // Update next period date prediction based on average cycle length
      if (lastPeriodDates.length > 0) {
        const lastDate = lastPeriodDates[lastPeriodDates.length - 1];
        const predictedCycleLength = Math.round(intervals.reduce((sum, val) => sum + val, 0) / intervals.length) || 28;
        setApproxNextPeriodDate(addDays(lastDate, predictedCycleLength));
      }
    }
  }, [lastPeriodDates]);

  const handleDateSelection = (date) => {
    // Check if date is already selected
    const dateExists = lastPeriodDates.some(existingDate => 
      format(existingDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"));
    
    if (dateExists) {
      // Remove the date if already selected
      const filteredDates = lastPeriodDates.filter(existingDate => 
        format(existingDate, "yyyy-MM-dd") !== format(date, "yyyy-MM-dd"));
      setLastPeriodDates(filteredDates.sort((a, b) => a - b));
    } else {
      // Add the new date
      const updatedDates = [...lastPeriodDates, date].sort((a, b) => a - b);
      setLastPeriodDates(updatedDates);
    }
  };

  const handleCancelDate = (index) => {
    const updatedDates = [...lastPeriodDates];
    updatedDates.splice(index, 1);
    setLastPeriodDates(updatedDates);
    setSelectedDateToCancel(null);
  };

  // Check cycle regularity
  const isCycleRegular = () => {
    if (lastPeriodDates.length < 3) return "Insufficient data";
    const intervals = calculateIntervals().map((data) => data.interval);
    return intervals.every((interval) => interval >= 27 && interval <= 34) ? "Regular" : "Irregular";
  };

  // Calculate days until next period
  const getDaysUntilNextPeriod = () => {
    if (!approxNextPeriodDate) return null;
    return differenceInDays(approxNextPeriodDate, new Date());
  };

  const handleDetailedTracking = () => {
    navigate('/track');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f595a8]/10 to-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Username Banner */}
      <div className="bg-white shadow-md border-b border-[#f595a8]/30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              Welcome, <span className="text-[#ad3559] ml-2">{username}</span>
            </h1>
            <p className="text-sm text-gray-500">Your personal health tracking dashboard</p>
          </div>
          {approxNextPeriodDate && (
            <div className="hidden md:flex flex-col items-center bg-[#f595a8]/10 rounded-lg p-4 shadow-sm">
              <span className="text-xs text-gray-500">Next period in</span>
              <span className="text-2xl font-bold text-[#ad3559]">{getDaysUntilNextPeriod()} days</span>
              <span className="text-xs text-gray-400">{format(approxNextPeriodDate, "MMM d, yyyy")}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-[#f595a8]/20 to-[#f595a8]/30 rounded-xl p-6 mb-8 shadow-md">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Text Content */}
            <div className="lg:w-2/3 mb-6 lg:mb-0">
              <h2 className="text-3xl text-[#ad3559] font-bold mb-4">Your Cycle Matters</h2>
              <p className="text-gray-700 leading-relaxed">
                Understanding your menstrual cycle helps maintain overall health and wellness. By tracking your
                periods, you can identify patterns, predict future cycles, and gain insights into your reproductive health.
              </p>
            </div>

            {/* Image */}
            <div className="lg:w-1/3 flex justify-center">
              <img
                src={cycleImage}
                alt="Cycle Tracking"
                className="rounded-full w-40 h-40 object-cover border-4 border-white shadow-lg"
              />
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="text-xl font-semibold text-[#ad3559] mb-4 text-center">Track Your Dates</h3>
              <div className="flex justify-center">
                <Calendar
                  date={lastPeriodDates[lastPeriodDates.length - 1] || new Date()}
                  onChange={(date) => handleDateSelection(date)}
                  className="rounded-lg border border-gray-200"
                />
              </div>
              <div className="mt-4 text-center text-sm">
                <p className="text-gray-500">
                  Click on dates to mark the start of your period. 
                  {lastPeriodDates.length < 3 && (
                    <span className="block mt-1 text-[#ad3559] font-medium">
                      Select {3 - lastPeriodDates.length} more date(s) for predictions.
                    </span>
                  )}
                </p>
                {lastPeriodDates.length === 3 && (
                  <div className="mt-3 bg-[#f595a8]/20 p-3 rounded-lg">
                    <p className="text-[#ad3559] font-medium">Your next period is predicted for:</p>
                    <p className="text-[#cf446d] font-bold mt-1">
                      {approxNextPeriodDate ? format(approxNextPeriodDate, "MMMM d, yyyy") : "Calculating..."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cycle Info Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 h-full">
              <h3 className="text-2xl font-semibold text-[#ad3559] mb-4">
                {username}'s Cycle Summary
              </h3>

              {lastPeriodDates.length > 0 ? (
                <div className="space-y-6">
                  {/* Selected Dates Display with Cancel Option */}
                  <div className="bg-[#f595a8]/10 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-[#ad3559] font-medium">Selected Period Start Dates</h4>
                      {selectedDateToCancel !== null ? (
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleCancelDate(selectedDateToCancel)}
                            className="text-white bg-[#cf446d] px-3 py-1 rounded-md text-sm hover:bg-[#ad3559] transition-colors"
                          >
                            Confirm
                          </button>
                          <button 
                            onClick={() => setSelectedDateToCancel(null)}
                            className="text-[#ad3559] bg-gray-100 px-3 py-1 rounded-md text-sm hover:bg-gray-200 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-500">Click date to remove</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {lastPeriodDates.map((date, index) => (
                        <span 
                          key={index} 
                          className={`px-3 py-1 rounded-full text-sm shadow-sm cursor-pointer transition-all ${
                            selectedDateToCancel === index 
                              ? "bg-[#cf446d] text-white" 
                              : "bg-white text-[#ad3559] hover:bg-[#f595a8]/20"
                          }`}
                          onClick={() => setSelectedDateToCancel(index)}
                        >
                          {format(date, "MMMM d, yyyy")}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Cycle Stats */}
                  {lastPeriodDates.length >= 2 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white border border-[#f595a8]/30 rounded-lg p-4 text-center shadow-sm">
                        <p className="text-gray-500 text-sm">Average Cycle</p>
                        <p className="text-[#ad3559] text-2xl font-bold">{cycleStats.avgCycle} days</p>
                      </div>
                      <div className="bg-white border border-[#f595a8]/30 rounded-lg p-4 text-center shadow-sm">
                        <p className="text-gray-500 text-sm">Shortest Cycle</p>
                        <p className="text-[#ad3559] text-2xl font-bold">{cycleStats.minCycle} days</p>
                      </div>
                      <div className="bg-white border border-[#f595a8]/30 rounded-lg p-4 text-center shadow-sm">
                        <p className="text-gray-500 text-sm">Longest Cycle</p>
                        <p className="text-[#ad3559] text-2xl font-bold">{cycleStats.maxCycle} days</p>
                      </div>
                    </div>
                  )}

                  {/* Prediction Info */}
                  {lastPeriodDates.length >= 3 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-gradient-to-r from-[#f595a8]/10 to-[#f595a8]/20 rounded-lg p-4">
                        <div>
                          <p className="text-gray-700">Next Period Expected</p>
                          <p className="text-[#ad3559] font-bold text-lg">
                            {approxNextPeriodDate ? format(approxNextPeriodDate, "MMMM d, yyyy") : "Calculating..."}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-700">Cycle Regularity</p>
                          <p className={`font-semibold ${
                            isCycleRegular() === "Regular" ? "text-green-600" : "text-amber-600"
                          }`}>
                            {isCycleRegular()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Graph Representation */}
                  {lastPeriodDates.length >= 3 && (
                    <div>
                      <h4 className="text-[#ad3559] font-medium mb-2">Cycle Length Trends</h4>
                      <div className="bg-white border border-gray-200 rounded-lg p-2">
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart data={calculateIntervals()}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                            <XAxis dataKey="name" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="interval" 
                              name="Days" 
                              stroke="#cf446d" 
                              strokeWidth={2} 
                              activeDot={{ r: 6 }} 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      
                      {/* Irregular cycle message and CTA */}
                      {isCycleRegular() === "Irregular" && (
                        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
                          <div className="flex items-start space-x-3">
                            <div className="text-amber-500 mt-1">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <h5 className="text-amber-800 font-medium">Your cycle appears to be irregular</h5>
                              <p className="text-amber-700 text-sm mt-1">
                                More detailed tracking can help you better understand your body's patterns.
                              </p>
                              <button 
                                onClick={handleDetailedTracking} 
                                className="mt-3 text-white bg-[#cf446d] px-4 py-2 rounded-md text-sm hover:bg-[#ad3559] transition-colors flex items-center"
                              >
                                <span>Go to Detailed Tracking</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-2">
                                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <p className="text-gray-400 mb-4">
                    No period dates selected yet.
                  </p>
                  <p className="text-[#ad3559]">
                    Use the calendar to mark your period start dates.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home2;