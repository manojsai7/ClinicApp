"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Search, FileText, Bell } from "lucide-react";

// Animated floating card component
function FloatingCard({
  delay = 0,
  className = "",
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{
        opacity: 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        y: {
          duration: 4,
          delay: delay + 0.6,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className={`absolute glass-dark rounded-2xl p-3.5 shadow-2xl border border-white/10 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#09090B] flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Built for Homeopathy Clinics
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-white"
            >
              Never lose a{" "}
              <span className="gradient-text">patient&apos;s</span>
              <br />
              history again.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-5 text-base sm:text-lg text-zinc-400 leading-relaxed max-w-md mx-auto lg:mx-0"
            >
              Beautiful digital records for homeopathy clinics. Search patients,
              track visits, upload prescriptions and manage OP renewals —
              effortlessly.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link href="/signin" className="btn-primary text-sm h-12 px-6 shadow-lg shadow-indigo-900/40">
                Get started free
                <ArrowRight size={16} />
              </Link>
              <a href="#features" className="btn-secondary text-sm h-12 px-6 border-white/15 text-white/80 hover:bg-white/5 hover:border-white/25">
                See how it works
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 flex items-center gap-4 justify-center lg:justify-start text-xs text-zinc-500"
            >
              <span className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-mint-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                No paper files
              </span>
              <span className="w-px h-3 bg-zinc-700" />
              <span className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-mint-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Auto OP reminders
              </span>
              <span className="w-px h-3 bg-zinc-700" />
              <span className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-mint-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Mobile-first
              </span>
            </motion.div>
          </div>

          {/* Right: Animated floating cards UI preview */}
          <div className="flex-1 relative h-[420px] w-full max-w-sm lg:max-w-none hidden sm:flex items-center justify-center">
            {/* Central card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative w-72 glass-dark rounded-2xl p-5 shadow-2xl border border-white/10 z-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                  RK
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">Ramesh Kumar</p>
                  <p className="text-zinc-500 text-xs mt-0.5">File #A-1001 · Type 2 Diabetes</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {[
                  { label: "Visit #4", note: "HbA1c improved to 7.1%", date: "9 Apr", color: "bg-indigo-500" },
                  { label: "Visit #3", note: "Dosage increased to 1000mg", date: "2 Mar", color: "bg-indigo-500/60" },
                  { label: "Visit #2", note: "HbA1c checked (7.8%)", date: "12 Feb", color: "bg-indigo-500/40" },
                ].map((v) => (
                  <div key={v.label} className="flex items-start gap-2.5">
                    <div className="mt-1.5 flex flex-col items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${v.color} shrink-0`} />
                      <div className="w-px flex-1 bg-white/10 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white/80">{v.label}</span>
                        <span className="text-[10px] text-zinc-600">{v.date}</span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5 truncate">{v.note}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-white/8 flex items-center gap-2">
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">OP Active</span>
                <span className="text-[10px] text-zinc-600">Expires 15 Jul 2026</span>
              </div>
            </motion.div>

            {/* Floating search card */}
            <FloatingCard delay={0.6} className="top-8 -left-6 w-52">
              <div className="flex items-center gap-2">
                <Search size={14} className="text-zinc-400" />
                <span className="text-xs text-zinc-400">Search patients...</span>
                <kbd className="ml-auto text-[9px] text-zinc-600 bg-zinc-800 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
              </div>
            </FloatingCard>

            {/* Floating notification card */}
            <FloatingCard delay={0.9} className="bottom-10 -right-4 w-56">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
                  <Bell size={13} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white leading-tight">OP Expiring</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Priya Sharma · Tomorrow</p>
                </div>
              </div>
            </FloatingCard>

            {/* Floating prescription card */}
            <FloatingCard delay={0.75} className="top-24 -right-8 w-44">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <FileText size={13} className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-white leading-tight">Prescription</p>
                  <p className="text-[10px] text-zinc-500">Uploaded ✓</p>
                </div>
              </div>
            </FloatingCard>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-50 to-transparent pointer-events-none" />
    </section>
  );
}
