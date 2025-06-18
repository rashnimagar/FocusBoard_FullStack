"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!isLoginMode && !formData.name.trim()) {
      errors.name = "Name is required";
    } else if (!isLoginMode && formData.name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!isLoginMode && !formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (!isLoginMode && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const url = isLoginMode
        ? "http://localhost:8080/api/auth/login"
        : "http://localhost:8080/api/auth/signup";

      const payload = isLoginMode
        ? {
            email: formData.email,
            password: formData.password,
          }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
          })
        );

        setSuccess(
          isLoginMode
            ? "Login successful! Redirecting..."
            : "Account created successfully! Redirecting..."
        );

        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 1500);
      } else {
        if (data.message) {
          setError(data.message.replace("Error: ", ""));
        } else {
          setError("Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      setError(
        "Unable to connect to server. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setError("");
    setSuccess("");
    setFieldErrors({});
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    resetForm();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-cyan-600 px-4">
      <div className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:shadow-3xl">
        {/* Simple Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            {isLoginMode ? "Welcome Back" : "Join FocusBoard"}
          </h1>
          <p className="text-gray-600 text-sm">
            {isLoginMode ? "Sign in to your account" : "Create your account"}
          </p>
        </div>

        {/* Success/Error Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-lg animate-pulse">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-400 text-green-700 rounded-lg animate-pulse">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm">{success}</p>
              </div>
            </div>
          </div>
        )}

        {/* Mode Toggle Tabs */}
        <div className="relative flex h-12 mb-6 bg-gray-100 rounded-full overflow-hidden">
          <button
            type="button"
            className={`w-1/2 text-sm font-semibold transition-all duration-300 z-10 ${
              isLoginMode ? "text-white" : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setIsLoginMode(true)}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`w-1/2 text-sm font-semibold transition-all duration-300 z-10 ${
              !isLoginMode ? "text-white" : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setIsLoginMode(false)}
          >
            Sign Up
          </button>
          <div
            className={`absolute top-1 h-10 w-1/2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md transition-transform duration-300 ${
              isLoginMode ? "translate-x-0" : "translate-x-full"
            }`}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginMode && (
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  fieldErrors.name ? "border-red-500" : ""
                }`}
                placeholder="Your Name"
              />
              {fieldErrors.name && (
                <p className="text-red-500 text-xs italic">
                  {fieldErrors.name}
                </p>
              )}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                fieldErrors.email ? "border-red-500" : ""
              }`}
              placeholder="Your Email"
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-xs italic">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                fieldErrors.password ? "border-red-500" : ""
              }`}
              placeholder="Your Password"
            />
            {fieldErrors.password && (
              <p className="text-red-500 text-xs italic">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {!isLoginMode && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  fieldErrors.confirmPassword ? "border-red-500" : ""
                }`}
                placeholder="Confirm Your Password"
              />
              {fieldErrors.confirmPassword && (
                <p className="text-red-500 text-xs italic">
                  {fieldErrors.confirmPassword}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline transition-colors duration-300"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>{isLoginMode ? "Signing In..." : "Signing Up..."}</span>
              </div>
            ) : isLoginMode ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          {isLoginMode ? (
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-blue-500 hover:text-blue-700 font-semibold transition-colors duration-200 focus:outline-none"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-blue-500 hover:text-blue-700 font-semibold transition-colors duration-200 focus:outline-none"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
