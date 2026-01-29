import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft } from "lucide-react"; // Added for the back icon

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(form.email, form.password);

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background-light dark:bg-background-dark flex flex-col">
      {/* Header with Back Button */}
      <header className="p-6">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 text-gray-500 hover:text-red-600 transition-all duration-200"
        >
          <div className="p-2 rounded-full group-hover:bg-red-50 transition-colors">
            <ArrowLeft size={20} />
          </div>
          <span className="text-sm font-medium">Back to home</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Logo */}
        <div className="mb-10 flex flex-col items-center">
          <div className="size-14 bg-red-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-red-100">
            <span className="material-symbols-outlined text-3xl">
              description
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Resume <span className="text-red-600">PRO</span>
          </h1>
        </div>

        {/* Card */}
        <div className="w-full max-w-[400px] bg-white dark:bg-[#242424] rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-800">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              Welcome back
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sign in using your email and password.
            </p>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="h-12 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-600 transition-all"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="h-12 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-600 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg disabled:opacity-60 transition-colors shadow-md shadow-red-100"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-red-600 font-semibold hover:underline">
            Create one
          </Link>
        </p>
      </main>

      <div className="h-8" />
    </div>
  );
}