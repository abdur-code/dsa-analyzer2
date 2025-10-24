import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, AlertCircle, ArrowLeft, Code, Lightbulb } from "lucide-react";

const Analysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result } = location.state || {};

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">No Analysis Data</h2>
          <button
            onClick={() => navigate("/analyze")}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white font-semibold hover:from-red-600 hover:to-red-700 transition"
          >
            Go Back to Analyzer
          </button>
        </div>
      </div>
    );
  }

  const { submission } = result;
  const { analysis } = submission;

  // Helper function to get score color
  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  // Helper function to get score bg color
  const getScoreBgColor = (score) => {
    if (score >= 90) return "bg-green-500/20 border-green-500/50";
    if (score >= 70) return "bg-yellow-500/20 border-yellow-500/50";
    return "bg-red-500/20 border-red-500/50";
  };

  const metrics = [
    { key: "problemUnderstanding", label: "Problem Understanding", data: analysis.problemUnderstanding },
    { key: "timeComplexity", label: "Time Complexity", data: analysis.timeComplexity },
    { key: "spaceComplexity", label: "Space Complexity", data: analysis.spaceComplexity },
    { key: "edgeCases", label: "Edge Cases", data: analysis.edgeCases },
    { key: "codeStructure", label: "Code Structure", data: analysis.codeStructure },
    { key: "variableNaming", label: "Variable Naming", data: analysis.variableNaming },
    { key: "readability", label: "Readability", data: analysis.readability },
    { key: "algorithmChoice", label: "Algorithm Choice", data: analysis.algorithmChoice },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/analyze")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Analyzer</span>
          </button>

          <div className="text-center">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Code Analysis Report
            </h1>
            <p className="text-gray-400">Detailed breakdown of your submission</p>
          </div>
        </div>

        {/* Overall Score Card */}
        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 shadow-2xl mb-6">
          <div className="text-center">
            <div className="inline-block">
              <div className="text-6xl font-bold mb-2">
                <span className={getScoreColor(analysis.overallScore)}>
                  {analysis.overallScore}
                </span>
                <span className="text-gray-500 text-4xl">/100</span>
              </div>
              <div className="text-gray-400 text-lg">Overall Score</div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-6 h-3 bg-gray-700 rounded-full overflow-hidden max-w-md mx-auto">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-1000 ease-out"
                style={{ width: `${analysis.overallScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Problem Details */}
        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-2xl mb-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Code size={24} className="text-red-400" />
            Submission Details
          </h2>
          <div className="space-y-3">
            <div>
              <span className="text-gray-400 text-sm">Problem:</span>
              <p className="text-white mt-1 whitespace-pre-wrap">{submission.questionTitle}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-400 text-sm">Language:</span>
                <p className="text-white font-semibold capitalize">{submission.language}</p>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Submitted:</span>
                <p className="text-white font-semibold">
                  {new Date(submission.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Code */}
        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-2xl mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Your Code</h2>
          <div className="bg-black/50 rounded-xl p-4 overflow-x-auto border border-gray-700/50">
            <pre className="text-gray-300 text-sm font-mono">
              <code>{submission.code}</code>
            </pre>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {metrics.map((metric) => (
            <div
              key={metric.key}
              className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{metric.label}</h3>
                <div className={`px-3 py-1 rounded-full border ${getScoreBgColor(metric.data.score)}`}>
                  <span className={`font-bold ${getScoreColor(metric.data.score)}`}>
                    {metric.data.score}/100
                  </span>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{metric.data.explanation}</p>
            </div>
          ))}
        </div>

        {/* Suggested Improvements */}
        {analysis.suggestedImprovements && (
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Lightbulb size={24} className="text-yellow-400" />
              Suggested Improvements
            </h2>
            
            {analysis.suggestedImprovements.explanation && (
              <div className="mb-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                <p className="text-gray-300 text-sm">{analysis.suggestedImprovements.explanation}</p>
              </div>
            )}

            {analysis.suggestedImprovements.improvedCode && (
              <div>
                <h3 className="text-sm text-gray-400 mb-2">Improved Code:</h3>
                <div className="bg-black/50 rounded-xl p-4 overflow-x-auto border border-gray-700/50">
                  <pre className="text-green-400 text-sm font-mono">
                    <code>{analysis.suggestedImprovements.improvedCode}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => navigate("/analyze")}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl text-white font-semibold hover:from-red-600 hover:to-red-700 transition shadow-lg shadow-red-500/30"
          >
            Analyze Another Code
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 rounded-xl text-white font-semibold transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analysis;