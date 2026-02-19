'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { LogOut, BookOpen, Users as UsersIcon, Layout, Shield, Key } from 'lucide-react';
import PasswordResetModal from './PasswordResetModal';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [showResetModal, setShowResetModal] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-[100] px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/90 backdrop-blur-xl px-6 py-3 rounded-full shadow-2xl border border-white/40 mt-2">
                <Link href="/" className="flex items-center space-x-3 group">
                    <div className="bg-emerald-50 p-1.5 rounded-full group-hover:bg-emerald-100 transition-colors">
                        <img src="/logo.png" alt="BeeHouses" className="h-10 w-auto object-contain" />
                    </div>
                    <span className="font-bold text-slate-800 text-lg tracking-tight hidden lg:block font-serif">
                        BeeHouses <span className="text-amber-500">Foundation</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/#mission" className="text-slate-600 hover:text-emerald-800 font-medium transition-colors text-sm uppercase tracking-wide">
                        Misja
                    </Link>
                    <Link href="/#history" className="text-slate-600 hover:text-emerald-800 font-medium transition-colors text-sm uppercase tracking-wide">
                        O Nas
                    </Link>
                    <Link href="/#contact" className="text-slate-600 hover:text-emerald-800 font-medium transition-colors text-sm uppercase tracking-wide">
                        Kontakt
                    </Link>
                </div>

                <div className="flex items-center space-x-2 md:space-x-4">
                    {user ? (
                        <>
                            <Link
                                href={user.role === 'admin' ? "/admin/dashboard" : "/dashboard"}
                                className="flex items-center px-5 py-2.5 bg-emerald-900 text-ivory-50 hover:bg-emerald-800 rounded-full transition-all font-medium shadow-lg hover:shadow-emerald-900/20"
                            >
                                <Layout className="h-4 w-4 mr-2" />
                                <span className="hidden sm:inline">Platforma</span>
                            </Link>

                            <div className="h-6 w-px bg-slate-200 mx-1 hidden md:block"></div>

                            <div className="flex items-center space-x-2 pl-1">
                                <button
                                    onClick={() => setShowResetModal(true)}
                                    className="p-2.5 bg-slate-50 hover:bg-amber-50 text-slate-400 hover:text-amber-500 rounded-full transition-all"
                                    title="Zmień hasło"
                                >
                                    <Key className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={logout}
                                    className="p-2.5 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-all"
                                    title="Wyloguj"
                                >
                                    <LogOut className="h-4 w-4" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <Link href="/login" className="text-slate-600 hover:text-emerald-700 font-semibold px-4 py-2 transition-colors hidden sm:block">
                                Logowanie
                            </Link>
                            <Link
                                href="/login"
                                className="px-6 py-2.5 bg-amber-500 text-emerald-950 rounded-full font-bold hover:bg-amber-400 transition-all shadow-lg hover:shadow-amber-500/20"
                            >
                                Platforma
                            </Link>
                        </div>
                    )}
                </div>
            </div>

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
