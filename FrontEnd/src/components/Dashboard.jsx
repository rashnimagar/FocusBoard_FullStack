import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      navigate("/auth");
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/auth");
      return;
    }

    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const testProtectedEndpoint = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8080/api/test/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.text();
        alert("Protected endpoint response: " + data);
      } else {
        alert("Failed to access protected endpoint");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#498bf5]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#498bf5] text-white">
      {/* Header */}
      <header className="bg-[#002266] p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#ffcc00]">
            FocusBoard Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome, {user?.name}!</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Info Card */}
          <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-[#002266]">
              User Information
            </h2>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {user?.name}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>Role:</strong> {user?.role}
              </p>
              <p>
                <strong>ID:</strong> {user?.id}
              </p>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-[#002266]">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button
                onClick={testProtectedEndpoint}
                className="w-full bg-[#498bf5] hover:bg-[#3a7bd5] text-white py-2 px-4 rounded-lg transition"
              >
                Test Protected API
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition">
                Create New Task
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition">
                View Reports
              </button>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-[#002266]">
              Statistics
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Tasks:</span>
                <span className="font-bold">0</span>
              </div>
              <div className="flex justify-between">
                <span>Completed:</span>
                <span className="font-bold text-green-600">0</span>
              </div>
              <div className="flex justify-between">
                <span>Pending:</span>
                <span className="font-bold text-orange-600">0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-8 bg-white text-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-[#002266]">
            Welcome to FocusBoard!
          </h2>
          <p className="text-gray-600">
            You have successfully logged in to your FocusBoard account. This is
            your personal dashboard where you can manage your tasks, track your
            progress, and stay focused on your goals.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
