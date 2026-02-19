'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import { useRouter } from 'next/navigation';
import { Leaf } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true); // Toggle Login/Register
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                const res = await api.post('/auth/login', { email, password });
                login(res.data.token, res.data.user);
            } else {
                const res = await api.post('/auth/register', {
                    email,
                    password,
                    firstName,
                    lastName
                });
                // Auto login after register? Or ask to login.
                // Let's ask to login for simplicity or auto-login.
                // For MVP, just auto-login if backend returns token? 
                // Backend register returns { message, userId }. No token.
                // So prompt login.
                setIsLogin(true);
                setError('Konto utworzone! Zaloguj się.');
            }
        } catch (err: any) {
            if (err.response) {
                setError(err.response.data.message || 'Błąd logowania');
            } else {
                setError('Błąd połączenia z serwerem');
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen pt-28 pb-12 px-6 bg-ivory-50 text-slate-800">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-stone-200">
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-amber-100 p-3 rounded-full mb-3 shadow-inner">
                        <Leaf className="h-8 w-8 text-amber-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        {isLogin ? 'Witaj ponownie!' : 'Dołącz do nas'}
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Platforma Edukacyjna BeeHouses
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">Imię</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">Nazwisko</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">Hasło</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                    >
                        {isLogin ? 'Zaloguj się' : 'Zarejestruj się'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm border-t border-stone-100 pt-6">
                    <span className="text-slate-500">
                        {isLogin ? 'Nie masz konta?' : 'Masz już konto?'}
                    </span>
                    <button
                        onClick={() => { setIsLogin(!isLogin); setError(''); }}
                        className="ml-2 text-amber-600 font-bold hover:text-amber-700 hover:underline"
                    >
                        {isLogin ? 'Zarejestruj się' : 'Zaloguj się'}
                    </button>
                </div>
            </div>
        </div>
    );
}
