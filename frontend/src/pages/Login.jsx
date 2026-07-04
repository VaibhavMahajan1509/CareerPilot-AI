import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    toast.error("Email and password are required");
    return;
  }

  try {
    setLoading(true);

    const res = await API.post("/auth/login", formData);

    login(res.data.data.user, res.data.data.token);

    toast.success(res.data.message || "Login successful");

    navigate("/dashboard");
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-softBg flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="h-11 w-11 rounded-xl bg-primary text-white flex items-center justify-center">
              <Sparkles size={21} />
            </div>
            <span className="text-2xl font-bold text-dark">CareerPilot AI</span>
          </Link>

          <h1 className="mt-8 text-3xl font-bold text-dark">Welcome back</h1>
          <p className="mt-2 text-muted">
            Login to continue your career journey.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-white p-8 shadow-xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-dark">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="vaibhav@example.com"
                  className="w-full rounded-xl border border-border bg-white py-3 pl-12 pr-4 outline-none transition focus:border-primary focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-dark">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-border bg-white py-3 pl-12 pr-4 outline-none transition focus:border-primary focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted">
                <input type="checkbox" className="h-4 w-4 accent-indigo-600" />
                Remember me
              </label>

              <a
                href="#"
                className="font-semibold text-primary hover:text-indigo-700"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary py-3.5 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-semibold text-primary">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;