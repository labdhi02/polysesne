import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import BG from "../../assets/BGimage.png";
import Footer from '../components/Footer';

export default function Test() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      age: "",
      weight: "",
      height: "",
      bmi: "",
      bloodGroup: "",
      cycle: "",
      cycleLength: "",
      marriageStatus: "",
      pregnant: "",
      numAbortions: "",
      weightGain: "",
      hairGrowth: "",
      skinDarkening: "",
      hairLoss: "",
      pimples: "",
      fastFood: "",
      exercise: "",
    });
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Auto-calculate BMI when weight or height changes
    useEffect(() => {
      if (formData.weight && formData.height) {
        const weightInKg = parseFloat(formData.weight);
        const heightInM = parseFloat(formData.height) / 100; // Convert cm to m
        if (weightInKg > 0 && heightInM > 0) {
          const bmiValue = (weightInKg / (heightInM * heightInM)).toFixed(2);
          setFormData(prev => ({
            ...prev,
            bmi: bmiValue
          }));
        }
      }
    }, [formData.weight, formData.height]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(""); // Reset error before each submission
  
      // Prepare data for backend
      const data = {
        "Age (yrs)": formData.age,
        "Weight (Kg)": formData.weight,
        "Height(Cm)": formData.height,
        BMI: formData.bmi,
        "Blood Group": formData.bloodGroup,
        "Cycle(R/I)": formData.cycle.toUpperCase(), // Ensure 'R' or 'I'
        "Cycle length(days)": formData.cycleLength,
        "Marriage Status (Yrs)": formData.marriageStatus,
        "Pregnant(Y/N)": formData.pregnant.toUpperCase(), // Convert to uppercase
        "No. of aborptions": formData.numAbortions,
        "Weight gain(Y/N)": formData.weightGain.toUpperCase(),
        "hair growth(Y/N)": formData.hairGrowth.toUpperCase(),
        "Skin darkening (Y/N)": formData.skinDarkening.toUpperCase(),
        "Hair loss(Y/N)": formData.hairLoss.toUpperCase(),
        "Pimples(Y/N)": formData.pimples.toUpperCase(),
        "Fast food (Y/N)": formData.fastFood.toUpperCase(),
        "Reg.Exercise(Y/N)": formData.exercise.toUpperCase(),
      };
  
      try {
        // Send data to the backend
        const response = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        const resultData = await response.json();
  
        // Check for success or error in response
        if (resultData.error) {
          setError(resultData.error);
        } else {
          // Navigate to Result page with the result data
          navigate("/Result", { state: { result: resultData } });
        }
      } catch (error) {
        setError("Something went wrong. Please try again later.");
      }
  
      setLoading(false);
    };
  
  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center py-8"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${BG})`,
          backgroundSize: "85%",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="w-full max-w-2xl px-4 mx-auto">
          <div className="bg-white bg-opacity-40 rounded-xl shadow-2xl border border-pink-500 overflow-hidden">
            {/* Header */}
            <div className="bg-[#cf446d] py-5 px-6">
              <h1 className="text-3xl font-bold text-white text-center">
                PCOD Prediction
              </h1>
              <p className="text-pink-100 text-center mt-2">
                Complete all fields below
              </p>
            </div>

            {/* Form Content */}
            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  {[
                    { label: "Age (Years)", name: "age", type: "text", icon: "📅" },
                    { label: "Weight (Kg)", name: "weight", type: "text", icon: "⚖️" },
                    { label: "Height (Cm)", name: "height", type: "text", icon: "📏" },
                    { label: "BMI", name: "bmi", type: "text", icon: "📊", readOnly: true },
                    { label: "Blood Group", name: "bloodGroup", type: "text", icon: "🩸" },
                    { label: "Cycle (R/I)", name: "cycle", type: "text", icon: "🔄" },
                    { label: "Cycle Length (Days)", name: "cycleLength", type: "text", icon: "📆" },
                    { label: "Marriage Status (Years)", name: "marriageStatus", type: "text", icon: "💍" },
                    { label: "Pregnant (Y/N)", name: "pregnant", type: "text", icon: "👶" },
                    { label: "No. of Abortions", name: "numAbortions", type: "text", icon: "🏥" },
                    { label: "Weight Gain (Y/N)", name: "weightGain", type: "text", icon: "⚖️" },
                    { label: "Hair Growth (Y/N)", name: "hairGrowth", type: "text", icon: "💇" },
                    { label: "Skin Darkening (Y/N)", name: "skinDarkening", type: "text", icon: "🧴" },
                    { label: "Hair Loss (Y/N)", name: "hairLoss", type: "text", icon: "💁" },
                    { label: "Pimples (Y/N)", name: "pimples", type: "text", icon: "🔍" },
                    { label: "Fast Food (Y/N)", name: "fastFood", type: "text", icon: "🍔" },
                    { label: "Regular Exercise (Y/N)", name: "exercise", type: "text", icon: "🏃‍♀️" },
                  ].map(({ label, name, type, icon, readOnly }) => (
                    <div key={name}>
                      <label
                        htmlFor={name}
                        className="block text-base font-bold text-[#cf446d] mb-1"
                      >
                        {icon} {label}
                      </label>
                      <input
                        type={type}
                        id={name}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 rounded-lg border border-pink-300 focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                          name === 'bmi' ? 'bg-gray-100' : ''
                        }`}
                        required
                        readOnly={readOnly}
                      />
                    </div>
                  ))}
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <p className="text-red-700">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#cf446d] text-white font-bold rounded-lg border-2 border-pink-300 hover:bg-pink-700 focus:ring-4 focus:ring-pink-500 focus:outline-none transition-all duration-300 text-lg shadow-xl"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Submit Prediction"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Footer Note */}
          <div className="text-center mt-4 text-pink-700 text-sm">
            <p>Please ensure all information is accurate for the best prediction results.</p>
          </div>
        </div>
        
      </div>
      <Footer/>
    </>
  )
}