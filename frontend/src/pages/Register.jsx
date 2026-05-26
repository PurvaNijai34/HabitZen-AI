// // frontend/src/pages/Register.jsx
// import { useState } from "react";
// import { Link, Navigate, useNavigate } from "react-router-dom";
// import { Sparkles, Sun, Moon } from "lucide-react";
// import { useAuth } from "../context/AuthContext.jsx";
// import { useTheme } from "../context/ThemeContext.jsx";

// export default function Register() {
//   const { user, register } = useAuth();
//   const { theme, toggle } = useTheme();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [err, setErr] = useState("");
//   const [loading, setLoading] = useState(false);

//   if (user) return <Navigate to="/dashboard" replace />;

//   const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

//   const submit = async (e) => {
//     e.preventDefault();
//     setErr("");
//     if (form.password.length < 6) {
//       setErr("Password must be at least 6 characters");
//       return;
//     }
//     setLoading(true);
//     try {
//       await register(form.name, form.email, form.password);
//       navigate("/dashboard", { replace: true });
//     } catch (e) {
//       setErr(e.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <button
//         onClick={toggle}
//         className="fixed top-4 right-4 p-2.5 rounded-xl glass"
//         aria-label="Toggle theme"
//       >
//         {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
//       </button>

//       <div className="w-full max-w-md">
//         <Link
//           to="/"
//           className="flex items-center justify-center gap-2 mb-6"
//         >
//           <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center shadow-lg shadow-brand-500/30">
//             <Sparkles size={18} />
//           </div>
//           <span className="font-semibold text-lg">AI Habit Tracker</span>
//         </Link>

//         <div className="card p-7">
//           <h1 className="text-2xl font-semibold">Create your account</h1>
//           <p className="text-sm text-muted mt-1">
//             Free forever. Takes 30 seconds.
//           </p>

//           <form onSubmit={submit} className="mt-6 space-y-4">
//             <div>
//               <label className="label">Name</label>
//               <input
//                 className="input"
//                 value={form.name}
//                 onChange={set("name")}
//                 placeholder="Your name"
//                 required
//                 autoFocus
//               />
//             </div>
//             <div>
//               <label className="label">Email</label>
//               <input
//                 className="input"
//                 type="email"
//                 value={form.email}
//                 onChange={set("email")}
//                 placeholder="you@example.com"
//                 required
//               />
//             </div>
//             <div>
//               <label className="label">Password</label>
//               <input
//                 className="input"
//                 type="password"
//                 value={form.password}
//                 onChange={set("password")}
//                 placeholder="At least 6 characters"
//                 required
//               />
//             </div>
//             {err && (
//               <div className="text-sm text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
//                 {err}
//               </div>
//             )}
//             <button
//               type="submit"
//               className="btn-primary w-full py-3"
//               disabled={loading}
//             >
//               {loading ? "Creating account..." : "Create account"}
//             </button>
//           </form>

//           <div className="text-center mt-5 text-sm text-soft">
//             Already have an account?{" "}
//             <Link to="/login" className="text-brand-600 dark:text-brand-300 font-medium">
//               Log in
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Sun,
  Moon,
  Eye,
  EyeOff,
  Check,
  X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Register() {
  const { user, register } = useAuth();
  const { theme, toggle } = useTheme();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [err, setErr] = useState("");

  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const set = (k) => (e) =>
    setForm({ ...form, [k]: e.target.value });

  // validations

  const validations = {
    length: form.password.length >= 8,
    uppercase: /[A-Z]/.test(form.password),
    lowercase: /[a-z]/.test(form.password),
    number: /\d/.test(form.password),
    special: /[@$!%*?&]/.test(form.password),
  };

  const passwordValid =
    Object.values(validations).every(Boolean);

  const emailValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  const passwordsMatch =
    form.password === form.confirmPassword;

  const submit = async (e) => {
    e.preventDefault();

    setErr("");

    if (!emailValid) {
      return setErr("Invalid email format");
    }

    if (!passwordValid) {
      return setErr(
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character"
      );
    }

    if (!passwordsMatch) {
      return setErr("Passwords do not match");
    }

    setLoading(true);

    try {
      await register(
        form.name,
        form.email,
        form.password
      );

      navigate("/dashboard", { replace: true });
    } catch (e) {
      setErr(
        e.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const Rule = ({ ok, text }) => (
    <div
      className={`flex items-center gap-2 text-xs ${
        ok
          ? "text-emerald-500"
          : "text-rose-500"
      }`}
    >
      {ok ? <Check size={14} /> : <X size={14} />}
      <span>{text}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <button
        onClick={toggle}
        className="fixed top-4 right-4 p-2.5 rounded-xl glass"
      >
        {theme === "dark" ? (
          <Sun size={16} />
        ) : (
          <Moon size={16} />
        )}
      </button>

      <div className="w-full max-w-md">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 mb-6"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center">
            <Sparkles size={18} />
          </div>

          <span className="font-semibold text-lg">
            HabitZen AI
          </span>
        </Link>

        <div className="card p-7">
          <h1 className="text-2xl font-semibold">
            Create your account
          </h1>

          <p className="text-sm text-muted mt-1">
            Free forever. Takes 30 seconds.
          </p>

          <form
            onSubmit={submit}
            className="mt-6 space-y-4"
          >
            <div>
              <label className="label">Name</label>

              <input
                className="input"
                value={form.name}
                onChange={set("name")}
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="label">Email</label>

              <input
                className="input"
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="label">Password</label>

              <div className="relative">
                <input
                  className="input pr-12"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={form.password}
                  onChange={set("password")}
                  placeholder="Strong password"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {/* <div className="space-y-1 mt-3">
                <Rule
                  ok={validations.length}
                  text="At least 8 characters"
                />

                <Rule
                  ok={validations.uppercase}
                  text="One uppercase letter"
                />

                <Rule
                  ok={validations.lowercase}
                  text="One lowercase letter"
                />

                <Rule
                  ok={validations.number}
                  text="One number"
                />

                <Rule
                  ok={validations.special}
                  text="One special character"
                />
              </div> */}
            </div>

            <div>
              <label className="label">
                Confirm Password
              </label>

              <input
                className="input"
                type="password"
                value={form.confirmPassword}
                onChange={set("confirmPassword")}
                placeholder="Confirm password"
                required
              />

              {form.confirmPassword && (
                <p
                  className={`text-xs mt-2 ${
                    passwordsMatch
                      ? "text-emerald-500"
                      : "text-rose-500"
                  }`}
                >
                  {passwordsMatch
                    ? "Passwords match"
                    : "Passwords do not match"}
                </p>
              )}
            </div>

            {err && (
              <div className="text-sm text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                {err}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary w-full py-3"
              disabled={loading}
            >
              {loading
                ? "Creating account..."
                : "Create account"}
            </button>
          </form>

          <div className="text-center mt-5 text-sm text-soft">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-brand-600 dark:text-brand-300 font-medium"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}