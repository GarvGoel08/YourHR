import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Resume() {
  const [resume, setResume] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { REACT_APP_API_URL } = process.env;
  if (!localStorage.getItem("token")) {
    window.location.href = "/";
  }

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}/user/Resume`, {
          headers: {
            Token: localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        if (data.resume) {
          setResume(data.resume);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchResume();
  }, [REACT_APP_API_URL]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const fileRef = ref(storage, `resumes/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    setLoading(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          const response = await fetch(`${REACT_APP_API_URL}/user/Resume`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Token: localStorage.getItem("token"),
            },
            body: JSON.stringify({ resume: url }),
          });

          const data = await response.json();
          if (data.success) {
            setResume(url);
            setLoading(false);
          }
          setLoading(false);
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      }
    );
  };

  return (
    <div className="h-full w-full bg-gray-300 flex flex-col">
      <Navbar />
      <div className="grow flex flex-col justify-center items-center my-8">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-4">
            Resume Manager
          </h1>

          {resume ? (
            <div className="mb-6">
              <a
                href={resume}
                className="text-blue-500 hover:underline"
                download
              >
                Download Resume
              </a>
            </div>
          ) : (
            <p className="mb-4">No resume uploaded yet.</p>
          )}

          <form onSubmit={handleUpload} className="flex flex-col">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload New Resume
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="mb-4"
              onChange={handleFileChange}
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${loading? "cursor-not-allowed" : ""}`}
            >
              {loading ? "Uploading..." : "Upload Resume"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
