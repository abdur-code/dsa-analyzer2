import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Code2, 
  LayoutDashboard, 
  Sparkles, 
  LogOut, 
  User,
  Menu,
  X
} from "lucide-react";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    }).then(() => {
      setUser(null);
      navigate("/login");
    });
  };

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, children, icon: Icon, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
        ${isActive(to) 
          ? 'bg-red-500/20 text-red-400 border border-red-500/50' 
          : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
        }
      `}
    >
      {Icon && <Icon size={18} />}
      {children}
    </Link>
  );

  return (
    <nav 
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-800/50' 
          : 'bg-gradient-to-br from-gray-900/40 to-black/40 backdrop-blur-xl'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 blur-xl opacity-50 group-hover:opacity-75 transition"></div>
              <div className="relative bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-xl shadow-lg shadow-red-500/50">
                <Code2 size={24} className="text-white" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                DSA Analyzer
              </span>
              <div className="text-xs text-gray-500 font-medium">
                AI-Powered Insights
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <NavLink to="/dashboard" icon={LayoutDashboard}>
                  Dashboard
                </NavLink>
                <NavLink to="/analyze" icon={Sparkles}>
                  Analyze
                </NavLink>

                {/* User Menu */}
                <div className="flex items-center gap-3 pl-4 ml-4 border-l border-gray-700">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50">
                    <User size={16} className="text-gray-400" />
                    <span className="text-gray-300 font-medium">
                      {user.username || 'User'}
                    </span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 font-medium transition-all duration-200 hover:scale-105"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-6 py-2.5 border border-gray-700 hover:border-red-500/50 rounded-lg text-gray-300 hover:text-white font-medium transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:text-white transition"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-gray-800/50">
          <div className="px-4 py-6 space-y-3">
            {user ? (
              <>
                {/* User Info */}
                <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 mb-4">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <User size={20} className="text-red-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{user.username || 'User'}</p>
                    <p className="text-gray-400 text-sm">Account Active</p>
                  </div>
                </div>

                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition
                    ${isActive('/dashboard')
                      ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                      : 'text-gray-300 hover:bg-gray-800/50'
                    }
                  `}
                >
                  <LayoutDashboard size={20} />
                  Dashboard
                </Link>

                <Link
                  to="/analyze"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition
                    ${isActive('/analyze')
                      ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                      : 'text-gray-300 hover:bg-gray-800/50'
                    }
                  `}
                >
                  <Sparkles size={20} />
                  Analyze
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 mt-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 font-medium transition hover:bg-red-500/20"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-4 py-3 text-center border border-gray-700 hover:border-red-500/50 rounded-lg text-gray-300 hover:text-white font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-4 py-3 text-center bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white font-semibold hover:from-red-600 hover:to-red-700 transition shadow-lg shadow-red-500/30"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;