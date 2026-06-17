import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ClinicFlow — Digital OS for Modern Homeopathy Clinics",
  description:
    "Never lose a patient's history again. ClinicFlow is a beautiful digital records system for homeopathy clinics — patient timelines, prescriptions, OP renewals, and more.",
  keywords: "homeopathy clinic, patient management, digital records, OP renewal, clinic software",
  openGraph: {
    title: "ClinicFlow — Digital OS for Modern Homeopathy Clinics",
    description: "Beautiful digital records for homeopathy clinics.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
