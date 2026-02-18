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

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${inter.className} bg-stone-50 text-slate-800`}>
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

