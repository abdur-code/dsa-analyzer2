import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Code2,
  TrendingUp,
  Award,
  Clock,
  ChevronRight,
  AlertCircle,
  BarChart3,
  Calendar,
  Sparkles,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    averageScore: 0,
    bestScore: 0,
    recentActivity: 0,
  });

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/submissions`,
        { withCredentials: true }
      );

      const userSubmissions = response.data.submissions || [];
      setSubmissions(userSubmissions);
      calculateStats(userSubmissions);
      setError(null);
    } catch (err) {
      console.error("Error fetching submissions:", err);
      setError("Failed to load submissions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    if (!data || data.length === 0) {
      setStats({
        totalSubmissions: 0,
        averageScore: 0,
        bestScore: 0,
        recentActivity: 0,
      });
      return;
    }

    const scores = data.map((s) => s.analysis?.overallScore || 0);
    const total = data.length;
    const average = Math.round(
      scores.reduce((acc, score) => acc + score, 0) / total
    );
    const best = Math.max(...scores);

    // Count submissions from last 7 days
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const recent = data.filter(
      (s) => new Date(s.createdAt) > oneWeekAgo
    ).length;

    setStats({
      totalSubmissions: total,
      averageScore: average,
      bestScore: best,
      recentActivity: recent,
    });
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return "bg-green-500/20 border-green-500/50";
    if (score >= 70) return "bg-yellow-500/20 border-yellow-500/50";
    return "bg-red-500/20 border-red-500/50";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleViewAnalysis = (submission) => {
    navigate("/analysis", { state: { result: { submission } } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-400">
            Track your coding progress and analyze your submissions
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-start gap-3">
            <AlertCircle className="text-red-400 mt-0.5" size={20} />
            <div>
              <p className="text-red-400 font-semibold">Error</p>
              <p className="text-gray-300 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-red-500/20 rounded-lg">
                <Code2 className="text-red-400" size={24} />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Total Submissions</p>
            <p className="text-3xl font-bold text-white">
              {stats.totalSubmissions}
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <BarChart3 className="text-blue-400" size={24} />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Average Score</p>
            <p className="text-3xl font-bold text-white">
              {stats.averageScore}
              <span className="text-gray-500 text-lg">/100</span>
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Award className="text-green-400" size={24} />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Best Score</p>
            <p className="text-3xl font-bold text-white">
              {stats.bestScore}
              <span className="text-gray-500 text-lg">/100</span>
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <TrendingUp className="text-purple-400" size={24} />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">This Week</p>
            <p className="text-3xl font-bold text-white">
              {stats.recentActivity}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/analyze")}
            className="w-full md:w-auto px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl font-semibold text-white hover:from-red-600 hover:to-red-700 transition shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
          >
            <Sparkles size={20} />
            Analyze New Code
          </button>
        </div>

        {/* Submissions List */}
        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-700/50">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Clock size={24} className="text-red-400" />
              Recent Submissions
            </h2>
          </div>

          {submissions.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mb-4">
                <Code2 size={64} className="text-gray-600 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No submissions yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start analyzing your code to see results here
              </p>
              <button
                onClick={() => navigate("/analyze")}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white font-semibold hover:from-red-600 hover:to-red-700 transition"
              >
                Analyze Your First Code
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-700/50">
              {submissions.map((submission) => (
                <div
                  key={submission._id}
                  className="p-6 hover:bg-gray-800/30 transition cursor-pointer group"
                  onClick={() => handleViewAnalysis(submission)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white truncate group-hover:text-red-400 transition">
                          {submission.questionTitle}
                        </h3>
                        <span className="px-3 py-1 bg-gray-700/50 rounded-full text-xs font-medium text-gray-300 capitalize">
                          {submission.language}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(submission.createdAt)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div
                        className={`px-4 py-2 rounded-lg border ${getScoreBgColor(
                          submission.analysis?.overallScore || 0
                        )}`}
                      >
                        <div className="text-center">
                          <p
                            className={`text-2xl font-bold ${getScoreColor(
                              submission.analysis?.overallScore || 0
                            )}`}
                          >
                            {submission.analysis?.overallScore || 0}
                          </p>
                          <p className="text-gray-400 text-xs">Score</p>
                        </div>
                      </div>

                      <ChevronRight
                        className="text-gray-500 group-hover:text-red-400 transition"
                        size={24}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Tips */}
        {submissions.length > 0 && (
          <div className="mt-8 p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-xl rounded-2xl border border-blue-700/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Sparkles className="text-blue-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Pro Tip
                </h3>
                <p className="text-gray-300 text-sm">
                  Review your past submissions to identify patterns in your
                  coding style and track improvement areas. Your average score
                  of{" "}
                  <span className="font-semibold text-blue-400">
                    {stats.averageScore}/100
                  </span>{" "}
                  shows your current level!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;