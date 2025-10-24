import React from "react";

const AuthCard = ({ children, title }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-8">
        <h2 className="text-3xl font-bold mb-8 text-white text-center bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default AuthCard;