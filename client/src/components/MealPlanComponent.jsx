import React, { useState } from "react";

const MealPlanComponent = ({ pcodProbability }) => {
  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);
  const [showPlan, setShowPlan] = useState(false);

  const generateMealPlan = async (probability) => {
    setLoading(true);
    try {
      const apiKey = "AIzaSyAgxszMrnza8NwJhpxzoyIBjUsgnWF3lac";
      const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

      const prompt = `
      Based on a PCOD probability of ${probability}%, generate a 7-day meal plan focused on helping manage PCOD symptoms.
      
      Please format the response as a structured only veg Indian meal plan with:
      - A short introduction if there are high chances then say to strictly follow the diet, or else mention you can stick with the diet and improve your health.
      - For each day of the week (Day 1 through Day 7), include only food item names:
        * Breakfast
        * Lunch
        * Dinner
      
      Focus on foods that help balance hormones, reduce inflammation, and manage insulin resistance.
      
      Format the response in a way that can be easily converted to a table with days as rows and meal types as columns.`;

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
        setMealPlan(planContent);
        setShowPlan(true);
      } else {
        setMealPlan("Sorry, we couldn't generate a meal plan at this time. Please try again later.");
      }
    } catch (error) {
      console.error("Error generating meal plan:", error);
      setMealPlan("An error occurred while generating your meal plan. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const renderMealPlanTable = (plan) => {
    if (!plan) return null;

    // Extract the introduction part (before the day-by-day plan)
    const parts = plan.split(/\*\*Day \d+\*\*/);
    const introduction = parts[0]?.replace(/\*/g, "").trim(); // Remove * symbols

    // Process the day-by-day plan
    const dayPlans = [];
    const dayRegex = /\*\*Day (\d+)\*\*\s*(.*?)(?=\*\*Day \d+\*\*|$)/gs;

    let match;
    while ((match = dayRegex.exec(plan)) !== null) {
      const dayNumber = `Day ${match[1]}`;
      const content = match[2]?.replace(/\*/g, "").trim(); // Remove * symbols

      // Extract meals from content
      const meals = {
        breakfast: "",
        lunch: "",
        dinner: "",
      };

      const mealRegex = /(Breakfast|Lunch|Dinner):\s*([\s\S]*?)(?=(Breakfast|Lunch|Dinner|$))/g;
      let mealMatch;
      while ((mealMatch = mealRegex.exec(content)) !== null) {
        const mealType = mealMatch[1]?.toLowerCase();
        const mealContent = mealMatch[2]?.trim();
        if (mealType && mealContent) {
          meals[mealType] = mealContent;
        }
      }

      dayPlans.push({
        day: dayNumber,
        ...meals,
      });
    }

    return (
      <div className="space-y-6">
        {introduction && (
          <div className="bg-pink-50 p-6 rounded-lg shadow-md border border-pink-200">
            <h2 className="text-xl font-semibold text-pink-700 mb-3">Introduction</h2>
            <p className="text-gray-700">{introduction}</p>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-pink-200">
              <tr>
                <th className="py-4 px-6 text-left text-pink-800 font-bold">Day</th>
                <th className="py-4 px-6 text-left text-pink-800 font-bold">Breakfast</th>
                <th className="py-4 px-6 text-left text-pink-800 font-bold">Lunch</th>
                <th className="py-4 px-6 text-left text-pink-800 font-bold">Dinner</th>
              </tr>
            </thead>
            <tbody>
              {dayPlans.map((day, index) => (
                <tr
                  key={day.day}
                  className={`${
                    index % 2 === 0 ? "bg-pink-50" : "bg-white"
                  } hover:bg-pink-100 transition-colors duration-300`}
                >
                  <td className="py-4 px-6 border-t border-pink-100 font-medium text-pink-700">{day.day}</td>
                  <td className="py-4 px-6 border-t border-pink-100 text-gray-700">{day.breakfast}</td>
                  <td className="py-4 px-6 border-t border-pink-100 text-gray-700">{day.lunch}</td>
                  <td className="py-4 px-6 border-t border-pink-100 text-gray-700">{day.dinner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border-2 border-pink-300 p-6">
      <h2 className="text-2xl font-bold text-pink-700 mb-4 text-center">
        7-Day PCOD-Friendly Meal Plan
      </h2>

      <div className="text-gray-700 mb-6">
        <p className="mb-4">
          Nutrition plays a crucial role in managing PCOD symptoms. Based on your PCOD probability of {pcodProbability}%, we can generate a customized meal plan that helps:
        </p>

        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Balance hormones naturally</li>
          <li>Reduce inflammation</li>
          <li>Stabilize blood sugar levels</li>
          <li>Support weight management</li>
        </ul>
      </div>

      {!showPlan && (
        <div className="text-center">
          <button
            onClick={() => generateMealPlan(pcodProbability)}
            className="px-8 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-all duration-300 shadow-lg text-md font-semibold border-2 border-pink-300 flex items-center justify-center mx-auto"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Meal Plan...
              </>
            ) : (
              "Generate 7-Day Meal Plan"
            )}
          </button>
        </div>
      )}

      {showPlan && mealPlan && (
        <div className="mt-4">
          <h3 className="text-xl font-bold text-pink-700 mb-4 text-center">Your PCOD-Friendly Meal Plan</h3>
          {renderMealPlanTable(mealPlan)}
          <div className="mt-6 text-center">
            <button
              onClick={() => window.print()}
              className="px-6 py-2 mr-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 text-sm font-medium"
            >
              Print Meal Plan
            </button>
            <button
              onClick={() => setShowPlan(false)}
              className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all duration-300 text-sm font-medium"
            >
              Hide Meal Plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanComponent;
