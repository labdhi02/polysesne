import React, { useState } from "react";

const WorkoutPlanComponent = ({ pcodProbability }) => {
  const [loading, setLoading] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [showPlan, setShowPlan] = useState(false);

  const generateWorkoutPlan = async (probability) => {
    setLoading(true);
    try {
      const apiKey = "key";
      const endpoint =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

      const prompt = `
Generate a structured 7-day workout plan for managing PCOD symptoms based on a PCOD probability of ${probability}%.
Output the plan as a JSON array with each day structured as follows:
{
  "day": "Day X",
  "type": "Type of exercise (e.g., Cardio, Yoga, Strength)",
  "duration": "Duration in minutes",
  "exercises": "List of specific exercises"
}
Focus on exercises that help with hormone balance, stress reduction, improved insulin sensitivity, and weight management.`;

      const requestBody = {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      };

      const response = await fetch(`${endpoint}?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const planContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (planContent) {
        const parsedPlan = JSON.parse(planContent);
        setWorkoutPlan(parsedPlan);
        setShowPlan(true);
      } else {
        setWorkoutPlan(null);
        setShowPlan(false);
      }
    } catch (error) {
      console.error("Error generating workout plan:", error);
      setWorkoutPlan(null);
    } finally {
      setLoading(false);
    }
  };

  const renderWorkoutPlanTable = (plan) => {
    if (!plan || !Array.isArray(plan)) return null;

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-purple-200">
            <tr>
              <th className="py-4 px-6 text-left text-purple-800 font-bold">Day</th>
              <th className="py-4 px-6 text-left text-purple-800 font-bold">Type</th>
              <th className="py-4 px-6 text-left text-purple-800 font-bold">Duration</th>
              <th className="py-4 px-6 text-left text-purple-800 font-bold">Exercises</th>
            </tr>
          </thead>
          <tbody>
            {plan.map((day, index) => (
              <tr
                key={day.day}
                className={`${
                  index % 2 === 0 ? "bg-purple-50" : "bg-white"
                } hover:bg-purple-100 transition-colors duration-300`}
              >
                <td className="py-4 px-6 border-t border-purple-100 font-medium text-purple-700">{day.day}</td>
                <td className="py-4 px-6 border-t border-purple-100 text-gray-700">{day.type}</td>
                <td className="py-4 px-6 border-t border-purple-100 text-gray-700">{day.duration}</td>
                <td className="py-4 px-6 border-t border-purple-100 text-gray-700">{day.exercises}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border-2 border-purple-300 p-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">
        7-Day PCOD-Friendly Workout Plan
      </h2>

      <div className="text-gray-700 mb-6">
        <p className="mb-4">
          Regular exercise is crucial for managing PCOD symptoms. Based on your PCOD probability of {pcodProbability}%, we can generate a customized workout plan that helps:
        </p>

        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Improve insulin sensitivity</li>
          <li>Balance hormones naturally</li>
          <li>Reduce stress levels</li>
          <li>Support weight management</li>
        </ul>
      </div>

      {!showPlan && (
        <div className="text-center">
          <button
            onClick={() => generateWorkoutPlan(pcodProbability)}
            className="px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all duration-300 shadow-lg text-md font-semibold border-2 border-purple-300 flex items-center justify-center mx-auto"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating Workout Plan...
              </>
            ) : (
              "Generate 7-Day Workout Plan"
            )}
          </button>
        </div>
      )}

      {showPlan && workoutPlan && (
        <div className="mt-4">
          <h3 className="text-xl font-bold text-purple-700 mb-4 text-center">Your PCOD-Friendly Workout Plan</h3>
          {renderWorkoutPlanTable(workoutPlan)}
          <div className="mt-6 text-center">
            <button
              onClick={() => window.print()}
              className="px-6 py-2 mr-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 text-sm font-medium"
            >
              Print Workout Plan
            </button>
            <button
              onClick={() => setShowPlan(false)}
              className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all duration-300 text-sm font-medium"
            >
              Hide Workout Plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlanComponent;
