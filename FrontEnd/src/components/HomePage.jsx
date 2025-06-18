import React from "react";
import logo from "../assets/fb-logo.png";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#498bf5] min-h-screen flex flex-col justify-between text-white">
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 py-10">
        {/* Logo */}
        <img src={logo} alt="FocusBoard Logo" className="h-20 mb-6" />

        {/* Title */}
        <h1 className="text-5xl font-bold mb-4 text-[#ffcc00] uppercase">
          FocusBoard
        </h1>

        {/* Tagline */}
        <p className="text-md max-w-md mb-8 font-semibold">
          "Your goals. Your vision. Stay focused!"
        </p>

        {/* Get Started Button */}
        <button
          onClick={() => navigate("/auth")}
          className="bg-yellow-400 text-[#002266] font-bold py-3 px-6 rounded-xl text-lg hover:bg-yellow-500 transition-all uppercase"
        >
          Get Started
        </button>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 px-4 md:px-16 lg:px-28 py-4 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">About Us</h2>
            <p className="text-sm leading-relaxed">
              <span className="text-yellow-400 font-semibold">FocusBoard</span>{" "}
              helps you stay organized, motivated, and in control. Achieve your
              goals with clarity and unstoppable focus.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="flex flex-col items-start">
            <h2 className="text-xl font-bold text-white mb-4">Follow Us</h2>
            <ul className="flex space-x-5">
              <li>
                <a
                  href="#"
                  className="text-blue-500 hover:text-yellow-400 transition text-lg"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sky-400 hover:text-yellow-400 transition text-lg"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-orange-400 hover:text-yellow-400 transition text-lg"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-6 mt-8 text-center text-sm text-gray-400">
          <p>
            &copy; 2025{" "}
            <span className="text-white font-semibold">FocusBoard</span> — Your
            trusted task management partner.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
