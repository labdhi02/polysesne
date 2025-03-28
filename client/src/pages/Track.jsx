import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import irregularPeriodsImage from "../../assets/IrrPeriods.webp";
import pcodDetectionImage from "../../assets/pcod-detection.jpg";
import symptomsImage from "../../assets/symptoms.png";

export default function Track() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleTestClick = () => {
    navigate("/test");
  };

  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#cf446d] mb-10">
          Understanding Irregular Periods
        </h1>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-gray-700 text-lg mb-6">
              Irregular periods are menstrual cycles that vary significantly in
              length, timing, or bleeding patterns. A regular cycle typically
              ranges from 21 to 35 days, but when your periods are irregular,
              you might experience:
            </p>
            <ul className="space-y-3 text-gray-700">
              {[
                "Cycles shorter than 21 days or longer than 35 days",
                "Missing periods for several months",
                "Unpredictable timing between periods",
                "Variations in flow (very light to very heavy)",
                "Significant changes in period-related symptoms",
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-[#cf446d] mr-3"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <img
              src={irregularPeriodsImage}
              alt="Cycle comparison chart"
              className="rounded-lg shadow-md max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* PCOS Section */}
      <section className="bg-pink-100 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <img
                src={pcodDetectionImage}
                alt="PCOS illustration"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <div className="md:w-2/3 p-8">
              <h2 className="text-3xl font-bold text-[#cf446d] mb-6">
                PCOD: A Major Cause of Irregular Periods
              </h2>
              <p className="text-gray-700 mb-6">
                Polycystic Ovary Disease (PCOD) affects up to 1 in 10 women of
                reproductive age. It's a hormonal disorder that can lead to
                long-term health issues if left unmanaged.
              </p>

              <ul className="list-disc pl-6 mb-6 text-gray-700">
                <li className="mb-3">
                  <span className="font-medium text-[#cf446d]">
                    Irregular periods:
                  </span>{" "}
                  Due to infrequent or prolonged ovulation
                </li>
                <li className="mb-3">
                  <span className="font-medium text-[#cf446d]">
                    Excess androgens:
                  </span>{" "}
                  Elevated male hormone levels causing acne and hirsutism
                </li>
                <li className="mb-3">
                  <span className="font-medium text-[#cf446d]">
                    Polycystic ovaries:
                  </span>{" "}
                  Ovaries might develop small collections of fluid (follicles)
                </li>
              </ul>

              <button 
                onClick={handleTestClick}
                className="bg-[#cf446d] hover:bg-pink-800 text-white font-bold py-3 px-8 rounded-lg shadow transition duration-300">
                Take a Test
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section - Symptoms */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text Section */}
          <div className="lg:w-3/5 w-full h-full flex flex-col justify-center pr-4 py-6">
            <p className="text-lg lg:text-xl text-gray-800 font-medium leading-relaxed mb-6">
              <span className="text-[#cf446d] font-bold">
                Early recognition of symptoms is crucial in managing PCOD.
              </span>{" "}
              Taking action at the right time can prevent complications like
              infertility, diabetes, and heart disease while helping you regain
              control of your health.
            </p>
            <p className="text-lg lg:text-xl text-gray-800 font-medium leading-relaxed">
              Are you experiencing irregular periods, sudden weight changes, or
              acne? These could be signs of PCOD. Early diagnosis is the first
              step toward a healthier you.
            </p>
          </div>

          {/* Image Section */}
          <div className="lg:w-2/5 w-full h-auto pl-4">
            <img
              src={symptomsImage}
              alt="PCOS Symptoms"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="bg-pink-100 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="bg-white rounded-xl p-10 shadow-lg">
          <h2 className="text-3xl font-bold text-[#cf446d] mb-4">
            Ready to check wheather you are suffering from PCOD?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Experiencing irregular periods, acne, or unexpected weight gain?
            Take our quick test to check for PCOD today!
          </p>
          <button 
            onClick={handleTestClick}
            className="bg-[#cf446d] hover:bg-pink-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg text-lg transition duration-300">
            Click here to test
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
