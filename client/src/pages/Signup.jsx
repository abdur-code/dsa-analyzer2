import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";

const Signup = ({ setUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      setUser(data.user);
      navigate("/analyze");
    } catch (err) {
      setError("Network error. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4">
      <AuthCard title="Create Account">
        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Username</label>
            <input
              type="text"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-black/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-2 p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white font-semibold hover:from-red-600 hover:to-red-700 transition shadow-lg shadow-red-500/30"
          >
            Create Account
          </button>
          <p className="text-center text-gray-400 text-sm mt-4">
            Already have an account?{" "}
            <span 
              onClick={() => navigate("/login")}
              className="text-red-400 hover:text-red-300 transition cursor-pointer"
            >
              Sign in
            </span>
          </p>
        </form>
      </AuthCard>
    </div>
  );
};

export default Signup;