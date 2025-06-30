"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";

const roles = ["student", "admin"];
const countryCodes = [
  { code: "+1", name: "United States" },
  { code: "+91", name: "India" },
  { code: "+44", name: "United Kingdom" },
  { code: "+61", name: "Australia" },
  { code: "+81", name: "Japan" },
  { code: "+49", name: "Germany" },
  { code: "+33", name: "France" },
  { code: "+86", name: "China" },
  { code: "+971", name: "United Arab Emirates" },
  { code: "+7", name: "Russia" },
  { code: "+39", name: "Italy" },
  { code: "+34", name: "Spain" },
  { code: "+55", name: "Brazil" },
  { code: "+27", name: "South Africa" },
  { code: "+82", name: "South Korea" },
  { code: "+65", name: "Singapore" },
  { code: "+62", name: "Indonesia" },
  { code: "+234", name: "Nigeria" },
  { code: "+880", name: "Bangladesh" },
  { code: "+92", name: "Pakistan" },
  { code: "+20", name: "Egypt" },
  { code: "+966", name: "Saudi Arabia" },
  { code: "+90", name: "Turkey" },
  { code: "+380", name: "Ukraine" },
  { code: "+351", name: "Portugal" },
  { code: "+48", name: "Poland" },
  { code: "+46", name: "Sweden" },
  { code: "+41", name: "Switzerland" },
  { code: "+31", name: "Netherlands" },
  { code: "+32", name: "Belgium" },
  { code: "+420", name: "Czech Republic" },
  { code: "+43", name: "Austria" },
  { code: "+358", name: "Finland" },
  { code: "+47", name: "Norway" },
  { code: "+45", name: "Denmark" },
  { code: "+353", name: "Ireland" },
  { code: "+63", name: "Philippines" },
  { code: "+60", name: "Malaysia" },
  { code: "+998", name: "Uzbekistan" },
  { code: "+94", name: "Sri Lanka" },
  { code: "+977", name: "Nepal" },
  { code: "+254", name: "Kenya" },
  { code: "+255", name: "Tanzania" },
  { code: "+256", name: "Uganda" },
  { code: "+66", name: "Thailand" },
  { code: "+84", name: "Vietnam" },
  { code: "+212", name: "Morocco" },
  { code: "+213", name: "Algeria" },
  { code: "+998", name: "Uzbekistan" },
  // ... (add more as needed for full coverage)
].sort((a, b) => a.name.localeCompare(b.name));

function AuthPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const asPlayer = searchParams ? searchParams.get("asPlayer") : null;
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMsg, setResetMsg] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("+91");

  useEffect(() => {
    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        if (asPlayer) {
          router.push("/chess/multiplayer");
        } else {
          const userRole = session?.user?.user_metadata?.role;
          if (userRole && roles.includes(userRole)) {
            router.push(`/dashboard/${userRole}`);
          } else {
            router.push("/dashboard");
          }
        }
      }
    });

    // Also check on mount (for reloads)
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        if (asPlayer) {
          router.push("/chess/multiplayer");
        } else {
          const userRole = data.user.user_metadata?.role;
          if (userRole && roles.includes(userRole)) {
            router.push(`/dashboard/${userRole}`);
          } else {
            router.push("/dashboard");
          }
        }
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [asPlayer, router]);

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    if (!phone || !country) {
      setMessage("Phone number is required");
      setLoading(false);
      return;
    }
    if (mode === "signup") {
      if (password !== confirm) {
        setMessage("Passwords do not match");
        setLoading(false);
        return;
      }
      // Always set role to 'student' for signup, and include name, phone, country
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { role: "student", name, phone: country + phone, country } },
      });
      setLoading(false);
      setMessage(error ? error.message : "Check your email to confirm your account.");
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        setMessage(error.message);
      } else {
        if (asPlayer) {
          router.push("/chess/multiplayer");
        } else {
          const user = data.user;
          const userRole = user?.user_metadata?.role;
          if (userRole && roles.includes(userRole)) {
            router.push(`/dashboard/${userRole}`);
          } else {
            router.push("/dashboard");
          }
        }
      }
    }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setResetMsg(null);
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail);
    setLoading(false);
    setResetMsg(error ? error.message : "Check your email for a password reset link.");
  }

  async function handleGoogle() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    setLoading(false);
    if (error) setMessage(error.message);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md flex flex-col gap-7 border border-gray-200">
        <div className="flex justify-center gap-4 mb-2">
          <button
            className={`font-heading px-6 py-2 rounded-lg text-lg transition-colors ${mode === "login" ? "bg-white text-black" : "bg-gray-200 text-black"} hover:bg-gray-100`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`font-heading px-6 py-2 rounded-lg text-lg transition-colors ${mode === "signup" ? "bg-white text-black" : "bg-gray-200 text-black"} hover:bg-gray-100`}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>
        <div className="flex items-center justify-center w-full">
          {/* Removed the Get Free Demo button from the auth page */}
        </div>
        <button
          type="button"
          className="flex items-center justify-center gap-2 bg-white text-black rounded-lg px-4 py-2 font-heading text-base transition-transform duration-200 hover:scale-105 hover:bg-gray-200 mb-2 shadow"
          onClick={handleGoogle}
          disabled={loading}
        >
          <svg width="20" height="20" viewBox="0 0 48 48" className="mr-2"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.82 2.36 30.28 0 24 0 14.82 0 6.71 5.08 2.69 12.44l7.98 6.2C12.13 13.09 17.62 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.03l7.18 5.59C43.98 37.13 46.1 31.3 46.1 24.55z"/><path fill="#FBBC05" d="M10.67 28.65c-1.01-2.99-1.01-6.21 0-9.2l-7.98-6.2C.99 17.1 0 20.44 0 24c0 3.56.99 6.9 2.69 10.09l7.98-6.2z"/><path fill="#EA4335" d="M24 48c6.28 0 11.82-2.08 15.74-5.67l-7.18-5.59c-2.01 1.35-4.58 2.16-8.56 2.16-6.38 0-11.87-3.59-14.33-8.74l-7.98 6.2C6.71 42.92 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
          Continue with Google
        </button>
        <form className="flex flex-col gap-4" onSubmit={handleAuth}>
          {mode === "signup" && (
            <div className="flex gap-4 w-full">
            <input
              type="text"
                placeholder="First name*"
              required
                className="border border-gray-400 rounded-lg px-4 py-2 font-body focus:border-black outline-none bg-white text-black text-lg flex-1 min-w-0 placeholder-gray-400"
              value={name}
              onChange={e => setName(e.target.value)}
                name="firstName"
            />
              <input
                type="text"
                placeholder="Last name"
                className="border border-gray-400 rounded-lg px-4 py-2 font-body focus:border-black outline-none bg-white text-black text-lg flex-1 min-w-0 placeholder-gray-400"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                name="lastName"
              />
            </div>
          )}
          {mode === "signup" && (
            <div className="flex gap-2 w-full">
              <select
                className="border border-gray-400 rounded-lg px-2 py-2 font-body focus:border-black outline-none bg-white text-black text-lg w-1/3 min-w-0 h-12"
                value={country}
                onChange={e => setCountry(e.target.value)}
                required
              >
                {countryCodes.map(c => (
                  <option key={c.code} value={c.code}>{c.name} {c.code}</option>
                ))}
              </select>
              <input
                type="tel"
                placeholder="Phone Number"
                required
                className="border border-gray-400 rounded-lg px-4 py-2 font-body focus:border-black outline-none bg-white text-black text-lg flex-1 min-w-0 h-12"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                minLength={7}
                maxLength={15}
              />
            </div>
          )}
          <input
            type="email"
            placeholder="Email"
            required
            className="border border-gray-400 rounded-lg px-4 py-2 font-body focus:border-black outline-none bg-white text-black text-lg"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="border border-gray-400 rounded-lg px-4 py-2 font-body focus:border-black outline-none bg-white text-black text-lg"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {mode === "signup" && (
            <input
              type="password"
              placeholder="Confirm Password"
              required
              className="border border-gray-400 rounded-lg px-4 py-2 font-body focus:border-black outline-none bg-white text-black text-lg"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
            />
          )}
          <button
            type="submit"
            className="bg-black text-white rounded-lg px-4 py-2 font-heading text-lg transition-transform duration-200 hover:scale-105 hover:bg-gray-900 disabled:opacity-60 shadow"
            disabled={loading}
          >
            {loading ? "Processing..." : (mode === "signup" ? "Sign Up" : "Login")}
          </button>
        </form>
        {message && (
          <div className="text-red-500 text-center text-base font-semibold">{message}</div>
        )}
        {mode === "login" && !showReset ? (
              <button
            className="text-black text-sm hover:underline font-semibold"
            onClick={() => setShowReset(true)}
              >
            Forgot Password?
              </button>
        ) : null}
        {showReset && mode === "login" && (
          <form onSubmit={handleReset} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="border border-gray-400 rounded-lg px-4 py-2 font-body focus:border-black outline-none bg-white text-black text-lg"
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)}
            />
                      <button
              type="submit"
              className="bg-black text-white rounded-lg px-4 py-2 font-heading text-base transition-transform duration-200 hover:scale-105 hover:bg-gray-900 disabled:opacity-60 shadow"
              disabled={loading}
                      >
              Reset Password
                      </button>
            {resetMsg && (
              <div className="text-red-500 text-center text-base font-semibold">{resetMsg}</div>
            )}
            <button
              type="button"
              className="text-black text-sm hover:underline font-semibold"
              onClick={() => setShowReset(false)}
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
      <style jsx global>{`
        ::placeholder {
          color: #a3a3a3 !important;
          opacity: 1 !important;
          font-weight: 400;
        }
      `}</style>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>}>
      <AuthPageContent />
    </Suspense>
  );
} 
