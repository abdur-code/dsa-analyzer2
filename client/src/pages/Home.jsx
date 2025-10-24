import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { 
  Code2, 
  Zap, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  Sparkles,
  BarChart3,
  Brain,
  Rocket
} from "lucide-react";

export default function Home({ user }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Get instant insights on your code complexity and performance with advanced AI algorithms.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/20"
    },
    {
      icon: BarChart3,
      title: "Detailed Metrics",
      description: "Track time & space complexity, edge cases, code structure, and readability scores.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/20"
    },
    {
      icon: Target,
      title: "Optimization Tips",
      description: "Receive actionable suggestions to improve your algorithms and coding patterns.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500/20"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your improvement over time with comprehensive analytics and history.",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-500/20"
    }
  ];

  const benefits = [
    "Instant code complexity analysis",
    "Multi-language support (Python, JavaScript, Java, C++)",
    "Personalized improvement suggestions",
    "Track your coding journey",
    "Learn industry best practices",
    "Identify performance bottlenecks"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-red-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full">
                <Sparkles size={16} className="text-red-400" />
                <span className="text-red-400 text-sm font-semibold">AI-Powered Code Analysis</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent leading-tight">
              Master DSA with
              <br />
              Smart Analysis
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Elevate your coding skills with AI-driven insights. Analyze algorithms, 
              optimize complexity, and track your progress—all in one powerful platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate("/login")}
                className="group px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl font-semibold text-white text-lg hover:from-red-600 hover:to-red-700 transition shadow-lg shadow-red-500/30 flex items-center gap-2"
              >
                <Rocket size={20} className="group-hover:translate-x-1 transition-transform" />
                Get Started Free
              </button>
              
              <button
                onClick={() => navigate("/signup")}
                className="px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-xl font-semibold text-white text-lg transition flex items-center gap-2"
              >
                <Code2 size={20} />
                Create Account
              </button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                <span>Instant results</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose DSA Analyzer?
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to become a better programmer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 shadow-2xl hover:scale-105 transition-transform duration-300"
              >
                <div className={`inline-flex p-3 ${feature.bgColor} rounded-lg mb-4`}>
                  <feature.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 md:p-12 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Unlock Your Full
                  <br />
                  <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                    Coding Potential
                  </span>
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Whether you're preparing for interviews, learning DSA, or improving 
                  your problem-solving skills, our platform provides the tools and 
                  insights you need to excel.
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-lg font-semibold text-white hover:from-red-600 hover:to-red-700 transition shadow-lg shadow-red-500/30"
                >
                  Start Analyzing Now
                </button>
              </div>

              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-black/30 rounded-lg border border-gray-700/30 hover:border-red-500/30 transition"
                  >
                    <CheckCircle size={20} className="text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 shadow-2xl text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent mb-2">
                4
              </div>
              <p className="text-gray-400">Languages Supported</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 shadow-2xl text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">
                8+
              </div>
              <p className="text-gray-400">Analysis Metrics</p>
            </div>

            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 shadow-2xl text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-2">
                ∞
              </div>
              <p className="text-gray-400">Free Analyses</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-red-900/20 to-purple-900/20 backdrop-blur-xl rounded-2xl border border-red-700/30 p-12 shadow-2xl relative overflow-hidden">
            {/* Decorative gradient orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Level Up Your Coding?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Join developers who are improving their DSA skills with intelligent code analysis
              </p>
              <button
                onClick={() => navigate("/login")}
                className="px-10 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl font-bold text-white text-lg hover:from-red-600 hover:to-red-700 transition shadow-lg shadow-red-500/50 inline-flex items-center gap-2"
              >
                <Zap size={24} />
                Get Started Now
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Analyze your code in seconds • Get instant feedback • Improve continuously
          </p>
        </div>
      </div>
    </div>
  );
}