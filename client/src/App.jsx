import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Analyze from "./pages/Analyze";
import Analysis from "./pages/Analysis";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verify user token on app load
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) setUser({ id: data.userId });
      });
  }, []);

  return (
    <Router>
      <div className="font-figtree">
        <Navbar user={user} setUser={setUser} />
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />

            {/* Protected Routes */}
            <Route
              path="/analyze"
              element={
                <PrivateRoute user={user}>
                  <Analyze user={user} />
                </PrivateRoute>
              }
            />
            <Route
              path="/analysis"
              element={
                <PrivateRoute user={user}>
                  <Analysis />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute user={user}>
                  <Dashboard user={user} />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
