'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { LogOut, Layout, Key, Menu, X } from 'lucide-react';
import PasswordResetModal from './PasswordResetModal';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [showResetModal, setShowResetModal] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        { label: 'Misja', href: '/#mission' },
        { label: 'Działalność', href: '/#impact' },
        { label: 'Historia', href: '/#history' },
        { label: 'Kontakt', href: '/#kontakt' },
    ];

    return (
        <nav className="fixed top-0 w-full z-[100] px-4 md:px-6 py-3">
            <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/90 backdrop-blur-xl px-5 md:px-8 py-3 rounded-full shadow-lg border border-slate-100">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
                    <img src="/beehouses-logo.jpg" alt="BeeHouses" className="h-9 w-auto object-contain" />
                    <span className="font-serif font-bold text-slate-800 text-base tracking-tight hidden lg:block">
                        BeeHouses <span className="text-emerald-600">Foundation</span>
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden lg:flex items-center space-x-6">
                    {navLinks.map(link => (
                        <Link key={link.href} href={link.href} className="text-slate-500 hover:text-emerald-700 font-medium transition-colors text-sm tracking-wide">
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Right-side actions */}
                <div className="flex items-center space-x-3">
                    {user ? (
                        <>
                            <Link
                                href={user.role === 'admin' ? "/admin/dashboard" : "/dashboard"}
                                className="flex items-center px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-all font-bold text-sm shadow-md"
                            >
                                <Layout className="h-4 w-4 mr-2" />
                                <span className="hidden sm:inline">Platforma</span>
                            </Link>

                            <button
                                onClick={() => setShowResetModal(true)}
                                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 rounded-full transition-all"
                                title="Zmień hasło"
                            >
                                <Key className="h-4 w-4" />
                            </button>
                            <button
                                onClick={logout}
                                className="p-2 bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-all"
                                title="Wyloguj"
                            >
                                <LogOut className="h-4 w-4" />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-slate-500 hover:text-emerald-700 font-medium text-sm transition-colors hidden sm:block">
                                Logowanie
                            </Link>
                            <Link
                                href="/login"
                                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-sm transition-all shadow-md"
                            >
                                Platforma
                            </Link>
                        </>
                    )}

                    {/* Mobile menu button */}
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-slate-500 hover:text-slate-700">
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown */}
            {mobileOpen && (
                <div className="lg:hidden mt-2 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-100 p-6 mx-2 shadow-xl">
                    {navLinks.map(link => (
                        <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block text-slate-600 hover:text-emerald-700 py-3 font-medium text-sm border-b border-slate-50 last:border-0 transition-colors">
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}

            {showResetModal && user && (
                <PasswordResetModal
                    userId={user.id}
                    userName={`${user.firstName}`}
                    isAdminReset={false}
                    onClose={() => setShowResetModal(false)}
                />
            )}
        </nav>
    );
};

export default Navbar;
