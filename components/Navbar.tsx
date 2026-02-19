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
        { label: 'Wpływ', href: '/#impact' },
        { label: 'Wizja', href: '/#mission' },
        { label: 'Historia', href: '/#history' },
        { label: 'Adopcja', href: '/#adopt' },
        { label: 'Galeria', href: '/#gallery' },
        { label: 'Kontakt', href: '/#kontakt' },
    ];

    return (
        <nav className="fixed top-0 w-full z-[100] px-4 md:px-6 py-3">
            <div className="max-w-7xl mx-auto flex justify-between items-center bg-black/40 backdrop-blur-2xl px-5 md:px-8 py-3 rounded-full border border-white/10">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
                    <img src="/logo.png" alt="BeeHouses" className="h-9 w-auto object-contain" />
                    <span className="font-serif font-bold text-white text-base tracking-tight hidden lg:block">
                        BeeHouses <span className="text-amber-400">Foundation</span>
                    </span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden lg:flex items-center space-x-6">
                    {navLinks.map(link => (
                        <Link key={link.href} href={link.href} className="text-white/60 hover:text-white font-medium transition-colors text-sm tracking-wide">
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
                                className="flex items-center px-5 py-2 bg-amber-400 hover:bg-amber-300 text-black rounded-full transition-all font-bold text-sm shadow-lg shadow-amber-400/20"
                            >
                                <Layout className="h-4 w-4 mr-2" />
                                <span className="hidden sm:inline">Platforma</span>
                            </Link>

                            <button
                                onClick={() => setShowResetModal(true)}
                                className="p-2 bg-white/10 hover:bg-white/20 text-white/60 hover:text-white rounded-full transition-all"
                                title="Zmień hasło"
                            >
                                <Key className="h-4 w-4" />
                            </button>
                            <button
                                onClick={logout}
                                className="p-2 bg-white/10 hover:bg-red-500/20 text-white/60 hover:text-red-400 rounded-full transition-all"
                                title="Wyloguj"
                            >
                                <LogOut className="h-4 w-4" />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-white/60 hover:text-white font-medium text-sm transition-colors hidden sm:block">
                                Logowanie
                            </Link>
                            <Link
                                href="/login"
                                className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-black rounded-full font-bold text-sm transition-all shadow-lg shadow-amber-400/20"
                            >
                                Platforma
                            </Link>
                        </>
                    )}

                    {/* Mobile menu button */}
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-white/60 hover:text-white">
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown */}
            {mobileOpen && (
                <div className="lg:hidden mt-2 bg-black/90 backdrop-blur-2xl rounded-2xl border border-white/10 p-6 mx-2 animate-fade-in-up">
                    {navLinks.map(link => (
                        <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block text-white/60 hover:text-white py-3 font-medium text-sm border-b border-white/5 last:border-0 transition-colors">
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

