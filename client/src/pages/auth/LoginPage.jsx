import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Eye,
  EyeOff,
  Mail,
  LockIcon,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../services/authService";
import Logo from "../../assets/assetflow_logo.png";

function LoginPage() {

  const { login } = useAuth();
  const navi = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] =  useState("");
  const [formData, setFormData] =  useState({ email: "",  password: "", });

  // handle input
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if ( !formData.email.trim() || !formData.password.trim()) {
      setError( "Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const data = await loginUser(formData);
      login(
        data.user, 
        data.session.access_token
      );

      // redirect by role
      if (data.user.role === "admin") {
        navi("/admin");
      }

      if (data.user.role === "manager") {
        navi("/manager");
      }

      if (data.user.role === "supervisor") {
        navi("/supervisor");
      }

      if (data.user.role === "worker") {
        navi("/worker");
      }

    } catch (err) {
      console.log(err);
      setError( err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e4f2ee]">
      <div className="w-full max-w-md">

        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-[#1e3a5f] flex items-center justify-center ">
            <img
             src={Logo}
             alt="logo"
             className="w-20" 
             />
          </div>
          <h1 className="text-3xl font-extrabold text-[#1e3a5f] tracking-tight">
            AssetsFlow
          </h1>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl shadow-blue-900/5 p-8">
          <label className="block text-xs text-center font-semibold text-gray-500 uppercase tracking-widest mb-5">
            Sign in to your account
          </label>
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm text-left font-medium text-gray-700 ">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="you@hotel.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-left font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#1e3a5f] text-white text-sm font-semibold rounded-xl hover:bg-[#2d5a8e] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 mx-auto border-2 border-white border-b-transparent rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              Hotel Maintenance System
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;