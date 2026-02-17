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
            <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/80 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-xl border border-white/20">
                <Link href="/" className="flex items-center space-x-3 group">
                    <div className="bg-emerald-50 p-1.5 rounded-xl group-hover:bg-emerald-100 transition-colors">
                        <img src="/logo.png" alt="BeeHouses" className="h-10 w-auto object-contain" />
                    </div>
                    <span className="font-bold text-slate-800 text-xl tracking-tight hidden sm:block">
                        BeeHouses <span className="text-emerald-600">Foundation</span>
                    </span>
                </Link>

                <div className="flex items-center space-x-2 md:space-x-4">
                    {user ? (
                        <>
                            <Link
                                href={user.role === 'admin' ? "/admin/dashboard" : "/dashboard"}
                                className="flex items-center px-4 py-2 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all font-medium"
                            >
                                <Layout className="h-4 w-4 mr-2" />
                                {user.role === 'admin' ? 'Admin' : 'Mój Panel'}
                            </Link>

                            <div className="h-6 w-px bg-slate-200 mx-2 hidden md:block"></div>

                            <div className="flex items-center space-x-3 pl-2">
                                <span className="text-sm font-semibold text-slate-700 hidden md:block">
                                    {user.firstName}
                                </span>
                                <button
                                    onClick={() => setShowResetModal(true)}
                                    className="p-2.5 bg-slate-50 hover:bg-amber-50 text-slate-400 hover:text-amber-500 rounded-xl transition-all shadow-inner"
                                    title="Zmień hasło"
                                >
                                    <Key className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={logout}
                                    className="p-2.5 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-all shadow-inner"
                                    title="Wyloguj"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <Link href="/login" className="text-slate-600 hover:text-emerald-700 font-semibold px-4 py-2 transition-colors">
                                Zaloguj się
                            </Link>
                            <Link
                                href="/login"
                                className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-600/20 transform hover:-translate-y-0.5"
                            >
                                Rozpocznij Kurs
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
