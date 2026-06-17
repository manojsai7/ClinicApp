"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="bg-[#09090B] py-20 sm:py-28 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/25 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            The clinic OS your
            <br />
            <span className="gradient-text">patients deserve.</span>
          </h2>
          <p className="mt-5 text-zinc-400 text-base sm:text-lg max-w-lg mx-auto">
            Join clinics already using ClinicFlow to eliminate paper files and
            give patients a premium care experience.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signin"
              className="btn-primary text-sm h-12 px-8 shadow-lg shadow-indigo-900/50"
            >
              Start using ClinicFlow
              <ArrowRight size={16} />
            </Link>
            <a
              href="#about"
              className="btn-secondary text-sm h-12 px-8 border-white/15 text-white/80 hover:bg-white/5 hover:border-white/25"
            >
              Learn about the doctor
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer inside CTA */}
      <div className="relative z-10 mt-16 pt-8 border-t border-white/8 max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-[8px] bg-indigo-600 flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" fill="white" fillOpacity="0.95" />
                <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-sm font-bold text-white">ClinicFlow</span>
          </div>
          <p className="text-xs text-zinc-600">
            © 2026 ClinicFlow. Built for modern homeopathy clinics.
          </p>
          <div className="flex gap-4 text-xs text-zinc-600">
            <Link href="/signin" className="hover:text-zinc-400 transition-colors">Sign in</Link>
            <a href="#faq" className="hover:text-zinc-400 transition-colors">FAQ</a>
          </div>
        </div>
      </div>
    </section>
  );
}
