import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AllResumes() {
  const [resumes, setResumes] = useState([]);
  const { REACT_APP_API_URL } = process.env;

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/user/AllResumes`);
        const data = await response.json();
        setResumes(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchResumes();
  }, [REACT_APP_API_URL]);

  return (
    <div className="h-full w-full bg-gray-300 flex flex-col">
      <Navbar />
      <div className="grow flex flex-col justify-center items-center my-8">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
          <h1 className="text-3xl font-bold text-center mb-4">All Resumes</h1>
          
          {resumes.length > 0 ? (
            <ul className="space-y-4">
              {resumes.map((resume, index) => (
                <li key={index} className="border-b py-4">
                  <h2 className="text-xl font-semibold">{resume.username}</h2>
                  <a
                    href={resume.resume}
                    className="text-blue-500 hover:underline"
                    download
                  >
                    Download Resume
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No resumes available.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
