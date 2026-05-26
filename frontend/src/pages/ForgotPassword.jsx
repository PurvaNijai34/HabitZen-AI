import { useState } from "react";

import { Link } from "react-router-dom";

import {
  Sparkles,
  ArrowLeft,
} from "lucide-react";

import { useAuth } from "../context/AuthContext.jsx";

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    setErr("");

    setSuccess("");

    setLoading(true);

    try {
      const res =
        await forgotPassword(email);

      setSuccess(res.message);
    } catch (e) {
      setErr(
        e.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 mb-6"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center">
            <Sparkles size={18} />
          </div>

          <span className="font-semibold text-lg">
            AI Habit Tracker
          </span>
        </Link>

        <div className="card p-7">
          <h1 className="text-2xl font-semibold">
            Forgot Password
          </h1>

          <p className="text-sm text-muted mt-1">
            Enter your email to receive a
            reset link.
          </p>

          <form
            onSubmit={submit}
            className="mt-6 space-y-4"
          >
            <div>
              <label className="label">
                Email
              </label>

              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
                required
              />
            </div>

            {err && (
              <div className="text-sm text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                {err}
              </div>
            )}

            {success && (
              <div className="text-sm text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2">
                {success}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary w-full py-3"
              disabled={loading}
            >
              {loading
                ? "Sending..."
                : "Send Reset Link"}
            </button>
          </form>

          <Link
            to="/login"
            className="flex items-center gap-2 text-sm mt-5 text-soft hover:text-brand-500"
          >
            <ArrowLeft size={16} />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}