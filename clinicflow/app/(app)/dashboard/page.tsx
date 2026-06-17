"use client";

import { useEffect, useState } from "react";
import {
  Users,
  AlertTriangle,
  ArrowRight,
  UserCheck,
  Activity,
  FileText,
  RotateCw,
  UserPlus,
  Stethoscope,
  type LucideIcon,
  TrendingUp,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  getStoredPatients,
  getStoredOPRecords,
  getStoredVisits,
  getStoredActivityLogs,
} from "@/lib/mock-data";
import type { Patient, OPRecord, Visit, ActivityLog } from "@/types";

export default function DashboardPage() {
  const [patients, setPatients] = useState<Patient[]>(() => getStoredPatients());
  const [opRecords, setOpRecords] = useState<OPRecord[]>(() => getStoredOPRecords());
  const [visits, setVisits] = useState<Visit[]>(() => getStoredVisits());
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() =>
    getStoredActivityLogs().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  );
  const [session, setSession] = useState<{ role: string; name: string } | null>(() => {
    if (typeof window === "undefined") return null;
    const s = localStorage.getItem("cf_session");
    return s ? JSON.parse(s) : null;
  });

  useEffect(() => {
    function loadAll() {
      setPatients(getStoredPatients());
      setOpRecords(getStoredOPRecords());
      setVisits(getStoredVisits());
      setActivityLogs(
        getStoredActivityLogs().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      );
      const s = localStorage.getItem("cf_session");
      if (s) setSession(JSON.parse(s));
    }
    loadAll();
    const interval = setInterval(loadAll, 2000);
    return () => clearInterval(interval);
  }, []);

  const todayStr = new Date().toISOString().split("T")[0];
  const todayVisits = visits.filter((v) => v.date.startsWith(todayStr) || v.date.startsWith("2025-06-17"));
  const activeOPsCount = opRecords.filter((o) => o.status === "active").length;
  const expiringOPsCount = opRecords.filter((o) => o.status === "expiring" || o.status === "expired").length;
  const opAlerts = opRecords.filter((op) => op.status === "expiring" || op.status === "expired");

  const activityIconMap: Record<string, LucideIcon> = {
    registration: UserPlus,
    visit: Stethoscope,
    file_upload: FileText,
    op_renewal: RotateCw,
  };

  const activityColorMap: Record<string, { bg: string; text: string }> = {
    registration: { bg: "bg-indigo-50", text: "text-indigo-600" },
    visit: { bg: "bg-emerald-50", text: "text-emerald-600" },
    file_upload: { bg: "bg-purple-50", text: "text-purple-600" },
    op_renewal: { bg: "bg-amber-50", text: "text-amber-600" },
  };

  // Greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const firstName = session?.name?.split(" ").slice(0, 2).join(" ") || "Doctor";

  return (
    <div className="space-y-8 pb-16">

      {/* ── Greeting Header ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            {greeting}, {firstName} 👋
          </h1>
          <p className="text-sm text-zinc-500 mt-1 font-medium">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <Link
          href="/patients"
          className="btn-primary text-sm h-10 px-5 self-start sm:self-auto"
        >
          <Plus size={15} />
          New Patient
        </Link>
      </motion.div>

      {/* ── Stat Pills ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          {
            label: "Today's Patients",
            value: todayVisits.length,
            icon: Users,
            color: "bg-indigo-50 text-indigo-600",
            badge: "text-indigo-700 bg-indigo-50",
            badgeText: "Visits today",
          },
          {
            label: "Active OPs",
            value: activeOPsCount,
            icon: UserCheck,
            color: "bg-emerald-50 text-emerald-600",
            badge: "text-emerald-700 bg-emerald-50",
            badgeText: "In valid term",
          },
          {
            label: "Needs Attention",
            value: expiringOPsCount,
            icon: AlertTriangle,
            color: "bg-amber-50 text-amber-600",
            badge: "text-amber-700 bg-amber-50",
            badgeText: "Expiring / Expired",
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
              className="card card-hover p-5"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                  {stat.label}
                </span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon size={16} />
                </div>
              </div>
              <p className="text-3xl font-bold text-zinc-900 tracking-tight">
                {stat.value}
              </p>
              <span className={`inline-flex items-center gap-1 text-[11px] font-semibold mt-2.5 px-2 py-0.5 rounded-full ${stat.badge}`}>
                <TrendingUp size={10} />
                {stat.badgeText}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Main Content: 2-col ───────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Left: Recent Patients + Activity */}
        <div className="lg:col-span-2 space-y-6">

          {/* Recent Patients */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="card overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <div>
                <h2 className="text-[15px] font-bold text-zinc-900">Recent Patients</h2>
                <p className="text-xs text-zinc-400 mt-0.5">Latest registered records</p>
              </div>
              <Link
                href="/patients"
                className="flex items-center gap-1 text-xs text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
              >
                View all <ArrowRight size={12} />
              </Link>
            </div>

            <div className="divide-y divide-zinc-50">
              {patients.slice(0, 6).map((patient) => (
                <Link
                  key={patient.id}
                  href={`/patients/${patient.id}`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-zinc-50/80 transition-colors group"
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm">
                    {patient.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 group-hover:text-indigo-600 transition-colors truncate">
                      {patient.name}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5 truncate">
                      #{patient.file_number} · {patient.disease}
                    </p>
                  </div>

                  {/* Right info */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="hidden sm:block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-md">
                      {patient.gender}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {patient.last_visit
                        ? new Date(patient.last_visit).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })
                        : "New"}
                    </span>
                    <ArrowRight size={13} className="text-zinc-300 group-hover:text-indigo-400 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Activity Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.4 }}
            className="card p-6"
          >
            <div className="mb-6">
              <h2 className="text-[15px] font-bold text-zinc-900">Activity Timeline</h2>
              <p className="text-xs text-zinc-400 mt-0.5">Real-time clinic event log</p>
            </div>

            {activityLogs.length === 0 ? (
              <div className="text-center py-8">
                <Activity size={28} className="text-zinc-300 mx-auto mb-2" />
                <p className="text-sm text-zinc-400">No activity logged yet</p>
              </div>
            ) : (
              <div className="relative pl-6 space-y-6">
                {/* Vertical line */}
                <div className="absolute left-2 top-1 bottom-0 w-px bg-zinc-100" />

                {activityLogs.slice(0, 8).map((log) => {
                  const patient = patients.find((p) => p.id === log.patient_id);
                  const Icon = activityIconMap[log.type] || Activity;
                  const colors = activityColorMap[log.type] || { bg: "bg-zinc-50", text: "text-zinc-500" };

                  return (
                    <div key={log.id} className="relative flex items-start gap-3.5">
                      {/* Timeline dot */}
                      <div className="absolute -left-[22px] top-2 w-2.5 h-2.5 rounded-full bg-white border-2 border-indigo-400 shadow-sm" />

                      {/* Icon */}
                      <div className={`w-8 h-8 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center shrink-0 border border-current/10`}>
                        <Icon size={14} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex items-start justify-between gap-4">
                          <p className="text-[13px] text-zinc-700 leading-snug">
                            {patient ? (
                              <Link
                                href={`/patients/${patient.id}`}
                                className="font-bold text-zinc-900 hover:text-indigo-600 transition-colors"
                              >
                                {patient.name}
                              </Link>
                            ) : (
                              <span className="font-bold text-zinc-900">System</span>
                            )}{" "}
                            <span className="font-normal text-zinc-500">
                              {log.description}
                            </span>
                          </p>
                          <span className="text-[11px] text-zinc-400 font-medium shrink-0 mt-0.5">
                            {new Date(log.date).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>

        {/* Right: OP Alerts */}
        <div className="space-y-5">
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.35 }}
            className="card overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
              <div>
                <h2 className="text-[14px] font-bold text-zinc-900">OP Alerts</h2>
                <p className="text-[11px] text-zinc-400 mt-0.5">OP validity status</p>
              </div>
              {expiringOPsCount > 0 && (
                <span className="badge-expiring">
                  {expiringOPsCount} alerts
                </span>
              )}
            </div>

            {opAlerts.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-3">
                  <UserCheck size={20} />
                </div>
                <p className="text-sm font-semibold text-zinc-700">All clear</p>
                <p className="text-xs text-zinc-400 mt-1">All patient OPs are active</p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-50">
                {opAlerts.slice(0, 6).map((op) => {
                  const patient = patients.find((p) => p.id === op.patient_id);
                  if (!patient) return null;
                  const isExpired = op.status === "expired";

                  return (
                    <Link
                      key={op.id}
                      href={`/patients/${op.patient_id}`}
                      className="flex items-center gap-3 px-5 py-3.5 hover:bg-zinc-50 transition-colors"
                    >
                      <span
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          isExpired ? "bg-red-500 animate-pulse" : "bg-amber-500"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-zinc-900 truncate">
                          {patient.name}
                        </p>
                        <p className="text-xs text-zinc-400 mt-0.5">
                          Expires:{" "}
                          <span className="font-medium text-zinc-500">{op.expiry_date}</span>
                        </p>
                      </div>
                      <span className={isExpired ? "badge-expired" : "badge-expiring"}>
                        {op.status}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Quick stats card */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.45 }}
            className="card p-5"
          >
            <h2 className="text-[14px] font-bold text-zinc-900 mb-4">Clinic Overview</h2>
            <div className="space-y-3">
              {[
                { label: "Total Patients", value: patients.length, color: "text-indigo-600" },
                { label: "Total Visits", value: visits.length, color: "text-emerald-600" },
                { label: "Active Records", value: activeOPsCount, color: "text-blue-600" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500 font-medium">{item.label}</span>
                  <span className={`text-sm font-bold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
