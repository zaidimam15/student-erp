import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { School, Eye, EyeOff, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("admin@school.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-ink-900">
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 bg-gradient-to-br from-ink-900 via-ink-900 to-ink-800 text-white relative overflow-hidden">
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -left-20 bottom-0 w-72 h-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="flex items-center gap-3 relative">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
            <School size={20} />
          </div>
          <span className="font-display font-bold text-lg">Greenfield School ERP</span>
        </div>
        <div className="relative max-w-md">
          <h1 className="font-display text-4xl font-bold leading-tight mb-4">
            Run your entire school from one dashboard.
          </h1>
          <p className="text-white/60 text-[15px] leading-relaxed">
            Students, attendance, fees, staff, exams, and results — all in one place, built for the
            people who run the school day to day.
          </p>
        </div>
        <p className="text-white/30 text-[12px] relative">© {new Date().getFullYear()} Greenfield School. All rights reserved.</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-paper">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
              <School size={20} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg text-ink-900">Greenfield ERP</span>
          </div>

          <h2 className="font-display text-2xl font-bold text-ink-900 mb-1.5">Welcome back</h2>
          <p className="text-ink-500 text-[13.5px] mb-8">Sign in to access the school management dashboard.</p>

          {error && (
            <div className="mb-5 px-3.5 py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[12.5px]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[12.5px] font-semibold text-ink-700 mb-1.5">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.75 rounded-lg border border-ink-900/[0.12] text-[13.5px] focus:border-accent focus:ring-1 focus:ring-accent outline-none bg-white py-2.5"
                placeholder="you@school.com"
              />
            </div>
            <div>
              <label className="block text-[12.5px] font-semibold text-ink-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-ink-900/[0.12] text-[13.5px] focus:border-accent focus:ring-1 focus:ring-accent outline-none bg-white pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-900"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-accent text-white text-[13.5px] font-semibold hover:bg-accent-dark transition-colors disabled:opacity-60 mt-2"
            >
              {loading ? "Signing in…" : (
                <>
                  <LogIn size={16} /> Sign in
                </>
              )}
            </button>
          </form>

          <div className="mt-6 px-4 py-3 rounded-lg bg-accent-light border border-accent/20 text-[12px] text-ink-700 leading-relaxed">
            <span className="font-semibold">Default admin login:</span> admin@school.com / admin123
            <br />
            Run <code className="bg-white/60 px-1 rounded">npm run seed</code> in the server folder to create it.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
