import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Or generic font if variable fonts issue
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BeeHouses Foundation - Platforma Edukacyjna",
  description: "Platforma edukacyjna dla pszczelarzy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${inter.className} bg-stone-50 text-slate-800`}>
        {/* We need a client wrapper for AuthProvider if we keep layout server component 
            OR make AuthProvider "use client" which we did. 
            However, we cannot import context directly in Server Component layout easily 
            without wrapping content. 
            Navbar uses client hook, so it is client component. 
            Values passed to Provider need to be client side.
        */}
        <Providers>
          <Navbar />
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

// Simple wrapper to keep RootLayout clean if needed, or just make RootLayout client?
// Better: Create separate Providers component or just inline if small.
// Since AuthProvider is "use client", we can use it here? 
// No, RootLayout is Server Component by default. Importing client component into server component is allowed.
// But we need to make sure we don't break hydration.

// Let's create a "Providers.tsx" or just define inline here if possible?
// inline component definition in file usually fine.

import React from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

