import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      await register({
        name: form.name,
        username: form.username,
        email: form.email,
        password: form.password,
      });

      navigate("/dashboard");
    } catch (err) {
      const data = err.response?.data;

      if (data?.errors) {
        const firstError = Object.values(data.errors)[0][0];
        setError(firstError);
      } else if (data?.message) {
        setError(data.message);
      } else {
        setError("Unable to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background-light dark:bg-background-dark flex flex-col">
      <div className="h-12" />

      <main className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Logo */}
        <div className="mb-10 flex flex-col items-center">
          <div className="size-14 bg-primary rounded-xl flex items-center justify-center text-white mb-4">
            <span className="material-symbols-outlined text-3xl">
              description
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            ResumePro
          </h1>
        </div>

        {/* Card */}
        <div className="w-full max-w-[400px] bg-white dark:bg-[#242424] rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-800">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">
              Create your account
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Get started in minutes. No credit card required.
            </p>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSignup}>
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="h-12 px-4 rounded-lg border"
              />
            </div>

            {/* Username */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="h-12 px-4 rounded-lg border"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="h-12 px-4 rounded-lg border"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="h-12 px-4 rounded-lg border"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary text-white font-semibold rounded-lg disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/signin" className="text-primary font-semibold">
            Sign in
          </Link>
        </p>
      </main>

      <div className="h-8" />
    </div>
  );
}
