import { useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import { useAuth } from "../context/AuthContext.jsx";

export default function ResetPassword() {
  const { token } = useParams();

  const navigate = useNavigate();

  const { resetPassword } = useAuth();

  const [password, setPassword] =
    useState("");

  const [show, setShow] =
    useState(false);

  const [err, setErr] = useState("");

  const [success, setSuccess] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const submit = async (e) => {
    e.preventDefault();

    setErr("");

    setSuccess("");

    setLoading(true);

    try {
      const res =
        await resetPassword(
          token,
          password
        );

      setSuccess(res.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (e) {
      setErr(
        e.response?.data?.message ||
          "Reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="card p-7">
          <h1 className="text-2xl font-semibold">
            Reset Password
          </h1>

          <p className="text-sm text-muted mt-1">
            Enter your new password.
          </p>

          <form
            onSubmit={submit}
            className="mt-6 space-y-4"
          >
            <div>
              <label className="label">
                New Password
              </label>

              <div className="relative">
                <input
                  className="input pr-12"
                  type={
                    show
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShow(!show)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {show ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
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
                ? "Resetting..."
                : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}