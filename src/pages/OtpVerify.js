import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";

export default function OtpVerify() {
  const location = useLocation();
  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      alert("Please enter a valid OTP!");
      return;
    }
    const data = {
      email,
      otp,
    };

    try {
      const response = await fetch(`${REACT_APP_API_URL}/user/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
      if (result.error){
        alert(result.error);
      }
      else if (result.success == false){
        alert(result.message);
        return;
      }
      else{
        localStorage.setItem("token", result.token);
        navigate("/ResumeManager");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-full w-full bg-gray-300 flex flex-col">
      <Navbar />
      <div className="grow flex justify-center items-center my-8">
        <form
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-center mb-4">Enter OTP</h1>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              OTP
            </label>
            <input
              type="text"
              placeholder="Enter your OTP"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Verify OTP
          </button>

        </form>
      </div>
      <Footer />
    </div>
  );
}
