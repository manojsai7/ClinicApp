"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Is my patient data safe?",
    a: "Yes. All patient data is stored securely. When connected to Supabase, data is encrypted in transit and at rest. In offline/demo mode, data is stored locally in your browser.",
  },
  {
    q: "Can multiple staff members use ClinicFlow?",
    a: "Yes. ClinicFlow supports multiple roles — Doctor, Receptionist, and Admin — each with appropriate access. Staff members log in with their registered phone number.",
  },
  {
    q: "What is an OP record?",
    a: "OP (Outpatient) records track a patient's registration validity at the clinic. Patients need to renew their OP every 30 days (configurable). ClinicFlow automatically alerts you before expiry.",
  },
  {
    q: "Can I upload prescriptions and reports?",
    a: "Yes. You can attach prescriptions, blood reports, X-rays, and external documents directly to each patient's profile. All files are accessible from their timeline.",
  },
  {
    q: "Does ClinicFlow work on mobile?",
    a: "Absolutely. ClinicFlow is built mobile-first. The interface works beautifully on a 390px phone screen — perfect for use during consultations.",
  },
  {
    q: "Can I migrate from paper records?",
    a: "Yes. You can register existing patients with their historical file numbers and add past visits manually. Our team can help with bulk data migration on request.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 bg-zinc-100 border border-zinc-200 px-3.5 py-1.5 rounded-full mb-4"
          >
            FAQ
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight"
          >
            Common questions
          </motion.h2>
        </div>

        {/* Accordion */}
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                open === i
                  ? "border-indigo-200 bg-indigo-50/30"
                  : "border-zinc-200 bg-white"
              }`}
            >
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span
                  className={`text-[14.5px] font-semibold leading-snug transition-colors ${
                    open === i ? "text-indigo-700" : "text-zinc-900"
                  }`}
                >
                  {faq.q}
                </span>
                <div
                  className={`shrink-0 ml-4 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                    open === i
                      ? "bg-indigo-100 text-indigo-600 rotate-0"
                      : "bg-zinc-100 text-zinc-500"
                  }`}
                >
                  {open === i ? <Minus size={14} /> : <Plus size={14} />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <p className="px-5 pb-4 text-sm text-zinc-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
