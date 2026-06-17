"use client";

import { motion } from "motion/react";

const treatments = [
  {
    emoji: "🌿",
    title: "Hair Fall",
    description: "Constitutional treatment for hair loss, alopecia, and scalp conditions.",
    tag: "Popular",
  },
  {
    emoji: "🦋",
    title: "Thyroid",
    description: "Effective homeopathic management for hypothyroidism and hyperthyroidism.",
    tag: "",
  },
  {
    emoji: "🩸",
    title: "Diabetes",
    description: "Complementary therapy to support blood sugar regulation and energy levels.",
    tag: "Common",
  },
  {
    emoji: "🤧",
    title: "Allergies",
    description: "Seasonal, dust, food, and skin allergies treated at the root level.",
    tag: "",
  },
  {
    emoji: "🧠",
    title: "Migraine",
    description: "Long-term relief for chronic headaches and migraine attacks.",
    tag: "",
  },
];

export default function TreatmentsSection() {
  return (
    <section id="treatments" className="bg-white py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-full mb-4"
          >
            Specializations
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight"
          >
            Conditions we specialize in
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-zinc-500 text-base max-w-lg"
          >
            Our clinic&apos;s ClinicFlow system manages patient records across a wide
            range of homeopathic treatments.
          </motion.p>
        </div>

        {/* Treatments grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {treatments.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="group relative bg-zinc-50 hover:bg-white border border-zinc-200 hover:border-emerald-200 hover:shadow-md rounded-2xl p-5 transition-all duration-300 cursor-default"
            >
              {t.tag && (
                <span className="absolute top-3 right-3 text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                  {t.tag}
                </span>
              )}
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {t.emoji}
              </div>
              <h3 className="text-sm font-bold text-zinc-900 leading-tight mb-1.5">
                {t.title}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {t.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
