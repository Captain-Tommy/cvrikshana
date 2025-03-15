import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "cvr ikshana",
  description: "CVR Ikshana is a student-driven club dedicated to humanity and social service initiatives. Focused on making a meaningful impact, Ikshana organizes various activities, including community service, awareness campaigns, donation drives, and social outreach programs. The club aims to foster compassion, responsibility, and a sense of service among students while contributing to the betterment of society.",
  openGraph: {
    title: "CVR Ikshana",
    description: "Student-driven club dedicated to humanity and social service initiatives",
    images: [{
      url: "/images/logo.jpg",
      width: 800,
      height: 600,
      alt: "CVR Ikshana Logo"
    }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CVR Ikshana",
    description: "Student-driven club dedicated to humanity and social service initiatives",
    images: ["/images/logo.jpg"],
  },
  icons: {
    icon: "/images/logo.jpg",
    shortcut: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="_TCBQpGHbcooI517X0sF_45an41ClZHtBWgyif_H0CA" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
