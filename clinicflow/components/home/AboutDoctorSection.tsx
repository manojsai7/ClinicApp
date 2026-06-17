"use client";

import { motion } from "motion/react";
import { Award, GraduationCap, Heart, Clock } from "lucide-react";

const highlights = [
  { icon: GraduationCap, label: "BHMS, MD (Homeopathy)", value: "Qualified Physician" },
  { icon: Clock, label: "Years of Practice", value: "15+ Years" },
  { icon: Heart, label: "Patients Treated", value: "5,000+" },
  { icon: Award, label: "Specialization", value: "Homeopathy" },
];

export default function AboutDoctorSection() {
  return (
    <section id="about" className="bg-zinc-50 py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm">
          <div className="flex flex-col lg:flex-row">
            {/* Left: Doctor visual */}
            <div className="lg:w-[340px] shrink-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: "24px 24px"
                }}
              />

              {/* Doctor avatar illustration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring" }}
                className="relative w-32 h-32 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center mb-5 shadow-2xl"
              >
                {/* Illustrated avatar */}
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                  {/* Head */}
                  <circle cx="36" cy="26" r="16" fill="#FDE8D8" />
                  {/* Hair */}
                  <path d="M20 26 C20 12 52 12 52 26 C52 16 48 12 36 12 C24 12 20 16 20 26Z" fill="#3B2C2C" />
                  {/* White coat body */}
                  <rect x="16" y="46" width="40" height="26" rx="8" fill="white" />
                  {/* Stethoscope */}
                  <path d="M28 52 C28 52 24 56 24 60 C24 63 26 64 28 64 C30 64 32 63 32 60" stroke="#6366F1" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <circle cx="28" cy="64" r="2" fill="#6366F1" />
                  {/* Shirt collar */}
                  <path d="M32 46 L36 52 L40 46" stroke="#E5E7EB" strokeWidth="2" fill="none" />
                  {/* Eyes */}
                  <circle cx="31" cy="25" r="2" fill="#3B2C2C" />
                  <circle cx="41" cy="25" r="2" fill="#3B2C2C" />
                  {/* Smile */}
                  <path d="M30 32 Q36 37 42 32" stroke="#C97B5A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-white">Dr. Arjun Mehta</h3>
                <p className="text-indigo-200 text-sm mt-1 font-medium">BHMS, MD (Homeopathy)</p>
                <p className="text-indigo-300 text-xs mt-2">Founder, ClinicFlow Practice</p>
              </motion.div>

              {/* Decorative ring */}
              <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full border border-white/10" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full border border-white/10" />
            </div>

            {/* Right: Details */}
            <div className="flex-1 p-8 lg:p-10">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 rounded-full mb-5"
              >
                About the Doctor
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-4"
              >
                Holistic healing,{" "}
                <span className="gradient-text">modern tools.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-zinc-500 text-[15px] leading-relaxed mb-8"
              >
                Dr. Arjun Mehta has been practicing classical homeopathy for over 15 years,
                specializing in chronic conditions including thyroid disorders, diabetes, skin
                conditions, and migraine. His clinic now runs on ClinicFlow — giving patients
                the digital-age experience they deserve while preserving the personal touch of
                homeopathic care.
              </motion.p>

              {/* Highlights grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {highlights.map((h, i) => {
                  const Icon = h.icon;
                  return (
                    <motion.div
                      key={h.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                      className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4"
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2.5">
                        <Icon size={16} />
                      </div>
                      <p className="text-[13px] font-bold text-zinc-900 leading-tight">{h.value}</p>
                      <p className="text-[11px] text-zinc-500 mt-0.5">{h.label}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
