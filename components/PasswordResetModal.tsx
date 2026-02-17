'use client';

import { useState } from 'react';
import { X, Lock, Check, AlertCircle } from 'lucide-react';
import api from '../utils/api';

interface PasswordResetModalProps {
    userId: number;
    userName: string;
    onClose: () => void;
    isAdminReset?: boolean;
}

export default function PasswordResetModal({ userId, userName, onClose, isAdminReset = false }: PasswordResetModalProps) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Hasła nie są identyczne');
            return;
        }

        if (newPassword.length < 6) {
            setError('Hasło musi mieć co najmniej 6 znaków');
            return;
        }

        setLoading(true);
        try {
            if (isAdminReset) {
                await api.post(`/users/admin-reset-password/${userId}`, { newPassword });
            } else {
                await api.post('/users/change-password', { oldPassword, newPassword });
            }
            setSuccess(true);
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Błąd podczas zmiany hasła');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in border border-white/20">
                <div className="p-6 bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold">
                            {isAdminReset ? 'Reset hasła użytkownika' : 'Zmień swoje hasło'}
                        </h3>
                        <p className="text-emerald-100 text-sm mt-1">{userName}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="p-8">
                    {success ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <div className="bg-green-100 p-4 rounded-full mb-4 shadow-inner">
                                <Check className="h-10 w-10 text-green-600" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-800">Udało się!</h4>
                            <p className="text-slate-500 mt-2">Hasło zostało pomyślnie zmienione.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm flex items-center border border-red-100">
                                    <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                                    {error}
                                </div>
                            )}

                            {!isAdminReset && (
                                <div>
                                    <label className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">Aktualne Hasło</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                        <input
                                            type="password"
                                            value={oldPassword}
                                            onChange={e => setOldPassword(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">
                                    {isAdminReset ? 'Nowe Hasło dla użytkownika' : 'Nowe Hasło'}
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">Powtórz Nowe Hasło</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex space-x-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-colors"
                                >
                                    Anuluj
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-[2] py-4 bg-slate-900 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none"
                                >
                                    {loading ? 'Przetwarzanie...' : (isAdminReset ? 'Zresetuj Hasło' : 'Zapisz Zmiany')}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
