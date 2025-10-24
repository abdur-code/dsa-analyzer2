// pages/Analyze.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";
import axios from "axios";

const Analyze = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("javascript");
  const [question, setQuestion] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!question || !code.trim()) {
      alert("Please enter both question and code!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/analyze`,
        {
          questionTitle: question,
          code,
          language,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Backend response:", response.data);
      
      // Navigate to Analysis page with result data
      navigate("/analysis", { state: { result: response.data } });
    } catch (error) {
      console.error("Error analyzing code:", error);
      alert(
        error.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Code Analyzer
          </h1>
          <p className="text-gray-400">
            Paste your code and get instant complexity analysis and optimization
            suggestions
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-2xl">
            <label className="block text-gray-400 text-sm mb-3 font-medium">
              Problem Statement
            </label>
            <textarea
              placeholder="Describe the problem or paste the coding question here..."
              className="w-full bg-black/50 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition min-h-[120px]"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          <CodeEditor
            language={language}
            onLanguageChange={setLanguage}
            code={code}
            onCodeChange={setCode}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl font-semibold text-white text-lg hover:from-red-600 hover:to-red-700 transition shadow-lg shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing Code...
              </span>
            ) : (
              "🚀 Analyze Code"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analyze;