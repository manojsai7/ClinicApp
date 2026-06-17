"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Phone, ArrowRight, RotateCcw, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getUserByPhoneAsync } from "@/lib/mock-data";
import { createSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import Link from "next/link";

type Step = "choose" | "phone" | "otp";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>("choose");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (searchParams.get("error") === "auth_failed") {
      setError("Google sign-in failed. Please try again or use your phone number.");
    }
  }, [searchParams]);

  async function handleGoogleSignIn() {
    setError("");
    setLoading(true);

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError(
        "Google sign-in requires Supabase configuration. Please use your phone number, or contact the clinic administrator to configure Google auth."
      );
      setLoading(false);
      return;
    }

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (oauthError) {
      setError(oauthError.message);
      setLoading(false);
    }
  }

  function handlePhoneSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (phone.length < 10) {
      setError("Enter a valid 10-digit phone number");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 600);
  }

  function handleOtpChange(index: number, value: string) {
    if (value.length > 1) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  }

  async function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) { setError("Enter the 6-digit OTP"); return; }
    if (code !== "123456") { setError("Invalid OTP. Use 123456 for testing."); return; }

    setError("");
    setLoading(true);

    try {
      const user = await getUserByPhoneAsync(phone);
      if (!user) {
        setError("This phone number is not registered. Please contact the clinic administrator.");
        setLoading(false);
        return;
      }
      localStorage.setItem("cf_session", JSON.stringify({
        phone: user.phone, role: user.role, name: user.name,
      }));
      setTimeout(() => router.push("/dashboard"), 500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center px-5 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-8 flex flex-col items-center"
      >
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-[14px] bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/50">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" fill="white" fillOpacity="0.95" />
              <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-lg font-bold text-white tracking-tight">ClinicFlow</span>
        </Link>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-[400px] glass-dark rounded-3xl border border-white/10 p-7 shadow-2xl"
      >
        <AnimatePresence mode="wait">

          {/* ── Choose Method ──────────────────────────────────────── */}
          {step === "choose" && (
            <motion.div key="choose"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.28 }}
            >
              <div className="mb-7">
                <h1 className="text-xl font-bold text-white leading-tight">Welcome back</h1>
                <p className="text-zinc-500 text-sm mt-1.5">Sign in to your ClinicFlow workspace</p>
              </div>

              <div className="space-y-3">
                {/* Google */}
                <button
                  id="google-signin-btn"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full h-12 rounded-2xl bg-white hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-900 text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-zinc-300 border-t-zinc-700 rounded-full animate-spin" />
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Continue with Google
                    </>
                  )}
                </button>

                <div className="relative flex items-center gap-3">
                  <div className="flex-1 h-px bg-white/8" />
                  <span className="text-xs text-zinc-600 font-medium">or</span>
                  <div className="flex-1 h-px bg-white/8" />
                </div>

                {/* Phone */}
                <button
                  id="phone-signin-btn"
                  onClick={() => { setStep("phone"); setError(""); }}
                  className="w-full h-12 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 text-white text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-3"
                >
                  <Phone size={16} className="text-zinc-400" />
                  Continue with Phone
                </button>
              </div>

              {error && (
                <div className="mt-4 flex items-start gap-2 text-xs text-red-400 bg-red-500/10 rounded-xl p-3 border border-red-500/20">
                  <ShieldAlert size={14} className="shrink-0 mt-0.5" />
                  <span className="leading-snug">{error}</span>
                </div>
              )}

              {!isSupabaseConfigured && (
                <p className="mt-4 text-center text-[11px] text-zinc-700 leading-relaxed">
                  Demo mode · Add Supabase env vars to enable Google auth
                </p>
              )}
            </motion.div>
          )}

          {/* ── Phone ──────────────────────────────────────────────── */}
          {step === "phone" && (
            <motion.div key="phone"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.28 }}
            >
              <button onClick={() => { setStep("choose"); setError(""); }}
                className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-5 font-medium">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
                Back
              </button>

              <div className="mb-6">
                <h2 className="text-xl font-bold text-white leading-tight">Enter your number</h2>
                <p className="text-zinc-500 text-sm mt-1.5">We&apos;ll send you a verification code</p>
              </div>

              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                    Phone Number
                  </label>
                  <div className="flex items-center h-12 rounded-2xl border border-white/10 bg-white/5 px-4 gap-2.5 focus-within:border-indigo-500/50 focus-within:bg-white/8 transition-all">
                    <span className="text-sm text-zinc-500 font-semibold shrink-0">+91</span>
                    <div className="w-px h-4 bg-white/10" />
                    <input type="tel" value={phone}
                      onChange={(e) => { setError(""); setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); }}
                      placeholder="98765 43210"
                      className="flex-1 bg-transparent text-sm text-white outline-none placeholder-zinc-600 font-medium"
                      autoFocus
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-start gap-2 text-xs text-red-400 bg-red-500/10 rounded-xl p-3 border border-red-500/20">
                    <ShieldAlert size={14} className="shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <button type="submit" disabled={loading || phone.length < 10}
                  className="w-full h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/50">
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Send OTP <ArrowRight size={15} /></>
                  )}
                </button>
              </form>
            </motion.div>
          )}

          {/* ── OTP ────────────────────────────────────────────────── */}
          {step === "otp" && (
            <motion.div key="otp"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.28 }}
            >
              <button onClick={() => { setStep("phone"); setOtp(["","","","","",""]); setError(""); }}
                className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-5 font-medium">
                <RotateCcw size={11} /> Change number
              </button>

              <div className="mb-5">
                <h2 className="text-xl font-bold text-white leading-tight">Verify your identity</h2>
                <p className="text-zinc-500 text-sm mt-1.5">
                  Code sent to <span className="text-zinc-300 font-semibold">+91 {phone}</span>
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-400/10 rounded-lg px-3 py-1.5 mb-5 border border-emerald-400/20 font-semibold">
                Demo OTP: <strong className="font-bold text-emerald-300">123456</strong>
              </div>

              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="flex gap-2 justify-between">
                  {otp.map((digit, i) => (
                    <input key={i} id={`otp-${i}`}
                      type="text" inputMode="numeric" maxLength={1} value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value.replace(/\D/g, ""))}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-11 text-center text-lg font-bold rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-indigo-500/60 focus:bg-white/10 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-150"
                      style={{ height: "52px" }}
                      autoFocus={i === 0}
                    />
                  ))}
                </div>

                {error && (
                  <div className="flex items-start gap-2 text-xs text-red-400 bg-red-500/10 rounded-xl p-3 border border-red-500/20">
                    <ShieldAlert size={14} className="shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <button type="submit" disabled={loading || otp.join("").length < 6}
                  className="w-full h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/50">
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : "Verify & Enter →"}
                </button>
              </form>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }} className="mt-6"
      >
        <Link href="/" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors font-medium">
          ← Back to homepage
        </Link>
      </motion.div>
    </div>
  );
}

// Wrap in Suspense for useSearchParams
export default function SignInPage() {
  return (
    <Suspense>
      <SignInContent />
    </Suspense>
  );
}
