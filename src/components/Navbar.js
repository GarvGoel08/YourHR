import React from "react";

export default function Navbar() {
  return (
    <div className="bg-white flex flex-row px-3 py-2 gap-4">
      <a href="/" className="text-xl font-bold">YourHR</a>
      <a href="/Resumes" className="text-base ml-4 text-gray-700">
        Explore Candidates
      </a>
    </div>
  );
}
