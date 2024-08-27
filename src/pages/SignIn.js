import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { REACT_APP_API_URL } = process.env;
  const navigate = useNavigate();
  if (localStorage.getItem("token")) {
    window.location.href = "/ResumeManager";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userCredentials = { email, password };

    if (!email || !password) {
      alert("Please fill all the fields!");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    try {
      const response = await fetch(`${REACT_APP_API_URL}/user/SignIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });

      const data = await response.json();
      console.log(data);
      if (data.error) {
        alert(data.error);
        return;
      } else if (data.success == false) {
        alert(data.message);
        return;
      }
      localStorage.setItem("token", data.token);
      navigate("/ResumeManager");
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
            <h1 className="text-3xl font-bold text-center mb-4">Sign In</h1>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign In
          </button>

          <div className="mt-4 text-center">
            Don't have an account?{" "}
            <a href="/" className="text-blue-500">
              Sign Up
            </a>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
