import React from "react";

export default function Footer() {
  return (
    <div className="footer flex-wrap px-4 py-2 bg-white flex flex-row justify-between items-center">
      <p className="text-base font-semibold">© 2024 YourHR</p>
      <div className="flex flex-row gap-5">
        <a target="_blank" href="https://github.com/GarvGoel08">
          <img
            className="h-5"
            src="https://img.icons8.com/?size=100&id=12599&format=png&color=000000"
          />
        </a>
        <a target="_blank" href="https://www.linkedin.com/in/garvgoel2908/">
          <img
            className="h-5"
            src="https://img.icons8.com/?size=100&id=8808&format=png&color=000000"
          />
        </a>
        <a target="_blank" href="https://www.instagram.com/garvgoel6/">
          <img
            className="h-5"
            src="https://img.icons8.com/?size=100&id=32309&format=png&color=000000"
          />
        </a>
      </div>
    </div>
  );
}
