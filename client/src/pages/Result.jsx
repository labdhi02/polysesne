import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BG from "../../assets/BGimage.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MealPlanComponent from "../components/MealPlanComponent";
import WorkoutPlanComponent from "../components/WorkoutPlanComponent";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <>
        <Navbar />
        <div
          className="min-h-screen bg-cover bg-center flex items-center justify-center pt-16"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${BG})`,
            backgroundSize: "100%",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="bg-pink-50 p-8 rounded-xl shadow-2xl border-2 border-pink-500 w-full max-w-md text-center">
            <div className="bg-red-100 p-4 rounded-lg mb-6">
              <p className="text-red-500 font-bold text-xl">
                No result found!
              </p>
              <p className="text-red-500 mt-2">Please complete the assessment to view your results.</p>
            </div>
            <button
              onClick={() => navigate("/PCOSForm")}
              className="bg-customdarkpink text-white px-10 py-3 rounded-full hover:bg-pink-700 transition-all duration-300 shadow-lg text-lg font-bold border-2 border-pink-300"
            >
              Go Back to Assessment
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Calculate the inverted probability (100 - PCOS probability)
  const invertedPCOSProbability = result.PCOS_probability
    ? 100 - result.PCOS_probability
    : 100; // If no probability is available, default to 100
    
  const pcodProbability = (100 - invertedPCOSProbability).toFixed(2);
  const isHighRisk = invertedPCOSProbability < 50;

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-cover bg-center pt-16 pb-16"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${BG})`,
          backgroundSize: "85%",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container mx-auto">
          <div className="bg-[#f5dbe2] p-10 rounded-xl shadow-2xl w-full max-w-6xl border-2 border-pink-500 mx-auto mb-8">
            <h1 className="text-4xl font-bold text-pink-700 mb-8 text-center">
              PCOD Prediction Result
            </h1>
            
            {result.error ? (
              <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500 mb-6">
                <p className="text-red-600 font-medium text-center text-lg">{result.error}</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white bg-opacity-70 rounded-lg p-6 shadow-md">
                  <p className="text-xl font-medium text-gray-700 mb-2">
                    <strong className="text-pink-700">PCOD Probability:</strong>
                  </p>
                  
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-pink-100 text-pink-700">
                          Risk Level
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-pink-100 text-pink-700">
                          {pcodProbability}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-6 mb-4 text-xs flex rounded-full bg-pink-100">
                      <div
                        style={{ width: `${pcodProbability}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                          isHighRisk ? "bg-pink-700" : "bg-pink-400"
                        }`}
                      >
                        <span className="font-bold">{pcodProbability}%</span>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg mt-4 ${isHighRisk ? "bg-pink-100" : "bg-green-100"}`}>
                      <p className="text-lg font-medium">
                        <span className={isHighRisk ? "text-pink-700" : "text-green-700"}>
                          {isHighRisk
                            ? "You might be suffering from PCOD."
                            : "You might not be suffering from PCOD."}
                        </span>
                      </p>
                      <p className="text-sm mt-2 text-gray-600">
                        {isHighRisk 
                          ? "It's recommended to consult with a healthcare professional for further evaluation."
                          : "However, if you have concerning symptoms, please consult a healthcare professional."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-8 text-center">
              <button
                onClick={() => navigate("/PCOSForm")}
                className="px-10 py-4 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-all duration-300 shadow-lg text-lg font-bold border-2 border-pink-300"
              >
                Go Back to Assessment
              </button>
            </div>
          </div>
        
          {/* Meal Plan and Workout Plan Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Meal Plan Component */}
            <MealPlanComponent pcodProbability={pcodProbability} />
            
            {/* Workout Plan Component */}
            <WorkoutPlanComponent pcodProbability={pcodProbability} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResultPage;