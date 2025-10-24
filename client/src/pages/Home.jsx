import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home({ user }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-red-500">Welcome to DSA Analyzer</h1>
      <p className="mt-4 text-gray-400">Analyze your DSA code with AI-powered insights.</p>
    </div>
  );
}